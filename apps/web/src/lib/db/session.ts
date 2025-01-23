// session.ts
import type { RelationalSchemaConfig, TablesRelationalConfig } from 'drizzle-orm/relations'
import { fillPlaceholders, type Query } from 'drizzle-orm/sql'
import {} from 'drizzle-orm/sql/sql'
import { SQLiteTransaction } from 'drizzle-orm/sqlite-core'
import type { SQLiteAsyncDialect } from 'drizzle-orm/sqlite-core/dialect'
import type { SelectedFieldsOrdered } from 'drizzle-orm/sqlite-core/query-builders'
import {
  SQLitePreparedQuery,
  SQLiteSession,
  type PreparedQueryConfig as PreparedQueryConfigBase,
  type Result,
  type SQLiteExecuteMethod,
  type SQLiteTransactionConfig,
} from 'drizzle-orm/sqlite-core/session'
import type { ResultSet, SQLiteCompatibleType } from './core.js'
import { type SQLiteWasmConfig } from './driver'
import { entityKind } from './entity.js'
import { NoopLogger, type Logger } from './logger.js'

type WorkserMessageCommand<T> = {
  type: 'command'
  cmd: 'run' | 'all' | 'get' | 'values' | 'transaction'
  id: number
  query: string
  params?: T[]
}

type WorkserMessageInit = {
  type: 'init'
  url?: URL | string
  previousDb: File | ReadableStream
}

export type WorkerMessage<T> = WorkserMessageCommand<T> | WorkserMessageInit

type WorkerResponseSuccess = {
  id: number
  result: ResultSet
}
type WorkerResponseError = {
  id: number
  error: string
}
export type WorkerResponse = WorkerResponseSuccess | WorkerResponseError

export interface SQLiteWasmSessionOptions {
  logger?: Logger
}

type PreparedQueryConfig = Omit<PreparedQueryConfigBase, 'statement' | 'run'>

export class SQLiteWasmSession<
  TFullSchema extends Record<string, unknown>,
  TSchema extends TablesRelationalConfig,
> extends SQLiteSession<'async', ResultSet, TFullSchema, TSchema> {
  static readonly [entityKind] = 'SQLiteWasmSession'
  private logger
  private messageCounter = 0
  private callbacks = new Map<number, (response: WorkerResponse) => void>()

  constructor(
    private worker: Worker,
    private dialect: SQLiteAsyncDialect,
    private schema: RelationalSchemaConfig<TSchema> | undefined,
    private config: SQLiteWasmConfig,
    private options: SQLiteWasmSessionOptions,
    tx: any | undefined,
  ) {
    super(dialect)
    this.logger = options.logger ?? new NoopLogger()

    this.worker.onmessage = (e: MessageEvent<WorkerResponse>) => {
      const callback = this.callbacks.get(e.data.id)
      if (callback) {
        callback(e.data)
        this.callbacks.delete(e.data.id)
      }
    }
  }

  transaction<T>(
    transaction: (tx: SQLiteTransaction<'async', ResultSet, TFullSchema, TSchema>) => Promise<T>,
    _config?: SQLiteTransactionConfig,
  ): Promise<T> {
    throw new Error('Method not implemented.')
  }

  private async sendCommand<T>({ type, query, params }: Omit<WorkserMessageCommand<T>, 'id'>): Promise<WorkerResponse> {
    const id = this.messageCounter++

    return new Promise<WorkerResponse>((resolve, reject) => {
      this.callbacks.set(id, (response) => {
        if ('error' in response) {
          reject(new Error(response.error))
        } else {
          resolve(response)
        }
      })

      this.worker.postMessage({ type, id, query, params })
    })
  }

  prepareQuery<T extends Omit<PreparedQueryConfig, 'run'>>(
    query: Query,
    fields: SelectedFieldsOrdered | undefined,
    executeMethod: SQLiteExecuteMethod,
    isResponseInArrayMode: boolean,
    customResultMapper?: (rows: unknown[][]) => unknown,
  ) {
    return new SQLiteWasmPreparedQuery(
      this.worker,
      query,
      this.options.logger!,
      fields,
      undefined,
      executeMethod,
      isResponseInArrayMode,
      customResultMapper,
    )
  }

  // async batch<T extends BatchItem<'sqlite'>[] | readonly BatchItem<'sqlite'>[]>(queries: T): Promise<unknown[]> {
  //   const results = []
  //   for (const query of queries) {
  //     const result = await this.sendCommand('run', query.query, query.params)
  //     results.push(result.result)
  //   }
  //   return results
  // }

  // async migrate<T extends BatchItem<'sqlite'>[] | readonly BatchItem<'sqlite'>[]>(queries: T): Promise<unknown[]> {
  //   return this.batch(queries)
  // }

  // async transaction<T>(
  //   transaction: (db: SQLiteWasmTransaction<TFullSchema, TSchema>) => Promise<T>,
  //   _config?: SQLiteTransactionConfig,
  // ): Promise<T> {
  //   await this.sendCommand('run', 'BEGIN')
  //   try {
  //     const tx = new SQLiteWasmTransaction(this.dialect, this.schema, this.session, this.logger)
  //     const result = await transaction(tx)
  //     await this.sendCommand('run', 'COMMIT')
  //     return result
  //   } catch (e) {
  //     await this.sendCommand('run', 'ROLLBACK')
  //     throw e
  //   }
  // }

  extractRawAllValueFromBatchResult(result: unknown) {
    return result
  }

  extractRawGetValueFromBatchResult(result: unknown) {
    return result
  }

  extractRawValuesValueFromBatchResult(result: unknown) {
    return result
  }
}

export class SQLiteWasmTransaction<
  TFullSchema extends Record<string, unknown>,
  TSchema extends TablesRelationalConfig,
> extends SQLiteTransaction<'async', any, TFullSchema, TSchema> {
  static readonly [entityKind] = 'SQLiteWasmTransaction'

  async transaction<T>(transaction: (tx: SQLiteWasmTransaction<TFullSchema, TSchema>) => Promise<T>): Promise<T> {
    return transaction(this)
  }
}

export class SQLiteWasmPreparedQuery<T extends PreparedQueryConfig = PreparedQueryConfig> extends SQLitePreparedQuery<{
  type: 'async'
  run: ResultSet
  all: T['all']
  get: T['get']
  values: T['values']
  execute: T['execute']
}> {
  static readonly [entityKind] = 'SQLiteWasmPreparedQuery'

  constructor(
    private worker: Worker,
    query: Query,
    private logger: Logger,
    fields: SelectedFieldsOrdered | undefined,
    tx: any | undefined,
    executeMethod: SQLiteExecuteMethod,
    private _isResponseInArrayMode: boolean,
    customResultMapper?: (rows: unknown[][], mapColumnValue?: (value: unknown) => unknown) => unknown,
  ) {
    super('async', executeMethod, query)
  }

  private sendCommand<T>(
    cmd: WorkserMessageCommand<T>['cmd'],
    placeholderValues?: Record<string, T>,
  ): Promise<Record<string, SQLiteCompatibleType>[]> {
    const id = Math.random()

    return new Promise<Record<string, SQLiteCompatibleType>[]>((resolve, reject) => {
      const callback = (response: WorkerResponse) => {
        if ('error' in response) {
          reject(new Error(response.error))
        } else {
          resolve(response.result)
        }
      }

      const params = fillPlaceholders(this.query.params, placeholderValues ?? {})
      this.logger.logQuery(this.query.sql, params)
      this.worker.postMessage({
        type: 'command',
        cmd,
        id,
        query: this.query.sql,
        params,
      } as WorkerMessage<T>)
    })
  }

  async run<T>(placeholderValues?: Record<string, T>) {
    // return this.tx ? this.tx.execute(stmt) : this.client.execute(stmt);

    const response = this.sendCommand('run', placeholderValues)
    return response
  }

  async all(placeholderValues?: Record<string, unknown>) {
    const response = await this.sendCommand('all', placeholderValues)
    return this.mapAllResult(response)
  }

  mapAllResult(rows: unknown, isFromBatch = false) {
    if (!rows) return []
    return rows as T['all']
  }

  async get(placeholderValues?: Record<string, unknown>) {
    const response = await this.sendCommand('get', placeholderValues)
    return this.mapGetResult(response)
  }

  mapGetResult(rows: unknown, isFromBatch = false) {
    if (!rows) return undefined
    return (Array.isArray(rows) ? rows[0] : rows) as T['get']
  }

  async values(placeholderValues?: Record<string, unknown>) {
    const response = await this.sendCommand('values', placeholderValues)
    return response as T['values']
  }
}

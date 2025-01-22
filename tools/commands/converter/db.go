package converter

import (
	"database/sql"
	"exile-buddy/tools/file-formats/datc64"
	"fmt"
	"log/slog"
	"os"
	"path"
)

type ConvertToDB struct {
	OutFile string
	db      *sql.DB
	tables  []datc64.SchemaTable
}

func (c *ConvertToDB) Before(schema *datc64.Schema, options datc64.ConvertOptions) error {
	outDir := path.Dir(c.OutFile)
	dbFile := c.OutFile
	c.tables = make([]datc64.SchemaTable, 0)
	if stat, err := os.Stat(outDir); err != nil || !stat.IsDir() {
		os.MkdirAll(outDir, 0755)
	}

	if _, err := os.Stat(dbFile); err == nil {
		os.Remove(dbFile)
	}
	slog.Info(fmt.Sprintf("open db %s", dbFile))
	db, err := sql.Open("sqlite3", dbFile)
	if err != nil {
		return err
	}
	c.db = db
	return nil
}

func (c *ConvertToDB) Convert(data *datc64.ConvertedData) error {
	if c.db == nil {
		return nil
	}
	stmt, err := data.Schema.ToSqlStatement(data.Rows...)
	if err != nil {
		return err
	}
	_, err = c.db.Exec(stmt)
	if err != nil {
		return err
	}
	c.tables = append(c.tables, data.Schema)
	return nil
}

func (c *ConvertToDB) After() error {
	return nil
}

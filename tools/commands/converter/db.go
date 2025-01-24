package converter

import (
	"database/sql"
	"exile-buddy/tools/file-formats/datc64"
	"fmt"
	"log/slog"
	"os"
	"path"
	"strings"
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
		slog.Info(fmt.Sprintf("  remove previous file %v", dbFile))
		if err = os.Remove(dbFile); err != nil {
			return err
		}
	}
	slog.Info(fmt.Sprintf("open db %s", dbFile))

	db, err := sql.Open("sqlite3", dbFile)
	if err != nil {
		return err
	}
	c.db = db

	for _, table := range schema.Tables {
		if len(options.Tables) == 0 {
			c.tables = append(c.tables, table)
		} else {
			for _, name := range options.Tables {
				if strings.EqualFold(name, table.Name) {
					c.tables = append(c.tables, table)
					break
				}
			}
		}
	}
	slog.Info(fmt.Sprintf("  Tables %v", len(c.tables)))
	return nil
}

func (c *ConvertToDB) Convert(data *datc64.ConvertedData) error {
	if c.db == nil {
		return nil
	}
	stmt, err := data.Schema.ToSqlStatement(data.Rows, c.tables)
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

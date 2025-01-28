package converter

import (
	"exile-buddy/tools/file-formats/datc64"
	"fmt"
	"log/slog"
	"os"
	"path"
	"strings"
)

type ConvertToSql struct {
	OutDir string
	tables []datc64.SchemaTable
	schema *datc64.Schema
	count  int
}

func (c *ConvertToSql) Before(schema *datc64.Schema, options datc64.ConvertOptions) error {
	c.schema = schema
	c.tables = make([]datc64.SchemaTable, 0)
	if stat, err := os.Stat(c.OutDir); err != nil || !stat.IsDir() {
		os.MkdirAll(c.OutDir, 0755)
	}

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
	return nil
}

func (c *ConvertToSql) Convert(data *datc64.ConvertedData) error {
	outFile := strings.ToLower(path.Join(c.OutDir, data.Schema.Name+".sql"))
	file, err := os.OpenFile(outFile, os.O_CREATE|os.O_WRONLY|os.O_TRUNC, 0644)
	if err != nil {
		return err
	}
	defer file.Close()

	stmt, err := data.Schema.ToSqlStatement(data.Rows, c.tables)
	if err != nil {
		return err
	}
	_, err = file.Write([]byte(stmt))
	if err != nil {
		return err
	}

	slog.Info(fmt.Sprintf("  Write %s", outFile))
	c.count++
	return nil

}

func (c *ConvertToSql) After() error {
	slog.Info(fmt.Sprintf("%d SQL files written %s", c.count, c.OutDir))
	return nil
}

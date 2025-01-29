package datc64

import (
	"fmt"
	"log/slog"
	"os"
	"path"
	"strings"
)

type ConvertHandler interface {
	Before(schema *Schema, options ConvertOptions) error
	Convert(*ConvertedData) error
	After() error
}

type ConvertBefore struct {
	Options ConvertOptions
	Schema  *Schema
}

type ConvertedData struct {
	File   string
	Schema SchemaTable
	Rows   []map[string]interface{}
}

type ConvertOptions struct {
	SchemaFile string
	DataDir    string
	Tables     []string
	Handler    ConvertHandler
	MaxRows    int
}

func ConvertData(options ConvertOptions) error {
	schema, err := LoadSchema(options.SchemaFile)
	if err != nil {
		return err
	}
	if options.Handler != nil {
		err = options.Handler.Before(schema, options)
		if err != nil {
			return err
		}
	}

	for _, t := range schema.Tables {
		skip := len(options.Tables) > 0
		if skip {
			for _, table := range options.Tables {
				if strings.EqualFold(table, t.Name) {
					skip = false
					break
				}
			}
		}
		if skip {
			continue
		}
		if t.ValidFor == 1 {
			// skip poe1 tables
			continue
		}
		datFile := path.Join(options.DataDir, strings.ToLower(t.Name)+".datc64")
		if _, err := os.Stat(datFile); os.IsNotExist(err) {
			slog.Warn("File not found", "file", datFile)
			continue
		}
		slog.Info(fmt.Sprintf("Convert %s", datFile))
		r := Load(datFile)
		slog.Info(fmt.Sprintf("  rows: %v stride: %v", r.rows, r.stride))
		rows, err := r.ReadRows(&t, options.MaxRows)
		if err != nil {
			slog.Error("Failed to read rows", "err", err)
		}

		if options.Handler != nil {
			err = options.Handler.Convert(&ConvertedData{File: datFile, Schema: t, Rows: rows})
			if err != nil {
				return err
			}
		}
	}

	if options.Handler != nil {
		err = options.Handler.After()
		if err != nil {
			return err
		}
	}
	return nil
}

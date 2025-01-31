package converter

import (
	"bytes"
	"encoding/json"
	"exile-buddy/tools/file-formats/datc64"
	"fmt"
	"log/slog"
	"os"
	"path"
	"strings"
	"text/template"
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

	stmt, err := SchemaToSqlStatement(&data.Schema, data.Rows, c.tables)
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

type SchemaToSqlDirective struct {
	Name string
	Cols []struct {
		Name   string
		Type   string
		Ref    string
		Unique bool
		Nocase bool
	}
	Insert [][]string
}

var tplCreateTable = template.Must(template.New("createTable").Funcs(template.FuncMap{
	"sub": func(a, b int) int {
		return a - b
	}}).Parse(`
CREATE TABLE IF NOT EXISTS {{ .Name }} (
  '$idx' INTEGER PRIMARY KEY,
  {{- range $index, $col := .Cols -}}
  {{ if $index }},{{ end }}
  {{ $col.Name }} {{ $col.Type -}}
	{{ if $col.Unique }} UNIQUE {{ end -}}
  {{ if $col.Nocase }} COLLATE NOCASE {{ end -}}

	{{ if $col.Ref }} REFERENCES {{ $col.Ref }}('$idx'){{ end -}}
  {{ end }}
);
{{- if len .Insert }}
INSERT INTO {{ .Name }} ('$idx',{{- range $index, $col := .Cols }}{{ if $index }},{{ end }}{{ $col.Name }}{{ end }})
VALUES
  {{- range $rowIndex, $row := .Insert -}}
  {{- if $rowIndex }},{{ end }}
  ({{ $rowIndex }},{{- range $vi, $val := $row }}{{ if $vi }},{{ end }}{{ $val }}{{ end -}})
  {{- end }};
{{- end }}
`))

func SchemaToSqlStatement(t *datc64.SchemaTable, rows []map[string]any, tables []datc64.SchemaTable) (string, error) {
	table := SchemaToSqlDirective{
		Name: t.Name,
	}
	for _, col := range t.Columns {
		if col.Name == "" {
			// skip unknown columns
			continue
		}
		t, err := GetSqliteColumnType(col)
		if err != nil {
			slog.Error("Error getting sqlite type", "err", err)
		}
		ref := ""
		if col.References != nil {
			for _, tbl := range tables {
				if strings.EqualFold(tbl.Name, col.References.Table) {
					ref = tbl.Name
					break
				}
			}
		}
		table.Cols = append(table.Cols, struct {
			Name   string
			Type   string
			Ref    string
			Unique bool
			Nocase bool
		}{
			Name:   col.Name,
			Type:   t,
			Ref:    ref,
			Unique: col.Unique,
			Nocase: col.Unique && col.Type == "string",
		})
	}
	for _, row := range rows {
		insert := make([]string, 0)
		for _, col := range t.Columns {
			if col.Name == "" {
				// skip unknown columns
				continue
			}
			v, err := GetSqliteValue(col, row[col.Name])
			if err != nil {
				slog.Error("Error getting sqlite value", "err", err)
			}
			insert = append(insert, v)
		}
		table.Insert = append(table.Insert, insert)
	}
	var tpl bytes.Buffer
	if err := tplCreateTable.Execute(&tpl, table); err != nil {
		return "", err
	}
	return tpl.String(), nil
}

func GetSqliteColumnType(col datc64.SchemaColumn) (string, error) {
	if col.Array || col.Interval {
		return "TEXT", nil
	}
	switch col.Type {
	case "string":
		return "TEXT", nil
	case "bool":
		return "BOOLEAN", nil
	case "f32":
		return "REAL", nil
	case "i8":
		fallthrough
	case "i16":
		fallthrough
	case "i32":
		fallthrough
	case "u8":
		fallthrough
	case "u16":
		fallthrough
	case "u32":
		fallthrough
	case "enumrow":
		fallthrough
	case "foreignrow":
		fallthrough
	case "row":
		return "INTEGER", nil
	default:
		return "BLOB", fmt.Errorf("unknown type %s", col.Type)
	}
}

func GetSqliteValue(col datc64.SchemaColumn, value any) (string, error) {
	if value == nil {
		return "NULL", nil
	}
	if col.Array || col.Interval {
		if data, err := json.Marshal(value); err != nil {
			return "''", err
		} else {
			return "'" + strings.ReplaceAll(string(data), "'", "''") + "'", nil
		}
	}
	switch col.Type {
	case "string":
		return "'" + strings.ReplaceAll(fmt.Sprintf("%s", value), "'", "''") + "'", nil
	case "bool":
		return strings.ToUpper(fmt.Sprintf("%t", value)), nil
	case "f32":
		return fmt.Sprintf("%f", value), nil
	case "i8":
		fallthrough
	case "i16":
		fallthrough
	case "i32":
		fallthrough
	case "u8":
		fallthrough
	case "u16":
		fallthrough
	case "u32":
		fallthrough
	case "enumrow":
		fallthrough
	case "foreignrow":
		fallthrough
	case "row":
		return fmt.Sprintf("%d", value), nil
	default:
		return "", fmt.Errorf("unknown type %s", col.Type)
	}
}

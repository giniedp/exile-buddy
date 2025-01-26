package datc64

// https://github.com/poe-tool-dev/dat-schema/blob/main/src/types.ts

import (
	"bytes"
	"fmt"
	"log/slog"
	"os"
	"strings"
	"text/template"

	"encoding/json"
)

type ValidFor int

const (
	ValidForPOE1 ValidFor = iota
	ValidForPOE2
	ValidForCommon
)

type Schema struct {
	Version      int                 `json:"version"`
	CreatedAt    int                 `json:"createdAt"`
	Tables       []SchemaTable       `json:"tables"`
	Enumerations []SchemaEnumeration `json:"enumerations"`
}

type SchemaTable struct {
	ValidFor ValidFor       `json:"validFor"`
	Name     string         `json:"name"`
	Columns  []SchemaColumn `json:"columns"`
	Tags     []string       `json:"tags"`
}

type SchemaColumn struct {
	Name        string           `json:"name"`
	Description string           `json:"description"`
	Array       bool             `json:"array"`
	Type        string           `json:"type"`
	Unique      bool             `json:"unique"`
	Localized   bool             `json:"localized"`
	Until       *string          `json:"until"`
	References  *SchemaReference `json:"references"`
	File        string           `json:"file"`  // File extension e.g. ".ogg"
	Files       []string         `json:"files"` // File extensiond e.g. [".ot", ".otc"]
	Interval    bool             `json:"interval"`
}

type SchemaEnumeration struct {
	ValidFor    int       `json:"validFor"`
	Name        string    `json:"name"`
	Indexing    int       `json:"indexing"`
	Enumerators []*string `json:"enumerators"`
}

type SchemaReference struct {
	Table string `json:"table"`
}

func LoadSchema(file string) (*Schema, error) {
	data, err := os.ReadFile(file)
	if err != nil {
		return nil, err
	}
	var schema Schema
	if err = json.Unmarshal(data, &schema); err != nil {
		return nil, err
	}
	return &schema, nil
}

type SchemaToSqlDirective struct {
	Name string
	Cols []struct {
		Name   string
		Type   string
		Ref    string
		Unique bool
	}
	Insert [][]string
}

var tplCreateTable = template.Must(template.New("createTable").Funcs(template.FuncMap{
	"sub": func(a, b int) int {
		return a - b
	}}).Parse(`
CREATE TABLE IF NOT EXISTS {{ .Name }} (
  '$id' INTEGER PRIMARY KEY,
  {{- range $index, $col := .Cols -}}
  {{ if $index }},{{ end }}
  {{ $col.Name }} {{ $col.Type -}}
	{{ if $col.Unique }} UNIQUE {{ end -}}
	{{ if $col.Ref }} REFERENCES {{ $col.Ref }}('$id'){{ end -}}
  {{ end }}
);
{{- if len .Insert }}
INSERT INTO {{ .Name }} ('$id',{{- range $index, $col := .Cols }}{{ if $index }},{{ end }}{{ $col.Name }}{{ end }})
VALUES
  {{- range $rowIndex, $row := .Insert -}}
  {{- if $rowIndex }},{{ end }}
  ({{ $rowIndex }},{{- range $vi, $val := $row }}{{ if $vi }},{{ end }}{{ $val }}{{ end -}})
  {{- end }};
{{- end }}
`))

var tplTypescript = template.Must(template.New("typescriptType").Parse(`
export interface {{ .Name }} {
  {{- range $index, $col := .Cols }}
  {{ $col.Name }}: {{ $col.Type -}}
  {{ end }}
}`))

func (t *SchemaTable) ToSqlStatement(rows []map[string]any, tables []SchemaTable) (string, error) {
	table := SchemaToSqlDirective{
		Name: t.Name,
	}
	for _, col := range t.Columns {
		if col.Name == "" {
			// skip unknown columns
			continue
		}
		t, err := col.GetSqliteType()
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
		}{
			Name:   col.Name,
			Type:   t,
			Ref:    ref,
			Unique: col.Unique,
		})
	}
	for _, row := range rows {
		insert := make([]string, 0)
		for _, col := range t.Columns {
			if col.Name == "" {
				// skip unknown columns
				continue
			}
			v, err := col.GetSqliteValue(row[col.Name])
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

func (col *SchemaColumn) GetSqliteType() (string, error) {
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

func (col *SchemaColumn) GetSqliteValue(value any) (string, error) {
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

func (t *SchemaTable) ToTypescript() (string, error) {
	table := SchemaToSqlDirective{
		Name: t.Name,
	}
	for _, col := range t.Columns {
		if col.Name == "" {
			// skip unknown columns
			continue
		}
		t, err := col.GetTypescriptType()
		if err != nil {
			slog.Error("Error getting sqlite type", "err", err)
		}
		table.Cols = append(table.Cols, struct {
			Name   string
			Type   string
			Ref    string
			Unique bool
		}{
			Name:   col.Name,
			Type:   t,
			Unique: col.Unique,
		})
	}
	var tpl bytes.Buffer
	if err := tplTypescript.Execute(&tpl, table); err != nil {
		return "", err
	}
	return tpl.String(), nil
}

func (col *SchemaColumn) GetTypescriptType() (string, error) {
	if col.Array || col.Interval {
		return "unknown", nil // TODO
	}
	switch col.Type {
	case "string":
		return "string", nil
	case "bool":
		return "boolean", nil
	case "f32":
		return "number", nil
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
		return "number", nil
	default:
		return "unknown", fmt.Errorf("unknown type %s", col.Type)
	}
}

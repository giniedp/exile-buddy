package converter

import (
	"bytes"
	"exile-buddy/tools/file-formats/datc64"
	"fmt"
	"log/slog"
	"os"
	"path"
	"strings"
	"text/template"
)

type ConvertToTs struct {
	OutDir string
}

func (c *ConvertToTs) Before(schema *datc64.Schema, options datc64.ConvertOptions) error {
	if stat, err := os.Stat(c.OutDir); err != nil || !stat.IsDir() {
		return os.MkdirAll(c.OutDir, 0755)
	}
	return nil
}

func (c *ConvertToTs) Convert(data *datc64.ConvertedData) error {
	outFile := strings.ToLower(path.Join(c.OutDir, data.Schema.Name+".ts"))
	file, err := os.OpenFile(outFile, os.O_CREATE|os.O_WRONLY|os.O_TRUNC, 0644)
	if err != nil {
		return err
	}
	defer file.Close()

	stmt, err := SchemaToTypescript(&data.Schema)
	if err != nil {
		return err
	}
	_, err = file.Write([]byte(stmt))
	if err != nil {
		return err
	}
	slog.Info(fmt.Sprintf("  Write %s", outFile))
	return nil
}

func (c *ConvertToTs) After() error {
	return nil
}

type SchemaToTsDirective struct {
	Name string
	Cols []struct {
		Name string
		Type string
	}
	Insert [][]string
}

var tplTypescript = template.Must(template.New("typescriptType").Parse(`
export interface {{ .Name }} {
  {{- range $index, $col := .Cols }}
  {{ $col.Name }}: {{ $col.Type -}}
  {{ end }}
}`))

func SchemaToTypescript(t *datc64.SchemaTable) (string, error) {
	table := SchemaToTsDirective{
		Name: t.Name,
	}
	for _, col := range t.Columns {
		if col.Name == "" {
			// skip unknown columns
			continue
		}
		t, err := GetTypescriptType(&col)
		if err != nil {
			slog.Error("Error getting sqlite type", "err", err)
		}
		table.Cols = append(table.Cols, struct {
			Name string
			Type string
		}{
			Name: col.Name,
			Type: t,
		})
	}
	var tpl bytes.Buffer
	if err := tplTypescript.Execute(&tpl, table); err != nil {
		return "", err
	}
	return tpl.String(), nil
}

func GetTypescriptType(col *datc64.SchemaColumn) (string, error) {
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

package converter

import (
	"encoding/json"
	"exile-buddy/tools/file-formats/datc64"
	"os"
	"path"
	"strings"
)

type ConvertToJson struct {
	OutDir string
}

func (c *ConvertToJson) Before(schema *datc64.Schema, options datc64.ConvertOptions) error {
	if stat, err := os.Stat(c.OutDir); err != nil || !stat.IsDir() {
		return os.MkdirAll(c.OutDir, 0755)
	}
	return nil
}

func (c *ConvertToJson) Convert(data *datc64.ConvertedData) error {
	outFile := strings.ToLower(path.Join(c.OutDir, data.Schema.Name+".json"))
	outData, err := json.MarshalIndent(data.Rows, "", "\t")
	if err != nil {
		return err
	}
	return os.WriteFile(outFile, outData, 0644)
}

func (c *ConvertToJson) After() error {
	return nil
}

package converter

import (
	"encoding/json"
	"exile-buddy/tools/file-formats/datc64"
	"fmt"
	"log/slog"
	"os"
	"path"
	"strings"
)

type ConvertToJson struct {
	OutDir string
	count  int
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
	c.count++
	return os.WriteFile(outFile, outData, 0644)
}

func (c *ConvertToJson) After() error {
	slog.Info(fmt.Sprintf("%d JSON files written to %s", c.count, c.OutDir))
	return nil
}

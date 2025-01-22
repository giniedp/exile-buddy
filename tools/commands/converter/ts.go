package converter

import (
	"exile-buddy/tools/file-formats/datc64"
	"fmt"
	"log/slog"
	"os"
	"path"
	"strings"
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

	stmt, err := data.Schema.ToTypescript()
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

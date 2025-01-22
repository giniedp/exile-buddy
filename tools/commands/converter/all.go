package converter

import "exile-buddy/tools/file-formats/datc64"

type ConvertList struct {
	list []datc64.ConvertHandler
}

func NewConvertList(list ...datc64.ConvertHandler) datc64.ConvertHandler {
	return &ConvertList{list: list}
}

func ToDb(outFile string) *ConvertToDB {
	return &ConvertToDB{OutFile: outFile}
}

func ToJson(outDir string) *ConvertToJson {
	return &ConvertToJson{OutDir: outDir}
}

func ToSql(outDir string) *ConvertToSql {
	return &ConvertToSql{OutDir: outDir}
}

func ToTs(outDir string) *ConvertToTs {
	return &ConvertToTs{OutDir: outDir}
}

func ToWebp(unpackDir, outDir string) *ConvertToWebp {
	return &ConvertToWebp{UnpacKDir: unpackDir, OutDir: outDir}
}

func (c *ConvertList) Before(schema *datc64.Schema, options datc64.ConvertOptions) error {
	for _, h := range c.list {
		if err := h.Before(schema, options); err != nil {
			return err
		}
	}
	return nil
}

func (c *ConvertList) Convert(data *datc64.ConvertedData) error {
	for _, h := range c.list {
		if err := h.Convert(data); err != nil {
			return err
		}
	}
	return nil
}

func (c *ConvertList) After() error {
	for _, h := range c.list {
		if err := h.After(); err != nil {
			return err
		}
	}
	return nil
}

package datc64

// https://github.com/poe-tool-dev/dat-schema/blob/main/src/types.ts

import (
	"os"

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

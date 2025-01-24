package client

import (
	"bytes"
	"fmt"
	"os"
)

func ExtractClientVersion(file string) (string, error) {
	data, err := os.ReadFile(file)
	if err != nil {
		return "", err
	}
	prefix := "poe2_production/tags/"
	index := bytes.Index(data, []byte(prefix))
	if index == -1 {
		return "", fmt.Errorf("version not found")
	}
	index += len(prefix)
	end := bytes.Index(data[index:], []byte{0, 0, 0, 0})
	if end == -1 {
		return "", fmt.Errorf("version not found")
	}
	return string(data[index : index+end]), nil
}

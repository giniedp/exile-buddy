package main

import (
	"exile-buddy/tools/file-formats/index"
	"exile-buddy/tools/utils"
	"exile-buddy/tools/utils/oodle"
	"log"
	"os"
	"path"
	"strings"

	"github.com/joho/godotenv"
)

func main() {
	workDir, _ := os.Getwd()
	err := godotenv.Load(path.Join(workDir, ".env"))
	if err != nil {
		log.Printf("Error loading .env file")
	}

	gameDir := os.Getenv("POE2_GAME_DIR")
	outDir := os.Getenv("POE2_UNPACK_DIR")
	bundleDir := path.Join(gameDir, "Bundles2")
	indexFile := path.Join(bundleDir, "_.index.bin")
	lib := oodle.New()
	idx := utils.Must(index.Read(indexFile, lib))
	idx.Extract(index.ExtractOptions{
		InputDir:  bundleDir,
		OutputDir: outDir,
		Oodle:     lib,
		Include: func(s string) bool {
			return !(strings.Contains(s, "shader") && strings.Contains(s, "cache"))
		},
		WorkerCount: 10,
	})
}

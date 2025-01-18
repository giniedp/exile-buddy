package utils

import (
	"log"
	"os"
	"path"

	"github.com/joho/godotenv"
)

func InitEnvFile() {
	err := godotenv.Load(path.Join(GetEnvWorkDir(), ".env"))
	if err != nil {
		log.Printf("Error loading .env file")
	}
}

func GetEnvWorkDir() string {
	workDir, _ := os.Getwd()
	return workDir
}

func GetEnvGameDir() string {
	return os.Getenv("POE2_GAME_DIR")
}

func GetEnvUnpackDir() string {
	return os.Getenv("POE2_UNPACK_DIR")
}

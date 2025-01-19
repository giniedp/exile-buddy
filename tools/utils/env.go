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
	GetEnvWorkDir()
	GetEnvGameDir()
}

func GetEnv(lookup string, fallback string) string {
	value := os.Getenv(lookup)
	if value == "" {
		return fallback
	}
	return value
}

func GetEnvWorkDir() string {
	value, _ := os.Getwd()
	return value
}

func GetEnvGameDir() string {
	return os.Getenv("POE2_GAME_DIR")
}

func GetEnvUnpackDir() string {
	return GetEnv("POE2_UNPACK_DIR", "tmp/unpack")
}

func GetEnvOutputTypescriptDir() string {
	return GetEnv("POE2_OUTPUT_TS_DIR", "tmp/output")
}

func GetEnvOutputDatabaseDir() string {
	return GetEnv("POE2_OUTPUT_DB_DIR", "tmp/output")
}

func GetEnvOutputSqlDir() string {
	return GetEnv("POE2_OUTPUT_SQL_DIR", "tmp/output")
}

func GetEnvOutputJsonDir() string {
	return GetEnv("POE2_OUTPUT_JSON_DIR", "tmp/output")
}

func GetEnvOutputArtDir() string {
	return GetEnv("POE2_OUTPUT_ART_DIR", "tmp/output")
}

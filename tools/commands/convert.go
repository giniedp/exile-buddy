package commands

import (
	"encoding/json"
	"exile-buddy/tools/file-formats/datc64"
	"exile-buddy/tools/utils"
	"fmt"
	"log/slog"
	"os"
	"path"
	"strings"

	_ "github.com/mattn/go-sqlite3"
	"github.com/spf13/cobra"
)

var (
	cmdConvert = &cobra.Command{
		Use:   "convert",
		Short: "converts datc64 data to json or sqlite.db",
		Long:  ``,
		Run:   runConvert,
	}
)

func runConvert(ccmd *cobra.Command, args []string) {
	Convert(ConvertOptions{
		UnpackDir:  utils.GetEnvUnpackDir(),
		SchemaFile: path.Join(utils.GetEnvWorkDir(), "tools/schema.json"),
	})
}

type ConvertOptions struct {
	UnpackDir  string
	SchemaFile string
}

func Convert(options ConvertOptions) {
	unpackDir := options.UnpackDir
	schemaFile := options.SchemaFile
	tables := make([]string, 0)
	tables = append(tables,
		"baseitemtypes",
		"belttypes",
		"characterpaneldescriptionmodes",
		"colours",
		"costtypes",
		"currencyexchange",
		"currencyexchangecategories",
		"currencyitems",
		"essences",
		"flasks",
		"flavourtext",
		"gameconstants",
		"grantedeffectlabels",
		"grantedeffectqualitystats",
		"grantedeffects",
		"grantedeffectsperlevel",
		"grantedeffectstatsets",
		"grantedeffectstatsetsperlevel",
		"itemclasscategories",
		"itemclasses",
		"itemframetype",
		"iteminherentskills",
		"itemspirit",
		"itemvisualidentity",
		"keywordpopups",
		"modfamily",
		"mods",
		"modsellpricetypes",
		"modtype",
		"passiveskillstatcategories",
		"questitems",
		"rarity",
		"stats",
		"statsaffectinggeneration",
		"statsfromskillstats",
		"statvisuals",
		"tags",
		"craftingitemclasscategories",
		"words",
	)
	// tables = []string{"words"}
	// slog.SetLogLoggerLevel(slog.LevelDebug)
	err := datc64.ConvertData(datc64.ConvertOptions{
		SchemaFile: schemaFile,
		DataDir:    path.Join(unpackDir, "data"),
		Tables:     tables,
		Handler:    writeJsonHandler,
		// MaxRows:    1,
	})

	if err != nil {
		slog.Error(fmt.Sprintf("Error generating types: %v", err))
	}
}

func writeJsonHandler(data *datc64.ConvertedData) error {
	outFile := strings.ToLower(path.Join(path.Dir(data.File), data.Schema.Name+".json"))
	outData, err := json.MarshalIndent(data.Rows, "", "\t")
	if err != nil {
		slog.Error("Error converting data", "err", err)
		return nil
	}
	os.WriteFile(outFile, outData, 0644)
	slog.Info(fmt.Sprintf("  Write %s", outFile))
	return nil
}

// var writeSqlTemplate = template.Must(template.New("sql").Parse(`
// CREATE TABLE {{ .Schema.Name }} IF NOT EXISTS (
// )
// `))

// func writeSqlHandler(data *datc64.ConvertedData) error {
// 	outFile := strings.ToLower(path.Join(path.Dir(data.File), data.Schema.Name+".sql"))
// 	file, err := os.OpenFile(outFile, os.O_CREATE|os.O_WRONLY, 0644)
// 	if err != nil {
// 		log.Printf("Error opening file: %v", err)
// 		return nil
// 	}
// 	defer file.Close()
// 	err = writeSqlTemplate.Execute(file, data)
// 	if err != nil {
// 		log.Printf("Error writing sql: %v", err)
// 	}
// 	return nil
// }

// func getSqliteHandler(dbFile string) datc64.ConvertTableHandler {
// 	if _, err := os.Stat(dbFile); err == nil {
// 		os.Remove(dbFile)
// 	}
// 	log.Printf("  [SQLITE] open db %s", dbFile)
// 	_, err := sql.Open("sqlite3", dbFile)
// 	if err != nil {
// 		panic(err)
// 	}
// 	log.Printf("  [SQLITE] OK")
// 	return func(data *datc64.ConvertedData) error {
// 		return nil
// 	}
// }

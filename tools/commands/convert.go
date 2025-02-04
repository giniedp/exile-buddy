package commands

import (
	"exile-buddy/tools/commands/converter"
	"exile-buddy/tools/file-formats/datc64"
	"exile-buddy/tools/utils"
	"fmt"
	"log/slog"
	"os"
	"path"

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
		OutJsonDir: utils.GetEnvOutputJsonDir(),
		OutSqlDir:  utils.GetEnvOutputSqlDir(),
		OutDbDir:   utils.GetEnvOutputDatabaseDir(),
		OutTsDir:   utils.GetEnvOutputTypescriptDir(),
		OutArtDir:  utils.GetEnvOutputArtDir(),
		SchemaFile: path.Join(utils.GetEnvWorkDir(), "tools/schema.json"),
	})
}

type ConvertOptions struct {
	UnpackDir  string
	SchemaFile string
	OutJsonDir string
	OutSqlDir  string
	OutDbDir   string
	OutTsDir   string
	OutArtDir  string
}

func Convert(options ConvertOptions) {
	unpackDir := options.UnpackDir
	schemaFile := options.SchemaFile
	tables := make([]string, 0)
	tables = append(tables,
		"achievementitemrewards",
		"achievementitems",
		"achievements",
		"achievementsetrewards",
		"achievementsetsdisplay",
		"armourtypes",
		"attributerequirements",
		"baseitemtypes",
		"belttypes",
		"characterpaneldescriptionmodes",
		"colours",
		"costtypes",
		"craftingitemclasscategories",
		"currencyexchange",
		"currencyexchangecategories",
		"currencyitems",
		"delvecraftingmodifiers",
		"essences",
		"essences",
		"expeditioncurrency",
		"flasks",
		"flavourtext",
		"gameconstants",
		"grantedeffectlabels",
		"grantedeffectqualitystats",
		"grantedeffects",
		"grantedeffectsperlevel",
		"grantedeffectstatsets",
		"grantedeffectstatsetsperlevel",
		"heistobjectives",
		"itemclasscategories",
		"itemclasses",
		"itemframetype",
		"iteminherentskills",
		"iteminherentskills",
		"itemisedvisualeffect",
		"itemspirit",
		"itemspirit",
		"itemvisualidentity",
		"keywordpopups",
		"melee",
		"modfamily",
		"mods",
		"modsellpricetypes",
		"modtype",
		"passiveskillstatcategories",
		"questitems",
		"rarity",
		"scoutingreports",
		"shieldtypes",
		"skillgems",
		"soulcores",
		"stats",
		"statsaffectinggeneration",
		"statsfromskillstats",
		"statvisuals",
		"tags",
		"uncutgemadditionaltiers",
		"uncutgemtiers",
		"uniquestashlayout",
		"weapontypes",
		"words",
		"npcportraits",
		"npcs",
	)
	// tables = []string{"npcs", "npcportraits"}
	// slog.SetLogLoggerLevel(slog.LevelDebug)

	version, err := os.ReadFile(path.Join(unpackDir, "version"))
	if err != nil {
		slog.Error(fmt.Sprintf("%v", err))
		return
	}
	err = os.WriteFile(path.Join(options.OutDbDir, "poe2.db.version"), []byte(version), 0644)
	if err != nil {
		slog.Error(fmt.Sprintf("%v", err))
		return
	}

	err = datc64.ConvertData(datc64.ConvertOptions{
		SchemaFile: schemaFile,
		DataDir:    path.Join(unpackDir, "data"),
		Tables:     tables,
		Handler: converter.NewConvertList(
			// HINT: image converter has side effect and must be the first in the list
			//       resolves image path and writes back to row data
			converter.ToWebp(unpackDir, options.OutArtDir),
			converter.ToSql(options.OutSqlDir),
			converter.ToJson(options.OutJsonDir),
			// converter.ToTs(options.OutTsDir),
			converter.ToDb(path.Join(options.OutDbDir, "poe2.db")),
		),
		// MaxRows:    1,
	})

	if err != nil {
		slog.Error(fmt.Sprintf("%v", err))
	}
}

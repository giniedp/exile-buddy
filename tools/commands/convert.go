package commands

import (
	"database/sql"
	"encoding/json"
	"exile-buddy/tools/file-formats/datc64"
	"exile-buddy/tools/utils"
	"fmt"
	"log/slog"
	"os"
	"os/exec"
	"path"
	"strings"
	"sync"

	_ "github.com/mattn/go-sqlite3"
	"github.com/schollz/progressbar/v3"
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
		OUtDbDir:   utils.GetEnvOutputDatabaseDir(),
		OutTsDir:   utils.GetEnvOutputTypescriptDir(),
		SchemaFile: path.Join(utils.GetEnvWorkDir(), "tools/schema.json"),
	})
}

type ConvertOptions struct {
	UnpackDir  string
	SchemaFile string
	OutJsonDir string
	OutSqlDir  string
	OUtDbDir   string
	OutTsDir   string
}

func Convert(options ConvertOptions) {
	unpackDir := options.UnpackDir
	schemaFile := options.SchemaFile
	tables := make([]string, 0)
	tables = append(tables,
		"armourtypes",
		"baseitemtypes",
		"belttypes",
		"characterpaneldescriptionmodes",
		"colours",
		"costtypes",
		"craftingitemclasscategories",
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
		"words",
		"weapontypes",
		"shieldtypes",
		"skillgems",
		"attributerequirements",
		"iteminherentskills",
		"itemspirit",
		"soulcores",
		"uncutgemadditionaltiers",
		"uncutgemtiers",
		"essences",
		"delvecraftingmodifiers",
		"heistobjectives",
		"expeditioncurrency",
		"scoutingreports",
		"itemisedvisualeffect",
		"uniquestashlayout",
	)
	// tables = []string{"skillgems"}
	// slog.SetLogLoggerLevel(slog.LevelDebug)
	images := make([]string, 0)
	err := datc64.ConvertData(datc64.ConvertOptions{
		SchemaFile: schemaFile,
		DataDir:    path.Join(unpackDir, "data"),
		Tables:     tables,
		Handler: multiplexHandler(
			getSqlHandler(options.OutSqlDir),
			getJsonHandler(options.OutJsonDir),
			getTypescriptHandler(options.OutTsDir),
			getDBHandler(path.Join(options.OUtDbDir, "poe2.db")),
			getImageHandler(unpackDir, &images),
		),
		// MaxRows:    1,
	})

	if err != nil {
		slog.Error(fmt.Sprintf("Error generating types: %v", err))
	}
	convertImages(unpackDir, images, utils.GetEnvOutputArtDir())
}

func multiplexHandler(handlers ...datc64.ConvertTableHandler) datc64.ConvertTableHandler {
	return func(data *datc64.ConvertedData) error {
		for _, handler := range handlers {
			if err := handler(data); err != nil {
				return err
			}
		}
		return nil
	}
}

func getJsonHandler(outDir string) datc64.ConvertTableHandler {
	if stat, err := os.Stat(outDir); err != nil || !stat.IsDir() {
		os.MkdirAll(outDir, 0755)
	}
	return func(data *datc64.ConvertedData) error {
		outFile := strings.ToLower(path.Join(outDir, data.Schema.Name+".json"))
		outData, err := json.MarshalIndent(data.Rows, "", "\t")
		if err != nil {
			slog.Error("Error converting data", "err", err)
			return nil
		}
		os.WriteFile(outFile, outData, 0644)
		slog.Info(fmt.Sprintf("  Write %s", outFile))
		return nil
	}
}

func getTypescriptHandler(outDir string) datc64.ConvertTableHandler {
	if stat, err := os.Stat(outDir); err != nil || !stat.IsDir() {
		os.MkdirAll(outDir, 0755)
	}
	return func(data *datc64.ConvertedData) error {
		outFile := strings.ToLower(path.Join(outDir, data.Schema.Name+".ts"))
		file, err := os.OpenFile(outFile, os.O_CREATE|os.O_WRONLY|os.O_TRUNC, 0644)
		if err != nil {
			slog.Warn(fmt.Sprintf("Error opening file: %v", err))
			return nil
		}
		defer file.Close()

		stmt, err := data.Schema.ToTypescript()
		if err != nil {
			slog.Warn(fmt.Sprintf("Error converting data: %v", err))
			return nil
		}
		_, err = file.Write([]byte(stmt))
		if err != nil {
			slog.Warn(fmt.Sprintf("Error writing data: %v", err))
			return nil
		}
		slog.Info(fmt.Sprintf("  Write %s", outFile))
		return nil
	}
}

func getSqlHandler(outDir string) datc64.ConvertTableHandler {
	if stat, err := os.Stat(outDir); err != nil || !stat.IsDir() {
		os.MkdirAll(outDir, 0755)
	}
	return func(data *datc64.ConvertedData) error {
		outFile := strings.ToLower(path.Join(outDir, data.Schema.Name+".sql"))
		file, err := os.OpenFile(outFile, os.O_CREATE|os.O_WRONLY|os.O_TRUNC, 0644)
		if err != nil {
			slog.Warn(fmt.Sprintf("Error opening file: %v", err))
			return nil
		}
		defer file.Close()

		stmt, err := data.Schema.ToSqlStatement(data.Rows...)
		if err != nil {
			slog.Warn(fmt.Sprintf("Error converting data: %v", err))
			return nil
		}
		_, err = file.Write([]byte(stmt))
		if err != nil {
			slog.Warn(fmt.Sprintf("Error writing data: %v", err))
			return nil
		}
		slog.Info(fmt.Sprintf("  Write %s", outFile))
		return nil
	}
}

func getDBHandler(dbFile string) datc64.ConvertTableHandler {
	outDir := path.Dir(dbFile)
	if stat, err := os.Stat(outDir); err != nil || !stat.IsDir() {
		os.MkdirAll(outDir, 0755)
	}

	if _, err := os.Stat(dbFile); err == nil {
		os.Remove(dbFile)
	}
	slog.Info(fmt.Sprintf("open db %s", dbFile))
	db, err := sql.Open("sqlite3", dbFile)
	if err != nil {
		panic(err)
	}
	return func(data *datc64.ConvertedData) error {
		stmt, err := data.Schema.ToSqlStatement(data.Rows...)
		if err != nil {
			slog.Warn(fmt.Sprintf("Error converting data: %v", err))
			return nil
		}
		_, err = db.Exec(stmt)
		if err != nil {
			slog.Warn(fmt.Sprintf("Error executing statement: %v", err))
		}
		return nil
	}
}

func getImageHandler(unpackDir string, out *[]string) datc64.ConvertTableHandler {
	return func(data *datc64.ConvertedData) error {
		for _, row := range data.Rows {
			for _, value := range row {
				v, ok := value.(string)
				if !ok {
					continue
				}
				if path, ok := getTexturePath(unpackDir, v); ok {
					*out = append(*out, path)
				}
			}
		}
		return nil
	}
}

func getTexturePath(unpackDir string, filePath string) (string, bool) {
	filePath = strings.ToLower(filePath)
	if !strings.HasPrefix(filePath, "art/") {
		return "", false
	}
	ddsPath := strings.TrimSuffix(filePath, path.Ext(filePath)) + ".dds"
	if stat, err := os.Stat(path.Join(unpackDir, ddsPath)); err == nil && !stat.IsDir() {
		return ddsPath, true
	}
	return "", false
}

type ConvertImageJob struct {
	UnpackDir string
	ImageFile string
	OutputDir string
}

func convertImages(unpackDir string, images []string, outDir string) {
	workerCount := 10
	bar := progressbar.Default(int64(len(images)), "Convert Images")
	progressbar.OptionSetMaxDetailRow(5)(bar)
	wg := sync.WaitGroup{}
	wg.Add(workerCount)

	jobChannel := make(chan *ConvertImageJob)
	for i := 0; i < workerCount; i++ {
		go startConvertImageWorker(&wg, jobChannel, bar)
	}
	for _, entry := range images {
		jobChannel <- &ConvertImageJob{
			UnpackDir: unpackDir,
			ImageFile: entry,
			OutputDir: outDir,
		}
	}
	close(jobChannel)
	wg.Wait()
	bar.Close()
}

func startConvertImageWorker(wg *sync.WaitGroup, jobs <-chan *ConvertImageJob, bar *progressbar.ProgressBar) {
	defer wg.Done()
	for job := range jobs {
		bar.AddDetail(job.ImageFile)

		ddsFile := path.Join(job.UnpackDir, job.ImageFile)
		pngFile := strings.TrimSuffix(ddsFile, path.Ext(ddsFile)) + ".png"
		webpFile := path.Join(job.OutputDir, job.ImageFile)
		webpFile = strings.TrimSuffix(webpFile, path.Ext(webpFile)) + ".webp"

		if _, err := os.Stat(webpFile); err == nil {
			bar.Add(1)
			continue
		}

		// Convert dds to png
		if err := ddsToPng(ddsFile); err != nil {
			slog.Error(fmt.Sprintf("Error converting dds to png: %v", err))
			bar.Add(1)
			continue
		}
		if err := pngToWebp(pngFile, webpFile); err != nil {
			slog.Error(fmt.Sprintf("Error converting png to webp: %v", err))
			bar.Add(1)
			continue
		}
		bar.Add(1)
	}
}

func ddsToPng(ddsFile string) error {
	//fmt.Println("./libs/texconv.exe", "-ft", "png", "-o", path.Dir(ddsFile), ddsFile)
	cmd := exec.Command("./libs/texconv.exe", "-ft", "png", "-o", path.Dir(ddsFile), ddsFile)
	cmd.CombinedOutput()
	// fmt.Println(string(out))
	return nil
}

func pngToWebp(input string, output string) error {
	outDir := path.Dir(output)
	if stat, err := os.Stat(outDir); err != nil || !stat.IsDir() {
		os.MkdirAll(outDir, 0755)
	}
	// fmt.Println("./libs/cwebp.exe", "-q", "60", input, "-o", output)
	cmd := exec.Command("./libs/cwebp.exe", "-q", "60", input, "-o", output)
	cmd.CombinedOutput()
	// fmt.Println(string(out))
	return nil
}

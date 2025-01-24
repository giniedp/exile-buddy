package commands

import (
	"exile-buddy/tools/file-formats/client"
	"exile-buddy/tools/file-formats/index"
	"exile-buddy/tools/utils"
	"exile-buddy/tools/utils/oodle"
	"math"
	"os"
	"path"
	"strings"

	"github.com/spf13/cobra"
)

var (
	cmdUnpack = &cobra.Command{
		Use:   "unpack",
		Short: "unpacks the game data",
		Long:  ``,
		Run:   runUnpack,
	}
)

func runUnpack(ccmd *cobra.Command, args []string) {
	Unpack(UnpackOptions{
		WorkDir:     utils.GetEnvWorkDir(),
		GameDir:     utils.GetEnvGameDir(),
		UnpackDir:   utils.GetEnvUnpackDir(),
		WorkerCount: 10,
	})
}

type UnpackOptions struct {
	WorkDir     string
	GameDir     string
	UnpackDir   string
	WorkerCount int
}

func Unpack(options UnpackOptions) {
	bundleDir := path.Join(options.GameDir, "Bundles2")
	indexFile := path.Join(bundleDir, "_.index.bin")
	lib := oodle.New()
	idx := utils.Must(index.Read(indexFile, lib))
	version, _ := client.ExtractClientVersion(path.Join(options.GameDir, "PathOfExileSteam.exe"))
	os.WriteFile(path.Join(options.UnpackDir, "version"), []byte(version), 0644)
	idx.Extract(index.ExtractOptions{
		InputDir:  bundleDir,
		OutputDir: options.UnpackDir,
		Oodle:     lib,
		Include: func(s string) bool {
			return !(strings.Contains(s, "shader") && strings.Contains(s, "cache"))
		},
		WorkerCount: int(math.Max(float64(options.WorkerCount), 1)),
	})
}

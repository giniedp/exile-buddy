package commands

import (
	"fmt"
	"log/slog"
	"path"
	"strings"

	"github.com/goreleaser/fileglob"

	"github.com/spf13/cobra"
)

var (
	cmdPng2Webp = &cobra.Command{
		Use:   "png2webp",
		Short: "converts multiple png images to webp",
		Long:  ``,
		Run:   runPngToWebp,
	}
)

func runPngToWebp(ccmd *cobra.Command, args []string) {
	Png2Webp(Png2WebpOptions{
		FilesGlob:   "apps/web/static/**/*.png",
		WorkerCount: 10,
	})
}

type Png2WebpOptions struct {
	FilesGlob   string
	WorkerCount int
}

func Png2Webp(options Png2WebpOptions) {
	files, err := fileglob.Glob(options.FilesGlob)
	if err != nil {
		panic(err)
	}
	for _, input := range files {
		output := strings.TrimSuffix(input, path.Ext(input)) + ".webp"
		if err := pngToWebp(input, output); err != nil {
			slog.Error(fmt.Sprintf("%v", err))
		} else {
			slog.Info(fmt.Sprintf("converted %s to %s", input, output))
		}
	}
}

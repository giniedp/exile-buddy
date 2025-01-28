package main

import (
	"exile-buddy/tools/commands"
	"exile-buddy/tools/utils"
	"log"
	"log/slog"
	"os"
	"time"

	"github.com/lmittmann/tint"
	"github.com/mattn/go-isatty"
)

func init() {
	w := os.Stderr
	slog.SetDefault(slog.New(
		tint.NewHandler(w, &tint.Options{
			TimeFormat: time.TimeOnly,
			NoColor:    !isatty.IsTerminal(w.Fd()),
		}),
	))
}

func main() {
	utils.InitEnvFile()
	err := commands.Execute()
	if err != nil && err.Error() != "" {
		log.Println(err)
	}

}

package commands

import (
	"exile-buddy/tools/utils"
	"fmt"
	"log/slog"
	"os"
	"path"
	"strings"

	"github.com/goreleaser/fileglob"
	"github.com/spf13/cobra"
)

var (
	cmdSearch = &cobra.Command{
		Use:   "search",
		Short: "searches through datc64 data for a fiven string",
		Long:  ``,
		Run:   runSearch,
	}
)

func runSearch(ccmd *cobra.Command, args []string) {
	Search(SearchOptions{
		UnpackDir: utils.GetEnvUnpackDir(),
		Needle:    strings.Join(args, " "),
	})
}

type SearchOptions struct {
	UnpackDir string
	Needle    string
}

func Search(options SearchOptions) {
	fmt.Printf("searching for '%s' in %s\n", options.Needle, options.UnpackDir)

	files, err := fileglob.Glob(path.Join(options.UnpackDir, "data/*.*"))
	if err != nil {
		panic(err)
	}
	needle := strings.ToLower(options.Needle)
	if needle == "" {
		slog.Error("search string is empty")
		return
	}
	slog.Info(fmt.Sprintf("searching for: %s", needle))

	needle8 := []byte(needle)
	needle16 := make([]byte, len(needle8)*2)
	for i, b := range needle8 {
		needle16[i*2] = b
		needle16[i*2+1] = 0
	}

	for _, input := range files {
		// slog.Info(input)
		data, err := os.ReadFile(input)
		if err != nil {
			slog.Error(fmt.Sprintf("%v", err))
			continue
		}
		text := strings.ToLower(string(data))
		if strings.Contains(text, string(needle8)) {
			slog.Info(fmt.Sprintf("found %s", input))
			continue
		}
		if strings.Contains(text, string(needle16)) {
			slog.Info(fmt.Sprintf("found %s", input))
			continue
		}
	}

	// unpackDir := options.UnpackDir
	// needle := options.Needle

	// if err != nil {
	// 	slog.Error(fmt.Sprintf("%v", err))
	// }
}

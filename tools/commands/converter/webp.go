package converter

import (
	"exile-buddy/tools/file-formats/datc64"
	"fmt"
	"log/slog"
	"os"
	"os/exec"
	"path"
	"strings"
	"sync"

	"github.com/schollz/progressbar/v3"
)

type ConvertToWebp struct {
	UnpacKDir string
	OutDir    string
	images    []string
}

func (c *ConvertToWebp) Before(schema *datc64.Schema, options datc64.ConvertOptions) error {
	c.images = make([]string, 0)
	return nil
}

func (c *ConvertToWebp) Convert(data *datc64.ConvertedData) error {
	for _, row := range data.Rows {
		for _, value := range row {
			v, ok := value.(string)
			if !ok {
				continue
			}
			if path, ok := getTexturePath(c.UnpacKDir, v); ok {
				c.images = append(c.images, path)
			}
		}
	}
	return nil
}

func (c *ConvertToWebp) After() error {
	convertImages(c.UnpacKDir, c.images, c.OutDir)
	return nil
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
		if err := DdsToPng(ddsFile); err != nil {
			slog.Error(fmt.Sprintf("Error converting dds to png: %v", err))
			bar.Add(1)
			continue
		}
		if err := PngToWebp(pngFile, webpFile); err != nil {
			slog.Error(fmt.Sprintf("Error converting png to webp: %v", err))
			bar.Add(1)
			continue
		}
		bar.Add(1)
	}
}

func DdsToPng(ddsFile string) error {
	//fmt.Println("./libs/texconv.exe", "-ft", "png", "-o", path.Dir(ddsFile), ddsFile)
	cmd := exec.Command("./libs/texconv.exe", "-ft", "png", "-o", path.Dir(ddsFile), ddsFile)
	cmd.CombinedOutput()
	// fmt.Println(string(out))
	return nil
}

func PngToWebp(input string, output string) error {
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

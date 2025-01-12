package index

import (
	"exile-buddy/tools/file-formats/bundle"
	"exile-buddy/tools/utils"
	"exile-buddy/tools/utils/oodle"
	"exile-buddy/tools/utils/reader"
	"io/fs"
	"log"
	"os"
	"path"
	"sync"

	progressbar "github.com/schollz/progressbar/v3"
)

type Catalog struct {
	Bundles []Bundle
	Files   []File
}

type Bundle struct {
	Path string
	Size uint32
}

type File struct {
	Hash   uint64
	Bundle uint32
	Offset uint32
	Size   uint32
	Path   string
}

type Section struct {
	Hash          uint64
	Offset        uint32
	Size          uint32
	RecursiveSize uint32
}

func Read(file string, lib oodle.Library) (res *Catalog, err error) {
	data, err := bundle.ReadAndInflate(file, lib)
	if err != nil {
		return nil, err
	}
	return Parse(data, lib)
}

func Parse(data []byte, lib oodle.Library) (res *Catalog, err error) {
	go func() {
		err = utils.ToErr(recover(), "Filed to parse index")
	}()

	r := reader.NewLE(data)
	bundleCount := r.MustReadUint32()
	bundles := make([]Bundle, bundleCount)
	for i := 0; i < int(bundleCount); i++ {
		l := r.MustReadUint32()
		p := string(r.MustReadBytes(int(l)))
		s := r.MustReadUint32()
		bundles[i] = Bundle{p, s}
	}

	fileCount := r.MustReadUint32()
	filesMap := make(map[uint64]*File)
	files := make([]File, fileCount)

	for i := 0; i < int(fileCount); i++ {
		h := r.MustReadUint64()
		b := r.MustReadUint32()
		o := r.MustReadUint32()
		s := r.MustReadUint32()

		files[i] = File{h, b, o, s, ""}
		filesMap[h] = &files[i]
	}

	sectionCount := r.MustReadUint32()
	sections := make([]Section, sectionCount)
	for i := 0; i < int(sectionCount); i++ {
		h := r.MustReadUint64()
		o := r.MustReadUint32()
		s := r.MustReadUint32()
		rs := r.MustReadUint32()
		sections[i] = Section{h, o, s, rs}
	}

	pathDataRaw := utils.Must(r.ReadBytes(len(data) - r.Pos()))
	pathData := utils.Must(bundle.ParseAndInflate(pathDataRaw, lib))
	pr := reader.NewLE(pathData)

	tmp := make([]string, 0)
	for _, section := range sections {
		pr.SeekAbsolute(int(section.Offset))
		phase := false
		for pr.Pos() < int(section.Offset+section.Size) {
			token := pr.MustReadInt32()
			if token == 0 {
				phase = !phase
				if phase {
					tmp = tmp[:0]
				}
				continue
			}

			index := token - 1
			value := string(utils.Must(pr.ReadUntilByte(0)))

			if int(index) < len(tmp) {
				value = tmp[index] + value
			}
			if phase {
				tmp = append(tmp, value)
				continue
			}
			hash := utils.MurmurHash64A([]byte(value))
			file := filesMap[hash]
			if file == nil {
				log.Printf("File not found: %#v %#v ", hash, value)
			} else {
				file.Path = value
			}
		}
	}

	for _, file := range files {
		if file.Path == "" {
			log.Printf("File without path: %#v", file.Hash)
		}
	}

	return &Catalog{bundles, files}, nil
}

type Selection struct {
	cat     *Catalog
	entries []*SelectionEntry
	size    uint64
	count   int
}

type SelectionEntry struct {
	bundle int
	files  []int
}

func (b *Catalog) Select(predicate func(path string) bool) Selection {
	lookup := make(map[uint32]*SelectionEntry)
	res := Selection{
		cat:     b,
		entries: make([]*SelectionEntry, 0),
		size:    0,
	}
	for i, file := range b.Files {
		if predicate != nil && !predicate(file.Path) {
			continue
		}
		entry, ok := lookup[file.Bundle]
		if !ok {
			entry = &SelectionEntry{
				bundle: int(file.Bundle),
				files:  make([]int, 0),
			}
			lookup[file.Bundle] = entry
			res.entries = append(res.entries, entry)
		}
		entry.files = append(entry.files, i)
		res.size += uint64(file.Size)
		res.count += 1
	}
	return res
}

type ExtractOptions struct {
	Oodle       oodle.Library
	InputDir    string
	OutputDir   string
	Include     func(string) bool
	WorkerCount int
}

func (b *Catalog) Extract(options ExtractOptions) {
	sel := b.Select(options.Include)
	bar := progressbar.DefaultBytes(int64(sel.size), "Extracting files")
	progressbar.OptionSetMaxDetailRow(5)(bar)
	progressbar.OptionShowIts()(bar)
	wg := sync.WaitGroup{}
	wg.Add(options.WorkerCount)

	jobChannel := make(chan *extractJob)
	for i := 0; i < options.WorkerCount; i++ {
		go extractBundleWorker(&wg, jobChannel, bar)
	}

	for _, entry := range sel.entries {
		jobChannel <- &extractJob{
			cat:       b,
			bundle:    entry.bundle,
			files:     entry.files,
			inputDir:  options.InputDir,
			outputDir: options.OutputDir,
			lib:       options.Oodle,
		}
	}
	close(jobChannel)
	wg.Wait()
	bar.Close()
}

type extractJob struct {
	cat       *Catalog
	bundle    int
	files     []int
	inputDir  string
	outputDir string
	lib       oodle.Library
}

func extractBundleWorker(wg *sync.WaitGroup, jobs <-chan *extractJob, bar *progressbar.ProgressBar) {
	defer wg.Done()

	for job := range jobs {
		if len(job.files) == 0 {
			continue
		}
		bPath := path.Join(job.inputDir, job.cat.Bundles[job.bundle].Path+".bundle.bin")
		bData, err := bundle.ReadAndInflate(bPath, job.lib)
		if err != nil {
			log.Printf("Failed to read bundle: %s", bPath)
			continue
		}
		r := reader.NewLE(bData)
		for _, fileIndex := range job.files {
			file := job.cat.Files[fileIndex]
			if file.Path == "" {
				continue
			}
			bar.AddDetail(file.Path)

			r.SeekAbsolute(int(file.Offset))
			data, err := r.ReadBytes(int(file.Size))
			if err != nil {
				log.Printf("Failed to read file: %s", file.Path)
				continue
			}

			outPath := path.Join(job.outputDir, file.Path)
			outDir := path.Dir(outPath)
			if _, err := os.Stat(outDir); os.IsNotExist(err) {
				os.MkdirAll(outDir, fs.ModePerm)
			}
			if err := os.WriteFile(outPath, data, fs.ModePerm); err != nil {
				log.Printf("Failed to write file: %s", outPath)
			}

			bar.Add(int(file.Size))
		}
	}
}

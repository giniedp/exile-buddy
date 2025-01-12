package oodle

import (
	"errors"
	"log"
	"os"
	"path"
	"path/filepath"
	"unsafe"

	"github.com/ebitengine/purego"
	"golang.org/x/sys/windows"
)

func New() Library {
	const libName = "oo2core_9_win64.dll"
	libDir, _ := os.Getwd()
	if dir := os.Getenv("OODLE_PATH"); dir != "" {
		if path.IsAbs(dir) {
			libDir = dir
		} else {
			libDir = filepath.Join(libDir, dir)
		}
	}
	return Load(filepath.Join(libDir, libName))
}

func Load(libPath string) Library {
	res := &library{}
	if handle, err := windows.LoadLibrary(libPath); err != nil {
		log.Println("Failed to load Oodle library:", err)
	} else {
		purego.RegisterLibFunc(&res.decompress, uintptr(handle), "OodleLZ_Decompress")
	}
	return res
}

type Library interface {
	Decompress(input []byte, inSize int, output []byte, outSize int) (int, error)
}

type library struct {
	decompress func(unsafe.Pointer, int, unsafe.Pointer, int, uintptr, uintptr, uintptr, uintptr, uintptr, uintptr, uintptr, uintptr, uintptr, uintptr) uintptr
}

func (o *library) Decompress(input []byte, inSize int, output []byte, outSize int) (int, error) {
	if o.decompress == nil {
		return 0, errors.New("oodle library not loaded")
	}

	r1 := o.decompress(
		unsafe.Pointer(&input[0]),
		inSize,
		unsafe.Pointer(&output[0]),
		outSize,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		3,
	)

	return int(r1), nil
}

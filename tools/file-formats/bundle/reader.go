package bundle

import (
	"exile-buddy/tools/utils/oodle"
	"exile-buddy/tools/utils/reader"
	"fmt"
	"os"
)

type File struct {
	//uncompressedSize uint32
	//blockSize uint32
	//headerSize uint32
	encoding         uint32
	field1           uint32
	uncompressedSize uint64
	compressedSize   uint64
	blockCount       uint32
	blockGranularity uint32
	field6           [4]uint32
	blockSizes       []uint32
	blocks           [][]byte
}

func ReadAndInflate(file string, lib oodle.Library) ([]byte, error) {
	f, err := Read(file)
	if err != nil {
		return nil, err
	}
	return f.Inflate(lib)
}

func ParseAndInflate(data []byte, lib oodle.Library) ([]byte, error) {
	f, err := Parse(data)
	if err != nil {
		return nil, err
	}
	return f.Inflate(lib)
}

func Read(file string) (res *File, err error) {
	data, err := os.ReadFile(file)
	if err != nil {
		return nil, err
	}
	return Parse(data)
}

func Parse(data []byte) (f *File, err error) {
	defer func() {
		if r := recover(); r != nil {
			f = nil
			switch x := r.(type) {
			case error:
				err = x
			default:
				err = fmt.Errorf("%v", r)
			}
		}
	}()

	r := reader.NewLE(data)

	r.MustReadUint32() // uncompressedSize
	r.MustReadUint32() // blockSize
	r.MustReadUint32() // headerSize

	f = &File{}
	f.encoding = r.MustReadUint32()
	f.field1 = r.MustReadUint32()
	f.uncompressedSize = r.MustReadUint64()
	f.compressedSize = r.MustReadUint64()
	f.blockCount = r.MustReadUint32()
	f.blockGranularity = r.MustReadUint32()
	f.field6 = [4]uint32{r.MustReadUint32(), r.MustReadUint32(), r.MustReadUint32(), r.MustReadUint32()}
	f.blockSizes = make([]uint32, f.blockCount)
	for i := range f.blockSizes {
		f.blockSizes[i] = r.MustReadUint32()
	}
	f.blocks = make([][]byte, f.blockCount)
	for i := range f.blocks {
		f.blocks[i] = r.MustReadBytes(int(f.blockSizes[i]))
	}

	return f, nil
}

func (f *File) Inflate(lib oodle.Library) (data []byte, err error) {
	data = make([]byte, int(f.uncompressedSize))
	for i := 0; i < int(f.blockCount); i++ {
		blockData, err := f.inflateBlock(lib, i)
		if err != nil {
			return nil, err
		}
		copy(data[i*int(f.blockGranularity):], blockData)
	}
	return data, nil
}

func (f *File) inflateBlock(lib oodle.Library, block int) (data []byte, err error) {
	data = make([]byte, int(f.blockGranularity))
	size := int(f.blockGranularity)
	if block == int(f.blockCount)-1 {
		// last block may be smaller than blockGranularity
		size = int(f.uncompressedSize) - block*int(f.blockGranularity)
	}
	_, err = lib.Decompress(f.blocks[block], int(f.blockSizes[block]), data, size)
	return data, err
}

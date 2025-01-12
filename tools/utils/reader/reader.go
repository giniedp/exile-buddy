package reader

import (
	"encoding/binary"
	"errors"
	"io"
	"os"
)

type Reader struct {
	data  []byte
	order binary.ByteOrder
	pos   int
}

func NewLE(data []byte) *Reader {
	return New(data, binary.LittleEndian)
}

func FromFileLE(file string) (*Reader, error) {
	return FromFile(file, binary.LittleEndian)
}

func New(data []byte, order binary.ByteOrder) *Reader {
	return &Reader{
		data:  data,
		order: order,
		pos:   0,
	}
}

func FromFile(file string, order binary.ByteOrder) (*Reader, error) {
	data, err := os.ReadFile(file)
	if err != nil {
		return nil, err
	}
	return New(data, order), nil
}

func (r *Reader) Pos() int {
	return r.pos
}

func (r *Reader) SeekRelative(offset int) error {
	r.pos += offset
	if r.pos < 0 || r.pos > len(r.data) {
		err := errors.New("seek out of bounds")
		if r.pos < 0 {
			r.pos = 0
		}
		if r.pos > len(r.data) {
			r.pos = len(r.data)
		}
		return err
	}
	return nil
}

func (r *Reader) SeekAbsolute(pos int) error {
	r.pos = pos
	if r.pos < 0 || r.pos > len(r.data) {
		err := errors.New("seek out of bounds")
		if r.pos < 0 {
			r.pos = 0
		}
		if r.pos > len(r.data) {
			r.pos = len(r.data)
		}
		return err
	}
	return nil
}

func (r *Reader) IsEOF() bool {
	return r.pos >= len(r.data)
}

// func (r *Reader) Peek(n int) ([]byte, error) {
// 	b, ok := r.base.(*bufio.Reader)
// 	if !ok {
// 		return nil, errors.New("reader does not support peek")
// 	}

// 	return b.Peek(n)
// }

func (r *Reader) canRead(n int) bool {
	return r.pos+n <= len(r.data)
}

func (r *Reader) ReadBytes(n int) ([]byte, error) {
	if !r.canRead(n) {
		return nil, io.EOF
	}
	b := r.data[r.pos : r.pos+n]
	r.pos += n
	return b, nil
}

func (r *Reader) ReadUntilByte(b byte) ([]byte, error) {
	i := r.pos
	for i < len(r.data) && r.data[i] != b {
		i++
	}
	s, err := r.ReadBytes(i - r.pos)
	if i < len(r.data) && r.data[i] == b {
		r.pos++
	}
	return s, err
}

// func (r *Reader) ReadAll() ([]byte, error) {
// 	return io.ReadAll(r.base)
// }

// func (r *Reader) ReadBytes(count int64) ([]byte, error) {
// 	buf := make([]byte, count)

// 	_, err := io.ReadFull(r.base, buf)
// 	if err != nil {
// 		return nil, err
// 	}

// 	return buf, nil
// }

func (r *Reader) ReadByte() (byte, error) {
	b, err := r.ReadBytes(1)
	return b[0], err
}

func (r *Reader) ReadInt8() (int8, error) {
	b, err := r.ReadBytes(1)
	return int8(b[0]), err
}

func (r *Reader) ReadUint8() (uint8, error) {
	b, err := r.ReadBytes(1)
	return uint8(b[0]), err
}

func (r *Reader) ReadInt16() (int16, error) {
	b, err := r.ReadBytes(2)
	return int16(r.order.Uint16(b)), err
}

func (r *Reader) ReadUint16() (uint16, error) {
	b, err := r.ReadBytes(2)
	return r.order.Uint16(b), err
}

func (r *Reader) ReadInt32() (int32, error) {
	b, err := r.ReadBytes(4)
	return int32(r.order.Uint32(b)), err
}

func (r *Reader) ReadUint32() (uint32, error) {
	b, err := r.ReadBytes(4)
	return r.order.Uint32(b), err
}

func (r *Reader) ReadInt64() (int64, error) {
	b, err := r.ReadBytes(8)
	return int64(r.order.Uint64(b)), err
}

func (r *Reader) ReadUint64() (uint64, error) {
	b, err := r.ReadBytes(8)
	return r.order.Uint64(b), err
}

func (r *Reader) MustReadBytes(n int) []byte {
	b, err := r.ReadBytes(n)
	if err != nil {
		panic(err)
	}
	return b
}

func (r *Reader) MustReadByte() byte {
	b, err := r.ReadByte()
	if err != nil {
		panic(err)
	}
	return b
}

func (r *Reader) MustReadInt8() int8 {
	b, err := r.ReadInt8()
	if err != nil {
		panic(err)
	}
	return b
}

func (r *Reader) MustReadUint8() uint8 {
	b, err := r.ReadUint8()
	if err != nil {
		panic(err)
	}
	return b
}

func (r *Reader) MustReadInt16() int16 {
	b, err := r.ReadInt16()
	if err != nil {
		panic(err)
	}
	return b
}

func (r *Reader) MustReadUint16() uint16 {
	b, err := r.ReadUint16()
	if err != nil {
		panic(err)
	}
	return b
}

func (r *Reader) MustReadInt32() int32 {
	b, err := r.ReadInt32()
	if err != nil {
		panic(err)
	}
	return b
}

func (r *Reader) MustReadUint32() uint32 {
	b, err := r.ReadUint32()
	if err != nil {
		panic(err)
	}
	return b
}

func (r *Reader) MustReadInt64() int64 {
	b, err := r.ReadInt64()
	if err != nil {
		panic(err)
	}
	return b
}

func (r *Reader) MustReadUint64() uint64 {
	b, err := r.ReadUint64()
	if err != nil {
		panic(err)
	}
	return b
}

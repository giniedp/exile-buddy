package reader

import (
	"encoding/binary"
	"errors"
	"fmt"
	"io"
	"math"
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

func (r *Reader) SeekUntil(fn func(d []byte, p int) bool) int {
	p0 := r.pos
	for r.canRead(1) && !fn(r.data, r.pos) {
		r.pos++
	}
	return r.pos - p0
}

func (r *Reader) SeekUntilSeq(seq []byte) int {
	return r.SeekUntil(func(d []byte, p int) bool {
		for i := 0; i < len(seq); i++ {
			if len(d) <= p+i || d[p+i] != seq[i] {
				return false
			}
		}
		return true
	})
}

func (r *Reader) IsEOF() bool {
	return r.pos >= len(r.data)
}

func (r *Reader) canRead(n int) bool {
	return r.pos+n <= len(r.data)
}

func (r *Reader) ReadBytes(n int) ([]byte, error) {
	if r.IsEOF() {
		return nil, io.EOF
	}
	if !r.canRead(n) {
		return nil, fmt.Errorf("read out of bounds at 0x%#v with %d > %d", r.pos, n, len(r.data)-r.pos)
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

func (r *Reader) ReadByte() (byte, error) {
	if b, err := r.ReadBytes(1); err == nil {
		return b[0], nil
	} else {
		return 0, err
	}
}

func (r *Reader) ReadInt8() (int8, error) {
	if b, err := r.ReadBytes(1); err == nil {
		return int8(b[0]), nil
	} else {
		return 0, err
	}
}

func (r *Reader) ReadUint8() (uint8, error) {
	if b, err := r.ReadBytes(1); err == nil {
		return uint8(b[0]), nil
	} else {
		return 0, err
	}
}

func (r *Reader) ReadInt16() (int16, error) {
	if b, err := r.ReadBytes(2); err == nil {
		return int16(r.order.Uint16(b)), nil
	} else {
		return 0, err
	}
}

func (r *Reader) ReadUint16() (uint16, error) {
	if b, err := r.ReadBytes(2); err == nil {
		return r.order.Uint16(b), nil
	} else {
		return 0, err
	}
}

func (r *Reader) ReadInt32() (int32, error) {
	if b, err := r.ReadBytes(4); err == nil {
		return int32(r.order.Uint32(b)), nil
	} else {
		return 0, err
	}
}

func (r *Reader) ReadUint32() (uint32, error) {
	if b, err := r.ReadBytes(4); err == nil {
		return r.order.Uint32(b), nil
	} else {
		return 0, err
	}
}

func (r *Reader) ReadInt64() (int64, error) {
	if b, err := r.ReadBytes(8); err == nil {
		return int64(r.order.Uint64(b)), nil
	} else {
		return 0, err
	}
}

func (r *Reader) ReadUint64() (uint64, error) {
	if b, err := r.ReadBytes(8); err == nil {
		return r.order.Uint64(b), nil
	} else {
		return 0, err
	}
}

func (r *Reader) ReadFloat32() (float32, error) {
	if b, err := r.ReadBytes(4); err == nil {
		bits := r.order.Uint32(b)
		return math.Float32frombits(bits), nil
	} else {
		return 0, err
	}
}

func (r *Reader) ReadFloat64() (float64, error) {
	if b, err := r.ReadBytes(8); err == nil {
		bits := r.order.Uint64(b)
		return math.Float64frombits(bits), nil
	} else {
		return 0, err
	}
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

func (r *Reader) MustReadFloat32() float32 {
	b, err := r.ReadFloat32()
	if err != nil {
		panic(err)
	}
	return b
}

func (r *Reader) MustReadFloat64() float64 {
	b, err := r.ReadFloat64()
	if err != nil {
		panic(err)
	}
	return b
}

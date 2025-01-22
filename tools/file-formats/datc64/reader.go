package datc64

import (
	"bytes"
	"encoding/binary"
	"exile-buddy/tools/utils"
	"exile-buddy/tools/utils/reader"
	"fmt"
	"log/slog"
	"os"

	"golang.org/x/text/encoding"
	"golang.org/x/text/encoding/unicode"
)

var SEPARATOR = []byte{0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb}
var NULL_TERM = []byte{0x00, 0x00, 0x00, 0x00}

type Reader struct {
	rows     uint32
	stride   int
	fixStart int
	fixData  *reader.Reader
	varStart int
	varData  *reader.Reader
	decoder  *encoding.Decoder
	file     string
}

func Load(file string) *Reader {
	r := &Reader{
		file:     file,
		fixStart: 4,
	}
	data := utils.Must(os.ReadFile(file))
	r.rows = binary.LittleEndian.Uint32(data[:4])
	sep := bytes.Index(data, SEPARATOR)

	fixData := data[:sep] // include row count but seek forward. Easier for debugging.
	r.fixData = reader.NewLE(fixData)
	r.fixData.SeekAbsolute(4) // skip row count
	if r.rows != 0 {
		r.stride = (len(fixData) - 4) / int(r.rows)
	}

	varData := data[sep:] // include separator, offsets are relative to this
	r.varStart = sep
	r.varData = reader.NewLE(varData)
	r.decoder = unicode.UTF16(unicode.LittleEndian, unicode.IgnoreBOM).NewDecoder()
	return r
}

func (r *Reader) ReadRows(t *SchemaTable, maxRows ...int) (rows []map[string]interface{}, err error) {
	defer func() {
		if err = utils.ToErr(recover(), "Failed to read rows"); err != nil {
			slog.Error("Failed to read rows", "err", err)
			err = nil
		}
	}()

	rows = make([]map[string]interface{}, r.rows)
	start := r.fixData.Pos()
	max := 0
	if len(maxRows) > 0 && maxRows[0] > 0 {
		max = maxRows[0]
	}

	for i := 0; i < int(r.rows); i++ {
		pos := start + i*r.stride
		slog.Debug(fmt.Sprintf("-- %d/%d (0x%#v) %s --\n", i, r.rows, pos, t.Name))

		r.fixData.SeekAbsolute(pos)
		rows[i], err = r.readRow(t)
		if rows[i] != nil {
			rows[i]["$index"] = i
		}

		if err != nil {
			slog.Warn("Failed to read row", "err", err)
			err = nil
		}
		if max > 0 && (i+1) >= max {
			slog.Debug(fmt.Sprintf("Reached max rows: %d", maxRows[0]))
			break
		}
	}
	return
}

func (r *Reader) readRow(t *SchemaTable) (row map[string]interface{}, err error) {
	defer func() {
		err = utils.ToErr(recover(), "Failed to read row")
	}()

	row = make(map[string]interface{})
	p0 := r.fixData.Pos()
	for ic, c := range t.Columns {
		name := c.Name
		if name == "" {
			name = fmt.Sprintf("$unknown%02d", ic)
		}
		slog.Debug(fmt.Sprintf("row[%s] 0x%#v %s", name, r.fixData.Pos()-p0, c.Type))

		if c.Array {
			row[name], err = r.readCellArray(&c)
		} else if c.Interval {
			row[name], err = r.readCellInterval(&c)
		} else {
			row[name], err = r.readCell(&c)
		}
		slog.Debug(fmt.Sprintf("  = %+v\n", row[name]))

		if err != nil {
			slog.Warn("Skip rest of row", "err", err)
			return
		}
	}
	return row, nil
}

func (r *Reader) readCellInterval(c *SchemaColumn) (res []interface{}, err error) {
	defer func() {
		err = utils.ToErr(recover(), "Failed to read cell")
	}()
	res = append(res, utils.Must(r.readCell(c)))
	res = append(res, utils.Must(r.readCell(c)))
	return res, nil
}

func (r *Reader) readCell(c *SchemaColumn) (res interface{}, err error) {
	defer func() {
		err = utils.ToErr(recover(), "Failed to read cell")
	}()

	switch c.Type {
	case "i8":
		res = r.fixData.MustReadInt8()
	case "i16":
		res = r.fixData.MustReadInt16()
	case "i32":
		res = r.fixData.MustReadInt32()
	case "u8":
		res = r.fixData.MustReadUint8()
	case "u16":
		res = r.fixData.MustReadUint16()
	case "u32":
		res = r.fixData.MustReadUint32()
	case "f32":
		res = r.fixData.MustReadFloat32()
	case "bool":
		res = r.fixData.MustReadByte() == 1
	case "string":
		r.varData.SeekAbsolute(int(r.fixData.MustReadUint64()))
		res = r.mustReadString()
	case "enumrow":
		res = r.fixData.MustReadUint32()
	case "row":
		ref := r.fixData.MustReadUint64()
		if ref != 0xFEFEFEFEFEFEFEFE {
			res = ref
		}
	case "foreignrow":
		ref := r.fixData.MustReadUint64()
		r.fixData.MustReadUint64() // unused, size?
		if ref != 0xFEFEFEFEFEFEFEFE {
			res = ref
		}
	default:
		panic(fmt.Errorf("type not supported: %v (%s)", c.Type, r.file))
	}
	return
}

func (r *Reader) readCellArray(c *SchemaColumn) (res []interface{}, err error) {
	defer func() {
		err = utils.ToErr(recover(), "Failed to read cell")
	}()

	pos := r.fixData.Pos()
	// count is 64bit but only 32bit is used (oom errors happen if we use uint64)
	count := uint32(r.fixData.MustReadUint64())
	offset := uint32(r.fixData.MustReadUint64())

	slog.Debug(fmt.Sprintf(" 0x%#v Array: count: %d, offset: %d (%#v), type: %s \n", pos, count, offset, offset, c.Type))
	res = make([]interface{}, 0, count)

	err = r.varData.SeekAbsolute(int(offset))
	if err != nil {
		panic(err)
	}

	if c.Type == "string" {
		// for strings, the value indicates where the string (array) ends
		// - including null terminator
		// - starting at end of separator
		r.varData.SeekAbsolute(int(offset) - len(SEPARATOR))
		for i := 0; i < int(count); i++ {
			// seek back to the start of the string
			// - either end of previous null terminator or end of separator
			if r.varData.Pos() < len(SEPARATOR) {
				break
			}
			for {
				r.varData.SeekRelative(-1)
				if r.varData.Pos() < len(SEPARATOR) {
					break
				}
				if bytes.Equal(r.varData.Peek(len(NULL_TERM)), NULL_TERM) {
					// found null terminator, go to its end
					r.varData.SeekRelative(len(NULL_TERM))
					break
				}
			}
		}
		if r.varData.Pos() < len(SEPARATOR) {
			// go to end of separator
			r.varData.SeekAbsolute(len(SEPARATOR))
		}
	}
	for i := 0; i < int(count); i++ {
		switch c.Type {
		case "i8":
			res = append(res, r.varData.MustReadInt8())
		case "i16":
			res = append(res, r.varData.MustReadInt16())
		case "i32":
			res = append(res, r.varData.MustReadInt32())
		case "u8":
			res = append(res, r.varData.MustReadUint8())
		case "u16":
			res = append(res, r.varData.MustReadUint16())
		case "u32":
			res = append(res, r.varData.MustReadUint32())
		case "f32":
			res = append(res, r.varData.MustReadFloat32())
		case "bool":
			res = append(res, r.varData.MustReadByte() == 1)
		case "string":
			res = append(res, r.mustReadString())
		case "enumrow":
			res = append(res, r.varData.MustReadUint32())
		case "row":
			ref := r.varData.MustReadUint64()
			if ref != 0xFEFEFEFEFEFEFEFE {
				res = append(res, ref)
			}
		case "foreignrow":
			ref := r.varData.MustReadUint64()
			r.varData.MustReadUint64() // unused, size?
			if ref != 0xFEFEFEFEFEFEFEFE {
				res = append(res, ref)
			}
		default:
			err = fmt.Errorf("type not supported: %v (%s)", c.Type, r.file)
			return
		}
	}
	return res, nil
}

func (r *Reader) mustReadString() string {
	l := r.varData.MustNextIndex(NULL_TERM)
	// utf16 has 2 bytes per character, from which last may be 0x00
	if l%2 != 0 {
		l++
	}
	data := r.varData.MustReadBytes(l)
	res := utils.Must(r.decoder.String(string(data)))
	return res
}

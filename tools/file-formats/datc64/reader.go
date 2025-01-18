package datc64

import (
	"bytes"
	"encoding/binary"
	"exile-buddy/tools/utils"
	"exile-buddy/tools/utils/reader"
	"fmt"
	"log"
	"os"
	"path"
	"strings"

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

func (r *Reader) ReadRows(t *SchemaTable) (rows []map[string]interface{}, err error) {
	defer func() {
		if err = utils.ToErr(recover(), "Failed to read rows"); err != nil {
			log.Println(err)
			err = nil
		}
	}()
	rows = make([]map[string]interface{}, r.rows)
	start := r.fixData.Pos()
	for i := 0; i < int(r.rows); i++ {
		pos := start + i*r.stride
		// log.Printf("-- %d/%d (0x%#v) %s --\n", i, r.rows, pos, t.Name)
		if err = r.fixData.SeekAbsolute(pos); err != nil {
			log.Println(err)
			err = nil
		}
		rows[i], err = r.readRow(t)
		// log.Printf("rows[i]: %+v\n", rows[i])
		if err != nil {
			log.Println(err)
			err = nil
		}
		// if i == 1 {
		// 	panic("stop")
		// }
	}
	return
}

func (r *Reader) readRow(t *SchemaTable) (row map[string]interface{}, err error) {
	defer func() {
		err = utils.ToErr(recover(), "Failed to read row")
	}()

	row = make(map[string]interface{})
	// p0 := r.fixData.Pos()
	for ic, c := range t.Columns {
		name := c.Name
		if name == "" {
			name = fmt.Sprintf("$unknown%02d", ic)
		}
		// log.Printf("row[%s] 0x%#v %s", name, r.fixData.Pos()-p0, c.Type)
		if c.Array {
			row[name], err = r.readCellArray(&c)
		} else {
			row[name], err = r.readCell(&c)
		}
		// log.Printf("  = %+v\n", row[name])
		if err != nil {
			log.Printf("Skip rest of row: %v", err)
			return
		}
	}
	return row, nil
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
		res = r.mustReadString(int(r.fixData.MustReadUint64()))
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

	// pos := r.fixData.Pos()
	// count is 64bit but only 32bit is used (oom errors happen if we use uint64)
	count := uint32(r.fixData.MustReadUint64())
	offset := uint32(r.fixData.MustReadUint64())

	// log.Printf(" 0x%#v Array: count: %d, offset: %d (%#v), type: %s \n", pos, count, offset, offset, c.Type)
	res = make([]interface{}, 0, count)
	err = r.varData.SeekAbsolute(int(offset))
	if err != nil {
		panic(err)
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
			res = append(res, r.mustReadString(r.varData.Pos()))
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

func (r *Reader) mustReadString(pos int) string {
	r.varData.SeekAbsolute(pos)
	l := r.varData.SeekUntilSeq(NULL_TERM) + len(NULL_TERM)
	r.varData.SeekAbsolute(pos)
	data := r.varData.MustReadBytes(l)
	res := utils.Must(r.decoder.String(string(data)))
	// Remove trailing junk characters coming from converting null-terminator to utf16
	// Without null terminator, the last character is broken
	// TODO: Find a better way to handle this
	res = strings.TrimRight(res, string([]byte{0, 239, 191, 189}))
	return res
}

type ConvertedData struct {
	File   string
	Schema SchemaTable
	Rows   []map[string]interface{}
}

type ConvertOptions struct {
	SchemaFile string
	DataDir    string
	Tables     []string
	Handler    ConvertTableHandler
}

type ConvertTableHandler func(*ConvertedData) error

func ConvertData(options ConvertOptions) error {
	schema, err := LoadSchema(options.SchemaFile)
	if err != nil {
		return err
	}
	for _, t := range schema.Tables {
		skip := len(options.Tables) > 0
		if skip {
			for _, table := range options.Tables {
				if strings.EqualFold(table, t.Name) {
					skip = false
					break
				}
			}
		}
		if skip {
			continue
		}
		if t.ValidFor == 1 {
			// skip poe1 tables
			continue
		}
		datFile := path.Join(options.DataDir, strings.ToLower(t.Name)+".datc64")
		if _, err := os.Stat(datFile); os.IsNotExist(err) {
			log.Printf("File not found: %s", datFile)
			continue
		}
		log.Printf("[CONVERT] %s", datFile)
		r := Load(datFile)
		rows, err := r.ReadRows(&t)
		if err != nil {
			log.Printf("Error converting data: %v", err)
		}

		err = options.Handler(&ConvertedData{File: datFile, Schema: t, Rows: rows})
		if err != nil {
			return err
		}
	}
	return nil
}

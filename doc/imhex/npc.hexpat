import std.mem;
import std.io;
import std.array;
import std.ptr;
import std.string;

// String lookup from dynamic data
struct Str {
  u64 offset;
  u64 start = magic + offset;
  u32 end = find_null_terminator(start);
  u32 len = end - start;
  // std::print("{:X} {:X} {:X} {}", offset, start, end, len);
  if (end == -1 || len > 1024) {
    break;
  }
  char16 data[len / 2 + 1] @start;
} [[format("format_str")]];

fn format_str(ref Str it) {
    return std::format("{}", it.data);
};

// String array (TODO: read values and format)
struct StrArr {
    u64 count;
    u64 offset;
};

// Row ID
struct Rid {
    u64 id;
} [[format("format_rid")]];

fn format_rid(ref Rid it) {
    if (it.id == 0xFEFEFEFEFEFEFEFE) {
        return "<null>";
    }
    return std::format("{}", it.id);
};

// Foreign ID
struct Fid {
    u64 id;
    u64 unknown;
} [[format("format_fid")]];

fn format_fid(ref Fid it) {
    if (it.id == 0xFEFEFEFEFEFEFEFE) {
        return "<null>";
    }
    return std::format("{}", it.id);
};

// Foreign ID
struct Bool {
    u8 value;
} [[format("format_bool")]];

fn format_bool(ref Bool it) {
    return std::format("{}", it.value);
};

fn find_null_terminator(u64 pos) {
    return std::mem::find_sequence_in_range(0, pos, 0, 0x00, 0x00, 0x00, 0x00);
};

fn find_magic_separator() {
    return std::mem::find_sequence_in_range(0, 0, 0, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb);
};

union Row<T, auto Size> {
    std::mem::Bytes<Size> bytes; // raw data, ensures the size of the structure
    T value;                     // typed data. May be smaller and must not be larger than raw data
};

u32 count @0;
u32 start = $;
u32 magic = find_magic_separator();
u32 size = magic - sizeof(count);
u32 stride = size / count;
std::print("rows: {} size: {} stride: {}", count, size, stride);

// -- END OF CONTAINER FORMAT

struct Npc {
  // u64 start = $;
  Str id;
  Str Name;
  Str Metadata;
  Fid f1;
  Fid f2;
  Str ShortName;
  s32 f3;
  StrArr NPCAudios1;
  StrArr NPCAudios2;
  s16 HASH16;
  Rid f4;
  Fid Portrait;
  Fid DialogStyle;
  Fid f5;

  Str Gender;
  Bool f6;
  Str f7;
  Fid f8;

  // std::print("{}", $ - start);
};

Row<Npc, stride> rows[count] @start;

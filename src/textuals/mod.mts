export type { _char7 as char7 } from "./_/_type/_def/_char7.mts";
export type { _char8 as char8 } from "./_/_type/_def/_char8.mts";
export type { _codeplane as codeplane } from "./_/_type/_def/_code_plane.mts";

export {
  _assertChar7 as assertChar7,
  _isChar7 as isChar7,
} from "./_/_type/_char7.mts";

export {
  _assertChar8 as assertChar8,
  _isChar8 as isChar8,
} from "./_/_type/_char8.mts";

export {
  _assertChar16 as assertChar16,
  _isChar16 as isChar16,
} from "./_/_type_alias/_char16.mts";

export {
  _assertChar32 as assertChar32,
  _isChar32 as isChar32,
} from "./_/_type_alias/_char32.mts";

export {
  _assertCodePlane as assertCodePlane,
  _isCodePlane as isCodePlane,
} from "./_/_type/_code_plane.mts";

export {
  _assertCodePoint as assertCodePoint,
  _isCodePoint as isCodePoint,
} from "./_/_type_alias/_code_point.mts";

// -------------------------------------------------------------------

//TODO

export { Char16, Char32, Char8 } from "./char_x/mod.mts";
// export { CodeBlock } from "./code_block/mod.mts";
export { CodePlane } from "./code_plane.mts";
export { CodePoint } from "./code_point/mod.mts";
export { CodePointRange } from "./code_point_range/mod.mts";
export { Encoding } from "./text_encoding/mod.mts";
export { Text } from "./text/mod.mts";

export * from "./rune_info.mts";

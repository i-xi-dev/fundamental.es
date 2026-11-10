// string、かつ、U+0000からU+FFFFまでの1コードユニットからなる1文字
export type _char16 = string;

// string、かつ、U+0000以上の1コードポイントからなる1文字（すべてのchar16はchar32でもある）
export type _char32 = string;

// number、かつ、0～0x10FFFF
export type _codepoint = number;

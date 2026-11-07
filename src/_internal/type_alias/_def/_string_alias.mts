// string、かつ、U+0000からU+FFFFまでの1コードユニットからなる1文字
export type char16 = string;

// string、かつ、U+0000以上の1コードポイントからなる1文字（すべてのchar16はchar32でもある）
export type char32 = string;

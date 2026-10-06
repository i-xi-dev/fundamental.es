import type { TypeAlias } from "../../_internal/type_alias/mod.mts";

// 標準のTextDecoderだとdecode()の第2引数に options?: TextDecodeOptions がある為、新たに定義
// （TextDecoderStreamがあるので要らない）
export interface Decoder {
  encoding: string;
  // fatal: boolean;
  decode(bytes: TypeAlias.Bytes): string;
}

import { TypeAlias } from "../type/mod.mts";

// 標準のTextEncoderだとencodingが"utf-8"固定、encode()の第1引数が非必須の為、新たに定義
export interface Encoder {
  encoding: string;
  // fatal: boolean;
  encode(text: string): TypeAlias.Bytes;
  // encodeInto(
  //   source: string,
  //   destination: TypeAlias.Bytes,
  // ): TextEncoderEncodeIntoResult;
}

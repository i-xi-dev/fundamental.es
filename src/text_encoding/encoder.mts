import { _Type } from "../_common/mod.mts";

// 標準のTextEncoderだとencodingが"utf-8"固定、encode()の第1引数が非必須の為、新たに定義
export interface Encoder {
  encoding: string;
  // fatal: boolean;
  encode(text: string): _Type.Bytes;
}

import { uint8 } from "./type/main.mts";

declare interface Uint8Array<
  TArrayBuffer extends ArrayBufferLike = ArrayBufferLike,
> {
  [index: number]: uint8;
}

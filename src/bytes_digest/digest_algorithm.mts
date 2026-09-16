import { TypeAlias } from "../type/mod.mts";

export interface DigestAlgorithm {
  compute(input: TypeAlias.Bytes): Promise<TypeAlias.Bytes>;
}

import * as TypeAlias from "../type_alias/mod.mts";

export interface DigestAlgorithm {
  compute(input: TypeAlias.Bytes): Promise<TypeAlias.Bytes>;
}

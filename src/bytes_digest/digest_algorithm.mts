import * as TypeAlias from "../_internal/type_alias/mod.mts";

export interface DigestAlgorithm {
  compute(input: TypeAlias.Bytes): Promise<TypeAlias.Bytes>;
}

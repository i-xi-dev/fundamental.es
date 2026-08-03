import { _Type } from "../_common/mod.mts";

export interface DigestAlgorithm {
  compute(input: _Type.Bytes): Promise<_Type.Bytes>;
}

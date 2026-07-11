import { _T } from "../../_common/mod.mts";

export interface DigestAlgorithm {
  compute(input: _T.Bytes): Promise<_T.Bytes>;
}

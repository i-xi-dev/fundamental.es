import { _T } from "../_common/mod.mts";

export interface _Uint<T extends _T.safeint> {
  bitwiseAnd(a: T, b: T): T;
}

//class _UintImpl<T extends _T.safeint> implements _Uint<T> {
//}

import { _numeric } from "../../_common/_type/_typedef/_number.mts";

export interface _Range<T extends _numeric> {
  contains(test: T): boolean;
  //XXX overlaps(test: _Range<T>): boolean;
}

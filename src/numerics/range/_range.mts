import { _numeric } from "../../_common/_type/_typedef/_number.mts";

export interface _Range<BaseT extends _numeric, T extends BaseT = BaseT> {
  contains(test: BaseT): test is T;
  //XXX overlaps(test: _Range<BaseT, BaseT>): boolean;
}

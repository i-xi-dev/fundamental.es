import type { _numeric } from "../_/_type_alias/_def/_defs.mts";

export interface _Range<
  BaseT extends _numeric,
  T extends BaseT = BaseT,
> {
  contains(test: BaseT): /* test is T */ boolean;
  //XXX overlaps(test: _Range<BaseT, BaseT>): boolean;
}

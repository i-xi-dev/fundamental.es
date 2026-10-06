import type { TypeAlias } from "../../_internal/type_alias/mod.mts";

export interface _Range<
  BaseT extends TypeAlias.numeric,
  T extends BaseT = BaseT,
> {
  contains(test: BaseT): /* test is T */ boolean;
  //XXX overlaps(test: _Range<BaseT, BaseT>): boolean;
}

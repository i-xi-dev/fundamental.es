import { TypeAlias } from "../../type/mod.mts";

export interface _Range<
  BaseT extends TypeAlias.numeric,
  T extends BaseT = BaseT,
> {
  contains(test: BaseT): /* test is T */ boolean;
  //XXX overlaps(test: _Range<BaseT, BaseT>): boolean;
}

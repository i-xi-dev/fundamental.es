export interface _Range<T> {
  contains(test: T): boolean;
  //XXX overlaps(test: _Range<T>): boolean;
}

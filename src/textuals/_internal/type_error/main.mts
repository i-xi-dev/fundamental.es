import { mustBe } from "../../../type/error.mts";

export function mustBeNonEmptyString(target: string): TypeError {
  return mustBe("a `string` with a length of at least 1.", target);
}

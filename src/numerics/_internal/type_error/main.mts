import { mustBe } from "../../../type/error.mts";

export function mustBeNonNegativeSafeInteger(target: string): TypeError {
  return mustBe("a non-negative safe-integer of type `number`", target);
}

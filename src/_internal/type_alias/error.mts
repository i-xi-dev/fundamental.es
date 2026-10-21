import { mustBe } from "../../type/error.mts";

export function mustBeSafeIntegerArray(target: string): TypeError {
  return mustBe("an `Array` of safe-integers of type `number`", target);
}

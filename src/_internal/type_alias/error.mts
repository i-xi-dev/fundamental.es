import { mustBe } from "../../type/error.mts";

export function mustBeFinite(target: string): TypeError {
  return mustBe("a finite number of type `number`", target);
}

export function mustBeSafeInteger(target: string): TypeError {
  return mustBe("a safe-integer of type `number`", target);
}

export function mustBeCodePoint(target: string): TypeError {
  return mustBe("a Unicode code point of type `number`", target);
}

export function mustBeSafeIntegerArray(target: string): TypeError {
  return mustBe("an `Array` of safe-integers of type `number`", target);
}

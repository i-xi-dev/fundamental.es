import { mustBe } from "../../../type/error.mts";

export function mustBeFinite(target: string): TypeError {
  return mustBe("a finite number of type `number`", target);
}

export function mustBeSafeInteger(target: string): TypeError {
  return mustBe("a safe-integer of type `number`", target);
}

export function mustBeNonNegativeSafeInteger(target: string): RangeError {
  return new RangeError(
    `${target} must be a \`number\` within the range of non-negative safe-integer`,
  );
}

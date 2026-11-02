import type { safeint } from "./_def.mts";
import { mustBe } from "../../type/error.mts";

export function mustBeSafeIntegerArray(target: string): TypeError {
  return mustBe("an `Array` of safe-integers of type `number`", target);
}

export function mustBeArrayOfUintN(
  bits: safeint,
  target: string,
): TypeError {
  return mustBe(
    `an \`Array\` of ${bits}-bit unsigned integers of type \`number\``,
    target,
  );
}

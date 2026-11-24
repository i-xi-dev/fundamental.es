import type { _safeint } from "../../numerics/_/_type_alias/_def/_defs.mts";
import { mustBe } from "../../type/error.mts";

export function mustBeSafeIntegerArray(target: string): TypeError {
  return mustBe("an `Array` of safe-integers of type `number`", target);
}

export function mustBeArrayOfUintN(bits: _safeint, target: string): TypeError {
  return mustBe(
    `an \`Array\` of ${bits}-bit unsigned integers of type \`number\``,
    target,
  );
}

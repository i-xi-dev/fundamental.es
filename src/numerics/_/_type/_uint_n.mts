import { __mustBe } from "../../../type/error.mts";
import { _safeint } from "../_type_alias/_def/_defs.mts";

export function _mustBeUintN(bits: _safeint, target: string): TypeError {
  return __mustBe(`a ${bits}-bit unsigned integer of type \`number\``, target);
}

import * as _Type from "../_type/mod.mts";
import { _TypeError } from "../../_internal/mod.mts";

export function uint8(
  test: unknown,
  targetLabel: string,
): asserts test is _Type.uint8 {
  if (_Type.isUint8(test) !== true) {
    throw _TypeError.uintN(8, targetLabel);
  }
}

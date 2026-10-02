import * as _Type from "../_type/mod.mts";
import * as _TypeError from "../_error/type.mts";
import { Type, TypeAlias } from "../../type/mod.mts";

export function safeIntArray(
  test: unknown,
  targetLabel: string,
): asserts test is Array<TypeAlias.safeint> {
  if (_Type.isSafeIntArray(test) !== true) {
    throw _TypeError.mustBeSafeIntArray(targetLabel);
  }
}

export function nonSharedUint8Array(
  test: unknown,
  targetLabel: string,
): asserts test is Uint8Array<ArrayBuffer> {
  if (Type.isNonSharedUint8Array(test) !== true) {
    throw _TypeError.mustBeBytes(targetLabel);
  }
}

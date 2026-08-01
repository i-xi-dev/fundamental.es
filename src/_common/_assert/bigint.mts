import * as _Type from "../_type/mod.mts";
import { _Error } from "../../_common/mod.mts";

export function bigInt(
  test: unknown,
  targetLabel: string,
): asserts test is bigint {
  if (_Type.isBigInt(test) !== true) {
    throw _Error.Type.bigInt(targetLabel);
  }
}

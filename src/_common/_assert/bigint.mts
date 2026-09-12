import { _Error } from "../../_common/mod.mts";
import { Type } from "../../type/mod.mts";

export function bigInt(
  test: unknown,
  targetLabel: string,
): asserts test is bigint {
  if (Type.isBigInt(test) !== true) {
    throw _Error.Type.mustBeBigInt(targetLabel);
  }
}

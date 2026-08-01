import { _T } from "../mod.mts";
import { _TypeError } from "../../_internal/mod.mts";

export function bigInt(
  test: unknown,
  targetLabel: string,
): asserts test is bigint {
  if (_T.isBigInt(test) !== true) {
    throw _TypeError.bigInt(targetLabel);
  }
}

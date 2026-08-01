import { _TypeError } from "../../../_internal/mod.mts";

export function isBigInt(test: unknown): test is bigint {
  return (typeof test === "bigint");
}

import { CodePoint } from "./code_point.mts";

export namespace Assert {
  export function codePoint(test: unknown, targetLabel: string): void {
    if (CodePoint.isCodePoint(test) !== true) {
      throw new Error("TODO");
    }
  }
}

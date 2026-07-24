import * as _Message from "./_message/mod.mts";
import { _numeric } from "../_common/_type/_typedef/_number.mts";

export function rangeImpossible(): RangeError {
  return new RangeError(_Message.build("INPUT:RANGE_IMPOSSIBLE"));
}

// export function rangeOverflow(max: ): RangeError {
//   return new RangeError(_Message.build(""));
// }

export function x_nonControlAsciiString(): SyntaxError {
  return new SyntaxError(
    _Message.build("INPUT:PATTERN_MISMATCH:ASCII_RANGE_EX"),
  );
}

export function x_isomorphicString(): SyntaxError {
  return new SyntaxError(_Message.build("INPUT:PATTERN_MISMATCH:LATIN1_RANGE"));
}

import * as _Message from "./_message/mod.mts";
import { _numeric } from "../_common/_type/_typedef/_number.mts";

export function lengthMismatch(expectedLength: _numeric): RangeError {
  return new RangeError(
    _Message.build("INPUT:LENGTH_MISMATCH:_", `${expectedLength}`),
  );
}

export function rangeImpossible(): RangeError {
  return new RangeError(_Message.build("INPUT:RANGE_IMPOSSIBLE"));
}

// export function rangeOverflow(max: ): RangeError {
//   return new RangeError(_Message.build(""));
// }

export function tooLong(maxLength: _numeric): RangeError {
  return new RangeError(_Message.build("INPUT:TOO_LONG:_", `${maxLength}`));
}

export function tooShort(minLength: _numeric): RangeError {
  return new RangeError(_Message.build("INPUT:TOO_SHORT:_", `${minLength}`));
}

export function typeOverflow(typeName: string): RangeError {
  return new RangeError(_Message.build("INPUT:RANGE_OVERFLOW:TYPE", typeName));
}

export function x_nonControlAsciiString(): SyntaxError {
  return new SyntaxError(
    _Message.build("INPUT:PATTERN_MISMATCH:ASCII_RANGE_EX"),
  );
}

export function x_isomorphicString(): SyntaxError {
  return new SyntaxError(_Message.build("INPUT:PATTERN_MISMATCH:LATIN1_RANGE"));
}

import * as _Message from "./_message/mod.mts";

// export function rangeOverflow(max: ): RangeError {
//   return new RangeError(_Message.build(""));
// }

export function tooLong(max: number | bigint): RangeError {
  return new RangeError(_Message.build("INPUT:TOO_LONG:_", `${max}`));
}

export function typeMismatch_Bytes(): TypeError {
  return new TypeError(_Message.build("INPUT:TYPE_MISMATCH:BYTES"));
}

export function typeMismatch_String(): TypeError {
  return new TypeError(_Message.build("INPUT:TYPE_MISMATCH:STRING"));
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

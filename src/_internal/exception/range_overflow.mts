import { _T } from "../../_common/mod.mts";

const _type: symbol = Symbol();

type _Options = {
  expectedType?: string;
};

function _message(
  target: string,
  type: symbol,
  options: _Options,
): string {
  if (type === _type) {
    return `${target} must be ${options.expectedType!}`;
  }
  return "TODO"; // number-max, bigint-max
}

class _RangeOverflowError extends RangeError {
  constructor(target: string, type: symbol, options: _Options) {
    super(_message(target, type, options));
  }
}

export namespace RangeOverflowError {
  export function bigUintN(
    bits: _T.safeint,
    target: string,
  ): _RangeOverflowError {
    return new _RangeOverflowError(
      target,
      _type,
      { expectedType: `a ${bits}-bit unsigned integer of type \`bigint\`` },
    );
  }

  export function uintN(bits: _T.safeint, target: string): _RangeOverflowError {
    return new _RangeOverflowError(
      target,
      _type,
      { expectedType: `a ${bits}-bit unsigned integer of type \`number\`` },
    );
  }
}

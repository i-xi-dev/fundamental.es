import { _T } from "../../_common/mod.mts";

const _generic: symbol = Symbol();
const _chars: symbol = Symbol();

function _message(target: string, type: symbol, maxLength: _T.safeint): string {
  if (type === _chars) {
    return `The number of \`char\`s in ${target} must be ${maxLength} or less`;
  }
  return `The length of ${target} must be ${maxLength} or less`;
}

class _TooLongError extends RangeError {
  constructor(target: string, type: symbol, maxLength: _T.safeint) {
    super(_message(target, type, maxLength));
  }
}

export namespace TooLongError {
  export function chars(
    target: string,
    maxLength: _T.safeint,
  ): _TooLongError {
    return new _TooLongError(target, _chars, maxLength);
  }
}

import { _T } from "../../_common/mod.mts";

function _message(target: string, expectedType: string): string {
  return `${target} must be ${expectedType}`;
}

class _TypeMismatchError extends TypeError {
  constructor(target: string, expectedType: string) {
    super(_message(target, expectedType));
  }
}

export namespace TypeMismatchError {
  export function arrayBuffer(target: string): _TypeMismatchError {
    return new _TypeMismatchError(target, "an `ArrayBuffer`");
  }

  export function asyncIterable(target: string): _TypeMismatchError {
    return new _TypeMismatchError(target, "an `AsyncIterable`");
  }

  export function bigInt(target: string): _TypeMismatchError {
    return new _TypeMismatchError(target, "a `bigint`");
  }

  export function bigUintN(
    bits: _T.safeint,
    target: string,
  ): _TypeMismatchError {
    return new _TypeMismatchError(
      target,
      `a ${bits}-bit unsigned integer of type \`bigint\``,
    );
  }

  export function bytes(target: string): _TypeMismatchError {
    return new _TypeMismatchError(
      target,
      "an `Uint8Array` that references an `ArrayBuffer`",
    );
  }

  export function finite(target: string): _TypeMismatchError {
    return new _TypeMismatchError(target, "a finite number of type `number`");
  }

  export function iterable(target: string): _TypeMismatchError {
    return new _TypeMismatchError(target, "an `Iterable`");
  }

  export function nonEmptyString(target: string): _TypeMismatchError {
    return new _TypeMismatchError(
      target,
      "a `string` with a length of at least 1.",
    );
  }

  export function nonNegativeSafeInt(target: string): _TypeMismatchError {
    return new _TypeMismatchError(
      target,
      "a non-negative safe-integer of type `number`",
    );
  }

  export function safeInt(target: string): _TypeMismatchError {
    return new _TypeMismatchError(target, "a safe-integer of type `number`");
  }

  export function string(target: string): _TypeMismatchError {
    return new _TypeMismatchError(target, "a `string`");
  }

  export function uintN(bits: _T.safeint, target: string): _TypeMismatchError {
    return new _TypeMismatchError(
      target,
      `a ${bits}-bit unsigned integer of type \`number\``,
    );
  }
}

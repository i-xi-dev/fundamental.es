function _message(target: string, expectedType: string): string {
  return `${target} must be ${expectedType}`;
}

class _TypeMismatchError extends TypeError {
  constructor(target: string, expectedType: string) {
    super(_message(target, expectedType));
  }
}

export namespace TypeMismatchError {
  export function bigInt(target: string): _TypeMismatchError {
    return new _TypeMismatchError(target, "a `bigint`");
  }

  export function safeInt(target: string): _TypeMismatchError {
    return new _TypeMismatchError(target, "a safe-integer of type `number`");
  }

  export function string(target: string): _TypeMismatchError {
    return new _TypeMismatchError(target, "a `string`");
  }
}

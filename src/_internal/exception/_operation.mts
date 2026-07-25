class _OperationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OperationError";
  }
}

export function invalid(reasonDesc: string): _OperationError {
  return new _OperationError(reasonDesc);
}

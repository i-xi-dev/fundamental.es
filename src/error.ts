//

class AbortError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "AbortError";
  }
}

class InvalidStateError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "InvalidStateError";
  }
}

class TimeoutError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "TimeoutError";
  }
}

export {
  AbortError,
  InvalidStateError,
  TimeoutError,
};

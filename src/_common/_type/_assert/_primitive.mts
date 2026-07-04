export function isNullOrUndefined(test: unknown): test is null | undefined {
  return (test === null) || (test === undefined);
}

// deno-lint-ignore ban-types
export function _isFunction(test: unknown): test is Function {
  return (typeof test === "function");
}

// 単なるパターンアンマッチには使わないこと

export function asciiWithoutCc(target: string): SyntaxError {
  const msg =
    `${target} must not contain controls or characters outside of the US-ASCII range`;
  return new SyntaxError(msg);
}

export function latin1(target: string): SyntaxError {
  const msg =
    `${target} must not contain characters outside of the Latin1 range`;
  return new SyntaxError(msg);
}

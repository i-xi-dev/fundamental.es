// 単なるパターンアンマッチには使わないこと

export function mustBePercentEncoded(target: string): SyntaxError {
  const msg =
    `${target} must not contain controls or characters outside of the US-ASCII range`;
  return new SyntaxError(msg);
}

export function mustBeBinaryString(target: string): SyntaxError {
  const msg =
    `${target} must not contain characters outside of the Latin1 range`;
  return new SyntaxError(msg);
}

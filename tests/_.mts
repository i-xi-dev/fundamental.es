export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    globalThis.setTimeout(resolve, ms);
  });
}

export function stringifyNumbers(numbers: Iterable<number | bigint>): string {
  let str = "";
  for (const n of numbers) {
    str += `,${n.toString(10)}`;
  }
  return str.startsWith(",") ? str.substring(1) : str;
}

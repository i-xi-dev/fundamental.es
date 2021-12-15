//

function decode(buffer: BufferSource = new Uint8Array(0)): string {
  const bytes = new Uint8Array((buffer instanceof ArrayBuffer) ? buffer : buffer.buffer);

  // A: Bの2倍以上遅い（Node.js）
  // let chars: string = "";
  // for (const byte of bytes) {
  //   chars = chars + String.fromCharCode(byte);
  // }
  // return chars;

  // B:
  const chars = Array.from(bytes, (byte) => {
    return String.fromCharCode(byte);
  });
  return chars.join("");
}

function isIsomorphicEncoded(value: string): boolean {
  return /^[\u{0}-\u{FF}]*$/u.test(value);
}

function encode(input = ""): Uint8Array {
  if (isIsomorphicEncoded(input) !== true) {
    throw new TypeError("input");
  }

  const bytes = new Uint8Array(input.length);
  for (let i = 0; i < input.length; i++) {
    bytes[i] = input.charCodeAt(i);
  }
  return bytes;
}

const IsomorphicEncoding = Object.freeze({
  decode,
  encode,
});

export {
  IsomorphicEncoding,
};

// 

import {
  type int,
  Integer,
} from "./int";

function _isGVLIsEncoded(input: string, radix: int): boolean {
  if (radix <= 10) {
    return (new RegExp(`^[0-${ (radix - 1).toString(10) }]*$`)).test(input);
  }
  else if (radix <= 11) {
    return (new RegExp(`^[0-9a]*$`, "i")).test(input);
  }
  else {
    const maxDigits = "bcdefghijklmnopqrstuvwxyz";
    return (new RegExp(`^[0-9a-${ maxDigits.charAt(radix - 12) }]*$`, "i")).test(input);
  }
}

// decode generalized variable-length integer
function _decodeGVLIs(input: string, radix: number, thresholdResolver: (digit: number) => number): Array<number> {
  if (typeof input !== "string") {
    throw new TypeError("input");
  }
  if (typeof radix !== "number") {
    throw new TypeError("radix");
  }
  else if ((Number.isSafeInteger(radix) && (radix >= 2) && (radix <= 36)) !== true) {
    throw new RangeError("radix");
  }
  if (_isGVLIsEncoded(input, radix) !== true) {
    throw new RangeError("input,radix");
  }

  const intArray: Array<int> = [];
  let currVal = 0;
  let weight = 1;
  let pos = 0;
  let threshold = thresholdResolver(0);
  for (const char of input) {
    const _d = Number.parseInt(char, radix);
    currVal = currVal + (_d * weight);
    if (_d < threshold) {
      intArray.push(currVal);
      currVal = 0;
      weight = 1;
      pos = 0;
    }
    else {
      weight = weight * (radix - threshold);
      threshold = thresholdResolver(pos++);
    }
  }
  return intArray;
}

const _RADIX = 36;

const _T_MIN = 1;
const _T_MAX = 26;






namespace Punycode {
  export function decode() {
    throw new Error("not implemented");
  }



}
Object.freeze(Punycode);

export {
  Punycode,
};

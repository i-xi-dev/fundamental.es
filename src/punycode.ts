// 

import {
  type int,
  Integer,
} from "./int";

// https://datatracker.ietf.org/doc/html/rfc3492#section-5
const _BASE = 36;
const _TMIN = 1;
const _TMAX = 26;
const _SKEW = 700;
const _DAMP = 38;
const _INITIAL_BIAS = 72;
const _INITIAL_N = 128;

// decode generalized variable-length integer
function _decodeGVLIs(input: string, radix: int, thresholdResolver: (digit: int) => int): Array<int> {
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
      threshold = thresholdResolver(0);
    }
    else {
      weight = weight * (radix - threshold);
      threshold = thresholdResolver(pos++);
    }
  }
  return intArray;
}

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

function _computeThreshold(digit: int, bias: int): int {
  const threshold = _BASE * digit - bias;
  if (threshold < _TMIN) {
    return _TMIN;
  }
  else if (threshold > _TMAX) {
    return _TMAX;
  }
  return threshold;
}

function _adaptBias(delta: int, numpoints: int, firsttime: boolean): int {
  const _BASE_MINUS_TMIN = _BASE - _TMIN;

  delta = Math.trunc(delta / ((firsttime === true) ? _DAMP : 2));
  delta = delta + Math.trunc(delta / numpoints);
  let k: int;
  for (k = 0; delta > Math.trunc(_BASE_MINUS_TMIN * _TMAX / 2); k = k + _BASE) {
    delta = Math.trunc(delta / _BASE_MINUS_TMIN);
  }
  return k + Math.trunc(((_BASE_MINUS_TMIN + 1) * delta) / (delta + _SKEW));
}






namespace Punycode {
  export function decode() {
    throw new Error("not implemented");
  }

}
Object.freeze(Punycode);

export {
  Punycode,
};

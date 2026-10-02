import * as TypeAlias from "../../_internal/type_alias/mod.mts";

function _message(target: string, expectedType: string): string {
  return `${target} must be ${expectedType}`;
}

export function mustBe(typeDesc: string, target: string): TypeError {
  const msg = _message(target, typeDesc);
  return new TypeError(msg);
}

export function mustBeBigUintN(
  bits: TypeAlias.safeint,
  target: string,
): TypeError {
  const msg = _message(
    target,
    `a ${bits}-bit unsigned integer of type \`bigint\``,
  );
  return new TypeError(msg);
}

export function mustBeFinite(target: string): TypeError {
  const msg = _message(target, "a finite number of type `number`");
  return new TypeError(msg);
}

export function mustBeNonEmptyString(target: string): TypeError {
  const msg = _message(target, "a `string` with a length of at least 1.");
  return new TypeError(msg);
}

export function mustBeNonNegativeSafeInt(target: string): TypeError {
  const msg = _message(target, "a non-negative safe-integer of type `number`");
  return new TypeError(msg);
}

export function mustBeSafeInt(target: string): TypeError {
  const msg = _message(target, "a safe-integer of type `number`");
  return new TypeError(msg);
}

export function mustBeSafeIntArray(target: string): TypeError {
  const msg = _message(target, "an `Array` of safe-integers of type `number`");
  return new TypeError(msg);
}

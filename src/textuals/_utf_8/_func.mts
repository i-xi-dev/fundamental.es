import { _assertString } from "../../_/_type/_string.mts";
import { _assertWellFormedString } from "../_/_type_ext/_well_formed_string.mts";

let _encoder: TextEncoder | null = null;

export function _utf8Encode(
  text: string,
  fatal: boolean,
): Uint8Array<ArrayBuffer> {
  _assertString(text, "Input");
  if (fatal === true) {
    _assertWellFormedString(text, "Input");
  }

  _encoder = _encoder ?? new TextEncoder();
  return _encoder.encode(text);
}

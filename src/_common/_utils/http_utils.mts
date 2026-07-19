import * as StringUtils from "./string_utils.mts";

const { EMPTY, RangeSet } = StringUtils;

/**
 * 文字列の先頭のHTTP quoted stringを取得し返却
 *     仕様は https://fetch.spec.whatwg.org/#collect-an-http-quoted-string
 *
 * - collected: 引用符で括られていた値。引用符とエスケープ文字は取り除いて返す
 * - progression: 取得した文字数。（終了引用符までを含む）
 *                引用符とエスケープ文字を含むのでcollected.lengthとは一致しない
 *
 * @param input 先頭がU+0022の文字列
 * @returns 結果
 */
export function collectHttpQuotedString(
  input: string,
): StringUtils.CollectResult {
  // 2.
  let value = EMPTY;

  // 3.
  if (input.startsWith('"') !== true) {
    return {
      collected: value,
      progression: 0,
    };
  }

  // 4.
  const text2 = input.substring(1);

  // 5.
  let escaped = false;
  let i = 0;
  for (i = 0; i < text2.length; i++) {
    const c: string = text2[i] as string;

    if (escaped === true) {
      value = value + c;
      escaped = false;
      continue;
    } else {
      if (c === '"') {
        i++;
        break;
      } else if (c === "\\") {
        escaped = true;
        continue;
      } else {
        value = value + c;
        continue;
      }
    }
  }

  if (escaped === true) {
    value = value + "\\";
  }

  return {
    collected: value,
    progression: i + 1,
  };
}

/**
 * Headers#getで取得した値を分割する
 * （複数ヘッダーだった場合、","で連結されているので分割する）
 *
 * かつてはHeaders#getAllすれば良かったが、それは廃止されたので。
 *
 * {@link https://fetch.spec.whatwg.org/#concept-header-list-get-decode-split} のsplitの部分の仕様で分割する
 *
 * @param value Headers#getで取得した値
 * @returns 分割結果
 */
export function valuesOfHeaderFieldValue(value: string): Array<string> {
  const exclude = "[^\\u{22}\\u{2C}]+";
  const values: Array<string> = [];

  if (/[\u0022\u002C]/.test(value) !== true) {
    const trimmed = StringUtils.rangesTrim(value, RangeSet.HTTP_TAB_OR_SPACE);
    if (trimmed.length > 0) {
      return [trimmed];
    } else {
      return [];
    }
  }

  let i = 0;
  let vEnd = false;
  let cc = 0;
  let v = EMPTY;
  while (i < value.length) {
    const collected = StringUtils.patternCollectStart(
      value.substring(i),
      exclude,
    );
    i = i + collected.length;
    v = v + collected;
    const remains = value.substring(i);
    if (remains.startsWith("\u0022")) {
      const result = collectHttpQuotedString(remains);
      v = v + remains.substring(0, result.progression);
      i = i + result.progression;
      if (result.following === true) {
        continue;
      }
    } else {
      //  または ","始まり
      i = i + 1;
      vEnd = true;
      if (remains.startsWith("\u002C")) {
        cc = cc + 1;
      }
    }

    if (vEnd === true) {
      values.push(StringUtils.rangesTrim(v, RangeSet.HTTP_TAB_OR_SPACE)); //XXX ループ内で毎回は…
      v = EMPTY;
      vEnd = false;
    }
  }
  if (v !== EMPTY) {
    values.push(StringUtils.rangesTrim(v, RangeSet.HTTP_TAB_OR_SPACE));
  }
  if (values.length < (cc + 1)) {
    // 末尾が","だった場合 //XXX スマートに（cc不要に）できるのでは？
    values.push(EMPTY);
  }

  return values;
}

//
import {
  UnicodeUtils,
} from "./unicode";
import {
  StringUtils,
} from "./string";

namespace HttpUtils {
  export const CodePointRange = {
    /** [ASCII whitespace](https://infra.spec.whatwg.org/#ascii-whitespace) */
    ASCII_WHITESPACE: [
      [ 0x9 ],
      [ 0xA ],
      [ 0xC ],
      [ 0xD ],
      [ 0x20 ],
    ] as UnicodeUtils.CodePointRange,
  
    /** [HTTP quoted-string token code point](https://mimesniff.spec.whatwg.org/#http-quoted-string-token-code-point) */
    HTTP_QUOTED_STRING_TOKEN: [
      [ 0x9 ],
      [ 0x20, 0x7E ],
      [ 0x80, 0xFF ],
    ] as UnicodeUtils.CodePointRange,
  
    /** [HTTP tab or space](https://fetch.spec.whatwg.org/#http-tab-or-space) */
    HTTP_TAB_OR_SPACE: [
      [ 0x9 ],
      [ 0x20 ],
    ] as UnicodeUtils.CodePointRange,
  
    /** [HTTP token code point](https://mimesniff.spec.whatwg.org/#http-token-code-point) */
    HTTP_TOKEN: [
      [ 0x21 ],
      [ 0x23, 0x27 ],
      [ 0x2A ],
      [ 0x2B ],
      [ 0x2D ],
      [ 0x2E ],
      [ 0x30, 0x39 ],
      [ 0x41, 0x5A ],
      [ 0x5E, 0x60 ],
      [ 0x61, 0x7A ],
      [ 0x7C ],
      [ 0x7E ],
    ] as UnicodeUtils.CodePointRange,
  
    /** [HTTP whitespace](https://fetch.spec.whatwg.org/#http-whitespace) */
    HTTP_WHITESPACE: [
      [ 0x9 ],
      [ 0xA ],
      [ 0xD ],
      [ 0x20 ],
    ] as UnicodeUtils.CodePointRange,
  } as const;

  export type CollectResult = {
    collected: string,
    progression: number,
    following?: boolean,
  };

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
  export function collectHttpQuotedString(input: string): CollectResult {
    // 2.
    let value = "";

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
      }
      else {
        if (c === '"') {
          i++;
          break;
        }
        else if (c === "\\") {
          escaped = true;
          continue;
        }
        else {
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
      progression: (i + 1),
    };
  }

  /**
   * Headers#getで取得した値を分割する
   * （複数ヘッダーだった場合、","で連結されているので分割する）
   * 
   * かつてはHeaders#getAllすれば良かったが、それは廃止されたので。
   * {@link https://fetch.spec.whatwg.org/#concept-header-list-get-decode-split} のsplitの部分の仕様で分割する
   * 
   * @param value Headers#getで取得した値
   * @returns 分割結果
   */
  export function splitHeaderValue(value: string): Array<string> {
    const u0022OrU002C: Array<[ number ]> = [ [ 0x22 ], [ 0x2C ] ];
    const values: Array<string> = [];
    let work = value;
    while (work.length > 0) {
      let splitted = StringUtils.collectStart(work, u0022OrU002C, true);
      work = work.substring(splitted.length);
      if (work.startsWith("\u0022")) {
        const result = collectHttpQuotedString(work);
        splitted = splitted + result.collected;
        work = work.substring(result.progression);
      }
      else { // work.startsWith("\u002C")
        work = work.substring(1);
      }
      values.push(StringUtils.trim(splitted, CodePointRange.HTTP_TAB_OR_SPACE));
    }
    return values;
  }

}

export {
  HttpUtils,
};

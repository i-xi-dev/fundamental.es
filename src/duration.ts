//

type int = number;

namespace Milliseconds {
  /**
   * 1秒を表すミリ秒
   */
  export const SECOND = 1000;

  /**
   * 1分を表すミリ秒
   */
  export const MINUTE = 60000;

  /**
   * 1時間を表すミリ秒
   */
  export const HOUR = 3600000;

  /**
   * 1日を表すミリ秒
   */
  export const DAY = 86400000;

  /**
   * ミリ秒をミリ秒に変換し返却
   * @param milliseconds ミリ秒（ミリ秒より下位は切り捨て）
   * @returns 
   */
  export function ofMilliseconds(milliseconds: number): int {
    if (Number.isFinite(milliseconds) !== true) {
      throw new TypeError("milliseconds");
    }
    return Math.trunc(milliseconds);
  }

  /**
   * 秒をミリ秒に変換し返却
   * @param seconds 秒（ミリ秒より下位は切り捨て）
   * @returns 
   */
  export function ofSeconds(seconds: number): int {
    if (Number.isFinite(seconds) !== true) {
      throw new TypeError("seconds");
    }
    return ofMilliseconds(seconds * SECOND);
  }

  /**
   * 分をミリ秒に変換し返却
   * @param minutes 分（ミリ秒より下位は切り捨て）
   * @returns 
   */
  export function ofMinutes(minutes: number): int {
    if (Number.isFinite(minutes) !== true) {
      throw new TypeError("minutes");
    }
    return ofMilliseconds(minutes * MINUTE);
  }

  /**
   * 時をミリ秒に変換し返却
   * @param hours 時（ミリ秒より下位は切り捨て）
   * @returns 
   */
  export function ofHours(hours: number): int {
    if (Number.isFinite(hours) !== true) {
      throw new TypeError("hours");
    }
    return ofMilliseconds(hours * HOUR);
  }

  /**
   * 日をミリ秒に変換し返却
   * @param days 日（ミリ秒より下位は切り捨て）
   * @returns 
   */
  export function ofDays(days: number): int {
    if (Number.isFinite(days) !== true) {
      throw new TypeError("days");
    }
    return ofMilliseconds(days * DAY);
  }

  // Temporalを使えばいい
  // /**
  //  * 時間量を表すISO 8601形式の文字列をミリ秒に変換し返却
  //  * @param str 時間量を表すISO 8601形式の文字列
  //  *    ※時間量が負の場合は先頭に"-"を付ける（ISO 8601としては仕様違反）
  //  * @returns 
  //  */
  // export function fromString(str: string): int {
  //   if (typeof str !== "string") {
  //     throw new TypeError("str");
  //   }
  //
  //   if (/^-?PT([1-9][0-9]+|0[0-9]+)H[0-9]{2}M[0-9]{2}(\.[0-9]+)?S$/.test(str) !== true) { // H省略などに未対応
  //     throw new RangeError("str");
  //   }
  //
  //   const isNegative = str.startsWith("-");
  //   const result = str.matchAll(/[0-9]+/g);
  //   const fields = [ ...result ] as [ RegExpMatchArray, RegExpMatchArray, RegExpMatchArray ] | [ RegExpMatchArray, RegExpMatchArray, RegExpMatchArray, RegExpMatchArray ];
  //   const hStr = fields[0][0] as string;
  //   const mStr = fields[1][0] as string;
  //   const sIStr = fields[2][0] as string;
  //   let sFStr: string;
  //   if (fields.length >= 4) {
  //     sFStr = (fields[3] as RegExpMatchArray)[0] as string;
  //     sFStr = sFStr.padEnd(3, "0").substring(0, 3);
  //   }
  //   else {
  //     sFStr = "000";
  //   }
  //
  //   const hMillis = Number.parseInt(hStr, 10) * HOUR;
  //   const mMillis = Number.parseInt(mStr, 10) * MINUTE;
  //   const sIMillis = Number.parseInt(sIStr, 10) * SECOND;
  //   const sFNanos = Number.parseInt(sFStr, 10);
  //
  //   let millis = hMillis + mMillis + sIMillis + sFNanos;
  //   millis = isNegative ? (millis * -1) : millis;
  //
  //   return millis;
  // }
  //
  // export function toString(milliseconds: number): string {
  //
  // }
}
Object.freeze(Milliseconds);

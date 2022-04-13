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
}
Object.freeze(Milliseconds);

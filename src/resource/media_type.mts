import { _T, HttpUtils, StringUtils } from "../_common/mod.mts";
import { _TypeError } from "../_internal/mod.mts";

const { EMPTY, RangeSet } = StringUtils;

/**
 * 文字列の先頭からメディアタイプのタイプ名を抽出し返却
 *
 * @param input 文字列
 * @returns パース結果
 */
function _collectTypeName(input: string): StringUtils.CollectResult {
  const u002FIndex = input.indexOf("/");
  const typeName = (u002FIndex >= 0) ? input.substring(0, u002FIndex) : EMPTY;

  return {
    collected: typeName,
    progression: typeName.length,
  };
}

/**
 * 文字列の先頭からメディアタイプのサブタイプ名を抽出し返却
 *
 * @param input 文字列
 * @returns パース結果
 */
function _collectSubtypeName(input: string): StringUtils.CollectResult {
  let subtypeName: string;
  let progression: number;
  let followingParameters = false;
  if (input.includes(";")) {
    // 「;」あり（パラメーターあり）
    const u003BIndex = input.indexOf(";");
    subtypeName = input.substring(0, u003BIndex);
    progression = u003BIndex;
    followingParameters = true;
  } else {
    // パラメーター無し
    subtypeName = input;
    progression = input.length;
  }

  subtypeName = StringUtils.rangesTrimEnd(
    subtypeName,
    RangeSet.HTTP_WHITESPACE,
  );

  return {
    collected: subtypeName,
    progression,
    following: followingParameters,
  };
}

/**
 * パラメーター値終端位置
 */
type _PrameterValueEnd = {
  /** パラメーター値終端位置のインデックス */
  valueEndIndex: number;

  /** 後続がパース不可能（または不要）であるか否か */
  parseEnd: boolean;
};

/**
 * 文字列の先頭からメディアタイプのパラメーター値終端位置を抽出し返却
 *
 * @param input 文字列
 * @returns パラメーター値終端位置
 */
function _detectPrameterValueEnd(input: string): _PrameterValueEnd {
  let valueEndIndex = -1;
  let parseEnd = false;
  const u003BIndex = input.indexOf(";");
  if (u003BIndex >= 0) {
    valueEndIndex = u003BIndex;
  }

  if (valueEndIndex < 0) {
    valueEndIndex = input.length;
    parseEnd = true;
  }

  return {
    valueEndIndex,
    parseEnd,
  };
}

type _Parameter = [name: string, value: string];

type _CompareOptions = {
  /**
   * The set of parameter names that ignores the case of the parameter value.
   */
  caseInsensitiveParameters: Array<string>;
};

// パラメーターはRFC 6838にもとづいて
// - パラメータ名の重複は許可しない
// - 順序に意味はない
// とする

//TODO parametersはコンストラクターでソートする
/**
 * The object representation of MIME type.
 * The `MediaType` instances are immutable.
 */
export class MediaType {
  readonly #typeName: string;
  readonly #subtypeName: string;
  readonly #parameters: Map<string, string>;

  private constructor(
    typeName: string,
    subtypeName: string,
    parameters: Array<_Parameter> = [],
  ) {
    if (StringUtils.rangesMatches(typeName, RangeSet.HTTP_TOKEN) !== true) {
      throw _TypeError.custom("Type", "a valid type of MIME type");
    }
    if (StringUtils.rangesMatches(subtypeName, RangeSet.HTTP_TOKEN) !== true) {
      throw _TypeError.custom("Subtype", "a valid subtype of MIME type");
    }

    const parameterMap = new Map(parameters.map((entry) => {
      return [
        entry[0].toLowerCase(),
        entry[1],
      ];
    }));
    if (parameters.length !== parameterMap.size) {
      throw _TypeError.custom(
        "Parameters",
        "an `Array` that does not contain duplicate parameters",
      );
    }

    this.#typeName = typeName.toLowerCase();
    this.#subtypeName = subtypeName.toLowerCase();
    this.#parameters = parameterMap;
  }

  /**
   * The [type](https://mimesniff.spec.whatwg.org/#type) of this MIME type.
   *
   * @example
   * ```javascript
   * const mediaType = MediaType.fromString('application/soap+xml; charset=utf-8;action="https://example.com/example"');
   *
   * mediaType.type;
   * // → "application"
   * ```
   */
  get type(): string {
    return this.#typeName;
  }

  /**
   * The [subtype](https://mimesniff.spec.whatwg.org/#subtype) of this MIME type.
   *
   * @example
   * ```javascript
   * const mediaType = MediaType.fromString('application/soap+xml; charset=utf-8;action="https://example.com/example"');
   *
   * mediaType.subtype;
   * // → "soap+xml"
   * ```
   */
  get subtype(): string {
    return this.#subtypeName;
  }

  /**
   * The +suffix (structured syntax suffix) of this MIME type.
   *
   * @see [https://www.iana.org/assignments/media-type-structured-suffix](https://www.iana.org/assignments/media-type-structured-suffix)
   *
   * @example
   * ```javascript
   * const mediaType = MediaType.fromString('application/soap+xml; charset=utf-8;action="https://example.com/example"');
   *
   * mediaType.suffix;
   * // → "+xml"
   * ```
   */
  get suffix(): string {
    if (this.subtype.includes("+")) {
      const subtype = this.subtype;
      return subtype.substring(subtype.lastIndexOf("+"));
    }
    return EMPTY;
  }

  /**
   * The [essence](https://mimesniff.spec.whatwg.org/#mime-type-essence) of this MIME type.
   *
   * @example
   * ```javascript
   * const mediaType = MediaType.fromString('application/soap+xml; charset=utf-8;action="https://example.com/example"');
   *
   * mediaType.essence;
   * // → "application/soap+xml"
   * ```
   */
  get essence(): string {
    return this.#typeName + "/" + this.#subtypeName;
  }

  /**
   * Parses a string representation of a MIME type.
   *
   * @param text The string to be parsed.
   * @returns A `MediaType` instance.
   * @throws {TypeError} The `text` is not contain the [type](https://mimesniff.spec.whatwg.org/#type) of a MIME type.
   * @throws {TypeError} The extracted [subtype](https://mimesniff.spec.whatwg.org/#subtype) is empty or contains invalid characters.
   * @throws {TypeError} The extracted parameters contains duplicate parameters.
   * @see [https://mimesniff.spec.whatwg.org/#parsing-a-mime-type](https://mimesniff.spec.whatwg.org/#parsing-a-mime-type)
   */
  static fromString(text: string): MediaType {
    const trimmedText = StringUtils.rangesTrim(text, RangeSet.HTTP_WHITESPACE);

    let work = trimmedText;
    let i = 0;

    // [mimesniff 4.4.]-1,2 削除済

    // [mimesniff 4.4.]-3
    const { collected: typeName, progression: typeNameLength } =
      _collectTypeName(work);
    if (typeNameLength <= 0) {
      throw _TypeError.custom(
        "Input",
        "a string starting with a valid MIME type’s type",
      );
    }

    // [mimesniff 4.4.]-4,5 はコンストラクターではじかれる

    // [mimesniff 4.4.]-6
    work = work.substring(typeNameLength + 1);
    i = i + typeNameLength + 1;

    // [mimesniff 4.4.]-7,8
    const { collected: subtypeName, progression: subtypeNameEnd, following } =
      _collectSubtypeName(work);
    work = (following === true) ? work.substring(subtypeNameEnd) : EMPTY;
    i = i + subtypeNameEnd;

    // [mimesniff 4.4.]-9 はコンストラクターではじかれる

    // [mimesniff 4.4.]-10 はコンストラクターで行う

    if (work.length <= 0) {
      return new MediaType(typeName, subtypeName, []);
    }

    // [mimesniff 4.4.]-11
    const parameterEntries: Array<_Parameter> = [];
    while (work.length > 0) {
      // [mimesniff 4.4.]-11.1
      work = work.substring(1);
      i = i + 1;

      // [mimesniff 4.4.]-11.2
      const startHttpSpaces2 = StringUtils.rangesCollectStart(
        work,
        RangeSet.HTTP_WHITESPACE,
      );
      work = work.substring(startHttpSpaces2.length);
      i = i + startHttpSpaces2.length;

      // [mimesniff 4.4.]-11.3
      const u003BIndex = work.indexOf(";");
      const u003DIndex = work.indexOf("=");

      let delimIndex = -1;
      if ((u003BIndex >= 0) && (u003DIndex >= 0)) {
        delimIndex = Math.min(u003BIndex, u003DIndex);
      } else if (u003BIndex >= 0) {
        delimIndex = u003BIndex;
      } else if (u003DIndex >= 0) {
        delimIndex = u003DIndex;
      }

      let paramName: string;
      if (delimIndex >= 0) {
        paramName = work.substring(0, delimIndex);
      } else {
        paramName = work;
      }
      work = work.substring(paramName.length);
      i = i + paramName.length;

      // [mimesniff 4.4.]-11.4 はコンストラクターで行う

      // [mimesniff 4.4.]-11.5.1
      if (work.startsWith(";")) {
        continue;
      }

      // [mimesniff 4.4.]-11.5.2
      if (work.startsWith("=")) {
        work = work.substring(1);
        i = i + 1;
      }

      // [mimesniff 4.4.]-11.6
      if (work.length <= 0) {
        break;
      }

      // [mimesniff 4.4.]-11.7
      let paramValue: string;

      if (work.startsWith('"')) {
        // [mimesniff 4.4.]-11.8.1
        const { collected, progression } = HttpUtils.collectHttpQuotedString(
          work,
        );
        work = work.substring(progression);
        i = i + progression;
        paramValue = collected;

        // [mimesniff 4.4.]-11.8.2
        const { valueEndIndex, parseEnd } = _detectPrameterValueEnd(work);
        work = (parseEnd === true) ? EMPTY : work.substring(valueEndIndex);
        i = i + valueEndIndex;
      } else {
        // [mimesniff 4.4.]-11.9.1
        const { valueEndIndex, parseEnd } = _detectPrameterValueEnd(work);
        paramValue = work.substring(0, valueEndIndex);
        work = (parseEnd === true) ? EMPTY : work.substring(valueEndIndex);
        i = i + valueEndIndex;

        // [mimesniff 4.4.]-11.9.2
        paramValue = StringUtils.rangesTrimEnd(
          paramValue,
          RangeSet.HTTP_WHITESPACE,
        );

        // [mimesniff 4.4.]-11.9.3
        if (paramValue.length <= 0) {
          continue;
        }
      }

      // [mimesniff 4.4.]-11.10
      if (StringUtils.rangesMatches(paramName, RangeSet.HTTP_TOKEN) !== true) {
        continue;
      }
      if (
        (StringUtils.rangesMatches(
          paramValue,
          RangeSet.HTTP_QUOTED_STRING_TOKEN,
        ) !== true) &&
        (paramValue.length > 0)
      ) {
        continue;
      }
      if (parameterEntries.some((param) => param[0] === paramName)) {
        continue;
      }
      parameterEntries.push([paramName, paramValue]);
    }

    return new MediaType(typeName, subtypeName, parameterEntries);
  }

  //XXX Httpモジュールに移す
  // // (await Body.blob()).type と同じになるはず？
  // /**
  //  * @experimental
  //  * @param headers The `Headers` object of `Request` or `Response`.
  //  * @returns A `MediaType` instance.
  //  * @see {@link https://fetch.spec.whatwg.org/#content-type-header `Content-Type` header (Fetch standard)}
  //  */
  // static fromHeaders(headers: Headers): MediaType {
  //   const CHARSET = "charset";
  //
  //   // 5.
  //   if (headers.has(Http.Header.CONTENT_TYPE) !== true) {
  //     throw new Error("Content-Type field not found");
  //   }
  //
  //   // 4, 5.
  //   const typesString = headers.get(Http.Header.CONTENT_TYPE) as string;
  //   const typeStrings = HttpUtils.valuesOfHeaderFieldValue(typesString);
  //   if (typeStrings.length <= 0) {
  //     throw new Error("Content-Type value not found");
  //   }
  //
  //   // 1, 2, 3.
  //   let textEncoding = EMPTY;
  //   let mediaTypeEssence = EMPTY;
  //   let mediaType: MediaType | null = null;
  //   // 6.
  //   for (const typeString of typeStrings) {
  //     try {
  //       // 6.1.
  //       const tempMediaType = MediaType.fromString(typeString);
  //
  //       // 6.3.
  //       mediaType = tempMediaType;
  //
  //       // 6.4.
  //       if (mediaTypeEssence !== mediaType.essence) {
  //         // 6.4.1.
  //         textEncoding = EMPTY;
  //         // 6.4.2.
  //         if (mediaType.hasParameter(CHARSET)) {
  //           textEncoding = mediaType.getParameterValue(CHARSET) as string;
  //         }
  //         // 6.4.3.
  //         mediaTypeEssence = mediaType.essence;
  //       } else {
  //         // 6.5.
  //         if (
  //           (mediaType.hasParameter(CHARSET) !== true) &&
  //           (textEncoding !== EMPTY)
  //         ) {
  //           // TODO mediaType.withParameters()
  //         }
  //       }
  //     } catch (exception) {
  //       console.log(exception); // TODO 消す
  //       // 6.2. "*/*"はMediaType.fromStringでエラーにしている
  //       continue;
  //     }
  //   }
  //
  //   // 7, 8.
  //   if (mediaType !== null) {
  //     return mediaType;
  //   } else {
  //     throw new Error("extraction failure");
  //   }
  // }

  /**
   * Returns a serialized string representation.
   *
   * @override
   * @returns A serialized string representation.
   * @example
   * ```javascript
   * const mediaType = MediaType.fromString('application/soap+xml; charset=utf-8;action="https://example.com/example"');
   *
   * mediaType.toString();
   * // → 'application/soap+xml;charset=utf-8;action="https://example.com/example"'
   * ```
   */
  toString(): string { //XXX パラメータ名ソート
    return this.#format();
  }

  #format(sortParams = false): string {
    const paramNames = [...this.#parameters.keys()];
    if (sortParams === true) {
      paramNames.sort();
    }
    let params = EMPTY;
    for (const paramName of paramNames) {
      params = params + ";" + paramName + "=";

      const paramValue = this.#parameters.get(paramName) as string;
      if (
        (StringUtils.rangesMatches(paramValue, RangeSet.HTTP_TOKEN) === true) ||
        (paramValue.length === 0)
      ) {
        params = params + paramValue;
      } else {
        params = params + '"' +
          paramValue.replaceAll("\\", "\\\\").replaceAll('"', '\\"') + '"';
      }
    }
    return this.#typeName + "/" + this.#subtypeName + params;
  }

  /**
   * Returns a serialized string representation.
   *
   * @returns A serialized string representation.
   * @example
   * ```javascript
   * const mediaType = MediaType.fromString('application/soap+xml; charset=utf-8;action="https://example.com/example"');
   *
   * mediaType.toJSON();
   * // → 'application/soap+xml;charset=utf-8;action="https://example.com/example"'
   * ```
   */
  toJSON(): string {
    return this.toString();
  }

  /**
   * Returns a new iterator object that contains the names for each parameter in this MIME type.
   *
   * @returns A new iterator object.
   * @example
   * ```javascript
   * const mediaType = MediaType.fromString('application/soap+xml; charset=utf-8;action="https://example.com/example"');
   *
   * [ ...mediaType.parameterNames() ];
   * // → [ "action", "charset" ]
   * ```
   */
  parameterNames(): IterableIterator<string> {
    const paramNames: Array<string> = [];
    for (const paramName of this.#parameters.keys()) {
      paramNames.push(paramName);
    }
    return paramNames.toSorted()[Symbol.iterator]();
  }

  /**
   * Returns a new iterator object that contains the name-value pairs for each parameter in this MIME type.
   *
   * @returns A new iterator object.
   * @example
   * ```javascript
   * const mediaType = MediaType.fromString('application/soap+xml; charset=utf-8;action="https://example.com/example"');
   *
   * [ ...mediaType.parameters() ];
   * // → [ ["action", "https://example.com/example"], ["charset", "utf-8"] ]
   * ```
   */
  parameters(): IterableIterator<_Parameter> {
    const params: Array<_Parameter> = [];
    for (const param of this.#parameters.entries()) {
      params.push(param);
    }
    return params.toSorted((a, b) =>
      StringUtils.charSequenceSortComparator(a[0], b[0])
    )[Symbol.iterator]();
  }

  /**
   * Returns whether this MIME type has the specified parameter.
   *
   * @param parameterName The parameter name.
   * @returns If this MIME type has the specified parameter, `true`; Otherwise, `false`.
   * @example
   * ```javascript
   * const mediaType = MediaType.fromString('application/soap+xml; charset=utf-8;action="https://example.com/example"');
   *
   * mediaType.hasParameter("charset");
   * // → true
   *
   * mediaType.hasParameter("foo");
   * // → false
   * ```
   */
  hasParameter(parameterName: string): boolean {
    const normalizedName = parameterName.toLowerCase();
    return this.#parameters.has(normalizedName);
  }

  /**
   * Returns a value of a specified parameter of this MIME type.
   *
   * @param parameterName The parameter name.
   * @returns A parameter value. If the parameter does not exist, `null`.
   * @example
   * ```javascript
   * const mediaType = MediaType.fromString('application/soap+xml; charset=utf-8;action="https://example.com/example"');
   *
   * mediaType.getParameterValue("action");
   * // → "https://example.com/example"
   *
   * mediaType.getParameterValue("foo");
   * // → null
   * ```
   */
  getParameterValue(parameterName: string): string | null {
    const normalizedName = parameterName.toLowerCase();
    if (this.#parameters.has(normalizedName) !== true) {
      return null;
    }
    return this.#parameters.get(normalizedName) as string;
  }

  /**
   * Returns a copy of this instance with the specified parameters.
   *
   * @param parameters The set of parameter name-value pairs.
   * @returns A new instance.
   * @throws {TypeError} The `parameters` contains duplicate parameters.
   * @example
   * ```javascript
   * const sourceMediaType = MediaType.fromString('application/soap+xml; charset=utf-8;action="https://example.com/example"');
   *
   * const paramsModifiedClone = sourceMediaType.withParameters([ ["charset": "UTF-16"] ]);
   * paramsModifiedClone.toString();
   * // → 'application/soap+xml;charset=UTF-16'
   *
   * sourceMediaType.toString();
   * // → 'application/soap+xml;charset=utf-8;action="https://example.com/example"'
   * ```
   */
  withParameters(parameters: Array<_Parameter>): MediaType {
    return new MediaType(this.#typeName, this.#subtypeName, parameters);
  }

  /**
   * Returns a copy of this instance with no parameters.
   *
   * @returns A new instance.
   * @example
   * ```javascript
   * const sourceMediaType = MediaType.fromString('application/soap+xml; charset=utf-8;action="https://example.com/example"');
   *
   * const paramsRemovedClone = sourceMediaType.withoutParameters();
   * paramsRemovedClone.toString();
   * // → 'application/soap+xml'
   *
   * sourceMediaType.toString();
   * // → 'application/soap+xml;charset=utf-8;action="https://example.com/example"'
   * ```
   */
  withoutParameters(): MediaType {
    return new MediaType(this.#typeName, this.#subtypeName);
  }

  /**
   * Determines whether the MIME type represented by this instance is equal to the MIME type represented by other instance.
   *
   * @param other The other instance of `MediaType`.
   * @param options The `MediaType.CompareOptions` dictionary.
   * @returns If two MIME types are equal, `true`; Otherwise, `false`.
   * @example
   * ```javascript
   * const mediaTypeA = MediaType.fromString('application/soap+xml; charset=utf-8;action="https://example.com/example"');
   *
   * const mediaTypeB = MediaType.fromString('application/soap+xml; charset=utf-16;action="https://example.com/example"');
   * mediaTypeA.equals(mediaTypeB);
   * // → false
   *
   * const mediaTypeC = MediaType.fromString('APPLICATION/SOAP+XML;ACTION="https://example.com/example";CHARSET=utf-8');
   * mediaTypeA.equals(mediaTypeC);
   * // → true
   *
   * const mediaTypeD = MediaType.fromString('application/soap+xml; charset=UTF-8;action="https://example.com/example"');
   * mediaTypeA.equals(mediaTypeD);
   * // → false
   * mediaTypeA.equals(mediaTypeD, { caseInsensitiveParameters: ["charset"] });
   * // → true
   * ```
   */
  equals(other: MediaType, options?: _CompareOptions): boolean { // TODO string
    if (other instanceof MediaType) {
      if (options && Array.isArray(options.caseInsensitiveParameters)) {
        const thisParams = [...this.parameters()].map(
          ([paramName, paramValue]) => {
            return [
              paramName,
              options.caseInsensitiveParameters.includes(paramName)
                ? paramValue.toLowerCase()
                : paramValue,
            ] as _Parameter;
          },
        );
        const thisClone = new MediaType(this.type, this.subtype, thisParams);

        const objParams = [...other.parameters()].map(
          ([paramName, paramValue]) => {
            return [
              paramName,
              options.caseInsensitiveParameters.includes(paramName)
                ? paramValue.toLowerCase()
                : paramValue,
            ] as _Parameter;
          },
        );
        const objClone = new MediaType(other.type, other.subtype, objParams);

        return (thisClone.#format(true) === objClone.#format(true));
      }
      return (this.#format(true) === other.#format(true));
    }
    return false;
  }
}

export namespace MediaType {
  /**
   * The string tuple represents a MIME type parameter.
   */
  export type Parameter = _Parameter;

  /**
   * The `MediaType` equivalent comparison option.
   */
  export type CompareOptions = _CompareOptions;
}

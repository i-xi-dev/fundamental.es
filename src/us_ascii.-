// //

// const NAME = "US-ASCII";

// type UsAsciiDecoderOptions = {
//   fatal?: boolean, //TODO 原理的にUint8ArrayからのUS-ASCIIのデコードでエラーは起こりえないので不要では
// };

// class UsAsciiDecoder implements TextDecoder {
//   #fatal: boolean;
//   #delegate: TextDecoder;
//   constructor(options: UsAsciiDecoderOptions = {}) {
//     this.#fatal = (typeof options.fatal === "boolean") ? options.fatal : false;
//     this.#delegate = new TextDecoder(NAME, {
//       fatal: this.#fatal,
//       //ignoreBOM: 
//     });
//     Object.freeze(this);
//   }

//   get encoding(): string {
//     return NAME;
//   }

//   get fatal(): boolean {
//     return this.#fatal;
//   }

//   get ignoreBOM(): boolean {
//     //TODO
//   }

//   decode(input?: BufferSource, options: TextDecodeOptions = {}): string {
//     //TODO options.stream

//     const decoded = this.#delegate.decode(input);
//     if (/^[\u{0}-\u{7F}]*$/u.test(decoded) !== true) {
//       if (this.#fatal === true) {
//         throw new TypeError("decode error");
//       }
//       // return decoded.replaceAll(/[^\u{0}-\u{7F}]/gu, "\u{FFFD}");
//       return decoded.replace(/[^\u{0}-\u{7F}]/gu, "\u{FFFD}");//TODO 3Fが良い？指定可能にする？
//     }
//     return decoded;
//   }
// }
// Object.freeze(UsAsciiDecoder);

// class UsAsciiEncoder implements TextEncoder {
//   #delegate: TextEncoder;
//   constructor() {
//     //TODO fatalが必要
//     this.#delegate = new TextEncoder();
//   }

//   get encoding(): string {
//     return NAME;
//   }

//   encode(input: string): Uint8Array {
//     if (/^[\u{0}-\u{7F}]*$/u.test(input) !== true) {
//       if (this.#fatal === true) {
//         throw new TypeError("encode error");
//       }
//       // return this.#delegate.encode(input.replaceAll(/[^\u{0}-\u{7F}]/gu, "\u{3F}"));
//       return this.#delegate.encode(input.replace(/[^\u{0}-\u{7F}]/gu, "\u{3F}"));
//     }
//     return this.#delegate.encode(input);
//   }
// }
// Object.freeze(UsAsciiEncoder);

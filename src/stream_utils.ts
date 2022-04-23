// TODO 削除

/**
 * 可読ストリームを読み取り、チャンクを返却する非同期ジェネレーターを返却
  // XXX ReadableStream自体が[Symbol.asyncIterator]を持つようになる
 * 
 * @deprecated
 * @param streamReader The reader created from `ReadableStream`.
 * @returns チャンクを返却する非同期ジェネレーター
 */
async function* streamToAsyncGenerator<T>(streamReader: ReadableStreamDefaultReader<T>): AsyncGenerator<T, void, void> {
  try {
    for (let i = await streamReader.read(); (i.done !== true); i = await streamReader.read()) {
      yield i.value;
    }
  }
  catch (exception) {
    return;
  }
}

export {
  streamToAsyncGenerator,
};

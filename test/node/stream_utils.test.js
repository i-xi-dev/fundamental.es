import assert from "node:assert";
import { ReadableStream } from "node:stream/web";
import { StreamUtils } from "../../dist/index.js";

describe("StreamUtils.streamToAsyncGenerator", () => {
  it("streamToAsyncGenerator(ReadableStreamDefaultReader)", async () => {
    let ti;
    const s = new ReadableStream({
      start(controller) {
        let c = 0;
        ti = setInterval(() => {
          if (c >= 10) {
            clearInterval(ti);
            controller.close();
            return;
          }
          c = c + 1;

          let x = c.toString(10).padStart(2, "0");
          controller.enqueue(x);
        }, 10);
      },
    });

    const chunks = StreamUtils.streamToAsyncGenerator(s.getReader());
    const result = [];
    for await (const chunk of chunks) {
      result.push(chunk);
    }

    assert.strictEqual(result.join(""), "01020304050607080910");

  });

  it("streamToAsyncGenerator(ReadableStreamDefaultReader)/return", async () => {
    let ti;
    const s = new ReadableStream({
      start(controller) {
        let c = 0;
        ti = setInterval(() => {
          if (c >= 10) {
            clearInterval(ti);
            controller.close();
            return;
          }
          c = c + 1;

          let x = c.toString(10).padStart(2, "0");
          controller.enqueue(x);
        }, 10);
      },
    });

    const chunks = StreamUtils.streamToAsyncGenerator(s.getReader());
    const result = [];
    let i = 0;
    for await (const chunk of chunks) {
      i = i + 1;
      if (i > 5) {
        break; //chunks.return();が呼ばれる
      }
      result.push(chunk);
    }

    assert.strictEqual(result.join(""), "0102030405");

  });

  it("streamToAsyncGenerator(ReadableStreamDefaultReader)/throw", async () => {
    let ti;
    const s = new ReadableStream({
      start(controller) {
        let c = 0;
        ti = setInterval(() => {
          if (c >= 10) {
            clearInterval(ti);
            controller.close();
            return;
          }
          c = c + 1;

          let x = c.toString(10).padStart(2, "0");
          controller.enqueue(x);
        }, 10);
      },
    });

    const chunks = StreamUtils.streamToAsyncGenerator(s.getReader());
    const result = [];
    let i = 0;
    try {
      for (let i = 0; i < 10; i++) {
        if (i >= 5) {
          await chunks.throw("");
        }
        result.push((await chunks.next()).value);
      }
    }
    catch (e) {
      console.log(e);
    }

    assert.strictEqual(result.join(""), "0102030405");

  });

});

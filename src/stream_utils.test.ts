import { ReadableStream } from "node:stream/web";
import { StreamUtils } from "./stream_utils";

describe("StreamUtils.streamToAsyncGenerator", () => {
  it("streamToAsyncGenerator(ReadableStreamDefaultReader)", async () => {
    let ti: NodeJS.Timeout;
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

    expect(result.join("")).toBe("01020304050607080910");

  });

});
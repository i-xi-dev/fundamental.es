import assert from "node:assert";
import fs from "node:fs";
import { Readable } from "node:stream";
import { ReadableStream } from "node:stream/web";
import { ByteStreamReader } from "../../../dist/index.js";

describe("ByteStreamReader.createReadingProgress", async () => {
  it("ByteStreamReader.createReadingProgress(ReadableStream)/initiate()", async () => {
    const stream0 = fs.createReadStream("./test/_data/0.txt", { highWaterMark: 64 });
    const reading = ByteStreamReader.createReadingProgress(Readable.toWeb(stream0));
    const bytes0 = await reading.initiate();
    assert.strictEqual(bytes0.byteLength, 0);

    const stream = fs.createReadStream("./test/_data/128.txt", { highWaterMark: 64 });
    const reading0 = ByteStreamReader.createReadingProgress(Readable.toWeb(stream));
    const bytes = await reading0.initiate();
    assert.strictEqual(bytes.byteLength, 128);

  });

  it("ByteStreamReader.createReadingProgress(ReadableStream)/initiate() - 2", async () => {
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

          let x = Uint8Array.of(1,2,3,4,5,6,7,8);
          controller.enqueue(x);
        }, 10);
      },
    });

    const reading = ByteStreamReader.createReadingProgress(s);
    const bytes0 = await reading.initiate();
    assert.strictEqual(bytes0.byteLength, 80);

  });

  it("ByteStreamReader.createReadingProgress(ReadableStream, {total:number})/initiate()", async () => {
    const stream0 = fs.createReadStream("./test/_data/0.txt", { highWaterMark: 64 });
    const reading0 = ByteStreamReader.createReadingProgress(Readable.toWeb(stream0), {total:0});
    const bytes0 = await reading0.initiate();
    assert.strictEqual(bytes0.byteLength, 0);
    assert.strictEqual(bytes0.buffer.byteLength, 0);

    const stream = fs.createReadStream("./test/_data/128.txt", { highWaterMark: 64 });
    const reading = ByteStreamReader.createReadingProgress(Readable.toWeb(stream), {total:128});
    const bytes = await reading.initiate();
    assert.strictEqual(bytes.byteLength, 128);
    assert.strictEqual(bytes.buffer.byteLength, 128);

    const stream5 = fs.createReadStream("./test/_data/128.txt", { highWaterMark: 64 });
    const reading5 = ByteStreamReader.createReadingProgress(Readable.toWeb(stream5), {total:1024});
    const bytes5 = await reading5.initiate();
    assert.strictEqual(bytes5.byteLength, 128);
    assert.strictEqual(bytes5.buffer.byteLength, 128);

    const stream6 = fs.createReadStream("./test/_data/128.txt", { highWaterMark: 64 });
    const reading6 = ByteStreamReader.createReadingProgress(Readable.toWeb(stream6), {total:32});
    const bytes6 = await reading6.initiate();
    assert.strictEqual(bytes6.byteLength, 128);
    assert.strictEqual(bytes6.buffer.byteLength, 128);

  });

  //TODO






});

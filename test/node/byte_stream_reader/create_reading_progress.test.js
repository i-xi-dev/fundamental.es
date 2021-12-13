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

  it("ByteStreamReader.createReadingProgress(ReadableStream, {signal:AbortSignal})/initiate()", async () => {
    const stream = fs.createReadStream("./test/_data/128.txt", { highWaterMark: 64 });
    const ac = new AbortController();
    const reading = ByteStreamReader.createReadingProgress(Readable.toWeb(stream), {signal: ac.signal});
    const bytes = await reading.initiate();
    assert.strictEqual(bytes.byteLength, 128);

    const stream2 = fs.createReadStream("./test/_data/128.txt", { highWaterMark: 64 });
    const ac2 = new AbortController();
    ac2.abort();
    const reading2 = ByteStreamReader.createReadingProgress(Readable.toWeb(stream2), {signal: ac2.signal});
    await assert.rejects(async () => {
      await reading2.initiate();
    }, {
      name: "AbortError",
      message: "already aborted"
    });

  });

  it("ByteStreamReader.createReadingProgress(ReadableStream, {signal:AbortSignal})/initiate() - abort", async () => {
    let ti;
    const ac = new AbortController();
    const s = new ReadableStream({
      start(controller) {
        let c = 0;
        ti = setInterval(() => {
          if (ac.signal.aborted === true) {
            clearInterval(ti);
            return;
          }
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

    setTimeout(() => {
      ac.abort();
    }, 10);
    const reading = ByteStreamReader.createReadingProgress(s, {signal: ac.signal});
    await assert.rejects(async () => {
      await reading.initiate();
    }, {
      name: "AbortError",
      message: "aborted"
    });

  });

  it("ByteStreamReader.createReadingProgress(ReadableStream, {timeout:number})/initiate()", async () => {
    const stream5 = fs.createReadStream("./test/_data/128.txt", { highWaterMark: 64 });
    const reading5 = ByteStreamReader.createReadingProgress(Readable.toWeb(stream5), { timeout:1000, });
    const bytes5 = await reading5.initiate();
    assert.strictEqual(bytes5.byteLength, 128);

    const stream6 = fs.createReadStream("./test/_data/4096.txt", { highWaterMark: 64 });
    const reading6 = ByteStreamReader.createReadingProgress(Readable.toWeb(stream6), { timeout:1, });
    await assert.rejects(async () => {
      await reading6.initiate();
    }, {
      name: "TimeoutError"
    });

  });

  it("ByteStreamReader.createReadingProgress(ReadableStream, {timeout:number})/addEventListener()", async () => {
    const stream = fs.createReadStream("./test/_data/128.txt", { highWaterMark: 64 });
    const reading2 = ByteStreamReader.createReadingProgress(Readable.toWeb(stream));
    let es = [];
    reading2.addEventListener("progress", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es.push(i);
    });
    reading2.addEventListener("loadstart", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es.push(i);
    });
    reading2.addEventListener("loadend", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es.push(i);
    });
    reading2.addEventListener("abort", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es.push(i);
    });
    reading2.addEventListener("timeout", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es.push(i);
    });
    reading2.addEventListener("error", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es.push(i);
    });
    reading2.addEventListener("load", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es.push(i);
    });

    const bytes = await reading2.initiate();
    assert.strictEqual(bytes.byteLength, 128);
    let i = 0;
    for (const e of es) {
      assert.strictEqual(e.total, 0);
      assert.strictEqual(e.lengthComputable, false);
      assert.strictEqual(e.loaded, i);
      if (["loadstart","progress"].includes(e.type)) {
        i = i + 64;
      }
    }

    const stream2 = fs.createReadStream("./test/_data/128.txt", { highWaterMark: 64 });
    const reading3 = ByteStreamReader.createReadingProgress(Readable.toWeb(stream2), {total:128});
    let es2 = [];
    reading3.addEventListener("progress", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es2.push(i);
    });
    reading3.addEventListener("loadstart", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es2.push(i);
    });
    reading3.addEventListener("loadend", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es2.push(i);
    });
    reading3.addEventListener("abort", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es2.push(i);
    });
    reading3.addEventListener("timeout", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es2.push(i);
    });
    reading3.addEventListener("error", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es2.push(i);
    });
    reading3.addEventListener("load", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es2.push(i);
    });

    const bytes2 = await reading3.initiate();
    assert.strictEqual(bytes2.byteLength, 128);
    let i2 = 0;
    for (const e of es2) {
      assert.strictEqual(e.total, 128);
      assert.strictEqual(e.lengthComputable, true);
      assert.strictEqual(e.loaded, i2);
      if (["loadstart","progress"].includes(e.type)) {
        i2 = i2 + 64;
      }
    }

  });

  it("ByteStreamReader.createReadingProgress(ReadableStream, {timeout:number})/addEventListener() - size mismatch", async () => {
    const stream = fs.createReadStream("./test/_data/128.txt", { highWaterMark: 64 });
    const reading2 = ByteStreamReader.createReadingProgress(Readable.toWeb(stream), {total:256});
    let es = [];
    reading2.addEventListener("progress", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es.push(i);
    });
    reading2.addEventListener("loadstart", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es.push(i);
    });
    reading2.addEventListener("loadend", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es.push(i);
    });
    reading2.addEventListener("abort", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es.push(i);
    });
    reading2.addEventListener("timeout", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es.push(i);
    });
    reading2.addEventListener("error", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es.push(i);
    });
    reading2.addEventListener("load", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es.push(i);
    });

    const bytes = await reading2.initiate();
    assert.strictEqual(bytes.byteLength, 128);
    let i = 0;
    for (const e of es) {
      assert.strictEqual(e.total, 256);
      assert.strictEqual(e.lengthComputable, true);
      assert.strictEqual(e.loaded, i);
      if (["loadstart","progress"].includes(e.type)) {
        i = i + 64;
      }
    }

    const stream2 = fs.createReadStream("./test/_data/128.txt", { highWaterMark: 64 });
    const reading3 = ByteStreamReader.createReadingProgress(Readable.toWeb(stream2), {total:64});
    let es2 = [];
    reading3.addEventListener("progress", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es2.push(i);
    });
    reading3.addEventListener("loadstart", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es2.push(i);
    });
    reading3.addEventListener("loadend", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es2.push(i);
    });
    reading3.addEventListener("abort", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es2.push(i);
    });
    reading3.addEventListener("timeout", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es2.push(i);
    });
    reading3.addEventListener("error", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es2.push(i);
    });
    reading3.addEventListener("load", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es2.push(i);
    });

    const bytes2 = await reading3.initiate();
    assert.strictEqual(bytes2.byteLength, 128);
    let i2 = 0;
    for (const e of es2) {
      assert.strictEqual(e.total, 64);
      assert.strictEqual(e.lengthComputable, true);
      assert.strictEqual(e.loaded, i2);
      if (["loadstart","progress"].includes(e.type)) {
        i2 = i2 + 64;
      }
    }

  });

  it("ByteStreamReader.createReadingProgress(ReadableStream, {signal:AbortSignal})/addEventListener() - abort", async () => {
    let ti;
    const ac = new AbortController();
    const s = new ReadableStream({
      start(controller) {
        let c = 0;
        ti = setInterval(() => {
          if (ac.signal.aborted === true) {
            clearInterval(ti);
            return;
          }
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

    setTimeout(() => {
      ac.abort();
    }, 10);
    const reading = ByteStreamReader.createReadingProgress(s, {signal: ac.signal});
    let aborted = false;
    let loadended = false;
    reading.addEventListener("abort", () => {
      console.log("--------------------------------")
      aborted = true;
    });
    reading.addEventListener("loadend", () => {
      console.log("--------------------------------")
      loadended = true;
    });
    await assert.rejects(async () => {
      await reading.initiate();
    }, {
      name: "AbortError",
      message: "aborted"
    });

    assert.strictEqual(aborted, true);
    assert.strictEqual(loadended, true);

  });

  it("ByteStreamReader.createReadingProgress(ReadableStream, {timeout:number})/addEventListener() - timeout", async () => {
    const stream6 = fs.createReadStream("./test/_data/4096.txt", { highWaterMark: 64 });
    const reading6 = ByteStreamReader.createReadingProgress(Readable.toWeb(stream6), { timeout:1, });
    let aborted = false;
    let loadended = false;
    reading6.addEventListener("timeout", () => {
      console.log("--------------------------------")
      aborted = true;
    });
    reading6.addEventListener("loadend", () => {
      console.log("--------------------------------")
      loadended = true;
    });
    await assert.rejects(async () => {
      await reading6.initiate();
    }, {
      name: "TimeoutError"
    });

    assert.strictEqual(aborted, true);
    assert.strictEqual(loadended, true);

  });

  it("ByteStreamReader.createReadingProgress(ReadableStream)/addEventListener() - error", async () => {
    // 意図的にerrorは無理では
  });

});

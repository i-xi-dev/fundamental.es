import assert from "node:assert";
import fs from "node:fs";
import { Readable } from "node:stream";
import { ReadableStream } from "node:stream/web";
import { ByteStreamReader } from "../../../dist/index.js";

const reader = new ByteStreamReader();

describe("ByteStreamReader.prototype.read", async () => {
  it("read(ReadableStream)", async () => {
    const stream0 = fs.createReadStream("./test/_data/0.txt", { highWaterMark: 64 });
    const bytes0 = await reader.read(Readable.toWeb(stream0));
    assert.strictEqual(bytes0.byteLength, 0);

    const stream = fs.createReadStream("./test/_data/128.txt", { highWaterMark: 64 });
    const bytes = await reader.read(Readable.toWeb(stream));
    assert.strictEqual(bytes.byteLength, 128);

  });

  it("read(ReadableStream)", async () => {
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

    const bytes0 = await reader.read(s);
    assert.strictEqual(bytes0.byteLength, 80);

  });

  it("read(ReadableStream, number)", async () => {
    const stream0 = fs.createReadStream("./test/_data/0.txt", { highWaterMark: 64 });
    const bytes0 = await reader.read(Readable.toWeb(stream0), 0);
    assert.strictEqual(bytes0.byteLength, 0);
    assert.strictEqual(bytes0.buffer.byteLength, 0);

    const stream = fs.createReadStream("./test/_data/128.txt", { highWaterMark: 64 });
    const bytes = await reader.read(Readable.toWeb(stream), 128);
    assert.strictEqual(bytes.byteLength, 128);
    assert.strictEqual(bytes.buffer.byteLength, 128);

    // const stream2 = fs.createReadStream("./test/_data/128.txt", { highWaterMark: 64 });
    // const bytes2 = await reader.read(Readable.toWeb(stream2), 256);
    // assert.strictEqual(bytes2.byteLength, 128);
    // assert.strictEqual(bytes2.buffer.byteLength, 256);

    // const stream3 = fs.createReadStream("./test/_data/128.txt", { highWaterMark: 64 });
    // await assert.rejects(async () => {
    //   await reader.read(Readable.toWeb(stream3), 64)
    // }, {
    //   message: "Stream size too long"
    // });

    // const stream4 = fs.createReadStream("./test/_data/128.txt", { highWaterMark: 64 });
    // await assert.rejects(async () => {
    //   await reader.read(Readable.toWeb(stream4), 256)
    // }, {
    //   message: "Stream size too short"
    // });

    const stream5 = fs.createReadStream("./test/_data/128.txt", { highWaterMark: 64 });
    const bytes5 = await reader.read(Readable.toWeb(stream5), 1024);
    assert.strictEqual(bytes5.byteLength, 128);
    assert.strictEqual(bytes5.buffer.byteLength, 128);

    const stream6 = fs.createReadStream("./test/_data/128.txt", { highWaterMark: 64 });
    const bytes6 = await reader.read(Readable.toWeb(stream6), 32);
    assert.strictEqual(bytes6.byteLength, 128);
    assert.strictEqual(bytes6.buffer.byteLength, 128);

  });

  // it("read(ReadableStream, number, {truncateUnused:false})", async () => {
  //   const stream0 = fs.createReadStream("./test/_data/0.txt", { highWaterMark: 64 });
  //   const bytes0 = await reader.read(Readable.toWeb(stream0), 0, {truncateUnused:false});
  //   assert.strictEqual(bytes0.byteLength, 0);
  //   assert.strictEqual(bytes0.buffer.byteLength, 0);

  //   const stream = fs.createReadStream("./test/_data/128.txt", { highWaterMark: 64 });
  //   const bytes = await reader.read(Readable.toWeb(stream), 128, {truncateUnused:false});
  //   assert.strictEqual(bytes.byteLength, 128);
  //   assert.strictEqual(bytes.buffer.byteLength, 128);

  //   const stream5 = fs.createReadStream("./test/_data/128.txt", { highWaterMark: 64 });
  //   const bytes5 = await reader.read(Readable.toWeb(stream5), 1024, {truncateUnused:false});
  //   assert.strictEqual(bytes5.byteLength, 128);
  //   assert.strictEqual(bytes5.buffer.byteLength, 1024);

  //   const stream6 = fs.createReadStream("./test/_data/128.txt", { highWaterMark: 64 });
  //   const bytes6 = await reader.read(Readable.toWeb(stream6), 32, {truncateUnused:false});
  //   assert.strictEqual(bytes6.byteLength, 128);
  //   assert.strictEqual(bytes6.buffer.byteLength, 10485760);

  // });

  it("read(ReadableStream, number, {signal:AbortSignal})", async () => {
    const stream = fs.createReadStream("./test/_data/128.txt", { highWaterMark: 64 });
    const ac = new AbortController();
    const bytes = await reader.read(Readable.toWeb(stream), 128, {signal: ac.signal});
    assert.strictEqual(bytes.byteLength, 128);

    const stream2 = fs.createReadStream("./test/_data/128.txt", { highWaterMark: 64 });
    const ac2 = new AbortController();
    ac2.abort();
    await assert.rejects(async () => {
      await reader.read(Readable.toWeb(stream2), 128, {signal: ac2.signal})
    }, {
      message: "already aborted"
    });

    const stream3 = new Readable({
      read() {}
    });
    const ac3 = new AbortController();
    let i = 0;
    const t = setInterval(() => {
      i++;
      if (i > 10) {
        stream3.push(null);
        clearInterval(t);
      }
      else {
        stream3.push(new Uint8Array(64));
      }
    }, 2);
    const bytes3 = await reader.read(Readable.toWeb(stream3), undefined, {signal: ac3.signal});
    assert.strictEqual(bytes3.byteLength, 640);

    const stream4 = new Readable({
      read() {}
    });
    const ac4 = new AbortController();
    let i2 = 0;
    const t2 = setInterval(() => {
      i2++;
      if (i2 > 10) {
        ac4.abort();
        clearInterval(t2);
      }
      else {
        stream4.push(new Uint8Array(64));
      }
    }, 2);
    await assert.rejects(async () => {
      await reader.read(Readable.toWeb(stream4), undefined, {signal: ac4.signal})
    }, {
      message: "aborted"
    });

  });

  it("read(ReadableStream, number, {timeout:number})", async () => {
    const stream5 = fs.createReadStream("./test/_data/128.txt", { highWaterMark: 64 });
    const bytes5 = await reader.read(Readable.toWeb(stream5), 128, { timeout:1000, });
    assert.strictEqual(bytes5.byteLength, 128);

    const stream6 = fs.createReadStream("./test/_data/4096.txt", { highWaterMark: 64 });
    await assert.rejects(async () => {
      await reader.read(Readable.toWeb(stream6), 4096, { timeout:1, });
    }, {
      name: "TimeoutError"
    });

  });

  // obsolete
  // it("read(ReadableStream, number, {acceptSizeMismatch:boolean})", async () => {
  //   const stream5 = fs.createReadStream("./test/_data/128.txt", { highWaterMark: 64 });
  //   const bytes5 = await reader.read(Readable.toWeb(stream5), 64, { acceptSizeMismatch:true, });
  //   assert.strictEqual(bytes5.byteLength, 128);
  //   //assert.strictEqual(bytes5.buffer.byteLength, 10485824);

  //   const stream6 = fs.createReadStream("./test/_data/128.txt", { highWaterMark: 64 });
  //   const bytes6 = await reader.read(Readable.toWeb(stream6), 256, { acceptSizeMismatch:true, });
  //   assert.strictEqual(bytes6.byteLength, 128);
  //   assert.strictEqual(bytes6.buffer.byteLength, 256);

  // });

  it("read(ReadableStream, number, {progressEventTarget:EventTarget})", async () => {
    const reader2 = new ByteStreamReader();
    let es = [];
    const et1 = new EventTarget();
    et1.addEventListener("progress", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es.push(i);
    });
    et1.addEventListener("loadstart", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es.push(i);
    });
    et1.addEventListener("loadend", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es.push(i);
    });
    et1.addEventListener("abort", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es.push(i);
    });
    et1.addEventListener("timeout", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es.push(i);
    });
    et1.addEventListener("error", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es.push(i);
    });
    et1.addEventListener("load", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es.push(i);
    });

    const stream = fs.createReadStream("./test/_data/128.txt", { highWaterMark: 64 });
    const bytes = await reader2.read(Readable.toWeb(stream), undefined, {progressEventTarget:et1});
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

    const reader3 = new ByteStreamReader();
    let es2 = [];
    const et2 = new EventTarget();
    et2.addEventListener("progress", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es2.push(i);
    });
    et2.addEventListener("loadstart", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es2.push(i);
    });
    et2.addEventListener("loadend", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es2.push(i);
    });
    et2.addEventListener("abort", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es2.push(i);
    });
    et2.addEventListener("timeout", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es2.push(i);
    });
    et2.addEventListener("error", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es2.push(i);
    });
    et2.addEventListener("load", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es2.push(i);
    });

    const stream2 = fs.createReadStream("./test/_data/128.txt", { highWaterMark: 64 });
    const bytes2 = await reader3.read(Readable.toWeb(stream2), 128, {progressEventTarget:et2});
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

  it("read(ReadableStream, number, {progressEventTarget:EventTarget}) - size mismatch", async () => {
    const reader2 = new ByteStreamReader();
    let es = [];
    const et1 = new EventTarget();
    et1.addEventListener("progress", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es.push(i);
    });
    et1.addEventListener("loadstart", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es.push(i);
    });
    et1.addEventListener("loadend", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es.push(i);
    });
    et1.addEventListener("abort", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es.push(i);
    });
    et1.addEventListener("timeout", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es.push(i);
    });
    et1.addEventListener("error", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es.push(i);
    });
    et1.addEventListener("load", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es.push(i);
    });

    const stream = fs.createReadStream("./test/_data/128.txt", { highWaterMark: 64 });
    const bytes = await reader2.read(Readable.toWeb(stream), 256, {progressEventTarget:et1});
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

    const reader3 = new ByteStreamReader();
    let es2 = [];
    const et2 = new EventTarget();
    et2.addEventListener("progress", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es2.push(i);
    });
    et2.addEventListener("loadstart", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es2.push(i);
    });
    et2.addEventListener("loadend", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es2.push(i);
    });
    et2.addEventListener("abort", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es2.push(i);
    });
    et2.addEventListener("timeout", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es2.push(i);
    });
    et2.addEventListener("error", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es2.push(i);
    });
    et2.addEventListener("load", (e) => {
      const i = {type: e.type,loaded: e.loaded,total: e.total,lengthComputable: e.lengthComputable,};
      console.log(i);
      es2.push(i);
    });

    const stream2 = fs.createReadStream("./test/_data/128.txt", { highWaterMark: 64 });
    const bytes2 = await reader3.read(Readable.toWeb(stream2), 64, {progressEventTarget:et2});
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

  //TODO abort, timeout, error, loadend

});

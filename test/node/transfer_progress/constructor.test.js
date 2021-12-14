import assert from "node:assert";
import fs from "node:fs";
import { Readable } from "node:stream";
import { ReadableStream } from "node:stream/web";
import { TransferProgress } from "../../../dist/index.js";

async function* createChunkGenerator() {
  for (let i = 0; i < 10; i++) {
    yield i.toString(10).padStart(4, "0");
  }
}

describe("TransferProgress", async () => {
  it("ByteStreamReader(Object)", async () => {
    let buffer = "";
    const p = new TransferProgress({
      chunkGenerator: createChunkGenerator(),

      transferChunk(chunkStr) {
        buffer = buffer + chunkStr;
        return buffer.length;
      },

      terminate() {
      },

      transferredResult() {
        return buffer;
      },
    });

    assert.strictEqual(p.total, undefined);
    assert.strictEqual(p.loaded, 0);
    assert.strictEqual(p.indeterminate, true);
    assert.strictEqual(p.percentage, 0);

    const r = await p.initiate();
    assert.strictEqual(r, "0000000100020003000400050006000700080009");

    assert.strictEqual(p.total, undefined);
    assert.strictEqual(p.loaded, 40);
    assert.strictEqual(p.indeterminate, true);
    assert.strictEqual(p.percentage, 0);

  });

  it("ByteStreamReader(Object, {total:number})", async () => {
    let buffer = "";
    const p = new TransferProgress({
      chunkGenerator: createChunkGenerator(),

      transferChunk(chunkStr) {
        buffer = buffer + chunkStr;
        return buffer.length;
      },

      terminate() {
      },

      transferredResult() {
        return buffer;
      },
    }, {
      total: 40,
    });

    assert.strictEqual(p.total, 40);
    assert.strictEqual(p.loaded, 0);
    assert.strictEqual(p.indeterminate, false);
    assert.strictEqual(p.percentage, 0);

    const r = await p.initiate();
    assert.strictEqual(r, "0000000100020003000400050006000700080009");

    assert.strictEqual(p.total, 40);
    assert.strictEqual(p.loaded, 40);
    assert.strictEqual(p.indeterminate, false);
    assert.strictEqual(p.percentage, 100);

  });

  it("ByteStreamReader(Object, {timeout:number})", async () => {
    // ByteStreamReaderで実施
  });

  it("ByteStreamReader(Object, {abort:AbortSignal})", async () => {
    // ByteStreamReaderで実施
  });

  it("ByteStreamReader(Object)/addEventListener() - error", async () => {
    let buffer = "";
    const p = new TransferProgress({
      chunkGenerator: createChunkGenerator(),

      transferChunk() {
        throw new Error("xxxxx");
      },

      terminate() {
      },

      transferredResult() {
        return buffer;
      },
    });

    assert.strictEqual(p.total, undefined);
    assert.strictEqual(p.loaded, 0);
    assert.strictEqual(p.indeterminate, true);
    assert.strictEqual(p.percentage, 0);

    let errorRaised = false;
    p.addEventListener("error", () => {
      errorRaised = true;
    });
    let loadended = false;
    p.addEventListener("loadend", () => {
      loadended = true;
    });

    await assert.rejects(async () => {
      await p.initiate();
    }, {
      name: "Error"
    });

    assert.strictEqual(errorRaised, true);
    assert.strictEqual(loadended, true);

  });

  it("ByteStreamReader(Object)/addEventListener() - error以外", async () => {
    // ByteStreamReaderで実施
  });

});

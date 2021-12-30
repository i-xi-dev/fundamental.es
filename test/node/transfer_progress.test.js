import assert from "node:assert";
import { TransferProgress } from "../../dist/index.js";

async function* createChunkGenerator() {
  for (let i = 0; i < 10; i++) {
    yield i.toString(10).padStart(4, "0");
  }
}

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

async function* createChunkGenerator2(interval) {
  for (let i = 0; i < 10; i++) {
    await wait(interval);
    yield i.toString(10).padStart(4, "0");
  }
}

describe("TransferProgress", () => {
  it("TransferProgress(Object)", async () => {
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

  it("TransferProgress(Object, {total:number})", async () => {
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

    await assert.rejects(async () => {
      await p.initiate();
    }, {
      name: "Error",
      message: "invalid state",
    });

  });

  it("TransferProgress(Object, {total:number}) - error", () => {
    assert.throws(() => {
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
        total: -1,
      });
    }, {
      name: "TypeError",
      message: "total",
    });

    assert.throws(() => {
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
        total: "100",
      });
    }, {
      name: "TypeError",
      message: "total",
    });

  });

  it("TransferProgress(Object, {timeout:number})", async () => {
    let buffer = "";
    const p = new TransferProgress({
      chunkGenerator: createChunkGenerator2(100),

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
      timeout: 250,
    });

    assert.strictEqual(p.total, undefined);
    assert.strictEqual(p.loaded, 0);
    assert.strictEqual(p.indeterminate, true);
    assert.strictEqual(p.percentage, 0);

    let timeouted = false;
    p.addEventListener("timeout", () => {
      timeouted = true;
    });

    let r;
    await assert.rejects(async () => {
      r = await p.initiate();
    }, {
      name: "TimeoutError",
      message: "timeout",
    });
    //assert.strictEqual(r, "00000001"); //TODO 中断しても結果を取れるようにすべき？？

    assert.strictEqual(p.total, undefined);
    assert.strictEqual(p.loaded, 8);
    assert.strictEqual(p.indeterminate, true);
    assert.strictEqual(p.percentage, 0);

    assert.strictEqual(timeouted, true);

  });

  it("TransferProgress(Object, {abort:AbortSignal})", async () => {
    let buffer = "";
    const ac = new AbortController();
    const p = new TransferProgress({
      chunkGenerator: createChunkGenerator2(100),

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
      signal: ac.signal,
    });

    assert.strictEqual(p.total, undefined);
    assert.strictEqual(p.loaded, 0);
    assert.strictEqual(p.indeterminate, true);
    assert.strictEqual(p.percentage, 0);

    let aborted = false;
    p.addEventListener("abort", () => {
      aborted = true;
    });

    setTimeout(() => {
      ac.abort();
    }, 250);
    let r;
    await assert.rejects(async () => {
      r = await p.initiate();
    }, {
      name: "AbortError",
      message: "aborted",
    });
    //assert.strictEqual(r, "00000001"); //TODO 中断しても結果を取れるようにすべき？？

    assert.strictEqual(p.total, undefined);
    assert.strictEqual(p.loaded, 8);
    assert.strictEqual(p.indeterminate, true);
    assert.strictEqual(p.percentage, 0);

    assert.strictEqual(aborted, true);

  });

  it("TransferProgress(Object, {abort:AbortSignal}) - error", async () => {
    let buffer = "";
    const ac = new AbortController();
    ac.abort();
    const p = new TransferProgress({
      chunkGenerator: createChunkGenerator2(100),

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
      signal: ac.signal,
    });

    assert.strictEqual(p.total, undefined);
    assert.strictEqual(p.loaded, 0);
    assert.strictEqual(p.indeterminate, true);
    assert.strictEqual(p.percentage, 0);

    let r;
    await assert.rejects(async () => {
      r = await p.initiate();
    }, {
      name: "AbortError",
      message: "already aborted",
    });
    //assert.strictEqual(r, ""); //TODO 中断しても結果を取れるようにすべき？？

    assert.strictEqual(p.total, undefined);
    assert.strictEqual(p.loaded, 0);
    assert.strictEqual(p.indeterminate, true);
    assert.strictEqual(p.percentage, 0);

  });

  it("TransferProgress(Object)/addEventListener()", async () => {
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

    let loadstarted = false;
    p.addEventListener("loadstart", () => {
      loadstarted = true;
    });
    let load = 0;
    p.addEventListener("load", () => {
      load++;
    });
    let aborted = false;
    p.addEventListener("abort", () => {
      aborted = true;
    });
    let timeouted = false;
    p.addEventListener("timeout", () => {
      timeouted = true;
    });
    let errorRaised = false;
    p.addEventListener("error", () => {
      errorRaised = true;
    });
    let loadended = false;
    p.addEventListener("loadend", () => {
      loadended = true;
    });

    await p.initiate();

    assert.strictEqual(loadstarted, true);
    assert.strictEqual(load >= 1, true);
    assert.strictEqual(aborted, false);
    assert.strictEqual(timeouted, false);
    assert.strictEqual(errorRaised, false);
    assert.strictEqual(loadended, true);

  });

  it("TransferProgress(Object)/addEventListener() - error", async () => {
    let buffer = "";
    const p = new TransferProgress({
      chunkGenerator: createChunkGenerator(),

      transferChunk() {
        throw new Error("test-ex");
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
      name: "Error",
      message: "test-ex",
    });

    assert.strictEqual(errorRaised, true);
    assert.strictEqual(loadended, true);

  });

});

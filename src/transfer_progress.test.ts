import { TransferProgress } from "./transfer_progress";

async function* createChunkGenerator() {
  for (let i = 0; i < 10; i++) {
    yield i.toString(10).padStart(4, "0");
  }
}

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

async function* createChunkGenerator2(interval: number) {
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

    expect(p.total).toBeUndefined();
    expect(p.loaded).toBe(0);
    expect(p.indeterminate).toBe(true);
    expect(p.percentage).toBe(0);

    const r = await p.initiate();
    expect(r).toBe("0000000100020003000400050006000700080009");

    expect(p.total).toBeUndefined();
    expect(p.loaded).toBe(40);
    expect(p.indeterminate).toBe(true);
    expect(p.percentage).toBe(0);

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

    expect(p.total).toBe(40);
    expect(p.loaded).toBe(0);
    expect(p.indeterminate).toBe(false);
    expect(p.percentage).toBe(0);

    const r = await p.initiate();
    expect(r).toBe("0000000100020003000400050006000700080009");

    expect(p.total).toBe(40);
    expect(p.loaded).toBe(40);
    expect(p.indeterminate).toBe(false);
    expect(p.percentage).toBe(100);

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

    expect(p.total).toBeUndefined();
    expect(p.loaded).toBe(0);
    expect(p.indeterminate).toBe(true);
    expect(p.percentage).toBe(0);

    let r;
    await expect(async () => {
      r = await p.initiate();
    }).rejects.toThrowError({
      name: "TimeoutError",
      message: "timeout",
    });
    //expect(r).toBe("00000001"); //TODO 中断しても結果を取れるようにすべき？？

    expect(p.total).toBeUndefined();
    expect(p.loaded).toBe(8);
    expect(p.indeterminate).toBe(true);
    expect(p.percentage).toBe(0);

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

    expect(p.total).toBeUndefined();
    expect(p.loaded).toBe(0);
    expect(p.indeterminate).toBe(true);
    expect(p.percentage).toBe(0);

    setTimeout(() => {
      ac.abort();
    }, 250);
    let r;
    await expect(async () => {
      r = await p.initiate();
    }).rejects.toThrowError({
      name: "AbortError",
      message: "aborted",
    });
    //expect(r).toBe("00000001"); //TODO 中断しても結果を取れるようにすべき？？

    expect(p.total).toBeUndefined();
    expect(p.loaded).toBe(8);
    expect(p.indeterminate).toBe(true);
    expect(p.percentage).toBe(0);

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

    expect(p.total).toBeUndefined();
    expect(p.loaded).toBe(0);
    expect(p.indeterminate).toBe(true);
    expect(p.percentage).toBe(0);

    let r;
    await expect(async () => {
      r = await p.initiate();
    }).rejects.toThrowError({
      name: "AbortError",
      message: "already aborted",
    });
    //expect(r).toBe(""); //TODO 中断しても結果を取れるようにすべき？？

    expect(p.total).toBeUndefined();
    expect(p.loaded).toBe(0);
    expect(p.indeterminate).toBe(true);
    expect(p.percentage).toBe(0);

  });

  it("TransferProgress(Object)/addEventListener()", async () => {





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

    expect(p.total).toBeUndefined();
    expect(p.loaded).toBe(0);
    expect(p.indeterminate).toBe(true);
    expect(p.percentage).toBe(0);

    let errorRaised = false;
    p.addEventListener("error", () => {
      errorRaised = true;
    });
    let loadended = false;
    p.addEventListener("loadend", () => {
      loadended = true;
    });

    await expect(async () => {
      await p.initiate();
    }).rejects.toThrowError({
      name: "Error",
      message: "test-ex",
    });

    expect(errorRaised).toBe(true);
    expect(loadended).toBe(true);

  });

});

//expect().toBe();

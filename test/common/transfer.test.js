import { expect } from '@esm-bundle/chai';
import { Transfer } from "../../dist/index.js";

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

describe("Transfer.Progress", () => {
  it("Transfer.Progress(Object)", async () => {
    let buffer = "";
    const p = new Transfer.Progress({
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

    expect(p.total).to.equal(undefined);
    expect(p.loaded).to.equal(0);
    expect(p.indeterminate).to.equal(true);
    expect(p.percentage).to.equal(0);

    const r = await p.initiate();
    expect(r).to.equal("0000000100020003000400050006000700080009");

    expect(p.total).to.equal(undefined);
    expect(p.loaded).to.equal(40);
    expect(p.indeterminate).to.equal(true);
    expect(p.percentage).to.equal(0);

  });

  it("Transfer.Progress(Object, {total:number})", async () => {
    let buffer = "";
    const p = new Transfer.Progress({
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

    expect(p.total).to.equal(40);
    expect(p.loaded).to.equal(0);
    expect(p.indeterminate).to.equal(false);
    expect(p.percentage).to.equal(0);

    const r = await p.initiate();
    expect(r).to.equal("0000000100020003000400050006000700080009");

    expect(p.total).to.equal(40);
    expect(p.loaded).to.equal(40);
    expect(p.indeterminate).to.equal(false);
    expect(p.percentage).to.equal(100);

    try {
      await p.initiate();
    }catch(e){
      const err = e;
      expect(err.name).to.equal("Error");
      expect(err.message).to.equal("invalid state");
    }

  });

  it("Transfer.Progress(Object, {total:number}) - error", () => {
    expect(() => {
      let buffer = "";
      const p = new Transfer.Progress({
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
    }).to.throw(TypeError, "total").with.property("name", "TypeError");

    expect(() => {
      let buffer = "";
      const p = new Transfer.Progress({
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
    }).to.throw(TypeError, "total").with.property("name", "TypeError");

  });

  it("Transfer.Progress(Object, {timeout:number})", async () => {
    let buffer = "";
    const p = new Transfer.Progress({
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

    expect(p.total).to.equal(undefined);
    expect(p.loaded).to.equal(0);
    expect(p.indeterminate).to.equal(true);
    expect(p.percentage).to.equal(0);

    let timeouted = false;
    p.addEventListener("timeout", () => {
      timeouted = true;
    });

    let r;
    try {
      r = await p.initiate();
    }catch(e){
      const err = e;
      expect(err.name).to.equal("TimeoutError");
      expect(err.message).to.equal("timeout");
    }
    //expect(r).to.equal("00000001"); //TODO 中断しても結果を取れるようにすべき？？

    expect(p.total).to.equal(undefined);
    expect(p.loaded).to.equal(8);
    expect(p.indeterminate).to.equal(true);
    expect(p.percentage).to.equal(0);

    expect(timeouted).to.equal(true);

  });

  it("Transfer.Progress(Object, {abort:AbortSignal})", async () => {
    let buffer = "";
    const ac = new AbortController();
    const p = new Transfer.Progress({
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

    expect(p.total).to.equal(undefined);
    expect(p.loaded).to.equal(0);
    expect(p.indeterminate).to.equal(true);
    expect(p.percentage).to.equal(0);

    let aborted = false;
    p.addEventListener("abort", () => {
      aborted = true;
    });

    setTimeout(() => {
      ac.abort();
    }, 250);
    let r;
    try {
      r = await p.initiate();
    }catch(e){
      const err = e;
      expect(err.name).to.equal("AbortError");
      expect(err.message).to.equal("aborted");
    }
    //expect(r).to.equal("00000001"); //TODO 中断しても結果を取れるようにすべき？？

    expect(p.total).to.equal(undefined);
    expect(p.loaded).to.equal(8);
    expect(p.indeterminate).to.equal(true);
    expect(p.percentage).to.equal(0);

    expect(aborted).to.equal(true);

  });

  it("Transfer.Progress(Object, {abort:AbortSignal}) - error", async () => {
    let buffer = "";
    const ac = new AbortController();
    ac.abort();
    const p = new Transfer.Progress({
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

    expect(p.total).to.equal(undefined);
    expect(p.loaded).to.equal(0);
    expect(p.indeterminate).to.equal(true);
    expect(p.percentage).to.equal(0);

    let r;
    try {
      r = await p.initiate();
    }catch(e){
      const err = e;
      expect(err.name).to.equal("AbortError");
      expect(err.message).to.equal("already aborted");
    }
    //expect(r).to.equal(""); //TODO 中断しても結果を取れるようにすべき？？

    expect(p.total).to.equal(undefined);
    expect(p.loaded).to.equal(0);
    expect(p.indeterminate).to.equal(true);
    expect(p.percentage).to.equal(0);

  });

  it("Transfer.Progress(Object)/addEventListener()", async () => {
    let buffer = "";
    const p = new Transfer.Progress({
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

    expect(loadstarted).to.equal(true);
    expect(load >= 1).to.equal(true);
    expect(aborted).to.equal(false);
    expect(timeouted).to.equal(false);
    expect(errorRaised).to.equal(false);
    expect(loadended).to.equal(true);

  });

  it("Transfer.Progress(Object)/addEventListener() - error", async () => {
    let buffer = "";
    const p = new Transfer.Progress({
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

    expect(p.total).to.equal(undefined);
    expect(p.loaded).to.equal(0);
    expect(p.indeterminate).to.equal(true);
    expect(p.percentage).to.equal(0);

    let errorRaised = false;
    p.addEventListener("error", () => {
      errorRaised = true;
    });
    let loadended = false;
    p.addEventListener("loadend", () => {
      loadended = true;
    });

    try {
      await p.initiate();
    }catch(e){
      const err = e;
      expect(err.name).to.equal("Error");
      expect(err.message).to.equal("test-ex");
    }

    expect(errorRaised).to.equal(true);
    expect(loadended).to.equal(true);

  });

});
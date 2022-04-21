import { expect } from '@esm-bundle/chai';
import { PubSub } from "../../dist/index.js";

describe("PubSub.Broker.prototype.clear", () => {
  it("clear()", async () => {
    const broker = new PubSub.Broker();

    const t1results1 = [];
    const t1results2 = [];
    const topic1 = "t1";
    const s11 = async (data) => {
      t1results1.push(data);
      return;
    };
    broker.subscribe(topic1, s11);
    await broker.publish(topic1, "t1-data1");
    broker.clear();
    broker.subscribe(topic1, async (data) => {
      t1results2.push(data);
      return;
    });
    await broker.publish(topic1, "t1-data2");

    const t2results1 = [];
    const t2results2 = [];
    const topic2 = "t2";
    const s21 = async (data) => {
      t2results1.push(data);
      return;
    };
    const s22 = async (data) => {
      t2results2.push(data);
      return;
    };
    broker.subscribe(topic2, s21);
    await broker.publish(topic2, "t2-data1");
    //broker.clear();
    broker.subscribe(topic2, s22);
    await broker.publish(topic2, "t2-data2");
    broker.clear();
    await broker.publish(topic2, "t2-data3");

    expect(t1results1.join(",")).to.equal(`t1-data1`);
    expect(t1results2.join(",")).to.equal(`t1-data2`);
    expect(t2results1.join(",")).to.equal(`t2-data1,t2-data2`);
    expect(t2results2.join(",")).to.equal(`t2-data2`);

  });

});

describe("PubSub.Broker.prototype.publish", () => {
  it("publish(string, any)", async () => {
    const broker = new PubSub.Broker();

    const topic1 = "t1";
    broker.subscribe(topic1, (data) => {
      throw new Error(data);
    });

    try {
      await broker.publish(topic1, "t1-data1");
      expect(true).to.equal(false);
    }
    catch (e) {
      const err = e;
      if ("name" in err && "errors" in err) {
        expect(err.name).to.equal("AggregateError");
        expect(err.errors.length).to.equal(1);
        expect(err.errors[0].message).to.equal("t1-data1");
      }
      else {
        expect(true).to.equal(false);
      }
    }

  });

  it("publish(string, any) - 2", async () => {
    const broker = new PubSub.Broker();

    const topic1 = "t1";
    broker.subscribe(topic1, (data) => {
      throw "ex-err";
    });

    try {
      await broker.publish(topic1, "t1-data1");
      expect(true).to.equal(false);
    }
    catch (e) {
      const err = e;
      if ("name" in err && "errors" in err) {
        expect(err.name).to.equal("AggregateError");
        expect(err.errors.length).to.equal(1);
        expect(err.errors[0].message).to.equal("\"ex-err\"");
      }
      else {
        expect(true).to.equal(false);
      }
    }

  });

});

describe("PubSub.Broker.prototype.subscribe", () => {
  it("subscribe(string, Function)", async () => {
    const broker = new PubSub.Broker();

    const t1results1 = [];
    const t1results2 = [];
    const topic1 = "t1";
    broker.subscribe(topic1, async (data) => {
      t1results1.push(data);
      return;
    });
    await broker.publish(topic1, "t1-data1");
    broker.subscribe(topic1, async (data) => {
      t1results2.push(data);
      return;
    });
    await broker.publish(topic1, "t1-data2");

    const t2results1 = [];
    const t2results2 = [];
    const topic2 = "t2";
    broker.subscribe(topic2, async (data) => {
      t2results1.push(data);
      return;
    });
    await broker.publish(topic2, "t2-data1");
    broker.subscribe(topic2, async (data) => {
      t2results2.push(data);
      return;
    });
    await broker.publish(topic2, "t2-data2");

    expect(t1results1.join(",")).to.equal(`t1-data1,t1-data2`);
    expect(t1results2.join(",")).to.equal(`t1-data2`);
    expect(t2results1.join(",")).to.equal(`t2-data1,t2-data2`);
    expect(t2results2.join(",")).to.equal(`t2-data2`);

  });

  it("subscribe(symbol, Function)", async () => {
    const broker = new PubSub.Broker();

    const t1results1 = [];
    const t1results2 = [];
    const topic1 = Symbol();
    broker.subscribe(topic1, async (data) => {
      t1results1.push(data);
      return;
    });
    await broker.publish(topic1, "t1-data1");
    broker.subscribe(topic1, async (data) => {
      t1results2.push(data);
      return;
    });
    await broker.publish(topic1, "t1-data2");

    const t2results1 = [];
    const t2results2 = [];
    const topic2 = Symbol();
    broker.subscribe(topic2, async (data) => {
      t2results1.push(data);
      return;
    });
    await broker.publish(topic2, "t2-data1");
    broker.subscribe(topic2, async (data) => {
      t2results2.push(data);
      return;
    });
    await broker.publish(topic2, "t2-data2");

    expect(t1results1.join(",")).to.equal(`t1-data1,t1-data2`);
    expect(t1results2.join(",")).to.equal(`t1-data2`);
    expect(t2results1.join(",")).to.equal(`t2-data1,t2-data2`);
    expect(t2results2.join(",")).to.equal(`t2-data2`);

  });

  it("subscribe(string, AsyncFunction)", async () => {
    const broker = new PubSub.Broker();

    const t1results1 = [];
    const t1results2 = [];
    const topic1 = "t1";
    broker.subscribe(topic1, async (data) => {
      t1results1.push(data);
      return;
    });
    await broker.publish(topic1, "t1-data1");
    broker.subscribe(topic1, async (data) => {
      t1results2.push(data);
      return;
    });
    await broker.publish(topic1, "t1-data2");

    const t2results1 = [];
    const t2results2 = [];
    const topic2 = "t2";
    broker.subscribe(topic2, async (data) => {
      t2results1.push(data);
    });
    await broker.publish(topic2, "t2-data1");
    broker.subscribe(topic2, async (data) => {
      t2results2.push(data);
    });
    await broker.publish(topic2, "t2-data2");

    expect(t1results1.join(",")).to.equal(`t1-data1,t1-data2`);
    expect(t1results2.join(",")).to.equal(`t1-data2`);
    expect(t2results1.join(",")).to.equal(`t2-data1,t2-data2`);
    expect(t2results2.join(",")).to.equal(`t2-data2`);

  });

  it("subscribe(string, Function, { once: boolean })", async () => {
    const broker = new PubSub.Broker();

    const t1results1 = [];
    const t1results2 = [];
    const topic1 = "t1";
    broker.subscribe(topic1, async (data) => {
      t1results1.push(data);
      return;
    }, { once: true });
    await broker.publish(topic1, "t1-data1");
    broker.subscribe(topic1, async (data) => {
      t1results2.push(data);
      return;
    }, { once: true });
    await broker.publish(topic1, "t1-data2");

    const t2results1 = [];
    const t2results2 = [];
    const topic2 = "t2";
    broker.subscribe(topic2, async (data) => {
      t2results1.push(data);
      return;
    }, { once: true });
    await broker.publish(topic2, "t2-data1");
    broker.subscribe(topic2, async (data) => {
      t2results2.push(data);
      return;
    }, { once: true });
    await broker.publish(topic2, "t2-data2");

    expect(t1results1.join(",")).to.equal(`t1-data1`);
    expect(t1results2.join(",")).to.equal(`t1-data2`);
    expect(t2results1.join(",")).to.equal(`t2-data1`);
    expect(t2results2.join(",")).to.equal(`t2-data2`);

  });

  it("subscribe(string, Function, { signal: AbortSignal })", async () => {
    const broker = new PubSub.Broker();

    const t1results1 = [];
    const t1results2 = [];
    const topic1 = "t1";
    const c1 = new AbortController();
    broker.subscribe(topic1, async (data) => {
      t1results1.push(data);
      return;
    }, { signal: c1.signal });
    await broker.publish(topic1, "t1-data1");
    c1.abort();
    broker.subscribe(topic1, async (data) => {
      t1results2.push(data);
      return;
    }, { signal: c1.signal });
    await broker.publish(topic1, "t1-data2");

    const t2results1 = [];
    const t2results2 = [];
    const topic2 = "t2";
    const c2 = new AbortController();
    broker.subscribe(topic2, async (data) => {
      t2results1.push(data);
      return;
    }, { once: true, signal: c2.signal });
    await broker.publish(topic2, "t2-data1");
    broker.subscribe(topic2, async (data) => {
      t2results2.push(data);
      return;
    }, { once: true, signal: c2.signal });
    await broker.publish(topic2, "t2-data2");
    c2.abort();
    await broker.publish(topic2, "t2-data3");

    expect(t1results1.join(",")).to.equal(`t1-data1`);
    expect(t1results2.join(",")).to.equal(``);
    expect(t2results1.join(",")).to.equal(`t2-data1`);
    expect(t2results2.join(",")).to.equal(`t2-data2`);

  });

});

describe("PubSub.Broker.prototype.unsubscribe", () => {
  it("unsubscribe(string, Function)", async () => {
    const broker = new PubSub.Broker();

    const t1results1 = [];
    const t1results2 = [];
    const topic1 = "t1";
    const s11 = async (data) => {
      t1results1.push(data);
    };
    broker.subscribe(topic1, s11);
    broker.subscribe(topic1, s11);
    await broker.publish(topic1, "t1-data1");
    broker.unsubscribe(topic1, s11);
    broker.subscribe(topic1, async (data) => {
      t1results2.push(data);
    });
    await broker.publish(topic1, "t1-data2");

    const t2results1 = [];
    const t2results2 = [];
    const topic2 = "t2";
    const s21 = async (data) => {
      t2results1.push(data);
    };
    const s22 = async (data) => {
      t2results2.push(data);
    };
    broker.subscribe(topic2, s21);
    await broker.publish(topic2, "t2-data1");
    broker.unsubscribe(topic2, s21);
    broker.subscribe(topic2, s22);
    await broker.publish(topic2, "t2-data2");
    broker.unsubscribe(topic2, s22);
    await broker.publish(topic2, "t2-data3");

    expect(t1results1.join(",")).to.equal(`t1-data1`);
    expect(t1results2.join(",")).to.equal(`t1-data2`);
    expect(t2results1.join(",")).to.equal(`t2-data1`);
    expect(t2results2.join(",")).to.equal(`t2-data2`);

  });

});
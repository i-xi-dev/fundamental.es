import assert from "node:assert";
import { ByteBuffer } from "../../node/index.mjs";

describe("ByteBuffer", () => {
  it("new ByteBuffer()/capacity/position/put()", () => {
    const b = new ByteBuffer();

    assert.strictEqual(b.capacity, 1_048_576);
    assert.strictEqual(b.position, 0);

    b.put(Uint8Array.of(1,2,3,4,5,6,7,8,9,10,11,12));
    assert.strictEqual(b.capacity, 1_048_576);
    assert.strictEqual(b.position, 12);

    b.put(Uint8Array.of(1,2,3,4,5,6,7,8,9,10,11,12));
    assert.strictEqual(b.capacity, 1_048_576);
    assert.strictEqual(b.position, 24);

  });

  it("new ByteBuffer(number)/capacity/position/put()", () => {
    const b = new ByteBuffer(10);

    assert.strictEqual(b.capacity, 10);
    assert.strictEqual(b.position, 0);

    b.put(Uint8Array.of(1,2,3,4,5,6,7,8,9,10,11,12));
    assert.strictEqual(b.capacity, 10485760);
    assert.strictEqual(b.position, 12);

    b.put(Uint8Array.of(1,2,3,4,5,6,7,8,9,10,11,12));
    assert.strictEqual(b.capacity, 10485760);
    assert.strictEqual(b.position, 24);

    const copy1 = b.subarray();
    assert.strictEqual(copy1.buffer, b.subarray().buffer);
    assert.strictEqual(copy1.byteLength, 24);
    assert.strictEqual(copy1.buffer.byteLength, 10485760);
    assert.strictEqual([...copy1].map(b => b.toString(10)).join(","), "1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12");

    const copy2 = b.slice();
    assert.notStrictEqual(copy2.buffer, copy1.buffer);
    assert.strictEqual(copy2.byteLength, 24);
    assert.strictEqual(copy2.buffer.byteLength, 24);
    assert.strictEqual([...copy2].map(b => b.toString(10)).join(","), "1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12");

  });

});

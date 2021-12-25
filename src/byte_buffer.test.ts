import { ByteBuffer } from "./byte_buffer";

describe("ByteBuffer", () => {
  it("new ByteBuffer()/capacity/position/put()", () => {
    const b = new ByteBuffer();

    expect(b.capacity).toBe(1_048_576);
    expect(b.position).toBe(0);

    b.put(Uint8Array.of(1,2,3,4,5,6,7,8,9,10,11,12));
    expect(b.capacity).toBe(1_048_576);
    expect(b.position).toBe(12);

    b.put(Uint8Array.of(1,2,3,4,5,6,7,8,9,10,11,12));
    expect(b.capacity).toBe(1_048_576);
    expect(b.position).toBe(24);

  });

  it("new ByteBuffer(number)/capacity/position/put()", () => {
    const b = new ByteBuffer(10);

    expect(b.capacity).toBe(10);
    expect(b.position).toBe(0);

    b.put(Uint8Array.of(1,2,3,4,5,6,7,8,9,10,11,12));
    expect(b.capacity).toBe(10485760);
    expect(b.position).toBe(12);

    b.put(Uint8Array.of(1,2,3,4,5,6,7,8,9,10,11,12));
    expect(b.capacity).toBe(10485760);
    expect(b.position).toBe(24);

    const copy1 = b.subarray();
    expect(copy1.buffer).toBe(b.subarray().buffer);
    expect(copy1.byteLength).toBe(24);
    expect(copy1.buffer.byteLength).toBe(10485760);
    expect([...copy1].map(b => b.toString(10)).join(",")).toBe("1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12");

    const copy2 = b.slice();
    expect(copy2.buffer).not.toBe(copy1.buffer);
    expect(copy2.byteLength).toBe(24);
    expect(copy2.buffer.byteLength).toBe(24);
    expect([...copy2].map(b => b.toString(10)).join(",")).toBe("1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12");

  });

});

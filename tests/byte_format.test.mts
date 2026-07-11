import { assertStrictEquals, assertThrows } from "@std/assert";
import { ByteFormat } from "../src/mod.mts";

Deno.test("ByteFormat.prototype.format()", () => {
  const f0 = new ByteFormat();
  assertStrictEquals(f0.format(0x0), "0");
  assertStrictEquals(f0.format(0xF), "f");
  assertStrictEquals(f0.format(0xFF), "ff");

  const f116 = new ByteFormat({ radix: 16 });
  assertStrictEquals(f116.format(0x0), "0");
  assertStrictEquals(f116.format(0xF), "f");
  assertStrictEquals(f116.format(0xFF), "ff");

  const f110 = new ByteFormat({ radix: 10 });
  assertStrictEquals(f110.format(0x0), "0");
  assertStrictEquals(f110.format(0xF), "15");
  assertStrictEquals(f110.format(0xFF), "255");

  const f18 = new ByteFormat({ radix: 8 });
  assertStrictEquals(f18.format(0x0), "0");
  assertStrictEquals(f18.format(0xF), "17");
  assertStrictEquals(f18.format(0xFF), "377");

  const f12 = new ByteFormat({ radix: 2 });
  assertStrictEquals(f12.format(0x0), "0");
  assertStrictEquals(f12.format(0xF), "1111");
  assertStrictEquals(f12.format(0xFF), "11111111");

  const f21 = new ByteFormat({ upperCase: true });
  assertStrictEquals(f21.format(0x0), "0");
  assertStrictEquals(f21.format(0xF), "F");
  assertStrictEquals(f21.format(0xFF), "FF");

  const f22 = new ByteFormat({ upperCase: false });
  assertStrictEquals(f22.format(0x0), "0");
  assertStrictEquals(f22.format(0xF), "f");
  assertStrictEquals(f22.format(0xFF), "ff");

  const f31 = new ByteFormat({ minLength: 4 });
  assertStrictEquals(f31.format(0x0), "0000");
  assertStrictEquals(f31.format(0xF), "000f");
  assertStrictEquals(f31.format(0xFF), "00ff");

  // const f41 = new ByteFormat({ minPaddedLength: 4, paddingChar: "*" });
  // assertStrictEquals(f41.format(0x0), "***0");
  // assertStrictEquals(f41.format(0xF), "***f");
  // assertStrictEquals(f41.format(0xFF), "**ff");

  assertThrows(
    () => {
      new ByteFormat().format("0" as unknown as number);
    },
    TypeError,
    "Input must be a 8-bit unsigned integer of type `number`",
  );

  assertThrows(
    () => {
      new ByteFormat().format(-1);
    },
    TypeError,
    "Input must be a 8-bit unsigned integer of type `number`",
  );

  assertThrows(
    () => {
      new ByteFormat().format(0x100);
    },
    TypeError,
    "Input must be a 8-bit unsigned integer of type `number`",
  );
});

Deno.test("ByteFormat.prototype.parse()", () => {
  const f0 = new ByteFormat();
  assertStrictEquals(f0.parse("0"), 0x0);
  assertStrictEquals(f0.parse("00000000000"), 0x0);
  assertStrictEquals(f0.parse("F"), 0xF);
  assertStrictEquals(f0.parse("0f"), 0xF);
  assertStrictEquals(f0.parse("ff"), 0xFF);
  assertStrictEquals(f0.parse("00000FF"), 0xFF);

  const f116 = new ByteFormat({ radix: 16 });
  assertStrictEquals(f116.parse("0"), 0x0);
  assertStrictEquals(f116.parse("9"), 0x9);
  assertStrictEquals(f116.parse("00000FF"), 0xFF);

  const f110 = new ByteFormat({ radix: 10 });
  assertStrictEquals(f110.parse("0000"), 0x0);
  assertStrictEquals(f110.parse("0009"), 0x9);
  assertStrictEquals(f110.parse("0015"), 0xF);
  assertStrictEquals(f110.parse("0255"), 0xFF);

  const f18 = new ByteFormat({ radix: 8 });
  assertStrictEquals(f18.parse("0000"), 0x0);
  assertStrictEquals(f18.parse("0017"), 0xF);
  assertStrictEquals(f18.parse("0377"), 0xFF);

  const f12 = new ByteFormat({ radix: 2 });
  assertStrictEquals(f12.parse("00000000"), 0x0);
  assertStrictEquals(f12.parse("00001111"), 0xF);
  assertStrictEquals(f12.parse("11111111"), 0xFF);
});

import { assertStrictEquals, assertThrows } from "@std/assert";
import { Buffers } from "../../../src/mod.mts";

Deno.test("Buffers.Byte.toString()", () => {
  assertStrictEquals(Buffers.Byte.toString(0x0), "00");
  assertStrictEquals(Buffers.Byte.toString(0xF), "0f");
  assertStrictEquals(Buffers.Byte.toString(0xFF), "ff");

  // const f116 = { radix: 16 };
  // assertStrictEquals(Buffers.Byte.toString(0x0, f116), "00");
  // assertStrictEquals(Buffers.Byte.toString(0xF, f116), "0f");
  // assertStrictEquals(Buffers.Byte.toString(0xFF, f116), "ff");

  // const f110 = { radix: 10 };
  // assertStrictEquals(Buffers.Byte.toString(0x0, f110), "000");
  // assertStrictEquals(Buffers.Byte.toString(0xF, f110), "015");
  // assertStrictEquals(Buffers.Byte.toString(0xFF, f110), "255");

  // const f18 = { radix: 8 };
  // assertStrictEquals(Buffers.Byte.toString(0x0, f18), "000");
  // assertStrictEquals(Buffers.Byte.toString(0xF, f18), "017");
  // assertStrictEquals(Buffers.Byte.toString(0xFF, f18), "377");

  // const f12 = { radix: 2 };
  // assertStrictEquals(Buffers.Byte.toString(0x0, f12), "00000000");
  // assertStrictEquals(Buffers.Byte.toString(0xF, f12), "00001111");
  // assertStrictEquals(Buffers.Byte.toString(0xFF, f12), "11111111");

  // const f21 = { upperCase: true };
  // assertStrictEquals(Buffers.Byte.toString(0x0, f21), "00");
  // assertStrictEquals(Buffers.Byte.toString(0xF, f21), "0F");
  // assertStrictEquals(Buffers.Byte.toString(0xFF, f21), "FF");

  // const f22 = { upperCase: false };
  // assertStrictEquals(Buffers.Byte.toString(0x0, f22), "00");
  // assertStrictEquals(Buffers.Byte.toString(0xF, f22), "0f");
  // assertStrictEquals(Buffers.Byte.toString(0xFF, f22), "ff");

  // const f31 = { minLength: 4 };
  // assertStrictEquals(Buffers.Byte.toString(0x0, f31), "0000");
  // assertStrictEquals(Buffers.Byte.toString(0xF, f31), "000f");
  // assertStrictEquals(Buffers.Byte.toString(0xFF, f31), "00ff");

  // const f41 = { minPaddedLength: 4, paddingChar: "*" };
  // assertStrictEquals(Buffers.Byte.toString(0x0, f41), "***0");
  // assertStrictEquals(Buffers.Byte.toString(0xF, f41), "***f");
  // assertStrictEquals(Buffers.Byte.toString(0xFF, f41), "**ff");

  assertThrows(
    () => {
      Buffers.Byte.toString("0" as unknown as number);
    },
    TypeError,
    "Input must be a 8-bit unsigned integer of type `number`",
  );

  assertThrows(
    () => {
      Buffers.Byte.toString(-1);
    },
    TypeError,
    "Input must be a 8-bit unsigned integer of type `number`",
  );

  assertThrows(
    () => {
      Buffers.Byte.toString(0x100);
    },
    TypeError,
    "Input must be a 8-bit unsigned integer of type `number`",
  );
});

// Deno.test("Buffers.Byte.fromString()", () => {
//   const f0 = new ByteFormat();
//   assertStrictEquals(f0.parse("0"), 0x0);
//   assertStrictEquals(f0.parse("00000000000"), 0x0);
//   assertStrictEquals(f0.parse("F"), 0xF);
//   assertStrictEquals(f0.parse("0f"), 0xF);
//   assertStrictEquals(f0.parse("ff"), 0xFF);
//   assertStrictEquals(f0.parse("00000FF"), 0xFF);
//
//   const f116 = new ByteFormat({ radix: 16 });
//   assertStrictEquals(f116.parse("0"), 0x0);
//   assertStrictEquals(f116.parse("9"), 0x9);
//   assertStrictEquals(f116.parse("00000FF"), 0xFF);
//
//   const f110 = new ByteFormat({ radix: 10 });
//   assertStrictEquals(f110.parse("0000"), 0x0);
//   assertStrictEquals(f110.parse("0009"), 0x9);
//   assertStrictEquals(f110.parse("0015"), 0xF);
//   assertStrictEquals(f110.parse("0255"), 0xFF);
//
//   const f18 = new ByteFormat({ radix: 8 });
//   assertStrictEquals(f18.parse("0000"), 0x0);
//   assertStrictEquals(f18.parse("0017"), 0xF);
//   assertStrictEquals(f18.parse("0377"), 0xFF);
//
//   const f12 = new ByteFormat({ radix: 2 });
//   assertStrictEquals(f12.parse("00000000"), 0x0);
//   assertStrictEquals(f12.parse("00001111"), 0xF);
//   assertStrictEquals(f12.parse("11111111"), 0xFF);
// });

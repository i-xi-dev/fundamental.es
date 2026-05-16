import { assertStrictEquals, assertThrows } from "@std/assert";
import { ByteSequence } from "../../../../src/mod.mts";

const { Percent } = ByteSequence.Encoding;

const utf8 = new TextEncoder();
const utf8Bytes1 = utf8.encode("1\u{0} !~\u{7F}あ+") as Uint8Array<ArrayBuffer>;

Deno.test("ByteSequence.Encoding.Percent.decode()", () => {
  const decodedA11 = Percent.decode("");
  assertStrictEquals(JSON.stringify([...decodedA11]), "[]");

  const decodedA12 = Percent.decode("%03%02%01%00%FF%FE%FD%FC");
  assertStrictEquals(
    JSON.stringify([...decodedA12]),
    "[3,2,1,0,255,254,253,252]",
  );

  const decodedA13 = Percent.decode("1%00 !~%7F%E3%81%82+");
  assertStrictEquals(
    JSON.stringify([...decodedA13]),
    JSON.stringify([...utf8Bytes1]),
  );

  const decodedA21 = Percent.decode("%03%02%01%00%FF%FE%FD%FC");
  assertStrictEquals(
    JSON.stringify([...decodedA21]),
    "[3,2,1,0,255,254,253,252]",
  );
  const decodedA22 = Percent.decode("%03%20%02%01%00%FF%FE%FD%FC");
  assertStrictEquals(
    JSON.stringify([...decodedA22]),
    "[3,32,2,1,0,255,254,253,252]",
  );
  const decodedA23 = Percent.decode("1%00%20!~%7F%E3%81%82+");
  assertStrictEquals(
    JSON.stringify([...decodedA23]),
    JSON.stringify([...utf8Bytes1]),
  );

  const decodedA41 = Percent.decode("%03%20%02%01%00%FF%FE%FD%FC");
  assertStrictEquals(
    JSON.stringify([...decodedA41]),
    "[3,32,2,1,0,255,254,253,252]",
  );
  const decodedA42 = Percent.decode("%03%20%02%01%00%FF%FE%FD%2B%FC");
  assertStrictEquals(
    JSON.stringify([...decodedA42]),
    "[3,32,2,1,0,255,254,253,43,252]",
  );
  const decodedA43 = Percent.decode(
    globalThis.encodeURIComponent("1\u{0} !~\u{7F}あ+"),
  );
  assertStrictEquals(
    JSON.stringify([...decodedA43]),
    JSON.stringify([...utf8Bytes1]),
  );

  const decodedA52b = Percent.decode("%03%02%01%00%FF%FE%FD%FC%20%41");
  assertStrictEquals(
    JSON.stringify([...decodedA52b]),
    "[3,2,1,0,255,254,253,252,32,65]",
  );

  assertThrows(
    () => {
      Percent.decode(0 as unknown as string);
    },
    TypeError,
    "Input must be a `string`",
  );

  assertThrows(
    () => {
      Percent.decode("あ");
    },
    SyntaxError,
    "Input must not contain controls or characters outside of the US-ASCII range",
  );

  const decodedA55 = Percent.decode("%%65A");
  assertStrictEquals(JSON.stringify([...decodedA55]), "[37,101,65]");

  const decodedA56 = Percent.decode("%41");
  assertStrictEquals(JSON.stringify([...decodedA56]), "[65]");

  const decodedA57 = Percent.decode("%ff");
  assertStrictEquals(JSON.stringify([...decodedA57]), "[255]");

  const decodedA57b = Percent.decode("%FF");
  assertStrictEquals(JSON.stringify([...decodedA57b]), "[255]");

  const decodedA57c = Percent.decode("%f");
  assertStrictEquals(JSON.stringify([...decodedA57c]), "[37,102]");

  const decodedA57d = Percent.decode("%fff");
  assertStrictEquals(JSON.stringify([...decodedA57d]), "[255,102]");
});

Deno.test("ByteSequence.Encoding.Percent.decode() - spaceAsPlus:true", () => {
  const decodedB11 = Percent.decode("", { spaceAsPlus: true });
  assertStrictEquals(JSON.stringify([...decodedB11]), "[]");

  const decodedB12 = Percent.decode("%03%02%01%00%FF%FE%FD%FC", {
    spaceAsPlus: true,
  });
  assertStrictEquals(
    JSON.stringify([...decodedB12]),
    "[3,2,1,0,255,254,253,252]",
  );

  const decodedB13 = Percent.decode("1%00 !~%7F%E3%81%82%2B", {
    spaceAsPlus: true,
  });
  assertStrictEquals(
    JSON.stringify([...decodedB13]),
    JSON.stringify([...utf8Bytes1]),
  );
  const decodedB13b = Percent.decode("1%00+!~%7F%E3%81%82%2B", {
    spaceAsPlus: true,
  });
  assertStrictEquals(
    JSON.stringify([...decodedB13b]),
    JSON.stringify([...utf8Bytes1]),
  );

  const decodedB31 = Percent.decode("%03+%02%01%00%FF%FE%FD%FC", {
    spaceAsPlus: true,
  });
  assertStrictEquals(
    JSON.stringify([...decodedB31]),
    "[3,32,2,1,0,255,254,253,252]",
  );
  const decodedB32 = Percent.decode("%03+%02%01%00%FF%FE%FD%2B%FC", {
    spaceAsPlus: true,
  });
  assertStrictEquals(
    JSON.stringify([...decodedB32]),
    "[3,32,2,1,0,255,254,253,43,252]",
  );
  const decodedB33 = Percent.decode("1%00+!~%7F%E3%81%82%2B", {
    spaceAsPlus: true,
  });
  assertStrictEquals(
    JSON.stringify([...decodedB33]),
    JSON.stringify([...utf8Bytes1]),
  );

  const decodedB52b = Percent.decode("%03%02%01%00%FF%FE%FD%FC%20%41", {
    spaceAsPlus: true,
  });
  assertStrictEquals(
    JSON.stringify([...decodedB52b]),
    "[3,2,1,0,255,254,253,252,32,65]",
  );

  assertThrows(
    () => {
      Percent.decode("あ", { spaceAsPlus: true });
    },
    SyntaxError,
    "Input must not contain controls or characters outside of the US-ASCII range",
  );
});

Deno.test("ByteSequence.Encoding.Percent.decode() - encodeSet:*", () => {
  const opC = {
    encodeSet: [
      0x20,
      0x21,
      0x22,
      0x23,
      0x24,
      0x26,
      0x27,
      0x28,
      0x29,
      0x2B,
      0x2C,
      0x2F,
      0x3A,
      0x3B,
      0x3C,
      0x3D,
      0x3E,
      0x3F,
      0x40,
      0x5B,
      0x5C,
      0x5D,
      0x5E,
      0x60,
      0x7B,
      0x7C,
      0x7D,
      0x7E,
    ],
  };

  const decodedC11 = Percent.decode("", opC);
  assertStrictEquals(JSON.stringify([...decodedC11]), "[]");

  const decodedC12 = Percent.decode("%03%02%01%00%FF%FE%FD%FC", opC);
  assertStrictEquals(
    JSON.stringify([...decodedC12]),
    "[3,2,1,0,255,254,253,252]",
  );

  const decodedC13 = Percent.decode("1%00 !~%7F%E3%81%82+", opC);
  assertStrictEquals(
    JSON.stringify([...decodedC13]),
    JSON.stringify([...utf8Bytes1]),
  );

  const decodedC21 = Percent.decode("%03%02%01%00%FF%FE%FD%FC", opC);
  assertStrictEquals(
    JSON.stringify([...decodedC21]),
    "[3,2,1,0,255,254,253,252]",
  );
  const decodedC22 = Percent.decode("%03%20%02%01%00%FF%FE%FD%FC", opC);
  assertStrictEquals(
    JSON.stringify([...decodedC22]),
    "[3,32,2,1,0,255,254,253,252]",
  );
  const decodedC23 = Percent.decode("1%00%20!~%7F%E3%81%82+", opC);
  assertStrictEquals(
    JSON.stringify([...decodedC23]),
    JSON.stringify([...utf8Bytes1]),
  );

  const decodedC41 = Percent.decode("%03%20%02%01%00%FF%FE%FD%FC", opC);
  assertStrictEquals(
    JSON.stringify([...decodedC41]),
    "[3,32,2,1,0,255,254,253,252]",
  );
  const decodedC42 = Percent.decode("%03%20%02%01%00%FF%FE%FD%2B%FC", opC);
  assertStrictEquals(
    JSON.stringify([...decodedC42]),
    "[3,32,2,1,0,255,254,253,43,252]",
  );
  const decodedC43 = Percent.decode(
    globalThis.encodeURIComponent("1\u{0} !~\u{7F}あ+"),
    opC,
  );
  assertStrictEquals(
    JSON.stringify([...decodedC43]),
    JSON.stringify([...utf8Bytes1]),
  );

  const decodedC52b = Percent.decode(
    "%03%02%01%00%FF%FE%FD%FC%20%41",
    opC,
  );
  assertStrictEquals(
    JSON.stringify([...decodedC52b]),
    "[3,2,1,0,255,254,253,252,32,65]",
  );

  assertThrows(
    () => {
      Percent.decode("あ", opC);
    },
    SyntaxError,
    "Input must not contain controls or characters outside of the US-ASCII range",
  );

  const decodedC55 = Percent.decode("%%65A", opC);
  assertStrictEquals(JSON.stringify([...decodedC55]), "[37,101,65]");

  const decodedC56 = Percent.decode("%41", opC);
  assertStrictEquals(JSON.stringify([...decodedC56]), "[65]");

  const decodedC57 = Percent.decode("%ff", opC);
  assertStrictEquals(JSON.stringify([...decodedC57]), "[255]");

  const decodedC57b = Percent.decode("%FF", opC);
  assertStrictEquals(JSON.stringify([...decodedC57b]), "[255]");

  const decodedC57c = Percent.decode("%f", opC);
  assertStrictEquals(JSON.stringify([...decodedC57c]), "[37,102]");

  const decodedC57d = Percent.decode("%fff", opC);
  assertStrictEquals(JSON.stringify([...decodedC57d]), "[255,102]");
});

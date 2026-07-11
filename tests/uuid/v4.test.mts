import { assertStrictEquals } from "@std/assert";
import { Uuid } from "../../src/mod.mts";

Deno.test("Uuid.v4()", () => {
  const uuidStrs = [];
  for (let i = 0; i < 10; i++) {
    const uuid = Uuid.v4();
    const str = uuid.toString();
    // console.log(str);
    assertStrictEquals([8, 9, 10, 11].includes(uuid.variant), true);
    assertStrictEquals(uuid.version, 4);
    assertStrictEquals(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
        .test(str),
      true,
    );
    assertStrictEquals(uuid.timestamp, null);
    uuidStrs.push(str);
  }
  assertStrictEquals(uuidStrs.length, (new Set(uuidStrs)).size);
});

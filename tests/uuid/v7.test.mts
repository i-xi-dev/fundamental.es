import { assertNotStrictEquals, assertStrictEquals } from "@std/assert";
import { Uuid } from "../../src/mod.mts";

Deno.test("Uuid.v7()", () => {
  const uuid = Uuid.v7();
  assertStrictEquals([8, 9, 10, 11].includes(uuid.variant), true);
  assertStrictEquals(uuid.version, 7);
  assertStrictEquals(
    /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
      .test(uuid.toString()),
    true,
  );
  assertNotStrictEquals(uuid.timestamp, null);

  let prev = Uuid.nil().toString();
  let curr = "";
  for (let i = 0; i <= 10; i++) {
    const uuid = Uuid.v7();
    curr = uuid.toString();
    // console.log(curr + " " + prev);
    // console.log(uuid.timestamp?.toString(2));
    // console.log(uuid.timestamp?.toFixed());
    assertStrictEquals(curr > prev, true);
    prev = curr;
  }
});

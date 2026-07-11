import { assertStrictEquals } from "@std/assert";
import { Uuid } from "../../src/mod.mts";

Deno.test("Uuid.prototype.timestamp", () => {
  const t1 = Math.trunc(performance.timeOrigin + performance.now());
  // console.log(new Date(t1).toISOString());

  const u1 = Uuid.v7();
  const t2 = u1.timestamp!;
  // console.log(new Date(t2).toISOString());

  const t3 = Math.trunc(performance.timeOrigin + performance.now());
  // console.log(new Date(t3).toISOString());

  assertStrictEquals(Number.isSafeInteger(t2), true);
  assertStrictEquals(t1 <= t2, true);
  assertStrictEquals(t2 <= t3, true);

  assertStrictEquals(Uuid.v4().timestamp, null);
});

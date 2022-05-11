import { assertStrictEquals, assertThrows } from "std/testing/asserts";
import { SizedMap } from "../src/collections.ts";

Deno.test("SizedMap", () => {
  // new SizedMap(number)
  assertThrows(() => {
    new SizedMap(-1);
  }, TypeError, undefined, "maxSize");
  assertThrows(() => {
    new SizedMap(0);
  }, TypeError, undefined, "maxSize");
  assertThrows(() => {
    new SizedMap(Number.MAX_VALUE);
  }, TypeError, undefined, "maxSize");

  const m1 = new SizedMap<string, string>(Number.MAX_SAFE_INTEGER);
  assertStrictEquals(m1.size, 0);
});

Deno.test("SizedMap.prototype.size", () => {
  // set(K, V)
  const m1 = new SizedMap<string, string>(1);
  assertStrictEquals(m1.size, 0);
  m1.set("k1", "v1");
  assertStrictEquals(m1.size, 1);
  assertStrictEquals(JSON.stringify([...m1.entries()]), '[["k1","v1"]]');
  m1.set("k2", "v2");
  assertStrictEquals(m1.size, 1);
  assertStrictEquals(JSON.stringify([...m1.entries()]), '[["k2","v2"]]');

  const m2 = new SizedMap<string, string>(2);
  assertStrictEquals(m2.size, 0);
  m2.set("k1", "v1");
  assertStrictEquals(m2.size, 1);
  assertStrictEquals(JSON.stringify([...m2.entries()]), '[["k1","v1"]]');
  m2.set("k2", "v2");
  assertStrictEquals(m2.size, 2);
  assertStrictEquals(JSON.stringify([...m2.entries()]), '[["k1","v1"],["k2","v2"]]');
  m2.set("k3", "v3");
  assertStrictEquals(m2.size, 2);
  assertStrictEquals(JSON.stringify([...m2.entries()]), '[["k2","v2"],["k3","v3"]]');
});

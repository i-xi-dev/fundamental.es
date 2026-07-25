import { assertStrictEquals, assertThrows } from "@std/assert";
import { Resource } from "../../../src/mod.mts";

Deno.test("Resource.MediaType.prototype.withParameters(Array)", () => {
  const i0 = Resource.MediaType.fromString("text/plain");
  assertStrictEquals(i0.withParameters([]).toString(), "text/plain");

  const i1 = Resource.MediaType.fromString("text/plain;charset=uTf-8");
  assertStrictEquals(i1.withParameters([]).toString(), "text/plain");

  const i2 = Resource.MediaType.fromString("text/plain;CHARSET=uTf-8 ");
  assertStrictEquals(i2.withParameters([]).toString(), "text/plain");

  const i3 = Resource.MediaType.fromString("text/plain;charset=uTf-8 ; x=9");
  assertStrictEquals(i3.withParameters([]).toString(), "text/plain");

  const i4 = Resource.MediaType.fromString('text/plain;charset="uTf-8" ; x=9');
  assertStrictEquals(i4.withParameters([]).toString(), "text/plain");

  const i5 = Resource.MediaType.fromString(
    'text/plain;  charset="uTf-8 "; x=9',
  );
  assertStrictEquals(i5.withParameters([]).toString(), "text/plain");

  const i6 = Resource.MediaType.fromString(
    'text/plain;  charset="uTf-8 "; x=9',
  );
  assertStrictEquals(
    i6.withParameters([["hoge", "http://"], ["charset", "utf-16be"]])
      .toString(),
    'text/plain;hoge="http://";charset=utf-16be',
  );
  assertStrictEquals(i6.toString(), 'text/plain;charset="uTf-8 ";x=9');

  const i7 = Resource.MediaType.fromString("text/plain");
  assertThrows(
    () => {
      i7.withParameters([["a", "1"], ["a", "2"]]);
    },
    TypeError,
    "Parameters must be an `Array` that does not contain duplicate parameters",
  );
});

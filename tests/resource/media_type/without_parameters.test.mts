import { assertStrictEquals, assertThrows } from "@std/assert";
import { Resource } from "../../../src/mod.mts";

Deno.test("Resource.MediaType.prototype.withoutParameters()", () => {
  const i0 = Resource.MediaType.fromString("text/plain");
  assertStrictEquals(i0.withoutParameters().toString(), "text/plain");

  const i1 = Resource.MediaType.fromString("text/plain;charset=uTf-8");
  assertStrictEquals(i1.withoutParameters().toString(), "text/plain");

  const i2 = Resource.MediaType.fromString("text/plain;CHARSET=uTf-8 ");
  assertStrictEquals(i2.withoutParameters().toString(), "text/plain");

  const i3 = Resource.MediaType.fromString("text/plain;charset=uTf-8 ; x=9");
  assertStrictEquals(i3.withoutParameters().toString(), "text/plain");

  const i4 = Resource.MediaType.fromString('text/plain;charset="uTf-8" ; x=9');
  assertStrictEquals(i4.withoutParameters().toString(), "text/plain");

  const i5 = Resource.MediaType.fromString(
    'text/plain;  charset="uTf-8 "; x=9',
  );
  assertStrictEquals(i5.withoutParameters().toString(), "text/plain");
  assertStrictEquals(i5.toString(), 'text/plain;charset="uTf-8 ";x=9');
});

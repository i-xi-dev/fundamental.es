import { assertStrictEquals } from "@std/assert";
import { Resource } from "../../../src/mod.mts";

Deno.test("Resource.MediaType.prototype.toString()", () => {
  const i0 = Resource.MediaType.fromString("text/PLAIN");
  assertStrictEquals(i0.toString(), "text/plain");

  const i1 = Resource.MediaType.fromString("text/plain;charset=uTf-8");
  assertStrictEquals(i1.toString(), "text/plain;charset=uTf-8");

  const i2 = Resource.MediaType.fromString("text/plain;CHARSET=uTf-8 ");
  assertStrictEquals(i2.toString(), "text/plain;charset=uTf-8");

  const i3 = Resource.MediaType.fromString("text/plain;charset=uTf-8 ; x=9");
  assertStrictEquals(i3.toString(), "text/plain;charset=uTf-8;x=9");

  const i4 = Resource.MediaType.fromString('text/plain;charset="uTf-8" ; x=9');
  assertStrictEquals(i4.toString(), "text/plain;charset=uTf-8;x=9");

  const i5 = Resource.MediaType.fromString(
    'text/plain;  charset="uTf-8 "; x=9',
  );
  assertStrictEquals(i5.toString(), 'text/plain;charset="uTf-8 ";x=9');

  const i6 = Resource.MediaType.fromString(
    "text/plain;y=7; charset=uTf-8 ; x=9",
  );
  assertStrictEquals(i6.toString(), "text/plain;y=7;charset=uTf-8;x=9");
});

import { assertStrictEquals } from "@std/assert";
import { Resource } from "../../../src/mod.mts";

Deno.test("Resource.MediaType.prototype.getParameterValue()", () => {
  const i0 = Resource.MediaType.fromString("text/plain");
  assertStrictEquals(i0.getParameterValue("charset"), null);

  const i1 = Resource.MediaType.fromString("text/plain;charset=uTf-8");
  assertStrictEquals(i1.getParameterValue("charset"), "uTf-8");

  const i2 = Resource.MediaType.fromString("text/plain;CHARSET=uTf-8 ");
  assertStrictEquals(i2.getParameterValue("charset"), "uTf-8");

  const i3 = Resource.MediaType.fromString("text/plain;charset=uTf-8 ; x=9");
  assertStrictEquals(i3.getParameterValue("charset"), "uTf-8");

  const i4 = Resource.MediaType.fromString('text/plain;charset="uTf-8" ; x=9');
  assertStrictEquals(i4.getParameterValue("charset"), "uTf-8");

  const i5 = Resource.MediaType.fromString(
    'text/plain;  charset="uTf-8 "; x=9',
  );
  assertStrictEquals(i5.getParameterValue("charset"), "uTf-8 ");

  const i6 = Resource.MediaType.fromString(
    'text/plain;action="https://example.com/example" ; x=9',
  );
  assertStrictEquals(
    i6.getParameterValue("action"),
    "https://example.com/example",
  );
});

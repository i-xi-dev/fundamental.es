import { assertStrictEquals } from "@std/assert";
import { Resource } from "../../../src/mod.mts";

Deno.test("Resource.MediaType.prototype.hasParameter()", () => {
  const i0 = Resource.MediaType.fromString("text/plain");
  assertStrictEquals(i0.hasParameter("charset"), false);

  const i1 = Resource.MediaType.fromString("text/plain;charset=uTf-8");
  assertStrictEquals(i1.hasParameter("charset"), true);

  const i2 = Resource.MediaType.fromString("text/plain;CHARSET=uTf-8 ");
  assertStrictEquals(i2.hasParameter("charset"), true);

  const i5 = Resource.MediaType.fromString(
    'text/plain;  charset="uTf-8 "; x=9',
  );
  assertStrictEquals(i5.hasParameter("charset"), true);
});

import { assertStrictEquals } from "@std/assert";
import { Resource } from "../../../src/mod.mts";

Deno.test("Resource.MediaType.prototype.equals()", () => {
  const i0A = Resource.MediaType.fromString("test1/test2;a=x1;b=2;c=3");
  const i1A = Resource.MediaType.fromString("test1/test2;b=2;c=3;a=x1");
  const i2A = Resource.MediaType.fromString("test2/test2;a=x1;b=2;c=3");
  const i3A = Resource.MediaType.fromString("test1/test3;a=x1;b=2;c=3");
  const i4A = Resource.MediaType.fromString("test1/test3;a=x2;b=2;c=3");
  const i0Ab = Resource.MediaType.fromString("test1/test2 ;a=x1 ; b=2;c=3");
  const i0Ac = Resource.MediaType.fromString("TEST1/TEST2;A=x1;B=2;C=3");
  const i0Ad = Resource.MediaType.fromString("test1/test2;a=X1;b=2;c=3");
  assertStrictEquals(i0A.equals(i0A), true);
  assertStrictEquals(i0A.equals(i1A), true);
  assertStrictEquals(
    i0A.equals(undefined as unknown as Resource.MediaType),
    false,
  );
  assertStrictEquals(i0A.equals(i2A), false);
  assertStrictEquals(i0A.equals(i3A), false);
  assertStrictEquals(i0A.equals(i4A), false);
  assertStrictEquals(i0A.equals(i0Ab), true);
  assertStrictEquals(i0A.equals(i0Ac), true);
  assertStrictEquals(i0A.equals(i0Ad), false);
});

Deno.test("Resource.MediaType.prototype.equals() - caseInsensitiveParameters", () => {
  const opB = { caseInsensitiveParameters: ["a"] };

  const i0B = Resource.MediaType.fromString("test1/test2;a=x1;b=2;c=3");
  const i1B = Resource.MediaType.fromString("test1/test2;b=2;c=3;a=x1");
  const i2B = Resource.MediaType.fromString("test2/test2;a=x1;b=2;c=3");
  const i3B = Resource.MediaType.fromString("test1/test3;a=x1;b=2;c=3");
  const i4B = Resource.MediaType.fromString("test1/test3;a=x2;b=2;c=3");
  const i0Bb = Resource.MediaType.fromString("test1/test2 ;a=x1 ; b=2;c=3");
  const i0Bc = Resource.MediaType.fromString("TEST1/TEST2;A=x1;B=2;C=3");
  const i0Bd = Resource.MediaType.fromString("test1/test2;a=X1;b=2;c=3");
  assertStrictEquals(i0B.equals(i0B, opB), true);
  assertStrictEquals(i0B.equals(i1B, opB), true);
  assertStrictEquals(
    i0B.equals(undefined as unknown as Resource.MediaType, opB),
    false,
  );
  assertStrictEquals(i0B.equals(i2B, opB), false);
  assertStrictEquals(i0B.equals(i3B, opB), false);
  assertStrictEquals(i0B.equals(i4B, opB), false);
  assertStrictEquals(i0B.equals(i0Bb, opB), true);
  assertStrictEquals(i0B.equals(i0Bc, opB), true);
  assertStrictEquals(i0B.equals(i0Bd, opB), true);
});

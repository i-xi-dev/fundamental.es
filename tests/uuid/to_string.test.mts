import { assertStrictEquals } from "@std/assert";
import { Uuid } from "../../src/mod.mts";

Deno.test("Uuid.prototype.toString()", () => {
  assertStrictEquals(
    Uuid.fromString("12345678-9ABC-DEF0-1234-567890123456").toString(),
    "12345678-9abc-def0-1234-567890123456",
  );
  assertStrictEquals(
    Uuid.fromString("12345678-9ABC-DEF0-1234-567890123456").toString({
      asUrn: false,
    }),
    "12345678-9abc-def0-1234-567890123456",
  );
  assertStrictEquals(
    Uuid.fromString("12345678-9ABC-DEF0-1234-567890123456").toString({
      asUrn: true,
    }),
    "urn:uuid:12345678-9abc-def0-1234-567890123456",
  );
});

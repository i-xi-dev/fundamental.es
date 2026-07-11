import { assertStrictEquals } from "@std/assert";
import { Uuid } from "../../src/mod.mts";

Deno.test("Uuid.prototype.version", () => {
  assertStrictEquals(
    Uuid.fromString("00000000-0000-0000-0000-000000000000").version,
    0,
  );
  assertStrictEquals(
    Uuid.fromString("00000000-0000-F000-0000-000000000000").version,
    15,
  );
  assertStrictEquals(
    Uuid.fromString("urn:uuid:00000000-0000-F000-0000-000000000000").version,
    15,
  );
  assertStrictEquals(
    Uuid.fromString("00000000-0000-f000-0000-000000000000").version,
    15,
  );
});

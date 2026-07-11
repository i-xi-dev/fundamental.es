import { assertStrictEquals } from "@std/assert";
import { Uuid } from "../../mod.ts";

Deno.test("Uuid.generateSha1NameBased()", async () => {
  const u1 = await Uuid.generateSha1NameBased(Uuid.Namespace.URL, "string");
  assertStrictEquals(u1, "64be9091-88e8-5476-996b-8b541f7bf3e5");
  assertStrictEquals([8, 9, 10, 11].includes(Uuid.variantOf(u1)), true);
  assertStrictEquals(Uuid.versionOf(u1), 5);

  const u2 = await Uuid.generateSha1NameBased(Uuid.Namespace.URL, "あ");
  assertStrictEquals(u2, "fb641640-27a6-5bda-9a60-110bdf397598");
  assertStrictEquals([8, 9, 10, 11].includes(Uuid.variantOf(u2)), true);
  assertStrictEquals(Uuid.versionOf(u2), 5);

  const u3 = await Uuid.generateSha1NameBased(
    Uuid.Namespace.URL,
    "https://example.com/sample/123",
  );
  assertStrictEquals(u3, "7fdb2afb-a771-50eb-a0ae-7f02b933a569");
  assertStrictEquals([8, 9, 10, 11].includes(Uuid.variantOf(u3)), true);
  assertStrictEquals(Uuid.versionOf(u3), 5);
});

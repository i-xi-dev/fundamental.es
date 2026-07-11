import { assertStrictEquals } from "@std/assert";
import { Uuid } from "../../mod.ts";

Deno.test("Uuid.generateMd5NameBased()", async () => {
  const u1 = await Uuid.generateMd5NameBased(Uuid.Namespace.URL, "string");
  assertStrictEquals(u1, "724533da-66b6-35a1-ad9e-20205be920e9");
  assertStrictEquals([8, 9, 10, 11].includes(Uuid.variantOf(u1)), true);
  assertStrictEquals(Uuid.versionOf(u1), 3);

  const u2 = await Uuid.generateMd5NameBased(Uuid.Namespace.URL, "あ");
  assertStrictEquals(u2, "72bfcf35-4daf-306d-a757-b3a2ebac5e95");
  assertStrictEquals([8, 9, 10, 11].includes(Uuid.variantOf(u2)), true);
  assertStrictEquals(Uuid.versionOf(u2), 3);

  const u3 = await Uuid.generateMd5NameBased(
    Uuid.Namespace.URL,
    "https://example.com/sample/123",
  );
  assertStrictEquals(u3, "b131a200-1fa6-313e-b5d2-6b7a9b00570c");
  assertStrictEquals([8, 9, 10, 11].includes(Uuid.variantOf(u3)), true);
  assertStrictEquals(Uuid.versionOf(u3), 3);
});

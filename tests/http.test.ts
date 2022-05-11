import { assertStrictEquals } from "std/testing/asserts";
import { HttpUtils } from "../src/http.ts";

Deno.test("HttpUtils.collectHttpQuotedString", () => {
  // collectHttpQuotedString(string)
  const r1 = HttpUtils.collectHttpQuotedString("");
  assertStrictEquals(r1.collected, "");
  assertStrictEquals(r1.progression, 0);

  const r2 = HttpUtils.collectHttpQuotedString('"\\');
  assertStrictEquals(r2.collected, "\u005C");
  assertStrictEquals(r2.progression, 2);

  const r3 = HttpUtils.collectHttpQuotedString('"Hello" World');
  assertStrictEquals(r3.collected, "Hello");
  assertStrictEquals(r3.progression, 7);

  const r4 = HttpUtils.collectHttpQuotedString('"Hello \\\\ World\\""');
  assertStrictEquals(r4.collected, 'Hello \u005C World"');
  assertStrictEquals(r4.progression, 18);
});

Deno.test("HttpUtils.splitHeaderValue", () => {
  // splitHeaderValue(string)
  const r1 = HttpUtils.splitHeaderValue("");
  assertStrictEquals(JSON.stringify(r1), '[]');

  const r2 = HttpUtils.splitHeaderValue("a1");
  assertStrictEquals(JSON.stringify(r2), '["a1"]');

  const r3 = HttpUtils.splitHeaderValue("b,11,,");
  assertStrictEquals(JSON.stringify(r3), '["b","11","",""]');

  const r4 = HttpUtils.splitHeaderValue('c,"21 22"');
  assertStrictEquals(JSON.stringify(r4), '["c","\\"21 22\\""]');

  const r4b = HttpUtils.splitHeaderValue('c,"21 22"b');
  assertStrictEquals(JSON.stringify(r4b), '["c","\\"21 22\\"b"]');

  const r5 = HttpUtils.splitHeaderValue('nosniff,');
  assertStrictEquals(JSON.stringify(r5), '["nosniff",""]');

  const r5b = HttpUtils.splitHeaderValue('nosniff, ');
  assertStrictEquals(JSON.stringify(r5b), '["nosniff",""]');

  const r5c = HttpUtils.splitHeaderValue('text/html;", x/x');
  assertStrictEquals(JSON.stringify(r5c), '["text/html;\\", x/x"]');

  const r5d = HttpUtils.splitHeaderValue('x/x;test="hi",y/y');
  assertStrictEquals(JSON.stringify(r5d), '["x/x;test=\\"hi\\"","y/y"]');

  const r5e = HttpUtils.splitHeaderValue('x / x,,,1');
  assertStrictEquals(JSON.stringify(r5e), '["x / x","","","1"]');

  const r5f = HttpUtils.splitHeaderValue('"1,2", 3');
  assertStrictEquals(JSON.stringify(r5f), '["\\"1,2\\"","3"]');
});

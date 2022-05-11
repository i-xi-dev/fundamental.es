import { assertStrictEquals, assertThrows } from "std/testing/asserts";
import { type script, Script, ScriptSet } from "../src/script.ts";

Deno.test("Script.isScript", () => {
  // isScript(string)
  assertStrictEquals(Script.isScript("Zzzz"), true);
  assertStrictEquals(Script.isScript("ZZZZ"), true);
  assertStrictEquals(Script.isScript("zzzz"), true);
  assertStrictEquals(Script.isScript("aaaa"), true);
  assertStrictEquals(Script.isScript(""), false);
  assertStrictEquals(Script.isScript("Zzzzz"), false);
  assertStrictEquals(Script.isScript("Zzz"), false);

  // isScript(any)
  assertStrictEquals(Script.isScript(1), false);
  assertStrictEquals(Script.isScript(Symbol()), false);
  assertStrictEquals(Script.isScript({}), false);
  assertStrictEquals(Script.isScript(["Zzzz"]), false);
});

Deno.test("Script.normalize", () => {
  // normalize(string)
  assertStrictEquals(Script.normalize("Zzzz"), "Zzzz");
  assertStrictEquals(Script.normalize("ZZZZ"), "Zzzz");
  assertStrictEquals(Script.normalize("zzzz"), "Zzzz");

  assertThrows(() => {
    Script.normalize("aaa");
  }, TypeError, undefined, "script");
});

Deno.test("Script.XXXX", () => {
  assertStrictEquals(Script.ZZZZ, "Zzzz");
});

Deno.test("ScriptSet.fromArray", () => {
  // fromArray(Array)
  assertStrictEquals([...ScriptSet.fromArray([]).values()].join(","), "");
  assertStrictEquals([...ScriptSet.fromArray(["Latn"]).values()].join(","), "Latn");
  assertStrictEquals([...ScriptSet.fromArray(["Latn","Hani"]).values()].join(","), "Hani,Latn");
  assertStrictEquals([...ScriptSet.fromArray(["Latn","Hani","Hira","Kana"]).values()].join(","), "Hani,Hira,Kana,Latn");
  assertStrictEquals([...ScriptSet.fromArray(["Latn","Jpan"]).values()].join(","), "Jpan,Latn");
  assertStrictEquals([...ScriptSet.fromArray([1] as unknown as Array<string>).values()].join(","), "");

  // "fromArray(Array, {})
  assertStrictEquals([...ScriptSet.fromArray([], {}).values()].join(","), "");
  assertStrictEquals([...ScriptSet.fromArray(["Latn"], {}).values()].join(","), "Latn");
  assertStrictEquals([...ScriptSet.fromArray(["Latn","Hani"], {}).values()].join(","), "Hani,Latn");
  assertStrictEquals([...ScriptSet.fromArray(["Latn","Hani","Hira","Kana"], {}).values()].join(","), "Hani,Hira,Kana,Latn");
  assertStrictEquals([...ScriptSet.fromArray(["Latn","Jpan"], {}).values()].join(","), "Jpan,Latn");

  // fromArray(Array, { compose: string })
  assertStrictEquals([...ScriptSet.fromArray([], {compose:"none"}).values()].join(","), "");
  assertStrictEquals([...ScriptSet.fromArray(["Latn"], {compose:"none"}).values()].join(","), "Latn");
  assertStrictEquals([...ScriptSet.fromArray(["Latn","Hani"], {compose:"none"}).values()].join(","), "Hani,Latn");
  assertStrictEquals([...ScriptSet.fromArray(["Latn","Hani","Hira","Kana"], {compose:"none"}).values()].join(","), "Hani,Hira,Kana,Latn");
  assertStrictEquals([...ScriptSet.fromArray(["Latn","Jpan"], {compose:"none"}).values()].join(","), "Jpan,Latn");
  assertStrictEquals([...ScriptSet.fromArray([], {compose:"composition"}).values()].join(","), "");
  assertStrictEquals([...ScriptSet.fromArray(["Latn"], {compose:"composition"}).values()].join(","), "Latn");
  assertStrictEquals([...ScriptSet.fromArray(["Latn","Hani"], {compose:"composition"}).values()].join(","), "Hani,Latn");
  assertStrictEquals([...ScriptSet.fromArray(["Latn","Hani","Hira","Kana"], {compose:"composition"}).values()].join(","), "Jpan,Latn");
  assertStrictEquals([...ScriptSet.fromArray(["Latn","Jpan"], {compose:"composition"}).values()].join(","), "Jpan,Latn");
  assertStrictEquals([...ScriptSet.fromArray([], {compose:"decomposition"}).values()].join(","), "");
  assertStrictEquals([...ScriptSet.fromArray(["Latn"], {compose:"decomposition"}).values()].join(","), "Latn");
  assertStrictEquals([...ScriptSet.fromArray(["Latn","Hani"], {compose:"decomposition"}).values()].join(","), "Hani,Latn");
  assertStrictEquals([...ScriptSet.fromArray(["Latn","Hani","Hira","Kana"], {compose:"decomposition"}).values()].join(","), "Hani,Hira,Kana,Latn");
  assertStrictEquals([...ScriptSet.fromArray(["Latn","Jpan"], {compose:"decomposition"}).values()].join(","), "Hani,Hira,Kana,Latn");
});

Deno.test("ScriptSet.fromLocale", () => {
  // fromLocale(Intl.Locale)
  assertStrictEquals([...ScriptSet.fromLocale(new Intl.Locale("en")).values()].join(","), "");
  assertStrictEquals([...ScriptSet.fromLocale(new Intl.Locale("en", {script:"Latn"})).values()].join(","), "Latn");
  assertStrictEquals([...ScriptSet.fromLocale(new Intl.Locale("en", {script:"Hani"})).values()].join(","), "Hani");
  assertStrictEquals([...ScriptSet.fromLocale(new Intl.Locale("en", {script:"Jpan"})).values()].join(","), "Jpan");

  // fromLocale(Intl.Locale, {})
  assertStrictEquals([...ScriptSet.fromLocale(new Intl.Locale("en"), {}).values()].join(","), "");
  assertStrictEquals([...ScriptSet.fromLocale(new Intl.Locale("en", {script:"Latn"}), {}).values()].join(","), "Latn");
  assertStrictEquals([...ScriptSet.fromLocale(new Intl.Locale("en", {script:"Hani"}), {}).values()].join(","), "Hani");
  assertStrictEquals([...ScriptSet.fromLocale(new Intl.Locale("en", {script:"Jpan"}), {}).values()].join(","), "Jpan");

  // fromLocale(Intl.Locale, { compose: string })
  assertStrictEquals([...ScriptSet.fromLocale(new Intl.Locale("en"), {compose:"none"}).values()].join(","), "");
  assertStrictEquals([...ScriptSet.fromLocale(new Intl.Locale("en", {script:"Latn"}), {compose:"none"}).values()].join(","), "Latn");
  assertStrictEquals([...ScriptSet.fromLocale(new Intl.Locale("en", {script:"Hani"}), {compose:"none"}).values()].join(","), "Hani");
  assertStrictEquals([...ScriptSet.fromLocale(new Intl.Locale("en", {script:"Jpan"}), {compose:"none"}).values()].join(","), "Jpan");
  assertStrictEquals([...ScriptSet.fromLocale(new Intl.Locale("en"), {compose:"composition"}).values()].join(","), "");
  assertStrictEquals([...ScriptSet.fromLocale(new Intl.Locale("en", {script:"Latn"}), {compose:"composition"}).values()].join(","), "Latn");
  assertStrictEquals([...ScriptSet.fromLocale(new Intl.Locale("en", {script:"Hani"}), {compose:"composition"}).values()].join(","), "Hani");
  assertStrictEquals([...ScriptSet.fromLocale(new Intl.Locale("en", {script:"Jpan"}), {compose:"composition"}).values()].join(","), "Jpan");
  assertStrictEquals([...ScriptSet.fromLocale(new Intl.Locale("en"), {compose:"decomposition"}).values()].join(","), "");
  assertStrictEquals([...ScriptSet.fromLocale(new Intl.Locale("en", {script:"Latn"}), {compose:"decomposition"}).values()].join(","), "Latn");
  assertStrictEquals([...ScriptSet.fromLocale(new Intl.Locale("en", {script:"Hani"}), {compose:"decomposition"}).values()].join(","), "Hani");
  assertStrictEquals([...ScriptSet.fromLocale(new Intl.Locale("en", {script:"Jpan"}), {compose:"decomposition"}).values()].join(","), "Hani,Hira,Kana");
});

Deno.test("ScriptSet.prototype.add", () => {
  // add(string)
  const set = ScriptSet.fromArray([]);
  set.add("Latn");
  assertStrictEquals([...set.values()].join(","), "Latn");
  set.add("Hani");
  assertStrictEquals([...set.values()].join(","), "Latn,Hani");
  set.add("Latn");
  assertStrictEquals([...set.values()].join(","), "Latn,Hani");

  assertThrows(() => {
    set.add("Zzzzz" as unknown as script);
  }, TypeError, undefined, "script");
});

Deno.test("ScriptSet.prototype.normalize", () => {
  // normalize()
  const set = ScriptSet.fromArray(["Latn","Hani"]).normalize();
  assertStrictEquals([...set.values()].join(","), "Hani,Latn");
});

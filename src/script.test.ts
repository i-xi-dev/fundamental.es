import { expect } from '@esm-bundle/chai';
import { script, Script, ScriptSet } from "./script";

describe("Script.isScript", () => {
  it("isScript(string)", () => {
    expect(Script.isScript("Zzzz")).to.equal(true);
    expect(Script.isScript("ZZZZ")).to.equal(true);
    expect(Script.isScript("zzzz")).to.equal(true);
    expect(Script.isScript("aaaa")).to.equal(true);
    expect(Script.isScript("")).to.equal(false);
    expect(Script.isScript("Zzzzz")).to.equal(false);
    expect(Script.isScript("Zzz")).to.equal(false);

  });

  it("isScript(any)", () => {
    expect(Script.isScript(1)).to.equal(false);
    expect(Script.isScript(Symbol())).to.equal(false);
    expect(Script.isScript({})).to.equal(false);
    expect(Script.isScript(["Zzzz"])).to.equal(false);

  });

});

describe("Script.normalize", () => {
  it("normalize(string)", () => {
    expect(Script.normalize("Zzzz")).to.equal("Zzzz");
    expect(Script.normalize("ZZZZ")).to.equal("Zzzz");
    expect(Script.normalize("zzzz")).to.equal("Zzzz");

    expect(() => {
      Script.normalize("aaa");
    }).to.throw(TypeError, "script").with.property("name", "TypeError");

  });

});

describe("Script.XXXX", () => {
  it("normalize(string)", () => {
    expect(Script.ZZZZ).to.equal("Zzzz");

  });

});

describe("ScriptSet.fromArray", () => {
  it("fromArray(Array)", () => {
    expect([...ScriptSet.fromArray([]).values()].join(",")).to.equal("");
    expect([...ScriptSet.fromArray(["Latn"]).values()].join(",")).to.equal("Latn");
    expect([...ScriptSet.fromArray(["Latn","Hani"]).values()].join(",")).to.equal("Hani,Latn");
    expect([...ScriptSet.fromArray(["Latn","Hani","Hira","Kana"]).values()].join(",")).to.equal("Hani,Hira,Kana,Latn");
    expect([...ScriptSet.fromArray(["Latn","Jpan"]).values()].join(",")).to.equal("Jpan,Latn");

    expect([...ScriptSet.fromArray([1] as unknown as Array<string>).values()].join(",")).to.equal("");

  });

  it("fromArray(Array, {})", () => {
    expect([...ScriptSet.fromArray([], {}).values()].join(",")).to.equal("");
    expect([...ScriptSet.fromArray(["Latn"], {}).values()].join(",")).to.equal("Latn");
    expect([...ScriptSet.fromArray(["Latn","Hani"], {}).values()].join(",")).to.equal("Hani,Latn");
    expect([...ScriptSet.fromArray(["Latn","Hani","Hira","Kana"], {}).values()].join(",")).to.equal("Hani,Hira,Kana,Latn");
    expect([...ScriptSet.fromArray(["Latn","Jpan"], {}).values()].join(",")).to.equal("Jpan,Latn");

  });

  it("fromArray(Array, {compose:string})", () => {
    expect([...ScriptSet.fromArray([], {compose:"none"}).values()].join(",")).to.equal("");
    expect([...ScriptSet.fromArray(["Latn"], {compose:"none"}).values()].join(",")).to.equal("Latn");
    expect([...ScriptSet.fromArray(["Latn","Hani"], {compose:"none"}).values()].join(",")).to.equal("Hani,Latn");
    expect([...ScriptSet.fromArray(["Latn","Hani","Hira","Kana"], {compose:"none"}).values()].join(",")).to.equal("Hani,Hira,Kana,Latn");
    expect([...ScriptSet.fromArray(["Latn","Jpan"], {compose:"none"}).values()].join(",")).to.equal("Jpan,Latn");

    expect([...ScriptSet.fromArray([], {compose:"composition"}).values()].join(",")).to.equal("");
    expect([...ScriptSet.fromArray(["Latn"], {compose:"composition"}).values()].join(",")).to.equal("Latn");
    expect([...ScriptSet.fromArray(["Latn","Hani"], {compose:"composition"}).values()].join(",")).to.equal("Hani,Latn");
    expect([...ScriptSet.fromArray(["Latn","Hani","Hira","Kana"], {compose:"composition"}).values()].join(",")).to.equal("Jpan,Latn");
    expect([...ScriptSet.fromArray(["Latn","Jpan"], {compose:"composition"}).values()].join(",")).to.equal("Jpan,Latn");

    expect([...ScriptSet.fromArray([], {compose:"decomposition"}).values()].join(",")).to.equal("");
    expect([...ScriptSet.fromArray(["Latn"], {compose:"decomposition"}).values()].join(",")).to.equal("Latn");
    expect([...ScriptSet.fromArray(["Latn","Hani"], {compose:"decomposition"}).values()].join(",")).to.equal("Hani,Latn");
    expect([...ScriptSet.fromArray(["Latn","Hani","Hira","Kana"], {compose:"decomposition"}).values()].join(",")).to.equal("Hani,Hira,Kana,Latn");
    expect([...ScriptSet.fromArray(["Latn","Jpan"], {compose:"decomposition"}).values()].join(",")).to.equal("Hani,Hira,Kana,Latn");

  });

});

describe("ScriptSet.fromLocale", () => {
  it("fromLocale(Intl.Locale)", () => {
    expect([...ScriptSet.fromLocale(new Intl.Locale("en")).values()].join(",")).to.equal("");
    expect([...ScriptSet.fromLocale(new Intl.Locale("en", {script:"Latn"})).values()].join(",")).to.equal("Latn");
    expect([...ScriptSet.fromLocale(new Intl.Locale("en", {script:"Hani"})).values()].join(",")).to.equal("Hani");
    expect([...ScriptSet.fromLocale(new Intl.Locale("en", {script:"Jpan"})).values()].join(",")).to.equal("Jpan");

  });

  it("fromLocale(Intl.Locale, {})", () => {
    expect([...ScriptSet.fromLocale(new Intl.Locale("en"), {}).values()].join(",")).to.equal("");
    expect([...ScriptSet.fromLocale(new Intl.Locale("en", {script:"Latn"}), {}).values()].join(",")).to.equal("Latn");
    expect([...ScriptSet.fromLocale(new Intl.Locale("en", {script:"Hani"}), {}).values()].join(",")).to.equal("Hani");
    expect([...ScriptSet.fromLocale(new Intl.Locale("en", {script:"Jpan"}), {}).values()].join(",")).to.equal("Jpan");

  });

  it("fromLocale(Intl.Locale, {compose:string})", () => {
    expect([...ScriptSet.fromLocale(new Intl.Locale("en"), {compose:"none"}).values()].join(",")).to.equal("");
    expect([...ScriptSet.fromLocale(new Intl.Locale("en", {script:"Latn"}), {compose:"none"}).values()].join(",")).to.equal("Latn");
    expect([...ScriptSet.fromLocale(new Intl.Locale("en", {script:"Hani"}), {compose:"none"}).values()].join(",")).to.equal("Hani");
    expect([...ScriptSet.fromLocale(new Intl.Locale("en", {script:"Jpan"}), {compose:"none"}).values()].join(",")).to.equal("Jpan");

    expect([...ScriptSet.fromLocale(new Intl.Locale("en"), {compose:"composition"}).values()].join(",")).to.equal("");
    expect([...ScriptSet.fromLocale(new Intl.Locale("en", {script:"Latn"}), {compose:"composition"}).values()].join(",")).to.equal("Latn");
    expect([...ScriptSet.fromLocale(new Intl.Locale("en", {script:"Hani"}), {compose:"composition"}).values()].join(",")).to.equal("Hani");
    expect([...ScriptSet.fromLocale(new Intl.Locale("en", {script:"Jpan"}), {compose:"composition"}).values()].join(",")).to.equal("Jpan");

    expect([...ScriptSet.fromLocale(new Intl.Locale("en"), {compose:"decomposition"}).values()].join(",")).to.equal("");
    expect([...ScriptSet.fromLocale(new Intl.Locale("en", {script:"Latn"}), {compose:"decomposition"}).values()].join(",")).to.equal("Latn");
    expect([...ScriptSet.fromLocale(new Intl.Locale("en", {script:"Hani"}), {compose:"decomposition"}).values()].join(",")).to.equal("Hani");
    expect([...ScriptSet.fromLocale(new Intl.Locale("en", {script:"Jpan"}), {compose:"decomposition"}).values()].join(",")).to.equal("Hani,Hira,Kana");

  });

});

describe("ScriptSet.prototype.add", () => {
  it("add(string)", () => {
    const set = ScriptSet.fromArray([]);
    set.add("Latn");
    expect([...set.values()].join(",")).to.equal("Latn");
    set.add("Hani");
    expect([...set.values()].join(",")).to.equal("Latn,Hani");
    set.add("Latn");
    expect([...set.values()].join(",")).to.equal("Latn,Hani");

    expect(() => {
      set.add("Zzzzz" as unknown as script);
    }).to.throw(TypeError, "script").with.property("name", "TypeError");

  });

});

describe("ScriptSet.prototype.normalize", () => {
  it("normalize()", () => {
    const set = ScriptSet.fromArray(["Latn","Hani"]).normalize();
    expect([...set.values()].join(",")).to.equal("Hani,Latn");
  });

  it("normalize({})", () => {
  });

});

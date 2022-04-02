import { expect } from '@esm-bundle/chai';
import { Script } from "./script";

describe("isScript", () => {
  it("isScript(string)", () => {
    expect(Script.isScript("Zzzz")).to.equal(true);
    expect(Script.isScript("ZZZZ")).to.equal(true);
    expect(Script.isScript("zzzz")).to.equal(true);
    expect(Script.isScript("aaaa")).to.equal(false);
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

describe("normalize", () => {
  it("normalize(string)", () => {
    expect(Script.normalize("Zzzz")).to.equal("Zzzz");
    expect(Script.normalize("ZZZZ")).to.equal("Zzzz");
    expect(Script.normalize("zzzz")).to.equal("Zzzz");

    expect(() => {
      Script.normalize("aaaa");
    }).to.throw(TypeError, "script").with.property("name", "TypeError");

  });

});

describe("nameOf", () => {
  it("nameOf(string)", () => {
    expect(Script.nameOf("Zzzz")).to.equal("Code for uncoded script");
    expect(Script.nameOf("Aaaa" as unknown as Script)).to.equal("");

  });

});

describe("aliasOf", () => {
  it("aliasOf(string)", () => {
    expect(Script.aliasOf("Zzzz")).to.equal("Unknown");
    expect(Script.aliasOf("Aaaa" as unknown as Script)).to.equal("");

  });

});

describe("ofLocale", () => {
  it("ofLocale(Intl.Locale)", () => {
    expect(Script.ofLocale(new Intl.Locale("en", {script:"Latn"}))).to.equal("Latn");
    expect(Script.ofLocale(new Intl.Locale("en", {script:"LATN"}))).to.equal("Latn");
    expect(Script.ofLocale(new Intl.Locale("en", {script:"Aaaa"}))).to.equal(undefined);
    expect(Script.ofLocale(new Intl.Locale("en"))).to.equal(undefined);

  });

});

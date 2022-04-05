import { expect } from '@esm-bundle/chai';
import { Script, ScriptSet } from "../../dist/index.js";

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

    expect([...ScriptSet.fromArray([1]).values()].join(",")).to.equal("");

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
      set.add("Zzzzz");
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

// ---------------------------------------------------------

describe("x", () => {
  it("x", () => {
    const _scripts = {
      ADLM: "Adlm",
      AFAK: "Afak",
      AGHB: "Aghb",
      AHOM: "Ahom",
      ARAB: "Arab",
      ARAN: "Aran",
      ARMI: "Armi",
      ARMN: "Armn",
      AVST: "Avst",
      BALI: "Bali",
      BAMU: "Bamu",
      BASS: "Bass",
      BATK: "Batk",
      BENG: "Beng",
      BHKS: "Bhks",
      BLIS: "Blis",
      BOPO: "Bopo",
      BRAH: "Brah",
      BRAI: "Brai",
      BUGI: "Bugi",
      BUHD: "Buhd",
      CAKM: "Cakm",
      CANS: "Cans",
      CARI: "Cari",
      CHAM: "Cham",
      CHER: "Cher",
      CHRS: "Chrs",
      CIRT: "Cirt",
      COPT: "Copt",
      CPMN: "Cpmn",
      CPRT: "Cprt",
      CYRL: "Cyrl",
      CYRS: "Cyrs",
      DEVA: "Deva",
      DIAK: "Diak",
      DOGR: "Dogr",
      DSRT: "Dsrt",
      DUPL: "Dupl",
      EGYD: "Egyd",
      EGYH: "Egyh",
      EGYP: "Egyp",
      ELBA: "Elba",
      ELYM: "Elym",
      ETHI: "Ethi",
      GEOK: "Geok",
      GEOR: "Geor",
      GLAG: "Glag",
      GONG: "Gong",
      GONM: "Gonm",
      GOTH: "Goth",
      GRAN: "Gran",
      GREK: "Grek",
      GUJR: "Gujr",
      GURU: "Guru",
      HANB: "Hanb",
      HANG: "Hang",
      HANI: "Hani",
      HANO: "Hano",
      HANS: "Hans",
      HANT: "Hant",
      HATR: "Hatr",
      HEBR: "Hebr",
      HIRA: "Hira",
      HLUW: "Hluw",
      HMNG: "Hmng",
      HMNP: "Hmnp",
      HRKT: "Hrkt",
      HUNG: "Hung",
      INDS: "Inds",
      ITAL: "Ital",
      JAMO: "Jamo",
      JAVA: "Java",
      JPAN: "Jpan",
      JURC: "Jurc",
      KALI: "Kali",
      KANA: "Kana",
      KAWI: "Kawi",
      KHAR: "Khar",
      KHMR: "Khmr",
      KHOJ: "Khoj",
      KITL: "Kitl",
      KITS: "Kits",
      KNDA: "Knda",
      KORE: "Kore",
      KPEL: "Kpel",
      KTHI: "Kthi",
      LANA: "Lana",
      LAOO: "Laoo",
      LATF: "Latf",
      LATG: "Latg",
      LATN: "Latn",
      LEKE: "Leke",
      LEPC: "Lepc",
      LIMB: "Limb",
      LINA: "Lina",
      LINB: "Linb",
      LISU: "Lisu",
      LOMA: "Loma",
      LYCI: "Lyci",
      LYDI: "Lydi",
      MAHJ: "Mahj",
      MAKA: "Maka",
      MAND: "Mand",
      MANI: "Mani",
      MARC: "Marc",
      MAYA: "Maya",
      MEDF: "Medf",
      MEND: "Mend",
      MERC: "Merc",
      MERO: "Mero",
      MLYM: "Mlym",
      MODI: "Modi",
      MONG: "Mong",
      MOON: "Moon",
      MROO: "Mroo",
      MTEI: "Mtei",
      MULT: "Mult",
      MYMR: "Mymr",
      NAGM: "Nagm",
      NAND: "Nand",
      NARB: "Narb",
      NBAT: "Nbat",
      NEWA: "Newa",
      NKDB: "Nkdb",
      NKGB: "Nkgb",
      NKOO: "Nkoo",
      NSHU: "Nshu",
      OGAM: "Ogam",
      OLCK: "Olck",
      ORKH: "Orkh",
      ORYA: "Orya",
      OSGE: "Osge",
      OSMA: "Osma",
      OUGR: "Ougr",
      PALM: "Palm",
      PAUC: "Pauc",
      PCUN: "Pcun",
      PELM: "Pelm",
      PERM: "Perm",
      PHAG: "Phag",
      PHLI: "Phli",
      PHLP: "Phlp",
      PHLV: "Phlv",
      PHNX: "Phnx",
      PLRD: "Plrd",
      PIQD: "Piqd",
      PRTI: "Prti",
      PSIN: "Psin",
      QAAA: "Qaaa",
      QABX: "Qabx",
      RANJ: "Ranj",
      RJNG: "Rjng",
      ROHG: "Rohg",
      RORO: "Roro",
      RUNR: "Runr",
      SAMR: "Samr",
      SARA: "Sara",
      SARB: "Sarb",
      SAUR: "Saur",
      SGNW: "Sgnw",
      SHAW: "Shaw",
      SHRD: "Shrd",
      SHUI: "Shui",
      SIDD: "Sidd",
      SIND: "Sind",
      SINH: "Sinh",
      SOGD: "Sogd",
      SOGO: "Sogo",
      SORA: "Sora",
      SOYO: "Soyo",
      SUND: "Sund",
      SUNU: "Sunu",
      SYLO: "Sylo",
      SYRC: "Syrc",
      SYRE: "Syre",
      SYRJ: "Syrj",
      SYRN: "Syrn",
      TAGB: "Tagb",
      TAKR: "Takr",
      TALE: "Tale",
      TALU: "Talu",
      TAML: "Taml",
      TANG: "Tang",
      TAVT: "Tavt",
      TELU: "Telu",
      TENG: "Teng",
      TFNG: "Tfng",
      TGLG: "Tglg",
      THAA: "Thaa",
      THAI: "Thai",
      TIBT: "Tibt",
      TIRH: "Tirh",
      TNSA: "Tnsa",
      TOTO: "Toto",
      UGAR: "Ugar",
      VAII: "Vaii",
      VISP: "Visp",
      VITH: "Vith",
      WARA: "Wara",
      WCHO: "Wcho",
      WOLE: "Wole",
      XPEO: "Xpeo",
      XSUX: "Xsux",
      YEZI: "Yezi",
      YIII: "Yiii",
      ZANB: "Zanb",
      ZINH: "Zinh",
      ZMTH: "Zmth",
      ZSYE: "Zsye",
      ZSYM: "Zsym",
      ZXXX: "Zxxx",
      ZYYY: "Zyyy",
      ZZZZ: "Zzzz",
    };

    const expectF = [
      "Afak","Aran",
      "Blis",
      "Cirt","Cyrs",
      "Egyd","Egyh",
      "Geok",
      "Hanb","Hans","Hant","Hrkt",
      "Inds",
      "Jamo","Jpan","Jurc",
      "Kawi","Kitl","Kore","Kpel",
      "Latf","Latg","Leke","Loma",
      "Maya","Moon",
      "Nagm","Nkdb","Nkgb",
      "Pcun","Pelm","Phlv","Piqd","Psin",
      "Qaaa","Qaab","Qaac","Qaad","Qaae","Qaaf","Qaag","Qaah","Qaai","Qaaj",
      "Qaak","Qaal","Qaam","Qaan","Qaao","Qaap","Qaaq","Qaar","Qaas","Qaat",
      "Qaau","Qaav","Qaaw","Qaax","Qaay","Qaaz",
      "Qaba","Qabb","Qabc","Qabd","Qabe","Qabf","Qabg","Qabh","Qabi","Qabj",
      "Qabk","Qabl","Qabm","Qabn","Qabo","Qabp","Qabq","Qabr","Qabs","Qabt",
      "Qabu","Qabv","Qabw","Qabx",
      "Ranj","Roro",
      "Sara","Shui","Sunu","Syre","Syrj","Syrn",
      "Teng",
      "Visp",
      "Wole",
      "Zmth","Zsym","Zsye","Zxxx",
    ];
    const expectFSet = new Set(expectF);
    const actualF = [];

    for (const sc of Object.values(_scripts)) {
      try {
        new RegExp("\\p{sc=" + sc + "}+", "u").test("");
      }
      catch {
        if (expectFSet.has(sc)) {
          expectFSet.delete(sc);
        } else {
          actualF.push(sc);
        }
      }
    }
    console.log(expectFSet.size);
    console.log(actualF.length);
    expect(actualF.join(",")).to.equal("");

  });

});

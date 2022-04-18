import { expect } from '@esm-bundle/chai';
import {
  Unicode,
} from "../../dist/index.js";

describe("isCodePoint", () => {
  it("isCodePoint(number)", () => {
    expect(Unicode.CodePoint.isCodePoint(-1)).to.equal(false);
    expect(Unicode.CodePoint.isCodePoint(-0)).to.equal(true);
    expect(Unicode.CodePoint.isCodePoint(0)).to.equal(true);
    expect(Unicode.CodePoint.isCodePoint(1_114_111)).to.equal(true);
    expect(Unicode.CodePoint.isCodePoint(1_114_112)).to.equal(false);
    expect(Unicode.CodePoint.isCodePoint(0.1)).to.equal(false);

  });

  it("isCodePoint(any)", () => {
    expect(Unicode.CodePoint.isCodePoint("0")).to.equal(false);
    expect(Unicode.CodePoint.isCodePoint("1114111")).to.equal(false);
    expect(Unicode.CodePoint.isCodePoint(true)).to.equal(false);
    expect(Unicode.CodePoint.isCodePoint({})).to.equal(false);
    expect(Unicode.CodePoint.isCodePoint([])).to.equal(false);
    expect(Unicode.CodePoint.isCodePoint([0])).to.equal(false);
    expect(Unicode.CodePoint.isCodePoint(undefined)).to.equal(false);
    expect(Unicode.CodePoint.isCodePoint(null)).to.equal(false);

  });

});

describe("isRune", () => {
  it("isRune(string)", () => {
    expect(Unicode.Rune.isRune("")).to.equal(false);
    expect(Unicode.Rune.isRune("\u0000")).to.equal(true);
    expect(Unicode.Rune.isRune("\uFFFF")).to.equal(true);
    expect(Unicode.Rune.isRune("a")).to.equal(true);
    expect(Unicode.Rune.isRune("あ")).to.equal(true);
    expect(Unicode.Rune.isRune("\u{10FFFF}")).to.equal(true);
    expect(Unicode.Rune.isRune("\uD800")).to.equal(true);
    expect(Unicode.Rune.isRune("\uD800\uDC00")).to.equal(true);
    expect(Unicode.Rune.isRune("\uD7FF\uDC00")).to.equal(false);
    expect(Unicode.Rune.isRune("aa")).to.equal(false);
    expect(Unicode.Rune.isRune("aaa")).to.equal(false);

  });

  it("isRune(any)", () => {
    expect(Unicode.Rune.isRune(undefined)).to.equal(false);
    expect(Unicode.Rune.isRune(1)).to.equal(false);

  });

});

describe("fromCodePoint", () => {
  it("fromCodePoint(number)", () => {
    expect(Unicode.Rune.fromCodePoint(0)).to.equal("\u0000");
    expect(Unicode.Rune.fromCodePoint(0x10FFFF)).to.equal("\u{10FFFF}");
    expect(Unicode.Rune.fromCodePoint(0xD800)).to.equal("\uD800");

    expect(() => {
      Unicode.Rune.fromCodePoint(-1);
    }).to.throw(TypeError, "codePoint").with.property("name", "TypeError");

    expect(() => {
      Unicode.Rune.fromCodePoint(0x110000);
    }).to.throw(TypeError, "codePoint").with.property("name", "TypeError");

  });

  it("fromCodePoint(any)", () => {
    expect(() => {
      Unicode.Rune.fromCodePoint();
    }).to.throw(TypeError, "codePoint").with.property("name", "TypeError");

    expect(() => {
      Unicode.Rune.fromCodePoint("0");
    }).to.throw(TypeError, "codePoint").with.property("name", "TypeError");

  });

});

describe("toCodePoint", () => {
  it("toCodePoint(string)", () => {
    expect(Unicode.Rune.toCodePoint("\u0000")).to.equal(0x0);
    expect(Unicode.Rune.toCodePoint("\u{10FFFF}")).to.equal(0x10FFFF);
    expect(Unicode.Rune.toCodePoint("\uD800")).to.equal(0xD800);

    expect(() => {
      Unicode.Rune.toCodePoint("");
    }).to.throw(TypeError, "rune").with.property("name", "TypeError");

    expect(() => {
      Unicode.Rune.toCodePoint("aa");
    }).to.throw(TypeError, "rune").with.property("name", "TypeError");

  });

  it("toCodePoint(any)", () => {
    expect(() => {
      Unicode.Rune.toCodePoint();
    }).to.throw(TypeError, "rune").with.property("name", "TypeError");

    expect(() => {
      Unicode.Rune.toCodePoint(0);
    }).to.throw(TypeError, "rune").with.property("name", "TypeError");

  });

});

describe("isLetter", () => {
  it("isLetter(string)", () => {
    expect(Unicode.Rune.isLetter("\u0000")).to.equal(false);
    //expect(Unicode.Rune.isLetter("\u{10FFFF}")).to.equal(false);
    expect(Unicode.Rune.isLetter("a")).to.equal(true);
    expect(Unicode.Rune.isLetter("A")).to.equal(true);
    expect(Unicode.Rune.isLetter("1")).to.equal(false);
    expect(Unicode.Rune.isLetter("=")).to.equal(false);

    expect(() => {
      Unicode.Rune.isLetter("\u0000\u0000");
    }).to.throw(TypeError, "rune").with.property("name", "TypeError");

  });

  it("isLetter(any)", () => {
    expect(() => {
      Unicode.Rune.isLetter(0);
    }).to.throw(TypeError, "rune").with.property("name", "TypeError");

  });

});

describe("isMark", () => {
  it("isMark(string)", () => {
    expect(Unicode.Rune.isMark("\u0000")).to.equal(false);
    //expect(Unicode.Rune.isMark("\u{10FFFF}")).to.equal(false);
    expect(Unicode.Rune.isMark("a")).to.equal(false);
    expect(Unicode.Rune.isMark("A")).to.equal(false);
    expect(Unicode.Rune.isMark("1")).to.equal(false);
    expect(Unicode.Rune.isMark("=")).to.equal(false);
    expect(Unicode.Rune.isMark("\u0300")).to.equal(true);

    expect(() => {
      Unicode.Rune.isMark("\u0000\u0000");
    }).to.throw(TypeError, "rune").with.property("name", "TypeError");

  });

  it("isMark(any)", () => {
    expect(() => {
      Unicode.Rune.isMark(0);
    }).to.throw(TypeError, "rune").with.property("name", "TypeError");

  });

});

describe("isNumber", () => {
  it("isNumber(string)", () => {
    expect(Unicode.Rune.isNumber("\u0000")).to.equal(false);
    //expect(Unicode.Rune.isNumber("\u{10FFFF}")).to.equal(false);
    expect(Unicode.Rune.isNumber("a")).to.equal(false);
    expect(Unicode.Rune.isNumber("A")).to.equal(false);
    expect(Unicode.Rune.isNumber("1")).to.equal(true);
    expect(Unicode.Rune.isNumber("=")).to.equal(false);

    expect(() => {
      Unicode.Rune.isNumber("\u0000\u0000");
    }).to.throw(TypeError, "rune").with.property("name", "TypeError");

  });

  it("isNumber(any)", () => {
    expect(() => {
      Unicode.Rune.isNumber(0);
    }).to.throw(TypeError, "rune").with.property("name", "TypeError");

  });

});

describe("isPunctuation", () => {
  it("isPunctuation(string)", () => {
    expect(Unicode.Rune.isPunctuation("\u0000")).to.equal(false);
    //expect(Unicode.Rune.isPunctuation("\u{10FFFF}")).to.equal(false);
    expect(Unicode.Rune.isPunctuation("a")).to.equal(false);
    expect(Unicode.Rune.isPunctuation("A")).to.equal(false);
    expect(Unicode.Rune.isPunctuation("1")).to.equal(false);
    expect(Unicode.Rune.isPunctuation("=")).to.equal(false);
    expect(Unicode.Rune.isPunctuation("\u002C")).to.equal(true);

    expect(() => {
      Unicode.Rune.isPunctuation("\u0000\u0000");
    }).to.throw(TypeError, "rune").with.property("name", "TypeError");

  });

  it("isPunctuation(any)", () => {
    expect(() => {
      Unicode.Rune.isPunctuation(0);
    }).to.throw(TypeError, "rune").with.property("name", "TypeError");

  });

});

describe("isSymbol", () => {
  it("isSymbol(string)", () => {
    expect(Unicode.Rune.isSymbol("\u0000")).to.equal(false);
    //expect(Unicode.Rune.isSymbol("\u{10FFFF}")).to.equal(false);
    expect(Unicode.Rune.isSymbol("a")).to.equal(false);
    expect(Unicode.Rune.isSymbol("A")).to.equal(false);
    expect(Unicode.Rune.isSymbol("1")).to.equal(false);
    expect(Unicode.Rune.isSymbol("=")).to.equal(true);
    expect(Unicode.Rune.isSymbol("\u002B")).to.equal(true);

    expect(() => {
      Unicode.Rune.isSymbol("\u0000\u0000");
    }).to.throw(TypeError, "rune").with.property("name", "TypeError");

  });

  it("isSymbol(any)", () => {
    expect(() => {
      Unicode.Rune.isSymbol(0);
    }).to.throw(TypeError, "rune").with.property("name", "TypeError");

  });

});

describe("isSeparator", () => {
  it("isSeparator(string)", () => {
    expect(Unicode.Rune.isSeparator("\u0000")).to.equal(false);
    //expect(Unicode.Rune.isSeparator("\u{10FFFF}")).to.equal(false);
    expect(Unicode.Rune.isSeparator("a")).to.equal(false);
    expect(Unicode.Rune.isSeparator("A")).to.equal(false);
    expect(Unicode.Rune.isSeparator("1")).to.equal(false);
    expect(Unicode.Rune.isSeparator("=")).to.equal(false);
    expect(Unicode.Rune.isSeparator(" ")).to.equal(true);

    expect(() => {
      Unicode.Rune.isSeparator("\u0000\u0000");
    }).to.throw(TypeError, "rune").with.property("name", "TypeError");

  });

  it("isSeparator(any)", () => {
    expect(() => {
      Unicode.Rune.isSeparator(0);
    }).to.throw(TypeError, "rune").with.property("name", "TypeError");

  });

});

describe("isControl", () => {
  it("isControl(string)", () => {
    expect(Unicode.Rune.isControl("\u0000")).to.equal(true);
    expect(Unicode.Rune.isControl("\u001F")).to.equal(true);
    expect(Unicode.Rune.isControl("\u0020")).to.equal(false);
    expect(Unicode.Rune.isControl("\u007E")).to.equal(false);
    expect(Unicode.Rune.isControl("\u007F")).to.equal(true);
    expect(Unicode.Rune.isControl("\u0080")).to.equal(true);
    expect(Unicode.Rune.isControl("\u009F")).to.equal(true);
    expect(Unicode.Rune.isControl("\u00A0")).to.equal(false);
    expect(Unicode.Rune.isControl("\u{10FFFF}")).to.equal(false);

    expect(() => {
      Unicode.Rune.isControl("\u0000\u0000");
    }).to.throw(TypeError, "rune").with.property("name", "TypeError");

  });

  it("isControl(any)", () => {
    expect(() => {
      Unicode.Rune.isControl(0);
    }).to.throw(TypeError, "rune").with.property("name", "TypeError");

  });

});

describe("isSurrogate", () => {
  it("isSurrogate(string)", () => {
    expect(Unicode.Rune.isSurrogate("\u0000")).to.equal(false);
    expect(Unicode.Rune.isSurrogate("\u{10FFFF}")).to.equal(false);
    expect(Unicode.Rune.isSurrogate("\uD7FF")).to.equal(false);
    expect(Unicode.Rune.isSurrogate("\uD800")).to.equal(true);
    expect(Unicode.Rune.isSurrogate("\uDBFF")).to.equal(true);
    expect(Unicode.Rune.isSurrogate("\uDC00")).to.equal(true);
    expect(Unicode.Rune.isSurrogate("\uDFFF")).to.equal(true);
    expect(Unicode.Rune.isSurrogate("\uE000")).to.equal(false);

    expect(() => {
      Unicode.Rune.isSurrogate("\u0000\u0000");
    }).to.throw(TypeError, "rune").with.property("name", "TypeError");

  });

  it("isSurrogate(any)", () => {
    expect(() => {
      Unicode.Rune.isSurrogate(0);
    }).to.throw(TypeError, "rune").with.property("name", "TypeError");

  });

});

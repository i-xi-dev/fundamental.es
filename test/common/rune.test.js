import { expect } from '@esm-bundle/chai';
import {
  CodePoint,
  Rune,
} from "../../dist/index.js";

describe("isCodePoint", () => {
  it("isCodePoint(number)", () => {
    expect(CodePoint.isCodePoint(-1)).to.equal(false);
    expect(CodePoint.isCodePoint(-0)).to.equal(true);
    expect(CodePoint.isCodePoint(0)).to.equal(true);
    expect(CodePoint.isCodePoint(1_114_111)).to.equal(true);
    expect(CodePoint.isCodePoint(1_114_112)).to.equal(false);
    expect(CodePoint.isCodePoint(0.1)).to.equal(false);

  });

  it("isCodePoint(any)", () => {
    expect(CodePoint.isCodePoint("0")).to.equal(false);
    expect(CodePoint.isCodePoint("1114111")).to.equal(false);
    expect(CodePoint.isCodePoint(true)).to.equal(false);
    expect(CodePoint.isCodePoint({})).to.equal(false);
    expect(CodePoint.isCodePoint([])).to.equal(false);
    expect(CodePoint.isCodePoint([0])).to.equal(false);
    expect(CodePoint.isCodePoint(undefined)).to.equal(false);
    expect(CodePoint.isCodePoint(null)).to.equal(false);

  });

});

describe("isRune", () => {
  it("isRune(string)", () => {
    expect(Rune.isRune("")).to.equal(false);
    expect(Rune.isRune("\u0000")).to.equal(true);
    expect(Rune.isRune("\uFFFF")).to.equal(true);
    expect(Rune.isRune("a")).to.equal(true);
    expect(Rune.isRune("あ")).to.equal(true);
    expect(Rune.isRune("\u{10FFFF}")).to.equal(true);
    expect(Rune.isRune("\uD800")).to.equal(true);
    expect(Rune.isRune("\uD800\uDC00")).to.equal(true);
    expect(Rune.isRune("\uD7FF\uDC00")).to.equal(false);
    expect(Rune.isRune("aa")).to.equal(false);
    expect(Rune.isRune("aaa")).to.equal(false);

  });

  it("isRune(any)", () => {
    expect(Rune.isRune(undefined)).to.equal(false);
    expect(Rune.isRune(1)).to.equal(false);

  });

});

describe("fromCodePoint", () => {
  it("fromCodePoint(number)", () => {
    expect(Rune.fromCodePoint(0)).to.equal("\u0000");
    expect(Rune.fromCodePoint(0x10FFFF)).to.equal("\u{10FFFF}");
    expect(Rune.fromCodePoint(0xD800)).to.equal("\uD800");

    expect(() => {
      Rune.fromCodePoint(-1);
    }).to.throw(TypeError, "codePoint").with.property("name", "TypeError");

    expect(() => {
      Rune.fromCodePoint(0x110000);
    }).to.throw(TypeError, "codePoint").with.property("name", "TypeError");

  });

  it("fromCodePoint(any)", () => {
    expect(() => {
      Rune.fromCodePoint();
    }).to.throw(TypeError, "codePoint").with.property("name", "TypeError");

    expect(() => {
      Rune.fromCodePoint("0");
    }).to.throw(TypeError, "codePoint").with.property("name", "TypeError");

  });

});

describe("toCodePoint", () => {
  it("toCodePoint(string)", () => {
    expect(Rune.toCodePoint("\u0000")).to.equal(0x0);
    expect(Rune.toCodePoint("\u{10FFFF}")).to.equal(0x10FFFF);
    expect(Rune.toCodePoint("\uD800")).to.equal(0xD800);

    expect(() => {
      Rune.toCodePoint("");
    }).to.throw(TypeError, "rune").with.property("name", "TypeError");

    expect(() => {
      Rune.toCodePoint("aa");
    }).to.throw(TypeError, "rune").with.property("name", "TypeError");

  });

  it("toCodePoint(any)", () => {
    expect(() => {
      Rune.toCodePoint();
    }).to.throw(TypeError, "rune").with.property("name", "TypeError");

    expect(() => {
      Rune.toCodePoint(0);
    }).to.throw(TypeError, "rune").with.property("name", "TypeError");

  });

});

describe("isLetter", () => {
  it("isLetter(string)", () => {
    expect(Rune.isLetter("\u0000")).to.equal(false);
    //expect(Rune.isLetter("\u{10FFFF}")).to.equal(false);
    expect(Rune.isLetter("a")).to.equal(true);
    expect(Rune.isLetter("A")).to.equal(true);
    expect(Rune.isLetter("1")).to.equal(false);
    expect(Rune.isLetter("=")).to.equal(false);

    expect(() => {
      Rune.isLetter("\u0000\u0000");
    }).to.throw(TypeError, "rune").with.property("name", "TypeError");

  });

  it("isLetter(any)", () => {
    expect(() => {
      Rune.isLetter(0);
    }).to.throw(TypeError, "rune").with.property("name", "TypeError");

  });

});

describe("isMark", () => {
  it("isMark(string)", () => {
    expect(Rune.isMark("\u0000")).to.equal(false);
    //expect(Rune.isMark("\u{10FFFF}")).to.equal(false);
    expect(Rune.isMark("a")).to.equal(false);
    expect(Rune.isMark("A")).to.equal(false);
    expect(Rune.isMark("1")).to.equal(false);
    expect(Rune.isMark("=")).to.equal(false);
    expect(Rune.isMark("\u0300")).to.equal(true);

    expect(() => {
      Rune.isMark("\u0000\u0000");
    }).to.throw(TypeError, "rune").with.property("name", "TypeError");

  });

  it("isMark(any)", () => {
    expect(() => {
      Rune.isMark(0);
    }).to.throw(TypeError, "rune").with.property("name", "TypeError");

  });

});

describe("isNumber", () => {
  it("isNumber(string)", () => {
    expect(Rune.isNumber("\u0000")).to.equal(false);
    //expect(Rune.isNumber("\u{10FFFF}")).to.equal(false);
    expect(Rune.isNumber("a")).to.equal(false);
    expect(Rune.isNumber("A")).to.equal(false);
    expect(Rune.isNumber("1")).to.equal(true);
    expect(Rune.isNumber("=")).to.equal(false);

    expect(() => {
      Rune.isNumber("\u0000\u0000");
    }).to.throw(TypeError, "rune").with.property("name", "TypeError");

  });

  it("isNumber(any)", () => {
    expect(() => {
      Rune.isNumber(0);
    }).to.throw(TypeError, "rune").with.property("name", "TypeError");

  });

});

describe("isControl", () => {
  it("isControl(string)", () => {
    expect(Rune.isControl("\u0000")).to.equal(true);
    expect(Rune.isControl("\u001F")).to.equal(true);
    expect(Rune.isControl("\u0020")).to.equal(false);
    expect(Rune.isControl("\u007E")).to.equal(false);
    expect(Rune.isControl("\u007F")).to.equal(true);
    expect(Rune.isControl("\u0080")).to.equal(true);
    expect(Rune.isControl("\u009F")).to.equal(true);
    expect(Rune.isControl("\u00A0")).to.equal(false);
    expect(Rune.isControl("\u{10FFFF}")).to.equal(false);

    expect(() => {
      Rune.isControl("\u0000\u0000");
    }).to.throw(TypeError, "rune").with.property("name", "TypeError");

  });

  it("isControl(any)", () => {
    expect(() => {
      Rune.isControl(0);
    }).to.throw(TypeError, "rune").with.property("name", "TypeError");

  });

});

describe("isSurrogate", () => {
  it("isSurrogate(string)", () => {
    expect(Rune.isSurrogate("\u0000")).to.equal(false);
    expect(Rune.isSurrogate("\u{10FFFF}")).to.equal(false);
    expect(Rune.isSurrogate("\uD7FF")).to.equal(false);
    expect(Rune.isSurrogate("\uD800")).to.equal(true);
    expect(Rune.isSurrogate("\uDBFF")).to.equal(true);
    expect(Rune.isSurrogate("\uDC00")).to.equal(true);
    expect(Rune.isSurrogate("\uDFFF")).to.equal(true);
    expect(Rune.isSurrogate("\uE000")).to.equal(false);

    expect(() => {
      Rune.isSurrogate("\u0000\u0000");
    }).to.throw(TypeError, "rune").with.property("name", "TypeError");

  });

  it("isSurrogate(any)", () => {
    expect(() => {
      Rune.isSurrogate(0);
    }).to.throw(TypeError, "rune").with.property("name", "TypeError");

  });

});

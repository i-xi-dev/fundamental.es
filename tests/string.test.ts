import { assertStrictEquals, assertThrows } from "std/testing/asserts";
import { Unicode, UnicodeUtils } from "../src/unicode.ts";
import { StringUtils } from "../src/string.ts";

const HTTP_TAB_OR_SPACE: UnicodeUtils.CodePointRange = [[ 0x9 ], [ 0x20 ]];

Deno.test("StringUtils.matches", () => {
  // matches(string, CodePointRange)
  assertStrictEquals(StringUtils.matches("", HTTP_TAB_OR_SPACE), true);
  assertStrictEquals(StringUtils.matches("\u0008", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(StringUtils.matches("\t", HTTP_TAB_OR_SPACE), true);
  assertStrictEquals(StringUtils.matches("\u000A", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(StringUtils.matches("\u001F", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(StringUtils.matches(" ", HTTP_TAB_OR_SPACE), true);
  assertStrictEquals(StringUtils.matches("\u0021", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(StringUtils.matches("a", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(StringUtils.matches("\t      \t    ", HTTP_TAB_OR_SPACE), true);
  assertStrictEquals(StringUtils.matches("az", [[0x41,0x5A]]), false);
  assertStrictEquals(StringUtils.matches("AZ", [[0x41,0x5A]]), true);
  assertStrictEquals(StringUtils.matches("azAZ", [[0x41,0x5A]]), false);

  // matches(string, Unicode.Category[])
  assertStrictEquals(StringUtils.matches("", [ Unicode.Category.LETTER ]), true);
  assertStrictEquals(StringUtils.matches("a", [ Unicode.Category.LETTER ]), true);
  assertStrictEquals(StringUtils.matches("1", [ Unicode.Category.LETTER ]), false);
  assertStrictEquals(StringUtils.matches("-", [ Unicode.Category.LETTER ]), false);
  assertStrictEquals(StringUtils.matches("a1", [ Unicode.Category.LETTER ]), false);
  assertStrictEquals(StringUtils.matches("a1-", [ Unicode.Category.LETTER ]), false);
  assertStrictEquals(StringUtils.matches("a", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ]), true);
  assertStrictEquals(StringUtils.matches("1", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ]), true);
  assertStrictEquals(StringUtils.matches("-", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ]), false);
  assertStrictEquals(StringUtils.matches("a1", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ]), true);
  assertStrictEquals(StringUtils.matches("a1-", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ]), false);

  // matches(string, script[])
  assertStrictEquals(StringUtils.matches("", [ "Latn" ]), true);
  assertStrictEquals(StringUtils.matches("a", [ "Latn" ]), true);
  assertStrictEquals(StringUtils.matches("1", [ "Latn" ]), false);
  assertStrictEquals(StringUtils.matches("a1", [ "Latn" ]), false);
  assertStrictEquals(StringUtils.matches("1a", [ "Latn" ]), false);
  assertStrictEquals(StringUtils.matches("可", [ "Latn" ]), false);
  assertStrictEquals(StringUtils.matches("可", [ "Hani" ]), true);
  assertStrictEquals(StringUtils.matches("可a", [ "Hani" ]), false);
  assertStrictEquals(StringUtils.matches("可a", [ "Hani","Latn" ]), true);
  assertStrictEquals(StringUtils.matches("あ", [ "Latn" ]), false);
  assertStrictEquals(StringUtils.matches("あ", [ "Hira" ]), true);
  assertStrictEquals(StringUtils.matches("あ", [ "Jpan" ]), true);
  assertStrictEquals(StringUtils.matches("あ", [ "Hrkt" ]), true);
  assertStrictEquals(StringUtils.matches("あ", [ "Jpan","Latn" ]), true);
  assertStrictEquals(StringUtils.matches("あa", [ "Latn" ]), false);
  assertStrictEquals(StringUtils.matches("あa", [ "Hira" ]), false);
  assertStrictEquals(StringUtils.matches("あa", [ "Jpan" ]), false);
  assertStrictEquals(StringUtils.matches("あa", [ "Hrkt" ]), false);
  assertStrictEquals(StringUtils.matches("あa", [ "Jpan","Latn" ]), true);
  assertStrictEquals(StringUtils.matches("ア", [ "Latn" ]), false);
  assertStrictEquals(StringUtils.matches("ア", [ "Hira" ]), false);
  assertStrictEquals(StringUtils.matches("ア", [ "Jpan" ]), true);
  assertStrictEquals(StringUtils.matches("ア", [ "Hrkt" ]), true);
  assertStrictEquals(StringUtils.matches("ア", [ "Jpan","Latn" ]), true);
  assertStrictEquals(StringUtils.matches("アa", [ "Latn" ]), false);
  assertStrictEquals(StringUtils.matches("アa", [ "Hira" ]), false);
  assertStrictEquals(StringUtils.matches("アa", [ "Jpan" ]), false);
  assertStrictEquals(StringUtils.matches("アa", [ "Hrkt" ]), false);
  assertStrictEquals(StringUtils.matches("アa", [ "Jpan","Latn" ]), true);
  assertStrictEquals(StringUtils.matches("あア", [ "Latn" ]), false);
  assertStrictEquals(StringUtils.matches("あア", [ "Hira" ]), false);
  assertStrictEquals(StringUtils.matches("あア", [ "Jpan" ]), true);
  assertStrictEquals(StringUtils.matches("あア", [ "Hrkt" ]), true);
  assertStrictEquals(StringUtils.matches("あア", [ "Jpan","Latn" ]), true);
  assertStrictEquals(StringUtils.matches("あアa", [ "Latn" ]), false);
  assertStrictEquals(StringUtils.matches("あアa", [ "Hira" ]), false);
  assertStrictEquals(StringUtils.matches("あアa", [ "Jpan" ]), false);
  assertStrictEquals(StringUtils.matches("あアa", [ "Hrkt" ]), false);
  assertStrictEquals(StringUtils.matches("あアa", [ "Jpan","Latn" ]), true);
  assertStrictEquals(StringUtils.matches("あア脗", [ "Latn" ]), false);
  assertStrictEquals(StringUtils.matches("あア脗", [ "Hira" ]), false);
  assertStrictEquals(StringUtils.matches("あア脗", [ "Jpan" ]), true);
  assertStrictEquals(StringUtils.matches("あア脗", [ "Hrkt" ]), false);
  assertStrictEquals(StringUtils.matches("あア脗", [ "Jpan","Latn" ]), true);
  assertStrictEquals(StringUtils.matches("あア脗a", [ "Latn" ]), false);
  assertStrictEquals(StringUtils.matches("あア脗a", [ "Hira" ]), false);
  assertStrictEquals(StringUtils.matches("あア脗a", [ "Jpan" ]), false);
  assertStrictEquals(StringUtils.matches("あア脗a", [ "Hrkt" ]), false);
  assertStrictEquals(StringUtils.matches("あア脗a", [ "Jpan","Latn" ]), true);

  // matches(string, any)
  assertThrows(() => {
    StringUtils.matches("a", []);
  }, TypeError, undefined, "searchObject");
  assertThrows(() => {
    StringUtils.matches("a", undefined as unknown as UnicodeUtils.CodePointRange);
  }, TypeError, undefined, "searchObject");
  assertThrows(() => {
    StringUtils.matches("a", [[] as unknown as [number]]);
  }, TypeError, undefined, "searchObject");
  assertThrows(() => {
    StringUtils.matches("a", [[1,2,3] as unknown as [number]]);
  }, TypeError, undefined, "searchObject");
});

Deno.test("StringUtils.contains", () => {
  // contains(string, CodePointRange)
  assertStrictEquals(StringUtils.contains("", HTTP_TAB_OR_SPACE), false);
  assertStrictEquals(StringUtils.contains("az", [[0x41,0x5A]]), false);
  assertStrictEquals(StringUtils.contains("AZ", [[0x41,0x5A]]), true);
  assertStrictEquals(StringUtils.contains("azAZ", [[0x41,0x5A]]), true);

  // contains(string, Unicode.Category[])
  assertStrictEquals(StringUtils.contains("", [ Unicode.Category.LETTER ]), false);
  assertStrictEquals(StringUtils.contains("a", [ Unicode.Category.LETTER ]), true);
  assertStrictEquals(StringUtils.contains("1", [ Unicode.Category.LETTER ]), false);
  assertStrictEquals(StringUtils.contains("-", [ Unicode.Category.LETTER ]), false);
  assertStrictEquals(StringUtils.contains("a1", [ Unicode.Category.LETTER ]), true);
  assertStrictEquals(StringUtils.contains("a1-", [ Unicode.Category.LETTER ]), true);
  assertStrictEquals(StringUtils.contains("a", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ]), true);
  assertStrictEquals(StringUtils.contains("1", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ]), true);
  assertStrictEquals(StringUtils.contains("-", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ]), false);
  assertStrictEquals(StringUtils.contains("a1", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ]), true);
  assertStrictEquals(StringUtils.contains("a1-", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ]), true);

  // contains(string, any)
  assertThrows(() => {
    StringUtils.contains("a", []);
  }, TypeError, undefined, "searchObject");
  assertThrows(() => {
    StringUtils.contains("a", undefined as unknown as UnicodeUtils.CodePointRange);
  }, TypeError, undefined, "searchObject");
  assertThrows(() => {
    StringUtils.contains("a", [[] as unknown as [number]]);
  }, TypeError, undefined, "searchObject");
  assertThrows(() => {
    StringUtils.contains("a", [[1,2,3] as unknown as [number]]);
  }, TypeError, undefined, "searchObject");
});

Deno.test("StringUtils.trim", () => {
  // trim(string, CodePointRange)
  assertStrictEquals(StringUtils.trim("", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(StringUtils.trim("X\u0008", HTTP_TAB_OR_SPACE), "X\u0008");
  assertStrictEquals(StringUtils.trim("X\t", HTTP_TAB_OR_SPACE), "X");
  assertStrictEquals(StringUtils.trim("X\u000A", HTTP_TAB_OR_SPACE), "X\u000A");
  assertStrictEquals(StringUtils.trim("X\u001F", HTTP_TAB_OR_SPACE), "X\u001F");
  assertStrictEquals(StringUtils.trim("X ", HTTP_TAB_OR_SPACE), "X");
  assertStrictEquals(StringUtils.trim("X\u0021", HTTP_TAB_OR_SPACE), "X\u0021");
  assertStrictEquals(StringUtils.trim("Xa", HTTP_TAB_OR_SPACE), "Xa");
  assertStrictEquals(StringUtils.trim("X\t      \t    ", HTTP_TAB_OR_SPACE), "X");
  assertStrictEquals(StringUtils.trim("X\t      \t    X", HTTP_TAB_OR_SPACE), "X\t      \t    X");
  assertStrictEquals(StringUtils.trim("\u0008X\u0008", HTTP_TAB_OR_SPACE), "\u0008X\u0008");
  assertStrictEquals(StringUtils.trim("\tX\t", HTTP_TAB_OR_SPACE), "X");
  assertStrictEquals(StringUtils.trim("\u000AX\u000A", HTTP_TAB_OR_SPACE), "\u000AX\u000A");
  assertStrictEquals(StringUtils.trim("\u001FX\u001F", HTTP_TAB_OR_SPACE), "\u001FX\u001F");
  assertStrictEquals(StringUtils.trim(" X ", HTTP_TAB_OR_SPACE), "X");
  assertStrictEquals(StringUtils.trim("\u0021X\u0021", HTTP_TAB_OR_SPACE), "\u0021X\u0021");
  assertStrictEquals(StringUtils.trim("aXa", HTTP_TAB_OR_SPACE), "aXa");
  assertStrictEquals(StringUtils.trim("\t      \t    X\t      \t    ", HTTP_TAB_OR_SPACE), "X");
  assertStrictEquals(StringUtils.trim("X\t      \t    X\t      \t    X", HTTP_TAB_OR_SPACE), "X\t      \t    X\t      \t    X");

  // trim(string, Unicode.Category[])
  assertStrictEquals(StringUtils.trim("", [ Unicode.Category.LETTER ]), "");
  assertStrictEquals(StringUtils.trim("b5a5b", [ Unicode.Category.LETTER ]), "5a5");
  assertStrictEquals(StringUtils.trim("b515b", [ Unicode.Category.LETTER ]), "515");
  assertStrictEquals(StringUtils.trim("b5-5b", [ Unicode.Category.LETTER ]), "5-5");
  assertStrictEquals(StringUtils.trim("b5a15b", [ Unicode.Category.LETTER ]), "5a15");
  assertStrictEquals(StringUtils.trim("b5a1-5b", [ Unicode.Category.LETTER ]), "5a1-5");
  assertStrictEquals(StringUtils.trim("b5a5b", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ]), "");
  assertStrictEquals(StringUtils.trim("b515b", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ]), "");
  assertStrictEquals(StringUtils.trim("b5-5b", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ]), "-");
  assertStrictEquals(StringUtils.trim("b5a15b", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ]), "");
  assertStrictEquals(StringUtils.trim("b5a1-5b", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ]), "-");

  // trim(string, any)
  assertThrows(() => {
    StringUtils.trim("a", []);
  }, TypeError, undefined, "searchObject");
  assertThrows(() => {
    StringUtils.trim("a", undefined as unknown as UnicodeUtils.CodePointRange);
  }, TypeError, undefined, "searchObject");
  assertThrows(() => {
    StringUtils.trim("a", [[] as unknown as [number]]);
  }, TypeError, undefined, "searchObject");
  assertThrows(() => {
    StringUtils.trim("a", [[1,2,3] as unknown as [number]]);
  }, TypeError, undefined, "searchObject");
});

Deno.test("StringUtils.trimStart", () => {
  // trimStart(string, CodePointRange)
  assertStrictEquals(StringUtils.trimStart("", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(StringUtils.trimStart("\u0008X", HTTP_TAB_OR_SPACE), "\u0008X");
  assertStrictEquals(StringUtils.trimStart("\tX", HTTP_TAB_OR_SPACE), "X");
  assertStrictEquals(StringUtils.trimStart("\u000AX", HTTP_TAB_OR_SPACE), "\u000AX");
  assertStrictEquals(StringUtils.trimStart("\u001FX", HTTP_TAB_OR_SPACE), "\u001FX");
  assertStrictEquals(StringUtils.trimStart(" X", HTTP_TAB_OR_SPACE), "X");
  assertStrictEquals(StringUtils.trimStart("\u0021X", HTTP_TAB_OR_SPACE), "\u0021X");
  assertStrictEquals(StringUtils.trimStart("aX", HTTP_TAB_OR_SPACE), "aX");
  assertStrictEquals(StringUtils.trimStart("\t      \t    X", HTTP_TAB_OR_SPACE), "X");
  assertStrictEquals(StringUtils.trimStart("X\t      \t    X", HTTP_TAB_OR_SPACE), "X\t      \t    X");

  // trimStart(string, Unicode.Category[])
  assertStrictEquals(StringUtils.trimStart("", [ Unicode.Category.LETTER ]), "");
  assertStrictEquals(StringUtils.trimStart("a5b", [ Unicode.Category.LETTER ]), "5b");
  assertStrictEquals(StringUtils.trimStart("15b", [ Unicode.Category.LETTER ]), "15b");
  assertStrictEquals(StringUtils.trimStart("-5b", [ Unicode.Category.LETTER ]), "-5b");
  assertStrictEquals(StringUtils.trimStart("a15b", [ Unicode.Category.LETTER ]), "15b");
  assertStrictEquals(StringUtils.trimStart("a1-5b", [ Unicode.Category.LETTER ]), "1-5b");
  assertStrictEquals(StringUtils.trimStart("a5b", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ]), "");
  assertStrictEquals(StringUtils.trimStart("15b", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ]), "");
  assertStrictEquals(StringUtils.trimStart("-5b", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ]), "-5b");
  assertStrictEquals(StringUtils.trimStart("a15b", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ]), "");
  assertStrictEquals(StringUtils.trimStart("a1-5b", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ]), "-5b");

  // trimStart(string, any)
  assertThrows(() => {
    StringUtils.trimStart("a", []);
  }, TypeError, undefined, "searchObject");
  assertThrows(() => {
    StringUtils.trimStart("a", undefined as unknown as UnicodeUtils.CodePointRange);
  }, TypeError, undefined, "searchObject");
  assertThrows(() => {
    StringUtils.trimStart("a", [[] as unknown as [number]]);
  }, TypeError, undefined, "searchObject");
  assertThrows(() => {
    StringUtils.trimStart("a", [[1,2,3] as unknown as [number]]);
  }, TypeError, undefined, "searchObject");
});

Deno.test("StringUtils.trimEnd", () => {
  // trimEnd(string, CodePointRange)
  assertStrictEquals(StringUtils.trimEnd("", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(StringUtils.trimEnd("X\u0008", HTTP_TAB_OR_SPACE), "X\u0008");
  assertStrictEquals(StringUtils.trimEnd("X\t", HTTP_TAB_OR_SPACE), "X");
  assertStrictEquals(StringUtils.trimEnd("X\u000A", HTTP_TAB_OR_SPACE), "X\u000A");
  assertStrictEquals(StringUtils.trimEnd("X\u001F", HTTP_TAB_OR_SPACE), "X\u001F");
  assertStrictEquals(StringUtils.trimEnd("X ", HTTP_TAB_OR_SPACE), "X");
  assertStrictEquals(StringUtils.trimEnd("X\u0021", HTTP_TAB_OR_SPACE), "X\u0021");
  assertStrictEquals(StringUtils.trimEnd("Xa", HTTP_TAB_OR_SPACE), "Xa");
  assertStrictEquals(StringUtils.trimEnd("X\t      \t    ", HTTP_TAB_OR_SPACE), "X");
  assertStrictEquals(StringUtils.trimEnd("X\t      \t    X", HTTP_TAB_OR_SPACE), "X\t      \t    X");

  // trimEnd(string, Unicode.Category[])
  assertStrictEquals(StringUtils.trimEnd("", [ Unicode.Category.LETTER ]), "");
  assertStrictEquals(StringUtils.trimEnd("b5a", [ Unicode.Category.LETTER ]), "b5");
  assertStrictEquals(StringUtils.trimEnd("b51", [ Unicode.Category.LETTER ]), "b51");
  assertStrictEquals(StringUtils.trimEnd("b5-", [ Unicode.Category.LETTER ]), "b5-");
  assertStrictEquals(StringUtils.trimEnd("b5a1", [ Unicode.Category.LETTER ]), "b5a1");
  assertStrictEquals(StringUtils.trimEnd("b5a1-", [ Unicode.Category.LETTER ]), "b5a1-");
  assertStrictEquals(StringUtils.trimEnd("b5a", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ]), "");
  assertStrictEquals(StringUtils.trimEnd("b51", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ]), "");
  assertStrictEquals(StringUtils.trimEnd("b5-", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ]), "b5-");
  assertStrictEquals(StringUtils.trimEnd("b5a1", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ]), "");
  assertStrictEquals(StringUtils.trimEnd("b5a1-", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ]), "b5a1-");

  // trimEnd(string, any)
  assertThrows(() => {
    StringUtils.trimEnd("a", []);
  }, TypeError, undefined, "searchObject");
  assertThrows(() => {
    StringUtils.trimEnd("a", undefined as unknown as UnicodeUtils.CodePointRange);
  }, TypeError, undefined, "searchObject");
  assertThrows(() => {
    StringUtils.trimEnd("a", [[] as unknown as [number]]);
  }, TypeError, undefined, "searchObject");
  assertThrows(() => {
    StringUtils.trimEnd("a", [[1,2,3] as unknown as [number]]);
  }, TypeError, undefined, "searchObject");
});

Deno.test("StringUtils.collectStart", () => {
  // collectStart(string, CodePointRange)
  assertStrictEquals(StringUtils.collectStart("", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(StringUtils.collectStart("X\u0008", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(StringUtils.collectStart("X\t", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(StringUtils.collectStart("X\u000A", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(StringUtils.collectStart("X\u001F", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(StringUtils.collectStart("X ", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(StringUtils.collectStart("X\u0021", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(StringUtils.collectStart("Xa", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(StringUtils.collectStart("X\t      \t    ", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(StringUtils.collectStart("X\t      \t    X", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(StringUtils.collectStart("\u0008X\u0008", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(StringUtils.collectStart("\tX\t", HTTP_TAB_OR_SPACE), "\t");
  assertStrictEquals(StringUtils.collectStart("\u000AX\u000A", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(StringUtils.collectStart("\u001FX\u001F", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(StringUtils.collectStart(" X ", HTTP_TAB_OR_SPACE), " ");
  assertStrictEquals(StringUtils.collectStart("\u0021X\u0021", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(StringUtils.collectStart("aXa", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(StringUtils.collectStart("\t      \t    X\t      \t    ", HTTP_TAB_OR_SPACE), "\t      \t    ");
  assertStrictEquals(StringUtils.collectStart("X\t      \t    X\t      \t    X", HTTP_TAB_OR_SPACE), "");
  assertStrictEquals(StringUtils.collectStart("X1\t      \t    X2\t      \t    X3", HTTP_TAB_OR_SPACE, true), "X1");

  // collectStart(string, Unicode.Category[])
  assertStrictEquals(StringUtils.collectStart("", [ Unicode.Category.LETTER ]), "");
  assertStrictEquals(StringUtils.collectStart("a5b", [ Unicode.Category.LETTER ]), "a");
  assertStrictEquals(StringUtils.collectStart("15b", [ Unicode.Category.LETTER ]), "");
  assertStrictEquals(StringUtils.collectStart("-5b", [ Unicode.Category.LETTER ]), "");
  assertStrictEquals(StringUtils.collectStart("a15b", [ Unicode.Category.LETTER ]), "a");
  assertStrictEquals(StringUtils.collectStart("a1-5b", [ Unicode.Category.LETTER ]), "a");
  assertStrictEquals(StringUtils.collectStart("a5b", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ]), "a5b");
  assertStrictEquals(StringUtils.collectStart("15b", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ]), "15b");
  assertStrictEquals(StringUtils.collectStart("-5b", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ]), "");
  assertStrictEquals(StringUtils.collectStart("a15b", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ]), "a15b");
  assertStrictEquals(StringUtils.collectStart("a1-5b", [ Unicode.Category.LETTER, Unicode.Category.NUMBER ]), "a1");

  // collectStart(string, any)
  assertThrows(() => {
    StringUtils.collectStart("a", []);
  }, TypeError, undefined, "searchObject");
  assertThrows(() => {
    StringUtils.collectStart("a", undefined as unknown as UnicodeUtils.CodePointRange);
  }, TypeError, undefined, "searchObject");
  assertThrows(() => {
    StringUtils.collectStart("a", [[] as unknown as [number]]);
  }, TypeError, undefined, "searchObject");
  assertThrows(() => {
    StringUtils.collectStart("a", [[1,2,3] as unknown as [number]]);
  }, TypeError, undefined, "searchObject");
});

Deno.test("StringUtils.segment", () => {
  // segment(string, Object)
  assertStrictEquals(JSON.stringify(StringUtils.segment("", {count:1, unit:"char"})), `[]`);
  assertStrictEquals(JSON.stringify(StringUtils.segment("a", {count:1, unit:"char"})), `["a"]`);
  assertStrictEquals(JSON.stringify(StringUtils.segment("ab", {count:1, unit:"char"})), `["a","b"]`);
  assertStrictEquals(JSON.stringify(StringUtils.segment("abc", {count:1, unit:"char"})), `["a","b","c"]`);
  assertStrictEquals(JSON.stringify(StringUtils.segment("", {count:2, unit:"char"})), `[]`);
  assertStrictEquals(JSON.stringify(StringUtils.segment("a", {count:2, unit:"char"})), `["a"]`);
  assertStrictEquals(JSON.stringify(StringUtils.segment("ab", {count:2, unit:"char"})), `["ab"]`);
  assertStrictEquals(JSON.stringify(StringUtils.segment("abc", {count:2, unit:"char"})), `["ab","c"]`);
  assertStrictEquals(JSON.stringify(StringUtils.segment("", {count:3, unit:"char"})), `[]`);
  assertStrictEquals(JSON.stringify(StringUtils.segment("a", {count:3, unit:"char"})), `["a"]`);
  assertStrictEquals(JSON.stringify(StringUtils.segment("ab", {count:3, unit:"char"})), `["ab"]`);
  assertStrictEquals(JSON.stringify(StringUtils.segment("abc", {count:3, unit:"char"})), `["abc"]`);
  assertStrictEquals(JSON.stringify(StringUtils.segment("", {count:4, unit:"char"})), `[]`);
  assertStrictEquals(JSON.stringify(StringUtils.segment("a", {count:4, unit:"char"})), `["a"]`);
  assertStrictEquals(JSON.stringify(StringUtils.segment("ab", {count:4, unit:"char"})), `["ab"]`);
  assertStrictEquals(JSON.stringify(StringUtils.segment("abc", {count:4, unit:"char"})), `["abc"]`);
  assertStrictEquals(JSON.stringify(StringUtils.segment("", {count:1, unit:"rune"})), `[]`);
  assertStrictEquals(JSON.stringify(StringUtils.segment("a", {count:1, unit:"rune"})), `["a"]`);
  assertStrictEquals(JSON.stringify(StringUtils.segment("ab", {count:1, unit:"rune"})), `["a","b"]`);
  assertStrictEquals(JSON.stringify(StringUtils.segment("abc", {count:1, unit:"rune"})), `["a","b","c"]`);
  assertStrictEquals(JSON.stringify(StringUtils.segment("\u{10000}", {count:1, unit:"rune"})), `["\u{10000}"]`);
  assertStrictEquals(JSON.stringify(StringUtils.segment("\u{10000}b", {count:1, unit:"rune"})), `["\u{10000}","b"]`);
  assertStrictEquals(JSON.stringify(StringUtils.segment("a\u{10000}c", {count:1, unit:"rune"})), `["a","\u{10000}","c"]`);

  assertThrows(() => {
    StringUtils.segment("", {count:undefined as unknown as number, unit:"char"});
  }, TypeError, undefined, "by.count");
  assertThrows(() => {
    StringUtils.segment("", {count:1.5, unit:"char"});
  }, TypeError, undefined, "by.count");
  assertThrows(() => {
    StringUtils.segment("", 0 as unknown as {count:number,unit:"char"});
  }, TypeError, undefined, "by.count");
  assertThrows(() => {
    StringUtils.segment("", {count:0, unit:"char"});
  }, TypeError, undefined, "by.count");
  assertThrows(() => {
    StringUtils.segment("", {count:1, unit:"x" as unknown as "char"});
  }, TypeError, undefined, "by.unit");

  // segment(any, Object)
  assertThrows(() => {
    StringUtils.segment(1 as unknown as string, {count:1, unit:"char"});
  }, TypeError, undefined, "input");

  // segment(string, Object, string)
  assertStrictEquals(JSON.stringify(StringUtils.segment("", {count:1, unit:"char"},"-")), `[]`);
  assertStrictEquals(JSON.stringify(StringUtils.segment("a", {count:1, unit:"char"},"-")), `["a"]`);
  assertStrictEquals(JSON.stringify(StringUtils.segment("ab", {count:1, unit:"char"},"-")), `["a","b"]`);
  assertStrictEquals(JSON.stringify(StringUtils.segment("abc", {count:1, unit:"char"},"-")), `["a","b","c"]`);
  assertStrictEquals(JSON.stringify(StringUtils.segment("", {count:2, unit:"char"},"-")), `[]`);
  assertStrictEquals(JSON.stringify(StringUtils.segment("a", {count:2, unit:"char"},"-")), `["a-"]`);
  assertStrictEquals(JSON.stringify(StringUtils.segment("ab", {count:2, unit:"char"},"-")), `["ab"]`);
  assertStrictEquals(JSON.stringify(StringUtils.segment("abc", {count:2, unit:"char"},"-")), `["ab","c-"]`);
  assertStrictEquals(JSON.stringify(StringUtils.segment("", {count:3, unit:"char"},"-")), `[]`);
  assertStrictEquals(JSON.stringify(StringUtils.segment("a", {count:3, unit:"char"},"-")), `["a--"]`);
  assertStrictEquals(JSON.stringify(StringUtils.segment("ab", {count:3, unit:"char"},"-")), `["ab-"]`);
  assertStrictEquals(JSON.stringify(StringUtils.segment("abc", {count:3, unit:"char"},"-")), `["abc"]`);
  assertStrictEquals(JSON.stringify(StringUtils.segment("", {count:4, unit:"char"},"-")), `[]`);
  assertStrictEquals(JSON.stringify(StringUtils.segment("a", {count:4, unit:"char"},"-")), `["a---"]`);
  assertStrictEquals(JSON.stringify(StringUtils.segment("ab", {count:4, unit:"char"},"-")), `["ab--"]`);
  assertStrictEquals(JSON.stringify(StringUtils.segment("abc", {count:4, unit:"char"},"-")), `["abc-"]`);
  assertStrictEquals(JSON.stringify(StringUtils.segment("", {count:3, unit:"rune"},"\u{10001}")), `[]`);
  assertStrictEquals(JSON.stringify(StringUtils.segment("a", {count:3, unit:"rune"},"\u{10001}")), `["a\u{10001}\u{10001}"]`);
  assertStrictEquals(JSON.stringify(StringUtils.segment("a\u{10000}", {count:3, unit:"rune"},"\u{10001}")), `["a\u{10000}\u{10001}"]`);
  assertStrictEquals(JSON.stringify(StringUtils.segment("a\u{10000}c", {count:3, unit:"rune"},"\u{10001}")), `["a\u{10000}c"]`);
  assertStrictEquals(JSON.stringify(StringUtils.segment("a\u{10000}c\u{10000}", {count:3, unit:"rune"},"\u{10001}")), `["a\u{10000}c","\u{10000}\u{10001}\u{10001}"]`);

  assertThrows(() => {
    StringUtils.segment("", {count:1, unit:"char"}, "");
  }, TypeError, undefined, "paddingChar must be a code unit");
  assertThrows(() => {
    StringUtils.segment("", {count:1, unit:"char"}, "--");
  }, TypeError, undefined, "paddingChar must be a code unit");
  assertThrows(() => {
    StringUtils.segment("", {count:1, unit:"rune"}, "");
  }, TypeError, undefined, "paddingRune must be a code point");
  assertThrows(() => {
    StringUtils.segment("", {count:1, unit:"rune"}, "--");
  }, TypeError, undefined, "paddingRune must be a code point");
  assertThrows(() => {
    StringUtils.segment("", {count:1, unit:"rune"}, "\u{10000}\u{10001}");
  }, TypeError, undefined, "paddingRune must be a code point");

  // segment(string, Object, any)
  assertThrows(() => {
    StringUtils.segment("", {count:1, unit:"char"}, 1 as unknown as string);
  }, TypeError, undefined, "padding");
});

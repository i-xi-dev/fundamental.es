import { assertStrictEquals } from "@std/assert";
import { BytesDigest } from "../../src/mod.mts";
import { Md5 as _md5 } from "https://deno.land/std@0.160.0/hash/md5.ts";

Deno.test("BytesDigest.Md5.compute()", async () => {
  const b = await BytesDigest.Md5.compute(Uint8Array.of());
  assertStrictEquals(b.toHex(), "d41d8cd98f00b204e9800998ecf8427e");

  const s1 = await BytesDigest.Md5.compute(new Uint8Array(1));
  assertStrictEquals(s1.toHex(), "93b885adfe0da089cdf634904fd59f71");

  const s2 = await BytesDigest.Md5.compute(new Uint8Array(2));
  assertStrictEquals(s2.toHex(), "c4103f122d27677c9db144cae1394a66");

  const s3 = await BytesDigest.Md5.compute(new Uint8Array(3));
  assertStrictEquals(s3.toHex(), "693e9af84d3dfcc71e640e005bdc5e2e");

  const s4 = await BytesDigest.Md5.compute(new Uint8Array(4));
  assertStrictEquals(s4.toHex(), "f1d3ff8443297732862df21dc4e57262");

  const s5 = await BytesDigest.Md5.compute(new Uint8Array(5));
  assertStrictEquals(s5.toHex(), "ca9c491ac66b2c62500882e93f3719a8");

  const s6 = await BytesDigest.Md5.compute(new Uint8Array(6));
  assertStrictEquals(s6.toHex(), "7319468847d7b1aee40dbf5dd963c999");

  const s55 = await BytesDigest.Md5.compute(new Uint8Array(55));
  assertStrictEquals(s55.toHex(), "c9ea3314b91c9fd4e38f9432064fd1f2");

  const s56 = await BytesDigest.Md5.compute(new Uint8Array(56));
  assertStrictEquals(s56.toHex(), "e3c4dd21a9171fd39d208efa09bf7883");

  const s119 = await BytesDigest.Md5.compute(new Uint8Array(119));
  assertStrictEquals(s119.toHex(), "8271cb2e6a546123b43096a2efce39d2");

  const s120 = await BytesDigest.Md5.compute(new Uint8Array(120));
  assertStrictEquals(s120.toHex(), "222f7d881ded1871724a1b9a1cb94247");

  assertStrictEquals(
    (await BytesDigest.Md5.compute(Uint8Array.of(1, 2, 3, 4))).toHex(),
    "08d6c05a21512a79a1dfeb9d2a8f262f",
  );
  assertStrictEquals(
    (await BytesDigest.Md5.compute(
      Uint8Array.of(1, 2, 3, 4, 5, 6, 7, 8),
    )).toHex(),
    "0ee0646c1c77d8131cc8f4ee65c7673b",
  );

  const src1 = new Uint8Array(65535);
  crypto.getRandomValues(src1);
  const md51 = new _md5();
  const r11 = (await BytesDigest.Md5.compute(src1)).toHex();
  const r21 = new Uint8Array(md51.update(src1.buffer).digest()).toHex();
  assertStrictEquals(r11, r21);

  const src2 = new Uint8Array(65536);
  crypto.getRandomValues(src2);
  const md52 = new _md5();
  const r12 = (await BytesDigest.Md5.compute(src2)).toHex();
  const r22 = new Uint8Array(md52.update(src2.buffer).digest()).toHex();
  assertStrictEquals(r12, r22);

  const src3 = new Uint8Array(65535);
  crypto.getRandomValues(src3);
  const md53 = new _md5();
  const r13 = (await BytesDigest.Md5.compute(src3)).toHex();
  const r23 = new Uint8Array(md53.update(src3.buffer).digest()).toHex();
  assertStrictEquals(r13, r23);

  const src4 = new Uint8Array(65535);
  crypto.getRandomValues(src4);
  const md54 = new _md5();
  const r14 = (await BytesDigest.Md5.compute(src4)).toHex();
  const r24 = new Uint8Array(md54.update(src4.buffer).digest()).toHex();
  assertStrictEquals(r14, r24);
});

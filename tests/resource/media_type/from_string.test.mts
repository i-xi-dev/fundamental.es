import { assertStrictEquals, assertThrows } from "@std/assert";
import { Resource } from "../../../src/mod.mts";

Deno.test("Resource.MediaType.fromString(string)", () => {
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain").toString(),
    "text/plain",
  );
  assertStrictEquals(
    Resource.MediaType.fromString(" text/plain ").toString(),
    "text/plain",
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain;").toString(),
    "text/plain",
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ;").toString(),
    "text/plain",
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ; ").toString(),
    "text/plain",
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ; charset").toString(),
    "text/plain",
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ; charset ").toString(),
    "text/plain",
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ; charset=utf-8 ").toString(),
    "text/plain;charset=utf-8",
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ;charset=UTF-8").toString(),
    "text/plain;charset=UTF-8",
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ;charset=utf-8;test").toString(),
    "text/plain;charset=utf-8",
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ;charset=utf-8; test=test2")
      .toString(),
    "text/plain;charset=utf-8;test=test2",
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ;charset=utf-8 ; test=test2")
      .toString(),
    "text/plain;charset=utf-8;test=test2",
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ;charset =utf-8 ; test=test2")
      .toString(),
    "text/plain;test=test2",
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ;charset= utf-8 ; test=test2")
      .toString(),
    'text/plain;charset=" utf-8";test=test2',
  );
  assertStrictEquals(
    Resource.MediaType.fromString('text/plain ;charset="utf-8" ; test=test2')
      .toString(),
    "text/plain;charset=utf-8;test=test2",
  );
  assertStrictEquals(
    Resource.MediaType.fromString(
      'text/plain ;charset="ut\\f-8" ; test=t\\est,2',
    )
      .toString(),
    'text/plain;charset=utf-8;test="t\\\\est,2"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString('text/plain ;charset="ut\\"f-8" ; test=test2')
      .toString(),
    'text/plain;charset="ut\\"f-8";test=test2',
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ;charset=\\ ; test=test2")
      .toString(),
    'text/plain;charset="\\\\";test=test2',
  );
  assertStrictEquals(
    Resource.MediaType.fromString('text/plain ;charset="\\ ; test=test2')
      .toString(),
    'text/plain;charset=" ; test=test2"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString('text/plain ;charset=" ; test=test2')
      .toString(),
    'text/plain;charset=" ; test=test2"',
  );

  //TODO
  const xx = Resource.MediaType.fromString(
    'text/plain ;charset="" ; test=test2',
  );
  console.log([...xx.parameters()]);

  assertStrictEquals(
    Resource.MediaType.fromString('text/plain ;charset="" ; test=test2')
      .toString(),
    "text/plain;charset=;test=test2",
  );
  assertStrictEquals(
    Resource.MediaType.fromString(
      'text/plain ;charset="utf-16" utf-8 ; test=test2',
    )
      .toString(),
    "text/plain;charset=utf-16;test=test2",
  );
  assertStrictEquals(
    Resource.MediaType.fromString('text/plain ;charset="\\').toString(),
    'text/plain;charset="\\\\"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString('text/plain ;charset="aa\\\\a\\"a"')
      .toString(),
    'text/plain;charset="aa\\\\a\\"a"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString(
      'text/plain ;charset=a;x="http://example.com/x?a=1"',
    )
      .toString(),
    'text/plain;charset=a;x="http://example.com/x?a=1"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString(
      'text/plain ;x="http://example.com/x?a=1";charset=a',
    )
      .toString(),
    'text/plain;x="http://example.com/x?a=1";charset=a',
  );
  assertStrictEquals(
    Resource.MediaType.fromString(
      'text/plain ; x="http://example.com/x?a=1" ;charset=a',
    )
      .toString(),
    'text/plain;x="http://example.com/x?a=1";charset=a',
  );
  assertStrictEquals(
    Resource.MediaType.fromString(
      "text/plain ;charset=utf-8;test=test2;charset=shift_jis",
    ).toString(),
    "text/plain;charset=utf-8;test=test2",
  );

  assertThrows(
    () => {
      Resource.MediaType.fromString("text/plain,");
    },
    TypeError,
    "Subtype name is invalid",
  );

  assertThrows(
    () => {
      Resource.MediaType.fromString(" text/plain ,");
    },
    TypeError,
    "Subtype name is invalid",
  );

  assertStrictEquals(
    Resource.MediaType.fromString("text/plain;,").toString(),
    "text/plain",
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ;,").toString(),
    "text/plain",
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ; ,").toString(),
    "text/plain",
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ; charset,").toString(),
    "text/plain",
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ; charset ,").toString(),
    "text/plain",
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ; charset= ;p2=3").toString(),
    "text/plain;p2=3",
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ; p1=1;=3;p3=4").toString(),
    "text/plain;p1=1;p3=4",
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ; p1=1;p2=あ;p3=4").toString(),
    "text/plain;p1=1;p3=4",
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ; charset=utf-8 ,").toString(),
    'text/plain;charset="utf-8 ,"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ;charset=UTF-8,").toString(),
    'text/plain;charset="UTF-8,"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ;charset=utf-8;test,").toString(),
    "text/plain;charset=utf-8",
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ;charset=utf-8; test=test2,")
      .toString(),
    'text/plain;charset=utf-8;test="test2,"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ;charset=utf-8 ; test=test2,")
      .toString(),
    'text/plain;charset=utf-8;test="test2,"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ;charset =utf-8 ; test=test2,")
      .toString(),
    'text/plain;test="test2,"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ;charset= utf-8 ; test=test2,")
      .toString(),
    'text/plain;charset=" utf-8";test="test2,"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString('text/plain ;charset="utf-8" ; test=test2,')
      .toString(),
    'text/plain;charset=utf-8;test="test2,"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString(
      'text/plain ;charset="ut\\f-8" ; test=t\\est,2,',
    )
      .toString(),
    'text/plain;charset=utf-8;test="t\\\\est,2,"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString(
      'text/plain ;charset="ut\\"f-8" ; test=test2,',
    )
      .toString(),
    'text/plain;charset="ut\\"f-8";test="test2,"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ;charset=\\ ; test=test2,")
      .toString(),
    'text/plain;charset="\\\\";test="test2,"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString('text/plain ;charset="\\ ; test=test2,')
      .toString(),
    'text/plain;charset=" ; test=test2,"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString('text/plain ;charset=" ; test=test2,')
      .toString(),
    'text/plain;charset=" ; test=test2,"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString('text/plain ;charset="" ; test=test2,')
      .toString(),
    'text/plain;charset=;test="test2,"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString(
      'text/plain ;charset="utf-16" utf-8 ; test=test2,',
    )
      .toString(),
    'text/plain;charset=utf-16;test="test2,"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString('text/plain ;charset="\\,').toString(),
    'text/plain;charset=","',
  );
  assertStrictEquals(
    Resource.MediaType.fromString('text/plain ;charset="aa\\\\a\\"a",')
      .toString(),
    'text/plain;charset="aa\\\\a\\"a"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString(
      'text/plain ;charset=a;x="http://example.com/x?a=1",',
    )
      .toString(),
    'text/plain;charset=a;x="http://example.com/x?a=1"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString(
      'text/plain ;x="http://example.com/x?a=1";charset=a,',
    )
      .toString(),
    'text/plain;x="http://example.com/x?a=1";charset="a,"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString(
      'text/plain ; x="http://example.com/x?a=1" ;charset=a,',
    ).toString(),
    'text/plain;x="http://example.com/x?a=1";charset="a,"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString(
      "text/plain ;charset=utf-8;test=test2;charset=shift_jis,",
    ).toString(),
    "text/plain;charset=utf-8;test=test2",
  );

  assertThrows(
    () => {
      Resource.MediaType.fromString("text/plain,%3C");
    },
    TypeError,
    "Subtype name is invalid",
  );

  assertThrows(
    () => {
      Resource.MediaType.fromString(" text/plain ,%3C");
    },
    TypeError,
    "Subtype name is invalid",
  );

  assertStrictEquals(
    Resource.MediaType.fromString("text/plain;,%3C").toString(),
    "text/plain",
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ;,%3C").toString(),
    "text/plain",
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ; ,%3C").toString(),
    "text/plain",
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ; charset,%3C").toString(),
    "text/plain",
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ; charset ,%3C").toString(),
    "text/plain",
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ; charset=utf-8 ,%3C").toString(),
    'text/plain;charset="utf-8 ,%3C"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ;charset=UTF-8,%3C").toString(),
    'text/plain;charset="UTF-8,%3C"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ;charset=utf-8;test,%3C")
      .toString(),
    "text/plain;charset=utf-8",
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ;charset=utf-8; test=test2,%3C")
      .toString(),
    'text/plain;charset=utf-8;test="test2,%3C"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ;charset=utf-8 ; test=test2,%3C")
      .toString(),
    'text/plain;charset=utf-8;test="test2,%3C"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ;charset =utf-8 ; test=test2,%3C")
      .toString(),
    'text/plain;test="test2,%3C"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ;charset= utf-8 ; test=test2,%3C")
      .toString(),
    'text/plain;charset=" utf-8";test="test2,%3C"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString(
      'text/plain ;charset="utf-8" ; test=test2,%3C',
    )
      .toString(),
    'text/plain;charset=utf-8;test="test2,%3C"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString(
      'text/plain ;charset="ut\\f-8" ; test=t\\est,2,%3C',
    )
      .toString(),
    'text/plain;charset=utf-8;test="t\\\\est,2,%3C"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString(
      'text/plain ;charset="ut\\"f-8" ; test=test2,%3C',
    )
      .toString(),
    'text/plain;charset="ut\\"f-8";test="test2,%3C"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ;charset=\\ ; test=test2,%3C")
      .toString(),
    'text/plain;charset="\\\\";test="test2,%3C"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString('text/plain ;charset="\\ ; test=test2,%3C')
      .toString(),
    'text/plain;charset=" ; test=test2,%3C"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString('text/plain ;charset=" ; test=test2,%3C')
      .toString(),
    'text/plain;charset=" ; test=test2,%3C"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString('text/plain ;charset="" ; test=test2,%3C')
      .toString(),
    'text/plain;charset=;test="test2,%3C"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString(
      'text/plain ;charset="utf-16" utf-8 ; test=test2,%3C',
    )
      .toString(),
    'text/plain;charset=utf-16;test="test2,%3C"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString('text/plain ;charset="\\,%3C').toString(),
    'text/plain;charset=",%3C"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString('text/plain ;charset="aa\\\\a\\"a",%3C')
      .toString(),
    'text/plain;charset="aa\\\\a\\"a"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString(
      'text/plain ;charset=a;x="http://example.com/x?a=1",%3C',
    ).toString(),
    'text/plain;charset=a;x="http://example.com/x?a=1"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString(
      'text/plain ;x="http://example.com/x?a=1";charset=a,%3C',
    ).toString(),
    'text/plain;x="http://example.com/x?a=1";charset="a,%3C"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString(
      'text/plain ; x="http://example.com/x?a=1" ;charset=a,%3C',
    ).toString(),
    'text/plain;x="http://example.com/x?a=1";charset="a,%3C"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString(
      "text/plain ;charset=utf-8;test=test2;charset=shift_jis,%3C",
    ).toString(),
    "text/plain;charset=utf-8;test=test2",
  );

  assertStrictEquals(
    Resource.MediaType.fromString("text/plain;base64,").toString(),
    "text/plain",
  );
  assertStrictEquals(
    Resource.MediaType.fromString(" text/plain ;base64,").toString(),
    "text/plain",
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain;;base64,").toString(),
    "text/plain",
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ;;base64,").toString(),
    "text/plain",
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ; ;base64,").toString(),
    "text/plain",
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ; charset;base64,").toString(),
    "text/plain",
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ; charset ;base64,").toString(),
    "text/plain",
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ; charset=utf-8 ;base64,")
      .toString(),
    "text/plain;charset=utf-8",
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ;charset=UTF-8;base64,")
      .toString(),
    "text/plain;charset=UTF-8",
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ;charset=utf-8;test;base64,")
      .toString(),
    "text/plain;charset=utf-8",
  );
  assertStrictEquals(
    Resource.MediaType.fromString(
      "text/plain ;charset=utf-8; test=test2;base64,",
    )
      .toString(),
    "text/plain;charset=utf-8;test=test2",
  );
  assertStrictEquals(
    Resource.MediaType.fromString(
      "text/plain ;charset=utf-8 ; test=test2;base64,",
    )
      .toString(),
    "text/plain;charset=utf-8;test=test2",
  );
  assertStrictEquals(
    Resource.MediaType.fromString(
      "text/plain ;charset =utf-8 ; test=test2;base64,",
    )
      .toString(),
    "text/plain;test=test2",
  );
  assertStrictEquals(
    Resource.MediaType.fromString(
      "text/plain ;charset= utf-8 ; test=test2;base64,",
    )
      .toString(),
    'text/plain;charset=" utf-8";test=test2',
  );
  assertStrictEquals(
    Resource.MediaType.fromString(
      'text/plain ;charset="utf-8" ; test=test2;base64,',
    )
      .toString(),
    "text/plain;charset=utf-8;test=test2",
  );
  assertStrictEquals(
    Resource.MediaType.fromString(
      'text/plain ;charset="ut\\f-8" ; test=t\\est,2;base64,',
    ).toString(),
    'text/plain;charset=utf-8;test="t\\\\est,2"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString(
      'text/plain ;charset="ut\\"f-8" ; test=test2;base64,',
    )
      .toString(),
    'text/plain;charset="ut\\"f-8";test=test2',
  );
  assertStrictEquals(
    Resource.MediaType.fromString("text/plain ;charset=\\ ; test=test2;base64,")
      .toString(),
    'text/plain;charset="\\\\";test=test2',
  );
  assertStrictEquals(
    Resource.MediaType.fromString(
      'text/plain ;charset="\\ ; test=test2;base64,',
    )
      .toString(),
    'text/plain;charset=" ; test=test2;base64,"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString('text/plain ;charset=" ; test=test2;base64,')
      .toString(),
    'text/plain;charset=" ; test=test2;base64,"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString('text/plain ;charset="" ; test=test2;base64,')
      .toString(),
    "text/plain;charset=;test=test2",
  );
  assertStrictEquals(
    Resource.MediaType.fromString(
      'text/plain ;charset="utf-16" utf-8 ; test=test2;base64,',
    ).toString(),
    "text/plain;charset=utf-16;test=test2",
  );
  assertStrictEquals(
    Resource.MediaType.fromString('text/plain ;charset="\\;base64,').toString(),
    'text/plain;charset=";base64,"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString('text/plain ;charset="aa\\\\a\\"a";base64,')
      .toString(),
    'text/plain;charset="aa\\\\a\\"a"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString(
      'text/plain ;charset=a;x="http://example.com/x?a=1";base64,',
    ).toString(),
    'text/plain;charset=a;x="http://example.com/x?a=1"',
  );
  assertStrictEquals(
    Resource.MediaType.fromString(
      'text/plain ;x="http://example.com/x?a=1";charset=a;base64,',
    ).toString(),
    'text/plain;x="http://example.com/x?a=1";charset=a',
  );
  assertStrictEquals(
    Resource.MediaType.fromString(
      'text/plain ; x="http://example.com/x?a=1" ;charset=a;base64,',
    ).toString(),
    'text/plain;x="http://example.com/x?a=1";charset=a',
  );
  assertStrictEquals(
    Resource.MediaType.fromString(
      "text/plain ;charset=utf-8;test=test2;charset=shift_jis;base64,",
    ).toString(),
    "text/plain;charset=utf-8;test=test2",
  );

  assertThrows(
    () => {
      Resource.MediaType.fromString("text");
    },
    TypeError,
    "Type name not found",
  );

  assertThrows(
    () => {
      Resource.MediaType.fromString("あ");
    },
    TypeError,
    "Type name not found",
  );

  assertThrows(
    () => {
      Resource.MediaType.fromString("あ/");
    },
    TypeError,
    "Type name is invalid",
  );

  assertThrows(
    () => {
      Resource.MediaType.fromString("text/");
    },
    TypeError,
    "Subtype name is invalid",
  );

  assertThrows(
    () => {
      Resource.MediaType.fromString("text/;");
    },
    TypeError,
    "Subtype name is invalid",
  );

  assertThrows(
    () => {
      Resource.MediaType.fromString("/test");
    },
    TypeError,
    "Type name not found",
  );

  assertThrows(
    () => {
      Resource.MediaType.fromString("/");
    },
    TypeError,
    "Type name not found",
  );

  assertThrows(
    () => {
      Resource.MediaType.fromString("");
    },
    TypeError,
    "Type name not found",
  );

  assertThrows(
    () => {
      Resource.MediaType.fromString("text/t/t");
    },
    TypeError,
    "Subtype name is invalid",
  );

  assertThrows(
    () => {
      Resource.MediaType.fromString("text/t,t");
    },
    TypeError,
    "Subtype name is invalid",
  );
});

// //TODO 移す
// Deno.test("MediaType.fromHeaders(Headers)", () => {
//   const h1 = new Headers({ "content-type": "text/plain" });
//   const i1 = MediaType.fromHeaders(h1);
//   assertStrictEquals(i1.toString(), "text/plain");

//   const h2 = new Headers();
//   h2.append("content-type", "text/plain");
//   const i2 = MediaType.fromHeaders(h2);
//   assertStrictEquals(i2.toString(), "text/plain");
//   h2.append("content-type", "text/html");
//   const i2b = MediaType.fromHeaders(h2);
//   assertStrictEquals(i2b.toString(), "text/html");

//   const h3 = new Headers();
//   assertThrows(
//     () => {
//       MediaType.fromHeaders(h3);
//     },
//     Error,
//     "Content-Type field not found",
//   );

//   const h4 = new Headers({ "content-type": "" });
//   assertThrows(
//     () => {
//       MediaType.fromHeaders(h4);
//     },
//     Error,
//     "Content-Type value not found",
//   );
// });

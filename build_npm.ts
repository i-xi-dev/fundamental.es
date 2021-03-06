import { build, emptyDir } from "https://deno.land/x/dnt@0.23.0/mod.ts"; // 0.24だとグローバルにEvent等が無いとかでエラーになる

await emptyDir("./npm");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    deno: "dev",
  },
  scriptModule: false,
  rootTestDir: "./tests",
  package: {
    name: "@i-xi-dev/fundamental",
    version: "8.0.0",
    description: "This is not for direct usage.",
    license: "MIT",
    author: "i-xi-dev",
    homepage: "https://github.com/i-xi-dev/fundamental.es#readme",
    keywords: [],
    repository: {
      type: "git",
      url: "git+https://github.com/i-xi-dev/fundamental.es.git"
    },
    bugs: {
      url: "https://github.com/i-xi-dev/fundamental.es/issues"
    },
    publishConfig: {
      access: "public"
    },
    files: [
      "esm",
      "types"
    ],
  },
  importMap: "./import_map.json"
});

Deno.copyFileSync("LICENSE", "npm/LICENSE");
Deno.copyFileSync("README.md", "npm/README.md");

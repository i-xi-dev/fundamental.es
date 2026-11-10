// TSで定義できない型（用の別名）

export * from "./_def/_number_alias.mts";
export * from "./_def/_bigint_alias.mts";

export type numeric = number | bigint;

export type Bytes = Uint8Array<ArrayBuffer>;

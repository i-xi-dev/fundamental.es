// TODO 何故importが使えないのか

const { webcrypto } = require("node:crypto");
globalThis.crypto = webcrypto;

const { ReadableStream } = require("node:stream/web");
globalThis.ReadableStream = ReadableStream;

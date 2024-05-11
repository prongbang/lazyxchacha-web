"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  decrypt: () => decrypt,
  encrypt: () => encrypt,
  generateKeyPair: () => generateKeyPair2,
  sharedKey: () => sharedKey2
});
module.exports = __toCommonJS(src_exports);
var x25519 = __toESM(require("@stablelib/x25519"));
var import_xchacha20poly1305 = require("@stablelib/xchacha20poly1305");
var import_random = require("@stablelib/random");
var hex = __toESM(require("@stablelib/hex"));
function generateKeyPair2() {
  const kp = x25519.generateKeyPair();
  return {
    pk: hex.encode(kp.publicKey),
    sk: hex.encode(kp.secretKey)
  };
}
function sharedKey2(sk, pk) {
  const publicKey = hex.decode(pk);
  const secretKey = hex.decode(sk);
  const key = x25519.sharedKey(secretKey, publicKey);
  return hex.encode(key);
}
function combined(arr1, arr2) {
  return new Uint8Array([...arr1, ...arr2]);
}
function encode2(data) {
  return new TextEncoder().encode(data);
}
function decode2(data) {
  return new TextDecoder().decode(data);
}
function encrypt(data, key) {
  const keyBytes = hex.decode(key);
  const xChaCha = new import_xchacha20poly1305.XChaCha20Poly1305(keyBytes);
  const nonce = (0, import_random.randomBytes)(import_xchacha20poly1305.NONCE_LENGTH);
  const plaintext = encode2(data);
  const ciphertext = xChaCha.seal(nonce, plaintext);
  return hex.encode(combined(nonce, ciphertext));
}
function decrypt(data, key) {
  const keyBytes = hex.decode(key);
  const xChaCha = new import_xchacha20poly1305.XChaCha20Poly1305(keyBytes);
  const cipherBytes = hex.decode(data);
  const nonce = cipherBytes.slice(0, import_xchacha20poly1305.NONCE_LENGTH);
  const ciphertext = cipherBytes.slice(import_xchacha20poly1305.NONCE_LENGTH);
  const plaintext = xChaCha.open(nonce, ciphertext);
  if (plaintext == null)
    return "";
  return decode2(plaintext);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  decrypt,
  encrypt,
  generateKeyPair,
  sharedKey
});
//# sourceMappingURL=index.js.map
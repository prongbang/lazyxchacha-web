// src/index.ts
import * as x25519 from "@stablelib/x25519";
import { NONCE_LENGTH, XChaCha20Poly1305 } from "@stablelib/xchacha20poly1305";
import { randomBytes } from "@stablelib/random";
import * as hex from "@stablelib/hex";
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
  const xChaCha = new XChaCha20Poly1305(keyBytes);
  const nonce = randomBytes(NONCE_LENGTH);
  const plaintext = encode2(data);
  const ciphertext = xChaCha.seal(nonce, plaintext);
  return hex.encode(combined(nonce, ciphertext));
}
function decrypt(data, key) {
  const keyBytes = hex.decode(key);
  const xChaCha = new XChaCha20Poly1305(keyBytes);
  const cipherBytes = hex.decode(data);
  const nonce = cipherBytes.slice(0, NONCE_LENGTH);
  const ciphertext = cipherBytes.slice(NONCE_LENGTH);
  const plaintext = xChaCha.open(nonce, ciphertext);
  if (plaintext == null)
    return "";
  return decode2(plaintext);
}
export {
  decrypt,
  encrypt,
  generateKeyPair2 as generateKeyPair,
  sharedKey2 as sharedKey
};
//# sourceMappingURL=index.mjs.map
import * as x25519 from '@stablelib/x25519';
import {NONCE_LENGTH, XChaCha20Poly1305} from "@stablelib/xchacha20poly1305";
import {randomBytes} from "@stablelib/random";
import * as hex from "@stablelib/hex";

export function generateKeyPair(): { pk: string, sk: string } {
    const kp = x25519.generateKeyPair();
    return {
        pk: hex.encode(kp.publicKey),
        sk: hex.encode(kp.secretKey),
    };
}

export function sharedKey(sk: string, pk: string): string {
    const publicKey = hex.decode(pk);
    const secretKey = hex.decode(sk);
    const key = x25519.sharedKey(secretKey, publicKey);
    return hex.encode(key);
}

function combined(arr1: Uint8Array, arr2: Uint8Array) {
    return new Uint8Array([...arr1, ...arr2]);
}

function concatenation(nonceBytes: Uint8Array, cipherText: Uint8Array, macBytes: Uint8Array): Uint8Array {
    let n = cipherText.length;
    n += nonceBytes.length;
    n += macBytes.length;

    const result = new Uint8Array(n);
    let i = 0;
    result.set(nonceBytes, i);

    i += nonceBytes.length;
    result.set(cipherText, i);

    i += cipherText.length;
    result.set(macBytes, i);

    return result;
}

function encode(data: string): Uint8Array {
    return new TextEncoder().encode(data);
}

function decode(data: Uint8Array): string {
    return new TextDecoder().decode(data);
}

export function encrypt(data: string, key: string): string {
    const keyBytes = hex.decode(key);
    const xChaCha = new XChaCha20Poly1305(keyBytes);
    const nonce = randomBytes(NONCE_LENGTH);
    const plaintext = encode(data);

    const ciphertext = xChaCha.seal(nonce, plaintext);

    // Convert nonce and ciphertext and mac to hexadecimal strings
    return hex.encode(combined(nonce, ciphertext));
}

export function decrypt(data: string, key: string): string {
    const keyBytes = hex.decode(key);
    const xChaCha = new XChaCha20Poly1305(keyBytes);

    const cipherBytes = hex.decode(data);
    const nonce = cipherBytes.slice(0, NONCE_LENGTH);
    const ciphertext = cipherBytes.slice(NONCE_LENGTH);

    const plaintext = xChaCha.open(nonce, ciphertext);

    if (plaintext == null) return "";

    return decode(plaintext)
}
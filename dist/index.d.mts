declare function generateKeyPair(): {
    pk: string;
    sk: string;
};
declare function sharedKey(sk: string, pk: string): string;
declare function encrypt(data: string, key: string): string;
declare function decrypt(data: string, key: string): string;

export { decrypt, encrypt, generateKeyPair, sharedKey };

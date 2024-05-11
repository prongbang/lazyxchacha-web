import * as xChaCha from 'lazyxchacha'

test('Should return key pair when generate key pair success', async () => {
    // Given
    const keySize = 64;

    // When
    let keypair = xChaCha.generateKeyPair();

    // Then
    expect(keypair.pk.length).toBe(keySize);
    expect(keypair.sk.length).toBe(keySize);
});

test('Should return shared key when key exchange success', async () => {
    // Given
    const clientKp = xChaCha.generateKeyPair();
    const serverKp = xChaCha.generateKeyPair();

    // When
    const clientSharedKey = xChaCha.sharedKey(clientKp.sk, serverKp.pk);
    const serverSharedKey = xChaCha.sharedKey(serverKp.sk, clientKp.pk);

    // Then
    expect(clientSharedKey).toBe(serverSharedKey);
});

test('Should return ciphertext when encrypt success', async () => {
    // Given
    let key = "e4f7fe3c8b4066490f8ffde56f080c70629ff9731b60838015027c4687303b1d";
    const plaintext =
        '{"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIn0.rTCH8cLoGxAm_xw68z-zXVKi9ie6xJn9tnVWjd_9ftE"}';

    // When
    let ciphertext = xChaCha.encrypt(plaintext, key);

    // Then
    expect(ciphertext.length > 0).toBe(true);
    console.log(ciphertext)
});

test('Should return plaintext when decrypt success', async () => {
    // Given
    let key = "e7de22e898b35cf5ed2c2339f702210429da35909c6e070af48e1c01e8a34d55";
    let ciphertext = 'f6a1bd8e40d1ac130a53c85f8eb3ce5c8f524dd16b6c844eba81f40430dc3f43a20f19ce0ff9cac0fb552e945c9c9eb03eef3d3ec120b0ff17e8181e2e3d949b2eb44180b494d72a33d79d30a4de4130488aabfb2922f7265c7010ddf649a231856f1a8dccd57284a53230c79d16a732d38a48f9a1fab78e3dca7eff3d48bb848a3f04169cefbf021523dc6e62def880ffefcd1e4d';
    const plaintext =
        '{"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIn0.rTCH8cLoGxAm_xw68z-zXVKi9ie6xJn9tnVWjd_9ftE"}';

    // When
    let actual = xChaCha.decrypt(ciphertext, key);

    // Then
    expect(actual).toBe(plaintext);
});

test('Should return plaintext when decrypt ciphertext from server success', async () => {
    // Given
    let key = "edf9d004edae8335f095bb8e01975c42cf693ea60322b75cb7c6667dc836fd7e";
    let ciphertext = '1ec54672d8ef2cca35151428edfee29d3551fd81fc6a4ddedbd3c47bc42c8fc355b6a2cf666d83f45982fa5051943c12d3f65056d54f5c0c02d8112635dbaa52d41a58c067576ae1eba997464be721040704aa6454cefb2ccf099ccfc71c2809646231f4eec697325ea5e359b6c42eb3ff5041ce0edf92d5dbb42396ce3d0d16830fd5b490715f4fb17cf99878216d785931d9e92a';
    let expected = "{\"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIn0.rTCH8cLoGxAm_xw68z-zXVKi9ie6xJn9tnVWjd_9ftE\"}";

    // When
    let plaintext = xChaCha.decrypt(ciphertext, key);

    // Then
    expect(plaintext).toBe(expected);
});
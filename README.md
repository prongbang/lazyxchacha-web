# lazyxchacha-web

Lazy XChaCha20-Poly1305 in JS base on [sodium-native](https://github.com/sodium-friends/sodium-native): XChaCha20Poly1305.

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/prongbang)

### Algorithm details

- Key exchange: X25519
- Encryption: XChaCha20
- Authentication: Poly1305

```js
import * as xChaCha from 'lazyxchacha-web'

const clientKp = xChaCha.generateKeyPair();
const serverKp = xChaCha.generateKeyPair();
const clientSharedKey = xChaCha.sharedKey(clientKp.sk, serverKp.pk);
const serverSharedKey = xChaCha.sharedKey(serverKp.sk, clientKp.pk);

const message = 'Hello';
const ciphertext = xChaCha.encrypt(message, clientSharedKey);
const plaintext = xChaCha.decrypt(ciphertext, serverSharedKey);
```
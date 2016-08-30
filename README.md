# simple-encryption
[![CircleCI][circleci-image]][circleci-link]
[![NPM Version][version-image]][npm-link]
[![NPM Download][download-image]][npm-link]

Simple encryption module for NodeJS using node-forge

## Installation
```bash
npm install simple-encryption
```

## Usage

### Importing
At the top of your code, use something like this to import simple-encryption
```javascript
var sencrypt = require('simple-encryption');
```
Or alternatively, for ease of use, you could do this:
```javascript
var RSA = require('simple-encryption').RSA;
var AES = require('simple-encryption').AES;
```

### RSA
Currently, RSA is just the basics: encrypting, decrypting, signing, and verifying

#### Encryption
```javascript
var RSA = require('simple-encryption').RSA;
var publicKey; //Normally you'd need to assign this variable a PEM encoded public key
var privateKey; //Normally you'd need to assign this variable a PEM encoded private key
var encrypted = RSA.encrypt(publicKey, 'Hello, World!'); //Encrypts Hello, World and outputs it as Base64
var decrypted = RSA.decrypt(privateKey, encrypted); //Decrypts the message
console.log(encrypted);
console.log(decrypted);
```

#### Signing
```javascript
var RSA = require('simple-encryption').RSA;
var publicKey; //Normally you'd need to assign this variable a PEM encoded public key
var privateKey; //Normally you'd need to assign this variable a PEM encoded private key
var signed = RSA.sign(privateKey, 'Hello, World!'); //Sign the message Hello, World
var verified = RSA.verify(publicKey, signed.signed, signed.md); //Verify the message with the base64 message signature and base64 message digest returned from the previous function
if(verified) {
  //verified is a boolean, true on if verification was successful, and false when it wasn't
  console.log("Verification successful");
} else {
  console.log("Verification failed");
}
```

#### Notes
* You need to generate your own keys, and they should be in a PEM format
* Any potential binary outputs (encrypted/signed outputs) are encoded in base64 to reduce errors

### AES
#### Notes
* AES uses AES-GCM. If you need another mode, this module is **currently** not for you
#### Generating information needed
```javascript
var AES = require('simple-encryption').AES;
var iv = AES.generateIV(); //Generate 12 byte IV. Outputs Base64
var iv2 = AES.generateIV(16); //Is also valid and generates a 16 byte IV, but AES-GCM requires a 12 bytes IV. Outputs Base64
var key = AES.generateKey(); //Generate a 256 bit (32 byte) key. Outputs Base64
var key2 = AES.generateKey(16); //Generate a 128 bit (16 byte) key. Outputs Base64.
```

#### Encryption
```javascript
var AES = require('simple-encryption').AES;
var iv = AES.generateIV();
var key = AES.generateKey();
var encrypted = AES.encrypt(key, iv, 'Hello, World!'); //Encrypts 'Hello, World!', outputting a JavaScript object with Base64 properties
var decrypted = AES.decrypt(key, iv, encrypted.tag, encrypted.encrypted); //Decrypts 'Hello, World!', and also verifies it at the same time
if(decrypted) {
  //If authentication was successful (i.e. it comes from the same person)
  console.log("Auth successful: " + decrypted);
} else {
  //Someone has tampered with it
  console.log("Auth failed");
}
```

## License
[ISC][license-link]

[license-link]: https://github.com/Kurimizumi/simple-encryption/blob/master/LICENSE.md
[circleci-image]: https://circleci.com/gh/Kurimizumi/simple-encryption.svg?&style=shield
[circleci-link]: https://circleci.com/gh/Kurimizumi/simple-encryption
[npm-link]: https://npmjs.org/package/simple-encryption
[version-image]: https://img.shields.io/npm/v/simple-encryption.svg
[download-image]: https://img.shields.io/npm/dm/simple-encryption.svg

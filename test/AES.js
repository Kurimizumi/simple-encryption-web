var expect = require('chai').expect;
var AES = require('../index.js').AES;
var forge = require('node-forge');
describe('AES Cipher Suite', function() {
  it('generates keys', function() {
    var key = AES.generateKey();
    var key2 = AES.generateKey(16);
    expect(forge.util.decode64(key).length).to.equal(32);
    expect(forge.util.decode64(key2).length).to.equal(16);
  });
  it('generates IVs', function() {
    var iv = AES.generateIV();
    var iv2 = AES.generateIV(24);
    expect(forge.util.decode64(iv).length).to.equal(12);
    expect(forge.util.decode64(iv2).length).to.equal(24);
  });
  it('encrypts plaintext', function() {
    var plaintext = 'Hello, Mercury and Pluto! Can we join in? Regards, the venusians on Jupiter.';
    var key = 'otm4pQef8EO4hvbNr3R4bEhT1LJ3bpYTQ8HumBfMufw=';
    var iv = 'qDDap/gqf2zFhxZi';
    var encrypted = AES.encrypt(key, iv, plaintext);
    expect(encrypted).to.deep.equal({encrypted: '2PrKEtZIEjpuBKS4S32Fv+5LJmx/sRidnemr43DiXcKozZvQXmLU0FrLvpWHdiahwGEwhGiDCdd9tAaf+YZY/fQbpx7kPVZpo9WFfw==', tag: '/z6JSz16wFKeyj0KfkGDww=='});
  });
  it('decrypts ciphertext', function() {
    var encrypted = {encrypted: '2PaGGcwdQVYrIaajTSTRsaBCY1ln5BmCnK+H8D6jCsrnxJzYD2Lv2wKKnpSTO3Sx2ygwnWGSW8hg+hyCsKJX/KAc5w==', tag: 'VLTbQOrNPxdQB7UV11jxGA=='}
    var key = 'otm4pQef8EO4hvbNr3R4bEhT1LJ3bpYTQ8HumBfMufw=';
    var iv = 'qDDap/gqf2zFhxZi';
    var decrypted = AES.decrypt(key, iv, encrypted.encrypted, encrypted.tag);
    expect(decrypted).to.equal('Hi guys! Want to meet up for a mocha? Regards, the matrix on Earth.');
  });
});

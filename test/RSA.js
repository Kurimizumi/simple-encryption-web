var expect = require('chai').expect;
var RSA = require('../index.js').RSA;
var privateKey = '-----BEGIN RSA PRIVATE KEY-----\r\n\
MIIEowIBAAKCAQEA8O9RtFl/fzWr3YgVk0JqYyrWYe5v03NMgxsBpK3VStl0chc7\r\n\
BAdAm4nNT2JoRbL4Q3EvODsYOGzqwr3iphHDXATkMyWiKX1fh9yl+qZB2cz0O7he\r\n\
SIEYOt4fbdebPn5G2xU1gZuluBVHHK+czEmlZOv/5iV2JyXt4v++4wKIW+cja2bm\r\n\
8x6bI+e5PRMXYpGw7JCqReuK2fUhswzM8modIoE+tA2YBcaCuYtZ2Ak+DhxzBkHf\r\n\
dmTc/RPHDN2a8JZ8PUC7BgAzCiHUOYM0gFQr+qXr0CbHuSyyDbTRALTPG+qqyWDR\r\n\
bhRhiCHHLx4lxD2tclnpX4U+dSo60didkOT8EwIDAQABAoIBAHe5FEqgJoDZ9Lsy\r\n\
gjYYzLDWeo1TZHIYWy7S3rAsSU7WW8zNyl+oEuy3PzRxXAs2cbNhrOsuQkzXoph+\r\n\
rv+C2CcDrznTO4+OY0gp1riEoThPZhW++erha17lPYzhlJ0rNp5rHZl39JNSz3Fr\r\n\
umixN+S8eP6uItY1PM6N8xbvDT9M1zA+bIkT87tgt+AV5U3TwiEsqyZPaGR2Y5I/\r\n\
LIIzEPinlPg6bBDKXxRMV8kEIDRmsNNLllofEGd+yR1YVRpJXUkudfXOIdADPzha\r\n\
Qa3qGxJeHqhrih+r+4Wvr2nfajcKLTFzK+n2maNLwqcleB31w+ZgfQDKOhCIODx3\r\n\
kI2Z24ECgYEA+znB77ZUCRiuk+P49wyqdZZBz8EsaRuCRZ4MPH6PN4fCa7oDarPF\r\n\
doOMz+h5DZp2K4r2Y6j+IfcdWGEjzdfJLkfPZ4Wlr6zd6DGL6dKNRS7SLNge35yN\r\n\
ndqi8yXsMB7Oera00d/vE5mhqpHmx4rmOofPhYpZwcpoGhJ2pXjruzMCgYEA9YN+\r\n\
6aBOpNo+9AGgiayyE4miQX1KP+JF1PR7wVpHYnhbcubNCD0PHq3Mwzc9e30DQ8V3\r\n\
tk5PVQvpcPMPe2qpjmYLiJOUq+j2QwIG91nvBCEsDETw4rGmDNATOczE2NuGZzp2\r\n\
D7VeLHnpUsDXWCjpwhc0GORY+sA3bFFEl7GCu6ECgYAvOBXpll2JMChwB6Nd2/WW\r\n\
EF3iTK6qOs9rgl9OZ4NHrq6uTNIjlhKBSgyHb2yBUAzx9jaFWNgbTjUnzWpLYEmh\r\n\
90FWddpEgLtczyM7GaYP4NMENsLmyKgdiWCjTvdru/6XNgwafnqTNocaZj34N3U6\r\n\
fxhUQ0LHl+GlNN80DtxP3QKBgEWCrF0C+SEtdWNqToSMM4LalejKy0nZC4Jmkd9F\r\n\
ay6S+vlGJUiu2OgLtwySSEL9Ov5mGyWveECQ9c/30StVIJpjg+JwPkiJ1adVHJnN\r\n\
iaF2rtzua/ES8Ptxse/MbPMk/CGf6Ks742TeQ1QdqxqXws8j+KkPha3A3DA7thro\r\n\
tCXhAoGBAKEGI6yKngyeLVSpiKRX+6/x9J9j0VXPucggTI4ca4vbhMTJGGplImET\r\n\
0QkvlVtmfKIfoJ3fbp/aA+dFEcbPRIyY9q/Y/cvhdqGwcAPT9io+EhVbUv8NbvPU\r\n\
RudbC6j3rS7K6hXcWW3Gwqi33hJ0dwfvcGTWTjaQ4V2jsT3u9SFK\r\n\
-----END RSA PRIVATE KEY-----'
var publicKey = '-----BEGIN PUBLIC KEY-----\r\n\
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA8O9RtFl/fzWr3YgVk0Jq\r\n\
YyrWYe5v03NMgxsBpK3VStl0chc7BAdAm4nNT2JoRbL4Q3EvODsYOGzqwr3iphHD\r\n\
XATkMyWiKX1fh9yl+qZB2cz0O7heSIEYOt4fbdebPn5G2xU1gZuluBVHHK+czEml\r\n\
ZOv/5iV2JyXt4v++4wKIW+cja2bm8x6bI+e5PRMXYpGw7JCqReuK2fUhswzM8mod\r\n\
IoE+tA2YBcaCuYtZ2Ak+DhxzBkHfdmTc/RPHDN2a8JZ8PUC7BgAzCiHUOYM0gFQr\r\n\
+qXr0CbHuSyyDbTRALTPG+qqyWDRbhRhiCHHLx4lxD2tclnpX4U+dSo60didkOT8\r\n\
EwIDAQAB\r\n\
-----END PUBLIC KEY-----'


describe('RSA Cipher suite', function() {
  it('encrypts and decrypts text', function() {
    var plaintext = 'Hello, Earth! How are you doing? Regards, the martians on Pluto.';
    var encrypted = RSA.encrypt(publicKey, plaintext);
    var decrypted = RSA.decrypt(privateKey, encrypted);
    expect(decrypted).to.equal(plaintext);
  });
  it('signs and verifies text', function() {
    var plaintext = 'Hello, Pluto! How are you doing? Regards, the humans on Mercury.';
    var signed = RSA.sign(privateKey, plaintext);
    var verified = RSA.verify(publicKey, signed.signed, signed.md);
    expect(verified).to.equal(true);
  });
});

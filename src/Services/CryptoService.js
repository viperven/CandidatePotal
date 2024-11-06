
const CryptoJS = require("crypto-js");
const Secretekey = "@#%admin4hunt%#@_@#%CreatedBy%#@_@#%EspireSystem%#@";
const CryptoJSEncrypt = (plainText) => {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(plainText), Secretekey).toString();
    return encryptedData;
}
const CryptoJSDecrypt = (encryptedText) => {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedText, Secretekey);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
    } catch (error) {
        return null;
    }

}


const decryptApiData = (encValue) => {
    var decryptedText = null;
    try {
        var iv = CryptoJS.enc.Hex.parse("8888787678985577");
        var Pass = CryptoJS.enc.Utf8.parse("@Hunts#$$Job$4%Hunt&Secrete&Key=875090__%%");
        var Salt = CryptoJS.enc.Utf8.parse("@cryptography_#RHuntsJob%^^^@8655---_*salt_%_key7893gg");
        var key128Bits1000Iterations = CryptoJS.PBKDF2(Pass.toString(CryptoJS.enc.Utf8), Salt, { keySize: 128 / 32, iterations: 1000 });
        var cipherParams = CryptoJS.lib.CipherParams.create({
            ciphertext: CryptoJS.enc.Base64.parse(encValue)
        });
        var decrypted = CryptoJS.AES.decrypt(cipherParams, key128Bits1000Iterations, { mode: CryptoJS.mode.CBC, iv: iv, padding: CryptoJS.pad.Pkcs7 });
        decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
        return decryptedText;
    }
    catch (err) {
        return "";
    }
}
const AesEncryptForApi = (plainText) => {
    var key = CryptoJS.enc.Utf8.parse('8080919168684765');
    var iv = CryptoJS.enc.Utf8.parse('8888787678985577');
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(plainText), key,
        {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
    return encrypted.toString();
}


export const CryptoService = {
    CryptoJSEncrypt,
    CryptoJSDecrypt,
    AesEncryptForApi
}
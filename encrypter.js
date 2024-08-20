import CryptoJS from 'crypto-js'



export function crypter(text) {
    return CryptoJS.AES.encrypt(text, "mot_de_passe_secret").toString();
}

export function decrypter(text) {
    const bytes = CryptoJS.AES.decrypt(text, "mot_de_passe_secret");
    return texteDechiffre = bytes.toString(CryptoJS.enc.Utf8);
}


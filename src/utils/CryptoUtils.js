import CryptoJS, { AES } from "crypto-js";

const SECRET_KEY = "123456789";

export const encryptData = (data) => {
    const ciphertext = AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
    
    return ciphertext.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

export const decryptData = (ciphertext) => {

    const base64 = ciphertext.replace(/-/g, '+').replace(/_/g, '/');
    const bytes = AES.decrypt(base64, SECRET_KEY);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

    return JSON.parse(decryptedData);
};

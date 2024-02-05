// cryptojs
const CryptoJS = require("crypto-js");

const encrypt = (data, key) => {
  return CryptoJS.AES.encrypt(data, key).toString();
};

const decrypt = (data, key) => {
  const bytes = CryptoJS.AES.decrypt(data, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};

module.exports = { encrypt, decrypt };

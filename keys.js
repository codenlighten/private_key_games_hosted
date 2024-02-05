const bsv = require("bsv");
// uuid v4
const { v4: uuidv4 } = require("uuid");
const Mnemonic = require("bsv/mnemonic");
const defaultPath = "m/44'/0'/0'/0/0";
const generateKeys = () => {
  const uuid = uuidv4();
  const mnemonic = Mnemonic.fromRandom();
  const hdPrivateKey = mnemonic.toHDPrivateKey();
  const hdPublicKey = hdPrivateKey.hdPublicKey;
  const privateKey = hdPrivateKey.deriveChild(defaultPath).privateKey;
  const publicKey = privateKey.toPublicKey();
  const address = publicKey.toAddress();
  const keyObject = {
    uuid,
    mnemonic: mnemonic.toString(),
    privateKey: privateKey.toString(),
    publicKey: publicKey.toString(),
    hdPrivateKey: hdPrivateKey.toString(),
    hdPublicKey: hdPublicKey.toString(),
    address: address.toString(),
  };
  console.log(keyObject);
  return keyObject;
};
generateKeys();

module.exports = { generateKeys };

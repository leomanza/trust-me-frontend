import {
  keyStores,
  Near,
  connect,
  WalletConnection,
  utils,
  Contract,
} from "near-api-js";
const BN = require("bn.js");

export const CONTRACT_ID: string = process.env.CONTRACT_ID;
export const gas = new BN("70000000000000");

export const getWallet = async () => {
  const near = await connect({
    networkId: "testnet",
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
  });
  const wallet = new WalletConnection(near, "lean");
  return wallet;
};

export const getContract = async (wallet: any) => {
  return new Contract(wallet.account(), CONTRACT_ID, {
    viewMethods: [
      "getConfianza",
      "getTopTrusted",
      "getBottomTrusted",
    ],
    changeMethods: ["confiar", "desconfiar"],
    sender: wallet.account(),
  });
};

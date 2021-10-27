import {
  keyStores,
  Near,
  connect,
  WalletConnection,
  utils,
  Contract,
  providers,
} from "near-api-js";
const BN = require("bn.js");

export const CONTRACT_ID = process.env.CONTRACT_ID;
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

export const getContract = async (wallet: WalletConnection) => {
  return new Contract(wallet.account(), CONTRACT_ID!, {
    viewMethods: ["getConfianza", "getTopTrusted", "getBottomTrusted"],
    changeMethods: ["confiar", "desconfiar"],
  });
};

export const trust = async (wallet: WalletConnection, args: any) => {
  const response = await wallet
    .account()
    .functionCall(CONTRACT_ID!, "confiar", args);
  return providers.getTransactionLastResult(response);
};

export const mistrust = async (wallet: WalletConnection, args: any) => {
  const response = await wallet
    .account()
    .functionCall(CONTRACT_ID!, "desconfiar", args);
  return providers.getTransactionLastResult(response);
};

export const getConfidenceValues = async (wallet: WalletConnection, args: any) => {
  const response = await wallet
    .account()
    .functionCall(CONTRACT_ID!, "getConfianza", args);
  return providers.getTransactionLastResult(response);
};

export const getTopTrustedAccounts = async (wallet: WalletConnection, args: any) => {
  const response = await wallet
    .account()
    .functionCall(CONTRACT_ID!, "getTopTrusted", args);
  return providers.getTransactionLastResult(response);
};

export const getLessTrustedAccounts = async (wallet: WalletConnection, args: any) => {
  const response = await wallet
    .account()
    .functionCall(CONTRACT_ID!, "getBottomTrusted", args);
  return providers.getTransactionLastResult(response);
};
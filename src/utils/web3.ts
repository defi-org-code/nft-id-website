import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { isMobile } from "react-device-detect";

export const getWeb3ModalInstance = () => {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: process.env.REACT_APP_INFURA_ID,
      },
    },
  };

  const web3Modal = new Web3Modal({
    cacheProvider: false, // optional
    providerOptions, // required
  });

  return web3Modal;
};

export const mobileWithoutMetamask = () => {
  return isMobile && !(window as any).ethereum;
};

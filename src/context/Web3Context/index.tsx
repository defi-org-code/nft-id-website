import { createContext, useContext, useState } from "react";
import Web3 from "web3";
import { getWeb3ModalInstance } from "../../utils/web3";

interface IWeb3Context {
  web3: Web3 | null;
  account: string;
  connect: () => void;
}

interface IProps {
  children: any;
}
const web3Modal = getWeb3ModalInstance();

const Web3Context = createContext({} as IWeb3Context);

const Web3Provider = ({ children }: IProps) => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string>("");
  const connect = async () => {
    const provider = await web3Modal.connect();
    initWeb3(provider);
  };

  const initWeb3 = (provider: any) => {
    const account = provider.accounts
      ? provider.accounts[0]
      : provider.selectedAddress;
    setAccount(account);
    addEventsToProvider(provider);
    setWeb3(new Web3(provider));
  };

  const addEventsToProvider = (provider: any) => {
    provider.on("accountsChanged", (accounts: string[]) => {
      web3Modal.clearCachedProvider();
      setAccount(accounts[0]);
    });
    provider.on("disconnect", (error: { code: number; message: string }) => {
      web3Modal.clearCachedProvider();
    });
  };

  const value = { web3, account, connect };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};

const useWeb3 = () => useContext(Web3Context);

export { useWeb3, Web3Provider };

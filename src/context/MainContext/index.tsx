import { createContext, useContext, useState } from "react";

interface IMainContext {
  message: string;
  setMessage: (step: string) => void;
}

interface IProps {
  children: any;
}

const MainContext = createContext({} as IMainContext);

const MainProvider = ({ children }: IProps) => {
  const [message, setMessage] = useState("");

  const value = {
    message,
    setMessage,
  };

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

const useMainStore = () => useContext(MainContext);

export { useMainStore, MainProvider };

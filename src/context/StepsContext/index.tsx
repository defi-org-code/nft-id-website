import { createContext, useContext, useState } from "react";

interface IStepsContext {
  currentStep: number;
  setCurrectStep: (step: number) => void;
  openSeaUrl: string;
  setOpenSeaUrl: (val: string) => void;
  asset: string;
  setAsset: (val: string) => void;
  owner: string;
  setOwner: (val: string) => void;
  signature: string;
  setSignature: (val: string) => void;
  signData: string;
  setSignData: (val: string) => void;
  allowNextStep: boolean;
  setAllowNextStep: (val: boolean) => void;
  twitterHandle: string;
  setTwitterHandle: (val: string) => void;
  varification: string;
  setVarification: (val: string) => void;
  varificationPending: boolean;
  setVarificationPending: (val: boolean) => void;
}

interface IProps {
  children: any;
}

const StepsContext = createContext({} as IStepsContext);

const StepsProvider = ({ children }: IProps) => {
  const [currentStep, setCurrectStep] = useState(0);
  const [openSeaUrl, setOpenSeaUrl] = useState<string>("");
  const [asset, setAsset] = useState<string>("");
  const [owner, setOwner] = useState<string>("");
  const [signature, setSignature] = useState<string>("");
  const [signData, setSignData] = useState<string>("");
  const [allowNextStep, setAllowNextStep] = useState<boolean>(true);
  const [twitterHandle, setTwitterHandle] = useState<string>("");
  const [varification, setVarification] = useState<string>("");
  const [varificationPending, setVarificationPending] = useState<boolean>(
    false
  );

  const value = {
    currentStep,
    setCurrectStep,
    openSeaUrl,
    setOpenSeaUrl,
    asset,
    setAsset,
    owner,
    setOwner,
    signature,
    setSignature,
    signData,
    setSignData,
    allowNextStep,
    setAllowNextStep,
    twitterHandle,
    setTwitterHandle,
    varification,
    setVarification,
    varificationPending,
    setVarificationPending,
  };

  return (
    <StepsContext.Provider value={value}>{children}</StepsContext.Provider>
  );
};

const useSteps = () => useContext(StepsContext);

export { useSteps, StepsProvider };

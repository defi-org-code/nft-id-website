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
  verification: string;
  setVerification: (val: string) => void;
  verificationPending: boolean;
  setVerificationPending: (val: boolean) => void;
  name: string;
  setName: (val: string) => void;
  done: boolean;
  setDone: (val: boolean) => void;
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
  const [verification, setVerification] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [done, setDone] = useState<boolean>(false);

  const [verificationPending, setVerificationPending] = useState<boolean>(
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
    verification,
    setVerification,
    verificationPending,
    setVerificationPending,
    name,
    setName,
    setDone,
    done,
  };

  return (
    <StepsContext.Provider value={value}>{children}</StepsContext.Provider>
  );
};

const useSteps = () => useContext(StepsContext);

export { useSteps, StepsProvider };

import { createContext, ReactNode, useContext, useState } from "react";
import { ICertificate } from "../../types";

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
  certificate: ICertificate | null;
  setCertificate: (val: ICertificate | null) => void;
  verificationPending: boolean;
  setVerificationPending: (val: boolean) => void;
  name: string;
  setName: (val: string) => void;
  done: boolean;
  setDone: (val: boolean) => void;
}

interface IProps {
  children: ReactNode;
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
  const [certificate, setCertificate] = useState<ICertificate | null>({
    json: '{"twitterHandle":"denis6421"}',
    nft_contract_address: "0x7403ac30de7309a0bf019cda8eec034a5507cbb3",
    nft_id: "380",
    nft_image:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHZpZXdCb3g9IjAgMCAzNTAgMzUwIj48c3R5bGU+LmJhc2UgeyBmaWxsOiB3aGl0ZTsgZm9udC1mYW1pbHk6IHNlcmlmOyBmb250LXNpemU6IDE0cHg7IH08L3N0eWxlPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9ImJsYWNrIiAvPjx0ZXh0IHg9IjEwIiB5PSIyMCIgY2xhc3M9ImJhc2UiPkxpemFyZGZvbGs8L3RleHQ+PHRleHQgeD0iMTAiIHk9IjQwIiBjbGFzcz0iYmFzZSI+QXNzYXNzaW48L3RleHQ+PHRleHQgeD0iMTAiIHk9IjYwIiBjbGFzcz0iYmFzZSI+U3RyZW5ndGggNDwvdGV4dD48dGV4dCB4PSIxMCIgeT0iODAiIGNsYXNzPSJiYXNlIj5EZXh0ZXJpdHkgMTwvdGV4dD48dGV4dCB4PSIxMCIgeT0iMTAwIiBjbGFzcz0iYmFzZSI+SW50ZWxsaWdlbmNlIDM8L3RleHQ+PHRleHQgeD0iMTAiIHk9IjEyMCIgY2xhc3M9ImJhc2UiPlZpdGFsaXR5IDI8L3RleHQ+PHRleHQgeD0iMTAiIHk9IjE0MCIgY2xhc3M9ImJhc2UiPkx1Y2sgMjwvdGV4dD48dGV4dCB4PSIxMCIgeT0iMTYwIiBjbGFzcz0iYmFzZSI+RmFpdGggMTwvdGV4dD48L3N2Zz4=",
    owner_public_key: "0x3Eca88B18F86c6910066256f47a051B15b84d57b",
    signature:
      "0x1de4c2e122182a8d570f2d264f985d95cda76751998713144b7d7778b55224706294d12e74eaeba0b59f6a15a39969111712b51c266a66605da1657d42c50aef1b",
    tweet_id: "1437789757333979155",
    twitter_handle: "denis6421",
    twitter_user_info: {
      friends_count: 58,
      followers_count: 1,
      name: "denis",
      description: "",
      verified: false,
    },
    verified_time: "2021-09-14 14:46:17",
  });
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
    certificate,
    setCertificate,
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

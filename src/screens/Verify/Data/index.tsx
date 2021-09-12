import { IStep } from "../../../types";
import AssetUrl from "../components/steps/AssetUrl";
import ConnectWallet from "../components/steps/ConnectWallet";
import Ownership from "../components/steps/Ownership";
import SendTweet from "../components/steps/SendTweet";
import StartStep from "../components/steps/StartStep";

export const steps: IStep[] = [
  {
    title: "It’s free and takes a few seconds",
    component: <StartStep />,
  },
  {
    title: "Enter your asset URL on OpenSea",
    component: <AssetUrl />,
  },
  {
    title: "Connect MetaMask with NFT owner account",
    component: <ConnectWallet />,
  },
  {
    title: "Enter your Twitter username and sign ownership proof",
    component: <Ownership />,
  },
  {
    title: "Send tweet to prove Twitter ownership",
    component: <SendTweet />,
  },
];

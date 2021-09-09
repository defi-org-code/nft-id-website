import AssetUrl from "../screens/Home/components/AssetUrl";
import ConnectWallet from "../screens/Home/components/ConnectWallet";
import Ownership from "../screens/Home/components/Ownership";
import SendTweet from "../screens/Home/components/SendTweet";

export const steps = [
  {
    title: "Enter your asset URL on OpenSea",
    requiredValue: "openSeaUrl",
    component: AssetUrl,
  },
  {
    title: "Connect MetaMask with NFT owner account",
    requiredValue: "openSeaUrl",
    component: ConnectWallet,
  },
  {
    title: "Enter your Twitter username and sign ownership proof",
    requiredValue: "openSeaUrl",
    component: Ownership,
  },
  {
    title: "Send tweet to prove Twitter ownership",
    requiredValue: "openSeaUrl",
    component: SendTweet,
  },
];

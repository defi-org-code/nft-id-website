import { useEffect } from "react";
import Button from "../../../../../components/Button";
import Error from "../../Error";
import Success from "../../Success";
import images from "../../../../../consts/images";
import { useStepsStore } from "../../../../../context/StepsContext";
import { useWeb3 } from "../../../../../context/Web3Context";
import { makeElipsisAddress } from "../../../../../utils/string";
import AssetAvatar from "../../AssetAvatar";
import { EVENTS } from "../../../../../services/analytics/consts";
import analytics from "../../../../../services/analytics";
import { mobileWithoutMetamask } from "../../../../../utils/web3";
const Bounce = require("react-reveal/Bounce");

const checkIfOwner = (account: string, owner: string) => {
  if (!account || !owner) return false;
  if (account.toLowerCase() === owner.toLowerCase()) {
    return true;
  }
  return false;
};

function ConnectWallet() {
  const { owner, setAllowNextStep } = useStepsStore();
  const { connect, account } = useWeb3();

  const isOwner = checkIfOwner(account, owner);
  useEffect(() => {
    setAllowNextStep(isOwner);
  }, [isOwner, setAllowNextStep]);

  useEffect(() => {
    if (account) {
      analytics.sendEvent(EVENTS.connectedSuccessfullyWallet);
    }
  }, [account]);

  return (
    <Bounce right>
      <div className="step wallet-connect">
        <AssetAvatar />
        <div className="step-content">
          <div className="wallet-connect-owner">
            <h4>NFT Owner:</h4>
            <a
              href={`https://etherscan.io/address/${owner}`}
              target="_blank"
              rel="noreferrer"
            >
              <p className="overflow-text"> {owner}</p>{" "}
              <img src={images.LinkImg} alt="link" />
            </a>
          </div>
          <Button
            onClick={analytics.sendEventAndRunFunc.bind(
              null,
              EVENTS.connectWallet,
              null,
              !account && !mobileWithoutMetamask() ? connect : undefined
            )}
            content={
              <div className="button-with-img">
                <img src={images.MetamaskImg} alt="metamask" />
                {account ? (
                  <p>{makeElipsisAddress(account, 7)}</p>
                ) : (
                  <p>Connect MetaMask</p>
                )}
              </div>
            }
            active={true}
            isLoading={false}
          />
          {account ? (
            isOwner ? (
              <Success text="Successfully Connected!" />
            ) : (
              <Error text="Error: MetaMask addresses do not match owner address" />
            )
          ) : null}
        </div>
      </div>
    </Bounce>
  );
}

export default ConnectWallet;

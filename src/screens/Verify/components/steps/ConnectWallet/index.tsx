import { useEffect, useState } from "react";
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
import api from "../../../../../services/api";
const Bounce = require("react-reveal/Bounce");

const checkIfOwner = (account: string, owner: string) => {
  if (!account || !owner) return false;
  if (account.toLowerCase() === owner.toLowerCase()) {
    return true;
  }
  return false;
};

function ConnectWallet() {
  const { owner, setAllowNextStep, openSeaUrl, setOwner } = useStepsStore();
  const { connect, account } = useWeb3();
  const [isLoading, setIsLoading] = useState(false);

  const isOwner = checkIfOwner(account, owner);
  useEffect(() => {
    setAllowNextStep(isOwner);
  }, [isOwner, setAllowNextStep]);

  useEffect(() => {
    if (account) {
      analytics.sendEvent(EVENTS.connectedSuccessfullyWallet);
      getOwner(account);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  const getOwner = async (account: string) => {
    try {
      setIsLoading(true);
      const url = `extractOwnerFromNFTContract?openseaUrl=${openSeaUrl}&ownerAddress=${account}`;
      const response = await api.get(url);
      setOwner(response);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Bounce right>
      <div className="step wallet-connect">
        <AssetAvatar />
        <div className="step-content">
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
            isLoading={isLoading}
          />
          {owner ? (
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

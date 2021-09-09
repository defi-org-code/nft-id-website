import { useEffect } from "react";
import Button from "../../../../components/Button";
import Success from "../../../../components/Success";
import images from "../../../../consts/images";
import { useSteps } from "../../../../context/StepsContext";
import { useWeb3 } from "../../../../context/Web3Context";
import { makeElipsisAddress } from "../../../../utils/string";
import AssetAvatar from "../AssetAvatar";

const checkIfOwner = (account: string, owner: string) => {
  if (!account || !owner) return false;
  if (account.toLowerCase() === owner.toLowerCase()) {
    return true;
  }
  return false;
};

function ConnectWallet() {
  const { owner, setAllowNextStep } = useSteps();
  const { connect, account } = useWeb3();
  const isOwner = checkIfOwner(account, owner);
  useEffect(() => {
    setAllowNextStep(isOwner);
  }, [isOwner, setAllowNextStep]);

  return (
    <div className="step-flex wallet-connect">
      <AssetAvatar />
      <div className="step-content">
        <div className="wallet-connect-owner">
          <h4>NFT Owner:</h4>
          <a
            href={`https://etherscan.io/address/${account}`}
            target="_blank"
            rel="noreferrer"
          >
            {owner} <img src={images.LinkImg} alt="link" />
          </a>
        </div>
        <Button
          onClick={connect}
          content={
            <div className="button-with-img">
              <img src={images.MetamaskImg} alt="metamask" />
              {account ? (
                <p>{makeElipsisAddress(account, 12)}</p>
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
            <section className="wallet-connect-error">
              <img src={images.ErrorImg} alt="error" />
              <p>Error: MetaMask addresses do not match owner address</p>
            </section>
          )
        ) : null}
      </div>
    </div>
  );
}

export default ConnectWallet;

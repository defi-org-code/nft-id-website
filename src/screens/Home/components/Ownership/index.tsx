import { useEffect, useState } from "react";
import Button from "../../../../components/Button";
import Success from "../../../../components/Success";
import images from "../../../../consts/images";
import { useSteps } from "../../../../context/StepsContext";
import { useWeb3 } from "../../../../context/Web3Context";
import api from "../../../../services/api";
import AssetAvatar from "../AssetAvatar";

function Ownership() {
  const {
    setSignature,
    setSignData,
    twitterHandle,
    setTwitterHandle,
    signature,
    signData,
    openSeaUrl,
    setAllowNextStep,
  } = useSteps();
  const { account, web3 } = useWeb3();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const sign = async (twitterHandle: string) => {
    if (!web3) return;
    const messageToSign = `{"twitterHandle":"${twitterHandle}"}`;
    const signData = JSON.stringify(messageToSign);
    setSignData(signData);
    try {
      setIsLoading(true);
      const res = await web3.eth.personal.sign(signData, account, "");
      await createPendingRequest(res, signData);
      setSignature(res);
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setAllowNextStep(!!signature);
  }, [setAllowNextStep, signature]);

  const createPendingRequest = async (signature: string, signData: string) => {
    const url = "createPendingRequest";
    const body = {
      signature,
      json: signData,
      openSeaUrl,
    };
    const name = await api.post(url, body);
    console.log({ name });
  };

  const onClick = () => {
    if (twitterHandle) {
      sign(twitterHandle);
    }
  };
  return (
    <div
      className={`step-flex ownership ${
        signature ? "ownership-submitted" : ""
      }`}
    >
      <AssetAvatar />
      <div className="step-content">
        {!signature && (
          <div className="ownership-submit">
            <input
              value={twitterHandle}
              placeholder="Twitter Username"
              onChange={(e) => setTwitterHandle(e.target.value)}
            />
            <Button
              onClick={onClick}
              disabled={!twitterHandle}
              active={!!twitterHandle}
              isLoading={isLoading}
              content={
                <div className="button-with-img">
                  <img src={images.MetamaskImg} alt="metamask" />
                  <p>Sign with Metamask</p>
                </div>
              }
            />
          </div>
        )}
        <div className="ownership-account">
          <img src={images.TwitterImg} alt="twitter" />
          <h4>{twitterHandle}</h4>
          <Success text="Successfully Signed!" />
        </div>
      </div>
    </div>
  );
}

export default Ownership;

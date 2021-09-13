import { useEffect, useRef, useState } from "react";
import Button from "../../../../../components/Button";
import Success from "../../Success";
import images from "../../../../../consts/images";
import { useSteps } from "../../../../../context/StepsContext";
import { useWeb3 } from "../../../../../context/Web3Context";
import api from "../../../../../services/api";
import AssetAvatar from "../../AssetAvatar";
import Error from "../../Error";
const Bounce = require("react-reveal/Bounce");
const Fade = require("react-reveal/Fade");

const createPendingRequest = async (
  signature: string,
  signData: string,
  openseaUrl: string
) => {
  const url = "createPendingRequest";
  const body = {
    signature,
    json: signData,
    openseaUrl,
  };
  console.log(body);
  const name = await api.post(url, body);
  console.log({ name });
  return name;
};

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
  const submitContainerRef = useRef<HTMLDivElement>(null);
  const { account, web3 } = useWeb3();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const sign = async (twitterHandle: string) => {
    if (!web3) return;
    const messageToSign = {"twitterHandle":twitterHandle};
    const signData = JSON.stringify(messageToSign);
    setSignData(signData);
    setError(false);
    try {
      setIsLoading(true);
      const res = await web3.eth.personal.sign(signData, account, "");
      await createPendingRequest(res, signData, openSeaUrl);
      setSignature(res);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (signature) {
      if (submitContainerRef && submitContainerRef.current)
        submitContainerRef.current.style.opacity = "0";
      setAllowNextStep(true);
    }
  }, [setAllowNextStep, signature]);

  const onClick = () => {
    if (twitterHandle) {
      sign(twitterHandle);
    }
  };
  return (
    <Bounce right>
      <div
        className={`step ownership ${signature ? "ownership-submitted" : ""}`}
      >
        <AssetAvatar />
        <div className="step-content">
          <div className="ownership-submit" ref={submitContainerRef}>
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
          {error && <Error text="Something went wrong..." />}
          {signature && (
            <div className="ownership-account">
              <Fade>
                <div className="ownership-account-top">
                  <img src={images.TwitterImg} alt="twitter" />
                  <h4>{twitterHandle}</h4>
                </div>
              </Fade>
              <Success text="Successfully Signed!" />
            </div>
          )}
        </div>
      </div>
    </Bounce>
  );
}

export default Ownership;

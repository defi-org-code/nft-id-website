import { useEffect, useState } from "react";
import Button from "../../../../../components/Button";
import Success from "../../Success";
import images from "../../../../../consts/images";
import { useSteps } from "../../../../../context/StepsContext";
import { useWeb3 } from "../../../../../context/Web3Context";
import api from "../../../../../services/api";
import AssetAvatar from "../../AssetAvatar";
import Error from "../../Error";
import TwitterAccount from "../../../../../components/TwitterAccount";
const Bounce = require("react-reveal/Bounce");

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
  const res = await api.post(url, body);
  return res.data.name;
};

function Ownership() {
  const {
    setSignature,
    setSignData,
    twitterHandle,
    setTwitterHandle,
    signature,
    name,
    setName,
    openSeaUrl,
    setAllowNextStep,
  } = useSteps();
  const { account, web3 } = useWeb3();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const sign = async (twitterHandle: string) => {
    if (!web3) return;
    const messageToSign = { twitterHandle: twitterHandle.replace('@', '') };
    const signData = JSON.stringify(messageToSign);
    setSignData(signData);
    setError(false);
    try {
      setIsLoading(true);
      const res = await web3.eth.personal.sign(signData, account, "");
      setName(await createPendingRequest(res, signData, openSeaUrl));
      setSignature(res);
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (signature) {
      setAllowNextStep(true);
    } else {
      setAllowNextStep(false);
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
          <div
            className="ownership-submit"
            style={{
              opacity: signature ? "0" : "1",
              pointerEvents: signature ? "none" : "all",
            }}
          >
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
          {signature && (
            <div className="ownership-account">
              <TwitterAccount twitterHandle={twitterHandle} name={name || ""} />

              <Success text="Successfully Signed!" />
            </div>
          )}

          {error && <Error text="Something went wrong..." />}
        </div>
      </div>
    </Bounce>
  );
}

export default Ownership;

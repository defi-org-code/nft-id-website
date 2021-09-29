import { useEffect, useState } from "react";
import Button from "../../../../../components/Button";
import Success from "../../Success";
import images from "../../../../../consts/images";
import { useStepsStore } from "../../../../../context/StepsContext";
import { useWeb3 } from "../../../../../context/Web3Context";
import api from "../../../../../services/api";
import AssetAvatar from "../../AssetAvatar";
import Error from "../../Error";
import TwitterAccount from "../../../../../components/TwitterAccount";
import Input from "../../../../../components/Input";
import analytics from "../../../../../services/analytics";
import { EVENTS } from "../../../../../services/analytics/consts";
import { mobileWithoutMetamask } from "../../../../../utils/web3";
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
  } = useStepsStore();
  const { sign } = useWeb3();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const createSignature = async (name?: string) => {
    if (!name || mobileWithoutMetamask()) return;
    const messageToSign = { twitterHandle: name.replace("@", "") };
    const signData = JSON.stringify(messageToSign);
    setSignData(signData);
    setError(false);
    try {
      setIsLoading(true);
      const res = await sign(signData);
      if (res) {
        setName(await createPendingRequest(res, signData, openSeaUrl));
        setSignature(res);
      }
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

  const onChange = (value: string) => {
    setTwitterHandle(value);
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
            <Input
              value={twitterHandle}
              placeholder="Twitter Username"
              onChange={onChange}
            />
            <Button
              onClick={analytics.sendEventAndRunFunc.bind(
                null,
                EVENTS.signWithMetamaskClick,
                createSignature.bind(null, twitterHandle)
              )}
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

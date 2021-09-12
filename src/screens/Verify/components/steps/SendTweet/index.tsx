import { useEffect, useRef, useState } from "react";
import Button from "../../../../../components/Button";
import images from "../../../../../consts/images";
import { useSteps } from "../../../../../context/StepsContext";
import api from "../../../../../services/api";
import AssetAvatar from "../../AssetAvatar";
import Varified from "./Varified";
const Bounce = require("react-reveal/Bounce");
const Fade = require("react-reveal/Fade");

function SendTweet() {
  const {
    openSeaUrl,
    twitterHandle,
    setVarification,
    varification,
    varificationPending,
    setVarificationPending,
    setAllowNextStep,
  } = useSteps();
  const pollInterval = useRef<any>(null);
  const [error, setError] = useState(false);
  const onClick = () => {
    const params = encodeURIComponent(
      `I’m verifying that I own ${openSeaUrl} #nftidverify`
    );
    window.open(`https://twitter.com/intent/tweet?text=${params}`);
    setVarificationPending(true);
    handlePoll();
  };

  const fecthVerificationRequest = async () => {
    const url = `fetchVerifiedRequest?openseaUrl=${openSeaUrl}`;
    setError(false);
    try {
      const res = await api.get(url);
      if (res) {
        setVarificationPending(false);
        setVarification(res);
        window.clearInterval(pollInterval.current);
      }
    } catch (error) {
      setError(true);
    }
  };

  const handlePoll = () => {
    pollInterval.current = setInterval(() => {
      fecthVerificationRequest();
    }, 5000);
  };

  useEffect(() => {
    setAllowNextStep(!!varification);
  }, [setAllowNextStep, varification]);
  return (
    <Bounce right>
      <div className="step send-tweet">
        <AssetAvatar varified={!!varification} />

        <div className="step-content">
          <div className="send-tweet-not-varified">
            <div className="send-tweet-account">
              <img src={images.TwitterImg} alt="twitter" />
              <h4>{twitterHandle}</h4>
            </div>
            {!varificationPending ? (
              <Button
                onClick={onClick}
                active={true}
                content={
                  <div className="button-with-img">
                    <img src={images.TwitterWhiteImg} alt="twitter" />
                    <p>Send Tweet</p>
                  </div>
                }
              />
            ) : (
              <Fade>
                <div className="send-tweet-pending">
                  <img src="" alt="" />
                  <p>Waiting to verify tweet (about 1-2 minutes)...</p>
                </div>
              </Fade>
            )}
          </div>
          {varification && <Varified />}
        </div>
      </div>
    </Bounce>
  );
}

export default SendTweet;

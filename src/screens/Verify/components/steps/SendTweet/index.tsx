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
    setVerification,
    verification,
    verificationPending,
    setVerificationPending,
    setAllowNextStep,
  } = useSteps();
  const pollInterval = useRef<any>(null);
  const [error, setError] = useState(false);
  const onClick = () => {
    const params = encodeURIComponent(
      `I’m verifying that I own ${openSeaUrl}\n Check out my certificate of ownership on @mynft_fyi https://mynft.fyi/${twitterHandle} #mynftfyi`
    );
    window.open(`https://twitter.com/intent/tweet?text=${params}`);
    setVerificationPending(true);
    handlePoll();
  };

  const fetchVerificationRequest = async () => {
    const url = `fetchVerifiedRequest?url=${openSeaUrl}`;
    setError(false);
    try {
      const res = await api.get(url);
      if (res) {
        setVerificationPending(false);
        setVerification(res);
        window.clearInterval(pollInterval.current);
      }
    } catch (error) {
      setError(true);
    }
  };

  const handlePoll = () => {
    pollInterval.current = setInterval(() => {
      fetchVerificationRequest().then();
    }, 5000);
  };

  useEffect(() => {
    setAllowNextStep(!!verification);
  }, [setAllowNextStep, verification]);
  return (
    <Bounce right>
      <div className="step send-tweet">
        <AssetAvatar varified={!!verification} />

        <div className="step-content">
          <div className="send-tweet-not-varified">
            <div className="send-tweet-account">
              <img src={images.TwitterImg} alt="twitter" />
              <h4>{twitterHandle}</h4>
            </div>
            {!verificationPending ? (
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
          {verification && <Varified />}
        </div>
      </div>
    </Bounce>
  );
}

export default SendTweet;

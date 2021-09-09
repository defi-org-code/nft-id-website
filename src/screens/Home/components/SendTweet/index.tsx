import { useEffect, useRef } from "react";
import Button from "../../../../components/Button";
import images from "../../../../consts/images";
import { useSteps } from "../../../../context/StepsContext";
import api from "../../../../services/api";
import AssetAvatar from "../AssetAvatar";
import Varified from "./Varified";

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
    const res = await api.get(url);

    if (res) {
      setVarificationPending(false);
      setVarification(res);
      window.clearInterval(pollInterval.current);
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
    <div className="step-flex send-tweet">
      <AssetAvatar varified={!!varification} />

      <div className="step-content">
        {!varification ? (
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
              <div className="send-tweet-pending">
                <img src="" alt="" />
                <p>Waiting to verify tweet (about 1-2 minutes)...</p>
              </div>
            )}
          </div>
        ) : (
          <Varified />
        )}
      </div>
    </div>
  );
}

export default SendTweet;

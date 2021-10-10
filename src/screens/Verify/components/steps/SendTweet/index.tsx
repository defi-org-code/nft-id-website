import { useEffect, useRef } from "react";
import Animation from "../../../../../components/Animation";
import Button from "../../../../../components/Button";
import TwitterAccount from "../../../../../components/TwitterAccount";
import animations from "../../../../../consts/animations";
import images from "../../../../../consts/images";
import { useStepsStore } from "../../../../../context/StepsContext";
import api from "../../../../../services/api";
import AssetAvatar from "../../AssetAvatar";
import VerifiedAsset from "../../../../../components/VerifiedAsset";
import Varified from "./Varified";
import { EVENTS } from "../../../../../services/analytics/consts";
import analytics from "../../../../../services/analytics";
const Bounce = require("react-reveal/Bounce");
const Fade = require("react-reveal/Fade");

function SendTweet() {
  const {
    openSeaUrl,
    twitterHandle,
    certificate,
    setCertificate,
    verificationPending,
    setVerificationPending,
    setAllowNextStep,
    name,
  } = useStepsStore();
  const pollInterval = useRef<any>(null);
  const sendTweet = () => {
    const params = encodeURIComponent(
      `I just claimed my NFT certificate for owning ${openSeaUrl} @mynft_fyi #mynftfyi\n\nCheck out my certificate: https://www.mynft.fyi/${twitterHandle} 👇`
    );
    window.open(`https://twitter.com/intent/tweet?text=${params}`);
    setVerificationPending(true);
    handlePoll();
  };

  const fetchVerificationRequest = async () => {
    const url = `fetchVerifiedRequest?url=${openSeaUrl}`;

    try {
      const res = await api.get(url);
      if (res && res.verified_time) {
        analytics.sendEvent(EVENTS.verifyPagesuccessfullyVerified);
        setVerificationPending(false);
        res.twitter_user_info = JSON.parse(res.twitter_user_info);
        setCertificate(res);
        window.clearInterval(pollInterval.current);
      }
    } catch (error) {}
  };

  const handlePoll = () => {
    analytics.sendEvent(EVENTS.verifyPagePendingTriggerdAfterTSendingweet);
    pollInterval.current = setInterval(() => {
      fetchVerificationRequest().then();
    }, 5000);
  };

  useEffect(() => {
    setAllowNextStep(!!certificate);
  }, [setAllowNextStep, certificate]);

  return (
    <Bounce right>
      <div className="step send-tweet">
        {certificate ? (
          <VerifiedAsset asset={certificate.nft_image} />
        ) : (
          <AssetAvatar />
        )}

        <div className="step-content">
          <div
            className="send-tweet-not-varified"
            style={{
              opacity: certificate ? "0" : "1",
              pointerEvents: certificate ? "none" : "all",
            }}
          >
            <TwitterAccount twitterHandle={twitterHandle} name={name} />
            {!verificationPending ? (
              <Button
                onClick={analytics.sendEventAndRunFunc.bind(
                  null,
                  EVENTS.sendTweetClick,
                  null,
                  sendTweet
                )}
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
                  <Animation data={animations.loader} />
                  <p>Waiting to verify tweet (about 1-2 minutes)...</p>
                </div>
              </Fade>
            )}
          </div>
          {certificate && <Varified />}
        </div>
      </div>
    </Bounce>
  );
}

export default SendTweet;

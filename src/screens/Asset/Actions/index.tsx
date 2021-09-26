/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import CodeFrame from "../../../components/CodeFrame";
import analytics from "../../../services/analytics";
import { EVENTS } from "../../../services/analytics/consts";
import api from "../../../services/api";
import { ICertificate } from "../../../types";
import Action from "./Action/index";
import Typing from "./Typing";
const Fade = require("react-reveal/Fade");

interface IProps {
  certificate: ICertificate;
  verifyAgain: () => void;
}
function Actions({ certificate, verifyAgain }: IProps) {
  const [isTweetVerified, setIsTweetVerified] = useState(false);
  const [showFetchingOwner, setShowFetchingOwner] = useState(false);
  const [showFetchingSignature, setShowFetchingSignature] = useState(false);
  const [showVerifyingSignature, setShowVerifyingSignature] = useState(false);
  const [showFetchingTweet, setShowFetchingTweet] = useState(false);

  const verifyTweet = async () => {
    try {
      const tweet = await api.get(`isTweetExist/${certificate?.tweet_id}`);
      if (tweet && tweet.result) {
        setIsTweetVerified(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    verifyTweet().then(() => {});
  }, []);

  const openSeaUrlEncoded = `https://opensea.io/assets/${encodeURI(
    `${certificate.nft_contract_address}/${certificate?.nft_id}`
  )}`;

  const openSeaUrl = `https://opensea.io/assets/${`${certificate.nft_contract_address}/${certificate?.nft_id}`}`;

  const twitterUrl = `https://twitter.com/${certificate.twitter_handle}/status/${certificate.tweet_id}`;

  const etherscanUrlEncoded = `https://etherscan.io/address/${encodeURI(
    certificate.owner_public_key
  )}`;

  const etherscanUrl = `https://etherscan.io/address/${certificate.owner_public_key}`;

  return (
    <Fade bottom>
      <div className="asset-proof">
        <h3 className="asset-proof-title">On-Chain Proof</h3>
        <div className="asset-proof-flex">
          <div className="asset-proof-actions">
            <CodeFrame />
            <Action
              active={true}
              name={
                <Typing>
                  <p>Fetching asset...</p>
                </Typing>
              }
              content={
                <Typing onTypingDone={() => setShowFetchingOwner(true)}>
                  {`Asset  `}
                  <a
                    className="colored-text"
                    target="_blank"
                    rel="noreferrer"
                    href={openSeaUrlEncoded}
                  >
                    {openSeaUrl}
                  </a>
                </Typing>
              }
            />

            <Action
              active={showFetchingOwner}
              name={
                <Typing>
                  <p>Fetching Owner...</p>
                </Typing>
              }
              content={
                <Typing onTypingDone={() => setShowFetchingSignature(true)}>
                  Owner
                  <a
                    className="colored-text"
                    target="_blank"
                    rel="noreferrer"
                    href={etherscanUrlEncoded}
                  >
                    {` ${etherscanUrl}`}
                  </a>
                  <br />
                  Tweet handle proof:
                  {` {TwitterHandle: ${certificate.twitter_handle}}`}
                </Typing>
              }
            />

            <Action
              active={showFetchingSignature}
              name={
                <Typing>
                  <p>Fetching siganture...</p>
                </Typing>
              }
              content={
                <Typing onTypingDone={() => setShowVerifyingSignature(true)}>
                  <p>
                    Signature:
                    <span
                      className="colored-text"
                      style={{ cursor: "pointer" }}
                      onClick={analytics.sendEventAndRunFunc.bind(
                        null,
                        EVENTS.openVerifySignatureModalClicked,
                        verifyAgain
                      )}
                    >{` ${certificate.signature}`}</span>
                  </p>
                </Typing>
              }
            />

            <Action
              name={
                <Typing>
                  <p>Verifiying siganture...</p>
                </Typing>
              }
              active={showVerifyingSignature}
              content={
                <Typing onTypingDone={() => setShowFetchingTweet(true)}>
                  <p className="colored-text">☑ Verified</p>
                </Typing>
              }
            />

            <Action
              active={showFetchingTweet}
              name={
                <Typing>
                  <p>Fetching tweet...</p>
                </Typing>
              }
              content={
                <Typing>
                  {isTweetVerified ? (
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={twitterUrl}
                      className="colored-text"
                    >
                      {twitterUrl}
                    </a>
                  ) : (
                    <strong className="tweet-error">
                      (!) Tweet was deleted
                    </strong>
                  )}
                </Typing>
              }
            />
          </div>
        </div>
      </div>
    </Fade>
  );
}

export default Actions;

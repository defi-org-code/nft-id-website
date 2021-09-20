/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import CodeFrame from "../../../components/CodeFrame";
import api from "../../../services/api";
import { ICertificate } from "../../../types";
import { delay } from "../../../utils";
const Fade = require("react-reveal/Fade");

interface IProps {
  certificate: ICertificate;
  verifyAgain: () => void;
}

function Actions({ certificate, verifyAgain }: IProps) {
  const [fetchingAsset, setFetchingAsset] = useState(false);
  const [fetchingAssetDone, setFetchingAssetDone] = useState(false);
  const [fetchingOwner, setFetchingOwner] = useState(false);
  const [fetchingOwnerDone, setFetchingOwnerDone] = useState(false);

  const [fetcingSignature, setFetcingSignature] = useState(false);
  const [fetcingSignatureDone, setFetcingSignatureDone] = useState(false);

  const [verifyingSignature, setVerifyingSignature] = useState(false);
  const [verifyingSignatureDone, setVerifyingSignatureDone] = useState(false);

  const [fetchingTweet, setFetchingTweet] = useState(false);
  const [isTweetVerified, setIsTweetVerified] = useState(false);
  const [fetchingTweetDone, setFetchingTweetDone] = useState(false);
  const stateMachine = async () => {
    await delay(1000);
    setFetchingAsset(true);
    await delay(1000);
    setFetchingAssetDone(true);
    setFetchingOwner(true);
    await delay(1000);
    setFetchingOwnerDone(true);
    setFetcingSignature(true);
    await delay(1000);
    setFetcingSignatureDone(true);
    setVerifyingSignature(true);
    setVerifyingSignatureDone(true);
    await delay(1000);
    setFetchingTweet(true);
    setFetchingTweetDone(true);
  };

  const verifyTweet = async () => {
    const tweet = await api.get(`isTweetExist/${certificate.tweet_id}`);
    if (tweet && tweet.result) {
      setIsTweetVerified(true);
    }
  };

  useEffect(() => {
    verifyTweet().then(() => {
      stateMachine();
    });
  }, []);

  const openSeaUrlParams = encodeURI(
    `${certificate.nft_contract_address}/${certificate.nft_id}`
  );

  const twitterUrlParams = `${certificate.twitter_handle}/status/${certificate.tweet_id}`;

  const addressParam = encodeURI(certificate.owner_public_key);
  return certificate ? (
    <div className="asset-proof">
      <h3 className="asset-proof-title">On-Chain Proof</h3>
      <div className="asset-proof-flex">
        <div className="asset-proof-actions">
          <CodeFrame />
          {fetchingAsset && (
            <Fade>
              <section className="asset-proof-fetching-asset">
                <p> Fetching asset...</p>
                {fetchingAssetDone && (
                  <p className="asset-yellow">
                    <span>{`Asset `}</span>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={`https://opensea.io/assets/${openSeaUrlParams}`}
                    >
                      https://opensea.io/assets/
                      {certificate.nft_contract_address}/{certificate.nft_id}
                    </a>
                  </p>
                )}
              </section>
            </Fade>
          )}
          {fetchingOwner && (
            <Fade>
              <section className="asset-proof-fetching-owner">
                <p>Fetching Owner...</p>
                {fetchingOwnerDone && (
                  <p className="asset-yellow">
                    <span> {`Owner `}</span>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={`https://etherscan.io/address/${addressParam}`}
                    >
                      https://etherscan.io/address/
                      {certificate.owner_public_key}
                    </a>
                    <br />
                    <span>
                      Tweet handle proof:
                      {` {TwitterHandle: ${certificate.twitter_handle}}`}
                    </span>
                  </p>
                )}
              </section>
            </Fade>
          )}
          {fetcingSignature && (
            <Fade>
              <section className="asset-proof-fetching-signature">
                <p>fetching siganture...</p>
                {fetcingSignatureDone && (
                  <p className=" asset-yellow">
                    <span> Signature: </span>
                    {certificate.signature}
                  </p>
                )}
              </section>
            </Fade>
          )}
          {verifyingSignature && (
            <Fade>
              <section
                className="asset-proof-fetching-verifying"
                onClick={verifyAgain}
              >
                <p>Verifiying siganture...</p>
                {verifyingSignatureDone && (
                  <p className="asset-yellow">☑ Verified</p>
                )}
              </section>
            </Fade>
          )}
          {fetchingTweet && (
            <Fade>
              <section className="asset-proof-fetching-tweet">
                <p>Fetching tweet...</p>
                {fetchingTweetDone && isTweetVerified ? (
                  <p className="asset-yellow">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={`https://twitter.com/${twitterUrlParams}`}
                    >
                      https://twitter.com/{certificate.twitter_handle}/status/
                      {certificate.tweet_id}
                    </a>
                  </p>
                ) : (
                  <p>
                    <strong>(!) Tweet was deleted</strong>
                  </p>
                )}
              </section>
            </Fade>
          )}
        </div>
      </div>
    </div>
  ) : null;
}

export default Actions;

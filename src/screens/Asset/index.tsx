/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import api from "../../services/api";
import Actions from "./Actions";
import Cretificate from "../../components/Certificate";
import Button from "../../components/Button/index";
import { OPEN_SEA_ASSETS_URL, routes } from "../../consts";
import images from "../../consts/images";
import { ICertificate } from "../../types";
import VerifyAgain from "./VerifyAgain";
import { isSameAccount } from "../../utils";
import ErrorHandler from "../../components/ErrorHandler";
import analytics from "../../services/analytics";
import { EVENTS } from "../../services/analytics/consts";
import { mobileWithoutMetamask } from "../../utils/web3";

interface IParams {
  tokenId?: string;
  contractAddress?: string;
  twitterHandle?: string;
}

const normalizeTwitterHandle = (twitterHandle: string) => {
  if (twitterHandle.indexOf("?") > -1) {
    return twitterHandle.split("?")[0];
  }
  return twitterHandle;
};
function Asset() {
  const history = useHistory();

  const { tokenId, contractAddress, twitterHandle }: IParams = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [verifyAgain, setVerifyAgain] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [certificate, setCertificate] = useState<ICertificate | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    analytics.sendEvent(EVENTS.certificatePageLoaded);
    getUser();
  }, []);

  const getUser = () => {
    let url = "";
    if (twitterHandle) {
      url = `fetchVerifiedRequest?twitterHandle=${normalizeTwitterHandle(
        twitterHandle
      )}`;
    } else if (contractAddress && tokenId) {
      const params = `${window.location.origin}/${contractAddress}/${tokenId}`;
      url = `fetchVerifiedRequest?url=${params}`;
    }
    fetchCertificate(url);
  };

  const fetchCertificate = async (url: string) => {
    try {
      const res = await api.get(url);
      if (res && res.owner_public_key) {
        res.twitter_user_info = JSON.parse(res.twitter_user_info);
        const data = res;
        getAssetOwner(
          res.nft_contract_address,
          res.nft_id,
          res.owner_public_key
        );
        setCertificate(data);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      analytics.sendEvent(EVENTS.certificateFetchFailed);
      setIsLoading(false);
      setError(true);
    }
  };

  const getAssetOwner = async (
    contractAddress: string,
    nftId: string,
    account: string
  ) => {
    try {
      const url = `extractDataFromNFTContract?openseaUrl=${encodeURIComponent(
        `${OPEN_SEA_ASSETS_URL}/${contractAddress}/${nftId}`
      )}`;

      const res = await api.get(url);
      setIsVerified(isSameAccount(res.owner, account));
    } catch (error) {
      setError(true);
      analytics.sendEvent(EVENTS.assetOwnerFetchFailed);
    } finally {
      setIsLoading(false);
    }
  };

  const retry = () => {
    setError(false);
    setIsLoading(true);
    getUser();
  };
  const emptyCertificate = !isLoading && !certificate;
  const showVerifyModal = certificate && verifyAgain;

  return (
    <div className="asset">
      <ErrorHandler
        content={<h5>Something went wrong...</h5>}
        buttonText="Try again"
        isError={error}
        retry={retry}
      >
        {showVerifyModal && (
          <VerifyAgain
            close={() => setVerifyAgain(false)}
            signer={certificate.owner_public_key}
            json={certificate.json}
            signature={certificate.signature}
            account={certificate.owner_public_key}
          />
        )}
        <div
          className="asset-flex"
          style={{ opacity: verifyAgain ? "0" : "1" }}
        >
          <section className="asset-overlay"></section>

          {emptyCertificate ? (
            <img
              src={images.emptyCertificate}
              alt="empty certificate"
              id="empty-certificate"
            />
          ) : (
            <Cretificate
              isLoading={isLoading}
              certificate={certificate}
              isVerified={isVerified}
            />
          )}

          {isVerified && certificate && (
            <Actions
              verifyAgain={() =>
                !mobileWithoutMetamask() ? setVerifyAgain(true) : () => {}
              }
              certificate={certificate}
            />
          )}

          <span
            className="verify-btn"
            style={{ marginTop: !isLoading && !certificate ? "20px" : "" }}
          >
            <Button
              onClick={analytics.sendEventAndRunFunc.bind(
                null,
                EVENTS.verifyAssetFromCertificatePageButtonClick,
                null,
                history.push.bind(null, routes.verify)
              )}
              disabled={isLoading}
              active={!isLoading}
              content={
                <div className="button-with-img">
                  <img src={images.MetamaskImg} alt="metamask" />
                  <p>Verify your own asset</p>
                </div>
              }
            />
          </span>
        </div>
      </ErrorHandler>
    </div>
  );
}

export default Asset;

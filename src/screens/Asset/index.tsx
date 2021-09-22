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
interface IParams {
  tokenId?: string;
  contractAddress?: string;
  twitterHandle?: string;
}

function Asset() {
  const history = useHistory();
  const { tokenId, contractAddress, twitterHandle }: IParams = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [verifyAgain, setVerifyAgain] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [certificate, setCertificate] = useState<ICertificate | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    let url = "";
    if (twitterHandle) {
      url = `fetchVerifiedRequest?twitterHandle=${twitterHandle}`;
    } else if (contractAddress && tokenId) {
      url = `fetchVerifiedRequest?url=${window.location.href}`;
    }
    fetchUserDetails(url);
  };
  const fetchUserDetails = async (url: string) => {
    try {
      const res = await api.get(url);
      res.twitter_user_info = JSON.parse(res.twitter_user_info);
      const data = res;
      getAssetOwner(res.nft_contract_address, res.nft_id, res.owner_public_key);
      setCertificate(data);
    } catch (error) {
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
    } finally {
      setIsLoading(false);
    }
  };

  const retry = () => {
    setError(false);
    getUser();
  };

  return (
    <div className="asset">
      <ErrorHandler
        content={<h5>Something went wrong...</h5>}
        buttonText="Try again"
        isError={error}
        retry={retry}
      >
        {certificate && verifyAgain && (
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
          <Cretificate
            isLoading={isLoading}
            certificate={certificate}
            isVerified={isVerified}
          />
          {isVerified && (
            <Actions
              verifyAgain={() => setVerifyAgain(true)}
              certificate={certificate}
            />
          )}

          <span className="verify-btn">
            <Button
              onClick={() => history.push(routes.verify)}
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

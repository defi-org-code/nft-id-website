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
  const [certificate, setCertificate] = useState<ICertificate | null>(null);
  useEffect(() => {
    handleOnLoad();
  }, []);

  const handleOnLoad = () => {
    let url = "";
    if (twitterHandle) {
      url = `fetchVerifiedRequest?twitterHandle=${twitterHandle}`;
    } else if (contractAddress && tokenId) {
      url = `fetchVerifiedRequest?url=${window.location.href}`;
    }
    getUserDetails(url);
  };

  const getUserDetails = async (url: string) => {
    try {
      const res = await api.get(url);
      console.log({ res });
      handleResult(res);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const getAssetOwner = async (contractAddress: string, nftID: string) => {
    try {
      const url = `extractDataFromNFTContract?openseaUrl=${encodeURIComponent(
        `${OPEN_SEA_ASSETS_URL}/${contractAddress}/${nftID}`
      )}`;
      const res = await api.get(url);
      console.log({ res });
    } catch (error) {
      console.log({ error });
    }
  };

  const handleResult = (res: ICertificate) => {
    if (res.json) {
      res.twitter_user_info = JSON.parse(res.twitter_user_info);
      const data = res;
      getAssetOwner(res.nft_contract_address, res.nft_id);
      console.log({ data });
      setCertificate(data);
    }
  };
  return (
    <div className="asset">
      {certificate && verifyAgain && (
        <VerifyAgain
          close={() => setVerifyAgain(false)}
          signer={certificate.owner_public_key}
          twitterHandle={certificate.twitter_handle}
          signature={certificate.signature}
        />
      )}
      <div className="asset-flex" style={{ opacity: verifyAgain ? "0" : "1" }}>
        <section className="asset-overlay"></section>
        <Cretificate isLoading={isLoading} certificate={certificate} />
        <div className="asset-grid">
          <Actions
            verifyAgain={() => setVerifyAgain(true)}
            certificate={certificate}
          />
        </div>

        <Button
          onClick={() => history.push(routes.verify)}
          active={true}
          content={
            <div className="button-with-img">
              <img src={images.MetamaskImg} alt="metamask" />
              <p>Verify your own asset</p>
            </div>
          }
        />
      </div>
    </div>
  );
}

export default Asset;

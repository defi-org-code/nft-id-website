/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import api from "../../services/api";
import Actions from "./Actions";
import Cretificate from "../../components/Certificate";
import Button from "../../components/Button/index";
import { routes } from "../../consts";
import images from "../../consts/images";
import Loader from "../../components/Loader/index";
import { ICertificate } from "../../types";
interface IParams {
  tokenId?: string;
  contractAddress?: string;
  twitterHandle?: string;
}

function Asset() {
  const history = useHistory();
  const { tokenId, contractAddress, twitterHandle }: IParams = useParams();
  const [fetchingAsset, setFetchingAsset] = useState(false);
  const [fetchingAssetDone, setFetchingAssetDone] = useState(false);
  const [fetchingOwner, setFetchingOwner] = useState(false);
  const [fetchingOwnerDone, setFetchingOwnerDone] = useState(false);

  const [fetcingSignature, setFetcingSignature] = useState(false);
  const [fetcingSignatureDone, setFetcingSignatureDone] = useState(false);

  const [verifyingSignature, setVerifyingSignature] = useState(false);
  const [verifyingSignatureDone, setVerifyingSignatureDone] = useState(false);

  const [fetchingTweet, setFetchingTweet] = useState(false);
  const [fetchingTweetDone, setFetchingTweetDone] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [certificate, setCertificate] = useState<ICertificate | null>(null);
  useEffect(() => {
    handleOnLoad();
    stateMachine();
  }, []);

  const stateMachine = () => {
    setFetchingAsset(true);
    setInterval(() => {
      setFetchingAssetDone(true);
      setFetchingOwner(true);
    }, 1000);
    setInterval(() => {
      setFetchingOwnerDone(true);
      setFetcingSignature(true);
    }, 2000);

    setInterval(() => {
      setFetcingSignatureDone(true);
      setVerifyingSignature(true);
    }, 3000);

    setInterval(() => {
      setVerifyingSignatureDone(true);
    }, 4000);
    setInterval(() => {
      setFetchingTweet(true);
      setFetchingTweetDone(true);
    }, 5000);
  };

  const handleOnLoad = () => {
    let url = "";
    if (twitterHandle) {
      url = `fetchVerifiedRequest?twitterHandle=${twitterHandle}`;
    } else if (contractAddress && tokenId) {
      url = `fetchVerifiedRequest?url=${window.location.href}`;
    }
    getOwnershipDetails(url);
  };

  const getOwnershipDetails = async (url: string) => {
    try {
      const res = await api.get(url);
      handleResult(res);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleResult = (res: ICertificate) => {
    if (res.json) {
      res.twitter_user_info = JSON.parse(res.twitter_user_info);
      const data = res;
      setCertificate(data);
    }
  };
  return (
    <div className="asset">
      <section className="asset-overlay"></section>
      <div className="asset-flex">
        {isLoading ? (
          <Loader />
        ) : certificate ? (
          <>
            <Cretificate data={certificate} />
            <Actions
              twitterHanlde={certificate.twitter_handle}
              fetchingAsset={fetchingAsset}
              fetchingOwner={fetchingOwner}
              fetcingSignature={fetcingSignature}
              verifyingSignature={verifyingSignature}
              fetchingTweet={fetchingTweet}
              fetchingAssetDone={fetchingAssetDone}
              fetchingOwnerDone={fetchingOwnerDone}
              fetcingSignatureDone={fetcingSignatureDone}
              verifyingSignatureDone={verifyingSignatureDone}
              fetchingTweetDone={fetchingTweetDone}
            />
          </>
        ) : (
          <img
            src={images.emptyCertificate}
            alt="empty certificate"
            className="asset-empty-certificate"
          />
        )}

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

import { useEffect, useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";

import api from "../../services/api";
import Actions from "./Actions";
import Cretificate from "../../components/Certificate";
import Button from "../../components/Button/index";
import { routes } from "../../consts";
import images from "../../consts/images";
import Loader from "../../components/Loader/index";
interface IParams {
  tokenId?: string;
  contractAddress?: string;
  twitterHandle?: string;
}

function Asset() {
  const history = useHistory();
  const { tokenId, contractAddress, twitterHandle }: IParams = useParams();
  const [error, setError] = useState<boolean>(false);
  const [fetchingAsset, setFetchingAsset] = useState(false);
  const [fetchingOwner, setFetchingOwner] = useState(false);
  const [fetcingSignature, setFetcingSignature] = useState(false);
  const [verifyingSignature, setVerifyingSignature] = useState(false);
  const [fetchingTweet, setFetchingTweet] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [certificate, setCertificate] = useState(null);
  const location = useLocation();
  useEffect(() => {
    handleOnLoad();
  }, []);

  const stateMachine = () => {
    setInterval(() => {
      setFetchingAsset(true);
    }, 1000);
    setInterval(() => {
      setFetchingOwner(true);
    }, 2000);
    setInterval(() => {
      setFetcingSignature(true);
    }, 3000);

    setInterval(() => {
      setVerifyingSignature(true);
    }, 4000);
    setInterval(() => {
      setFetchingTweet(true);
    }, 5000);
  };

  const handleOnLoad = () => {
    let url = "";
    if (twitterHandle) {
      url = `fetchVerifiedRequest?twitterHandle=${twitterHandle}`;
    } else if (contractAddress && tokenId) {
      url = `fetchVerifiedRequest?url=${location.pathname}`;
    }
    getOwnershipDetails(url);
  };

  const getOwnershipDetails = async (url: string) => {
    try {
      setError(false);
      const res = await api.get(url);
      console.log({ res });
    } catch (error) {
      setError(true);
    } finally {
      // setIsLoading(false);
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
            <Cretificate />
            <Actions
              fetchingAsset={fetchingAsset}
              fetchingOwner={fetchingOwner}
              fetcingSignature={fetcingSignature}
              verifyingSignature={verifyingSignature}
              fetchingTweet={fetchingTweet}
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

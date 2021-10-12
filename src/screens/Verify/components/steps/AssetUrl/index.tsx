import { useEffect, useState } from "react";
import Button from "../../../../../components/Button";
import Success from "../../Success";
import { useStepsStore } from "../../../../../context/StepsContext";
import api from "../../../../../services/api";
import { isValidHttpUrl } from "../../../../../utils/input";
import AssetAvatar from "../../AssetAvatar";
import Error from "../../Error";
import Input from "../../../../../components/Input";
import { EVENTS } from "../../../../../services/analytics/consts";
import { OPEN_SEA_ASSETS_URL } from "../../../../../consts";
import analytics from "../../../../../services/analytics";
const Bounce = require("react-reveal/Bounce");

const normalizeURL = (url: string): string => {
  if (url[url.length - 1] === "/") {
    return url.slice(0, -1);
  }
  return url;
};

function AssetUrl() {
  const {
    setOpenSeaUrl,
    setAsset,
    setAllowNextStep,
    owner,
    openSeaUrl,
    asset,
  } = useStepsStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [urlError, setUrlError] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const fetchNftAsset = async () => {
    if (!openSeaUrl) {
      return;
    }
    const url = normalizeURL(openSeaUrl);
    setError(false);
    setLoading(true);
    const assetUrl = `extractAssetFromNFTContract?openseaUrl=${url}`;
    try {
      const res = await api.get(assetUrl);
      setAsset(res);
    } catch (error) {
      analytics.sendEvent(EVENTS.fetchNftFailed);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (value: string) => {
    const isValidUrl = !isValidHttpUrl(value);
    setUrlError(isValidUrl);
    setOpenSeaUrl(value);
  };

  useEffect(() => {
    setAllowNextStep(!!asset);
  }, [asset, setAllowNextStep, urlError]);

  const isDisabled = !openSeaUrl || urlError;
  return (
    <Bounce right>
      <div className="step fetch-asset">
        <AssetAvatar />
        <div className="step-content">
          <Input
            onChange={onChange}
            disabled={!!owner}
            value={openSeaUrl}
            placeholder={`${OPEN_SEA_ASSETS_URL}/0xbd3531da5cf5857e7cfaa92426877b022e612cf8/5222`}
          />
          <Button
            onClick={analytics.sendEventAndRunFunc.bind(
              null,
              EVENTS.fecthNftButtonClick,
              { openSeaUrl },
              fetchNftAsset
            )}
            content={<>Fetch NFT</>}
            isLoading={loading}
            active={!isDisabled && !asset}
            disabled={isDisabled || !!asset}
          />
          {asset && <Success text="Successfully Fetched!" />}
          {error && <Error text="Invalid Asset Url" />}
        </div>
      </div>
    </Bounce>
  );
}

export default AssetUrl;

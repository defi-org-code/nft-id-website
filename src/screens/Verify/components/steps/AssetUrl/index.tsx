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

function AssetUrl() {
  const {
    setOpenSeaUrl,
    setAsset,
    setOwner,
    setAllowNextStep,
    owner,
    openSeaUrl,
    asset,
  } = useStepsStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [urlError, setUrlError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const fetchNftAsset = async () => {
    if (!openSeaUrl) {
      return;
    }
    setError(false);
    setLoading(true);
    const assetUrl = `extractDataFromNFTContract?openseaUrl=${openSeaUrl}`;
    try {
      const res = await api.get(assetUrl);
      setAsset(res.asset);
      setOwner(res.owner);
      setSuccess(true);
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
    setAllowNextStep(!!owner);
  }, [owner, setAllowNextStep, urlError]);

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
              fetchNftAsset
            )}
            content={<>Fetch NFT</>}
            isLoading={loading}
            active={!isDisabled && !asset}
            disabled={isDisabled || !!asset}
          />
          {success && <Success text="Successfully Fetched!" />}
          {error && <Error text="Invalid Asset Url" />}
        </div>
      </div>
    </Bounce>
  );
}

export default AssetUrl;

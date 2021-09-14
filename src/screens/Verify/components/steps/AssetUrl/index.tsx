import { useCallback, useEffect, useState } from "react";
import Button from "../../../../../components/Button";
import Success from "../../Success";
import { useSteps } from "../../../../../context/StepsContext";
import api from "../../../../../services/api";
import { isValidHttpUrl } from "../../../../../utils/input";
import AssetAvatar from "../../AssetAvatar";
import Error from "../../Error";
const Bounce = require("react-reveal/Bounce");

function AssetUrl() {
  const {
    setOpenSeaUrl,
    setAsset,
    setOwner,
    setAllowNextStep,
    owner,
    openSeaUrl,
  } = useSteps();
  const [loading, setLoading] = useState<boolean>(false);
  const [urlError, setUrlError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const fetchNftAsset = useCallback(async () => {
    if (!openSeaUrl) {
      return;
    }
    setError(false);
    setLoading(true);
    const assetUrl = `extractDataFromNFTContract?openseaUrl=${openSeaUrl}`;
    try {
      const res = await api.get(assetUrl);
      let image = res.asset;
      setAsset(image);
      setOwner(res.owner);
      setSuccess(true);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [openSeaUrl, setAsset, setOwner]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
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
          <input
            onChange={onChange}
            disabled={!!owner}
            value={openSeaUrl}
            placeholder="https://opensea.io/assets/0xbd3531da5cf5857e7cfaa92426877b022e612cf8/5222"
          />
          <Button
            onClick={fetchNftAsset}
            content={<>Fetch NFT</>}
            isLoading={loading}
            active={!isDisabled}
            disabled={isDisabled}
          />
          {success && <Success text="Successfully Fetched!" />}
          {error && <Error text="Invalid Asset Url" />}
        </div>
      </div>
    </Bounce>
  );
}

export default AssetUrl;

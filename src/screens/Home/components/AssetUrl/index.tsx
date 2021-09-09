import { useCallback, useEffect, useState } from "react";
import Button from "../../../../components/Button";
import Success from "../../../../components/Success";
import { useSteps } from "../../../../context/StepsContext";
import api from "../../../../services/api";
import { isValidHttpUrl } from "../../../../utils/input";
import AssetAvatar from "../AssetAvatar";

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

  const fetchNftAsset = useCallback(async (url: string) => {
    const assetUrl = `extractDataFromNFTContract?openseaUrl=${url}`;
    const res = await api.get(assetUrl);
    if (!res) {
      return setError(true);
    }
    let image = res.asset;
    setAsset(image);
    setOwner(res.owner);
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isValidUrl = !isValidHttpUrl(value);
    setUrlError(isValidUrl);
    setOpenSeaUrl(value);
  };

  useEffect(() => {
    setAllowNextStep(owner && !urlError ? true : false);
  }, [owner, setAllowNextStep, urlError]);

  const onClick = async () => {
    if (!openSeaUrl) {
      return;
    }
    setLoading(true);
    await fetchNftAsset(openSeaUrl);
    setLoading(false);
    setSuccess(true);
  };
  const isDisabled = !openSeaUrl || urlError;
  return (
    <div className="step-flex fetch-asset">
      <AssetAvatar />
      <div className="step-content">
        <input onChange={onChange} value={openSeaUrl} placeholder="URL" />
        <Button
          onClick={onClick}
          content={<>Fetch NFT</>}
          isLoading={loading}
          active={!isDisabled}
          disabled={isDisabled}
        />
        {success && <Success text="Successfully Fetched!" />}
      </div>
    </div>
  );
}

export default AssetUrl;

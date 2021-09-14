import Image from "../../../../components/Image";
import images from "../../../../consts/images";
import { useSteps } from "../../../../context/StepsContext";

function VerifiedAsset() {
  const { asset } = useSteps();

  return (
    <div className="verified-asset">
      <figure className="verified-asset-figure  verified-asset-figure-big" />
      <figure className="verified-asset-figure  verified-asset-figure-medium" />
      <figure className="verified-asset-figure  verified-asset-figure-small" />
      <img
        src={images.VarifiedLogo}
        alt="verified"
        className="verified-asset-logo"
      />
      <Image src={asset} alt="nft asset" id="asset-img" />
    </div>
  );
}

export default VerifiedAsset;

import Animation from "../../../../components/Animation";
import Image from "../../../../components/Image";
import animations from "../../../../consts/animations";
import images from "../../../../consts/images";
import { useSteps } from "../../../../context/StepsContext";

function VerifiedAsset() {
  const { asset } = useSteps();

  return (
    <div className="verified-asset">
      <figure className="verified-asset-frame" />
      <Animation data={animations.stamp} loop={false} />
      <Image src={asset} alt="nft asset" id="asset-img" />
    </div>
  );
}

export default VerifiedAsset;

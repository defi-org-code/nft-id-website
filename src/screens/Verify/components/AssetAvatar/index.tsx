import Image from "../../../../components/Image";
import images from "../../../../consts/images";
import { useStepsStore } from "../../../../context/StepsContext";

const AssetAvatar = () => {
  const { asset } = useStepsStore();
  return (
    <div className="step-asset">
      {asset ? (
        <Image src={asset} alt="nft asset" id="asset-img" />
      ) : (
        <div className="step-asset-placeholder">
          <Image
            src={images.AssetPlaceholder}
            alt="nft asset placeholder"
            id="placeholder-img"
          />
        </div>
      )}
    </div>
  );
};

export default AssetAvatar;

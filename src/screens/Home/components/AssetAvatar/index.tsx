import Image from "../../../../components/Image";
import images from "../../../../consts/images";
import { useSteps } from "../../../../context/StepsContext";
import TestImg from "../../../../assets/images/test.png";
interface IProps {
  varified?: boolean;
}

const AssetAvatar = ({ varified }: IProps) => {
  const { asset } = useSteps();
  return varified ? (
    <div className="varified-asset">
      <figure className="varified-asset-figure  varified-asset-figure-big" />
      <figure className="varified-asset-figure  varified-asset-figure-medium" />
      <figure className="varified-asset-figure  varified-asset-figure-small" />
      <img
        src={images.VarifiedLogo}
        alt="varified"
        className="varified-asset-logo"
      />
      <Image src={asset} alt="nft asset" id="asset-img" />
    </div>
  ) : (
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

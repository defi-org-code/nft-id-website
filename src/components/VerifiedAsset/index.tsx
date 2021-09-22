import Animation from "../Animation";
import Image from "../Image";
import animations from "../../consts/animations";

interface IProps {
  asset: string;
  hideStamp?: boolean;
}

function VerifiedAsset({ asset, hideStamp }: IProps) {
  return (
    <div className="verified-asset">
      <figure className="verified-asset-frame" />
      {!hideStamp && <Animation data={animations.stamp} loop={false} />}
      <Image src={asset} alt="nft asset" id="asset-img" />
    </div>
  );
}

export default VerifiedAsset;

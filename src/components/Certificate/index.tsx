import Image from "../Image";
import TwitterAccount from "../TwitterAccount";
import images from "../../consts/images";
import Animation from "../Animation";
import animations from "../../consts/animations";
import { ICertificate } from "../../types";
import moment from "moment";
interface IProps {
  data: ICertificate;
}

function Cretificate({ data }: IProps) {
  console.log({ data });
  const { twitter_user_info, twitter_handle, nft_image, verified_time } = data;
  return (
    <div className="certificate">
      <div className="certificate-avatar">
        <Image src={nft_image} alt="" />
        <Animation data={animations.stamp} loop={false} />

        <figure className="certificate-avatar-frame"></figure>
        <figure className="certificate-avatar-shadow"></figure>
      </div>
      <div className="certificate-details">
        <TwitterAccount
          name={twitter_user_info.name}
          twitterHandle={twitter_handle}
          showLine
        />
        <h2 className="certificate-details-title">
          Certificate
          <br />
          of Ownership
        </h2>
        <div className="certificate-details-bottom">
          <section>
            <h5>This NFT was verified on:</h5>
            <h4>
              {`${moment(verified_time).format("Do")} ${moment(
                verified_time
              ).format("MMMM")}, ${moment(verified_time).format("YYYY")}`}
            </h4>
          </section>
          <section>
            <h5>Verified by:</h5>
            <span>
              <img src={images.logo} alt="logo" />
              <img src={images.VarifiedImg} alt="verified" />
            </span>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Cretificate;

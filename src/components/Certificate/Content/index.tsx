import React from "react";
import { ICertificate } from "../../../types";
import TwitterAccount from "../../TwitterAccount";
import VerifiedAsset from "../../VerifiedAsset";
import moment from "moment";
import images from "../../../consts/images";

interface IProps {
  certificate: ICertificate;
}

function Content({ certificate }: IProps) {
  const {
    twitter_handle,
    nft_image,
    verified_time,
    twitter_user_info,
  } = certificate;
  return (
    <div className="certificate-flex">
      <img src={nft_image} alt="asset" className="certificate-bg" />
      <VerifiedAsset asset={nft_image} />
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

export default Content;
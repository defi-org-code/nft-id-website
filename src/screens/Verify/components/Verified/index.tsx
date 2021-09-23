import Certificate from "../../../../components/Certificate/index";
import Image from "../../../../components/Image";
import images from "../../../../consts/images";
import { useStepsStore } from "../../../../context/StepsContext";
import { makeElipsisAddress } from "../../../../utils/string";
import Url from "./Url";
const Bounce = require("react-reveal/Bounce");
const Fade = require("react-reveal/Fade");

function Verified() {
  const { certificate } = useStepsStore();
  return certificate ? (
    <Bounce right>
      <div className="verified">
        <div className="verified-left">
          <Fade>
            <Certificate certificate={certificate} isVerified={true} />
          </Fade>
          <div className="verified-proof">
            <Fade bottom>
              <h4>Proof Successful</h4>

              <h5>
                You have successfully claimed the following URLs as proof,
              </h5>

              <h5>put one of them in your Twitter Bio:</h5>
            </Fade>
            <div className="verified-proof-urls">
              <Url
                urlParams={certificate.twitter_handle}
                value={certificate.twitter_handle}
              />
              <Url
                urlParams={`${certificate.nft_contract_address}/${certificate.nft_id}`}
                value={`${makeElipsisAddress(
                  certificate.nft_contract_address,
                  10
                )}/${certificate.nft_id}`}
              />
            </div>
          </div>
        </div>
        <Fade>
          <div className="verified-right">
            <img
              src={images.arrow}
              alt="arrow"
              className="verified-right-arrow"
            />
            <div className="verified-twitter">
              <div
                className="verified-twitter-bg"
                style={{
                  background:
                    certificate.twitter_user_info.profile_background_color,
                }}
              >
                <img
                  className="verified-twitter-bg-status-bar"
                  src={images.phoneStatusBar}
                  alt="status-bar"
                />
                {certificate.twitter_user_info.profile_banner_url && (
                  <Image
                    src={certificate.twitter_user_info.profile_banner_url}
                    alt="background"
                  />
                )}
              </div>

              <Image
                id="verified-twitter-asset"
                src={certificate.nft_image}
                alt="profile"
              />

              <Fade bottom>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`https://twitter.com/${certificate.twitter_handle}`}
                  className="verified-twitter-follow"
                >
                  Follow
                </a>
              </Fade>

              <section className="verified-twitter-info">
                <Fade bottom delay={200}>
                  <>
                    <h3>{certificate.twitter_user_info.name}</h3>
                    <p>@{certificate.twitter_handle}</p>
                  </>
                </Fade>

                <Fade bottom delay={400}>
                  <>
                    <h5>Yes it’s my NFT :</h5>
                    <a
                      target="_blank"
                      href={`https://mynft.fyi/${certificate.twitter_handle}`}
                      rel="noreferrer"
                    >
                      {`https://mynft.fyi/${certificate.twitter_handle}`}
                    </a>
                  </>
                </Fade>
              </section>
            </div>
            <img
              src={images.phoneFrame}
              alt="phone"
              className="verified-right-frame"
            />
            <section className="verified-right-bottom">
              <figure></figure>
            </section>
          </div>
        </Fade>
      </div>
    </Bounce>
  ) : null;
}

export default Verified;

import Certificate from "../../../../components/Certificate/index";
import Image from "../../../../components/Image";
import images from "../../../../consts/images";
import Url from "./Url";
const Bounce = require("react-reveal/Bounce");
const Fade = require("react-reveal/Fade");

function Verified() {
  return (
    <Bounce right>
      <div className="verified">
        <div className="verified-left">
          <Fade>
            <Certificate />
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
              <Url value="StephenCurry30" />
              <Url value="0x321465465df5d4543456a2345ad4s/3235" />
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
              <div className="verified-twitter-bg">
                <img
                  className="verified-twitter-bg-status-bar"
                  src={images.phoneStatusBar}
                  alt="status-bar"
                />
                <Image src={images.twitterBg} alt="background" />
              </div>

              <Image
                id="verified-twitter-asset"
                src={images.monkey}
                alt="profile"
              />

              <Fade bottom>
                <button className="verified-twitter-follow">Follow</button>
              </Fade>

              <section className="verified-twitter-info">
                <Fade bottom delay={200}>
                  <>
                    <h3>Stephen Curry</h3>
                    <p>@StephenCurry30</p>
                  </>
                </Fade>

                <Fade bottom delay={400}>
                  <>
                    <h5>Yes it’s my NFT :</h5>
                    <a
                      target="_blank"
                      href="https://mynft.fyi/StephenCurry30"
                      rel="noreferrer"
                    >
                      https://mynft.fyi/StephenCurry30
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
  );
}

export default Verified;

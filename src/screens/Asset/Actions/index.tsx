import images from "../../../consts/images";
const Fade = require("react-reveal/Fade");

interface IProps {
  fetchingAsset: boolean;
  fetchingOwner: boolean;
  fetcingSignature: boolean;
  verifyingSignature: boolean;
  fetchingTweet: boolean;
  fetchingAssetDone: boolean;
  fetchingOwnerDone: boolean;
  fetcingSignatureDone: boolean;
  verifyingSignatureDone: boolean;
  fetchingTweetDone: boolean;
  twitterHanlde: string;
}

function Actions({
  fetchingAsset,
  fetchingOwner,
  fetcingSignature,
  verifyingSignature,
  fetchingTweet,
  fetchingAssetDone,
  fetchingOwnerDone,
  fetcingSignatureDone,
  verifyingSignatureDone,
  fetchingTweetDone,
  twitterHanlde,
}: IProps) {
  return (
    <div className="asset-proof">
      <h3 className="asset-proof-title">On-Chain Proof</h3>
      <div className="asset-proof-flex">
        <img
          className="asset-proof-frame"
          src={images.codeframe}
          alt="code frame"
        />
        <div className="asset-proof-actions">
          {fetchingAsset && (
            <Fade>
              <section className="asset-proof-fetching-asset">
                <p>Fetching asset...</p>
                {fetchingAssetDone && (
                  <p>
                    Asset
                    <span>
                      https://opensea.io/assets/0x05a46f1e545526fb803ff974c790acea34d1f2d6/5021
                    </span>
                  </p>
                )}
              </section>
            </Fade>
          )}
          {fetchingOwner && (
            <Fade>
              <section className="asset-proof-fetching-owner">
                <p>Fetching Owner...</p>
                {fetchingOwnerDone && (
                  <p>
                    Owner
                    <span>
                      https://etherscan.io/address/0xc81bd599a66da6dcc3a64399f8025c19ffc42888
                    </span>
                    <br />
                    Tweet handle proof: {`TwitterHandle: ${twitterHanlde}`}
                  </p>
                )}
              </section>
            </Fade>
          )}
          {fetcingSignature && (
            <Fade>
              <section className="asset-proof-fetching-signature">
                <p>fetching siganture...</p>
                {fetcingSignatureDone && (
                  <p>
                    Signature:
                    <span>
                      0x0839a5a7b34497bf72a92d215e3d243fba638c0012f20c44b6d41c28a4c8f81...
                    </span>
                  </p>
                )}
              </section>
            </Fade>
          )}
          {verifyingSignature && (
            <Fade>
              <section className="asset-proof-fetching-verifying">
                <p>
                  Verifiying siganture...
                  {verifyingSignatureDone && (
                    <>
                      <br />
                      <span>☑ Verified</span>
                    </>
                  )}
                </p>
              </section>
            </Fade>
          )}
          {fetchingTweet && (
            <Fade>
              <section className="asset-proof-fetching-tweet">
                <p>Fetching tweet...</p>
              </section>
            </Fade>
          )}
        </div>
      </div>
    </div>
  );
}

export default Actions;

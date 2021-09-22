import { isMobile } from "react-device-detect";
import images from "../../consts/images";

const DEEP_LINK = "https://metamask.app.link/dapp/mynft.fyi/";
function LoadFailed() {
  if (isMobile && !(window as any).ethereum) {
    return (
      <div className="load-failed">
        <a href={DEEP_LINK}>
          <div className="load-failed-content">
            <img
              src={images.loadFailedFrame}
              alt="frame"
              className="load-failed-content-frame"
            />
            <h3>Failed to Load</h3>
            <p>
              Please open it from the <strong>Metamask Browser</strong> for a
              better experience
            </p>
            <img
              className="load-failed-content-img"
              src={images.metamaskLogo}
              alt="metamask"
            />
          </div>
        </a>
      </div>
    );
  }
  return null;
}

export default LoadFailed;

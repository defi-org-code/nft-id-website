import images from "../../consts/images";
import analytics from "../../services/analytics";
import { EVENTS } from "../../services/analytics/consts";

const DEEP_LINK = "https://metamask.app.link/dapp/mynft.fyi/";
function LoadFailed() {
  if (!(window as any).ethereum) {
    return (
      <div
        className="load-failed"
        onClick={() => analytics.sendEvent(EVENTS.clickOnNoMetamaskPopup)}
      >
        <a href={DEEP_LINK} target="_blank" rel="noreferrer">
          <div className="load-failed-content">
            <img
              src={images.loadFailedFrame}
              alt="frame"
              className="load-failed-content-frame"
            />
            <h3>Failed to Load</h3>
            <p>
              Please open it from the <strong>Metamask Browser</strong> for a
              better experience or open on Desktop with metamask
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

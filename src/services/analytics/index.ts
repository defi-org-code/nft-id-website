import amplitude from "amplitude-js";
import { isMobile } from "react-device-detect";

class Analytics {
  isProd: boolean = true;
  defaultProps = { isMobile, isBrowserWithWallet: !!(window as any).ethereum };
  init() {
    this.isProd = process.env.NODE_ENV !== "development";
    if (process.env.REACT_APP_AMPLITUDE && this.isProd) {
      amplitude.getInstance().init(process.env.REACT_APP_AMPLITUDE);
      this.sendEvent("APP_LOADED");
    }
  }

  sendEvent(event: string, data?: object) {
    const props = data ? { ...this.defaultProps, ...data } : this.defaultProps;
    if (this.isProd) {
      amplitude.getInstance().logEvent(event, props);
    } else {
      console.log({ event });
    }
  }

  sendEventAndRunFunc = (event: string, data?: any, callback?: () => void) => {
    this.sendEvent(event, data);
    if (callback) {
      callback();
    }
  };
}

export default new Analytics();

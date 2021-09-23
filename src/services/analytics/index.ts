import amplitude from "amplitude-js";

class Analytics {
  isProd: boolean = true;

  init() {
    this.isProd = process.env.NODE_ENV !== "development";
    if (process.env.REACT_APP_AMPLITUDE && this.isProd) {
      amplitude.getInstance().init(process.env.REACT_APP_AMPLITUDE);
      this.sendEvent("APP_LOADED");
    }
  }

  sendEvent(event: string, data?: any) {
    if (this.isProd) {
      if (!data) {
        amplitude.getInstance().logEvent(event);
      } else {
        amplitude.getInstance().logEvent(event, data);
      }
    } else {
      console.log({ event });
    }
  }

  sendEventAndRunFunc = (event: string, callback?: () => void) => {
    this.sendEvent(event);
    if (callback) {
      callback();
    }
  };
}

export default new Analytics();

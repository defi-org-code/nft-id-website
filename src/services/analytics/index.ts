import amplitude from "amplitude-js";

class Analytics {
  isInProd: boolean = true;

  init() {
    this.isInProd = process.env.NODE_ENV !== "development";
    console.log(this.isInProd);
    if (process.env.REACT_APP_AMPLITUDE && this.isInProd) {
      amplitude.getInstance().init(process.env.REACT_APP_AMPLITUDE);
      this.sendEvent("PAGE_LOAD");
    }
  }

  sendEvent(event: string, data?: any) {
    console.log(event);
    if (this.isInProd) {
      if (!data) {
        amplitude.getInstance().logEvent(event);
      } else {
        amplitude.getInstance().logEvent(event, data);
      }
    } else {
      console.log(event, data);
    }
  }
}

export default new Analytics();

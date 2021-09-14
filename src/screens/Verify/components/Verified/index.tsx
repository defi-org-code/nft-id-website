import Certificate from "../../../../components/Certificate/index";

import Url from "./Url";
function Verified() {
  return (
    <div className="verified">
      <div className="verified-left">
        <Certificate isLoading={false} />
        <div className="verified-proof">
          <h4>Proof Successful</h4>
          <h5>You have successfully claimed the following URLs as proof,</h5>
          <h5>put one of them in your Twitter Bio:</h5>
          <div className="verified-proof-urls">
            <Url value="StephenCurry30" />
            <Url value="0x321465465df5d4543456a2345ad4s/3235" />
          </div>
        </div>
      </div>
      <div className="verified-right"> </div>
    </div>
  );
}

export default Verified;

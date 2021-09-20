import { useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import images from "../../../consts/images";
import Success from "../../Verify/components/Success";

interface IProps {
  signer: string;
  twitterHandle: string;
  signature: string;
  close: () => void;
}

function VerifyAgain({ signer, twitterHandle, signature, close }: IProps) {
  const [verified, setVerified] = useState(false);

  const verify = () => {
    setVerified(true);
  };

  return (
    <div className="verify-again">
      <section className="verify-again-overlay" onClick={close}></section>
      <h3 className="verify-again-title">Verify Signature</h3>
      <div className="verify-again-grid">
        <form className="verify-again-form">
          <div className="verify-again-form-section">
            <h5>Signer Address</h5>
            <Input
              onChange={() => {}}
              value={signer}
              placeholder="0xC81bD599a66dA6dcc3A64399f8025C19fFC42888"
            />
          </div>
          <div className="verify-again-form-section">
            <h5>Data that was signed</h5>
            <Input
              onChange={() => {}}
              value={twitterHandle}
              placeholder="{“twitter”:”elonmusk”}"
            />
          </div>
          <div className="verify-again-form-section">
            <h5>Signature</h5>
            <Input
              onChange={() => {}}
              value={signature}
              placeholder="0x083A64399f8025C19fFC428880xC81bD599a66dA6dcc3A64399f8025C19fFC42888..."
            />
          </div>
          <Button
            active
            onClick={verify}
            content={
              <div className="button-with-img">
                <img src={images.MetamaskImg} alt="metamask" />
                <p>Verify</p>
              </div>
            }
          />
        </form>
        {verified && <Success text="Verification Successful" />}
      </div>
    </div>
  );
}

export default VerifyAgain;

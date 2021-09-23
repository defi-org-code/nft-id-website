import { useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import images from "../../../consts/images";
import { useWeb3 } from "../../../context/Web3Context";
import analytics from "../../../services/analytics";
import { EVENTS } from "../../../services/analytics/consts";
import { isSameAccount } from "../../../utils";
import Error from "../../Verify/components/Error";
import Success from "../../Verify/components/Success";

interface IProps {
  signer: string;
  json: string;
  signature: string;
  close: () => void;
  account: string;
}

function VerifyAgain({ signer, json, signature, close, account }: IProps) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const { recover } = useWeb3();

  const recoverSignature = async () => {
    try {
      const res = await recover(json, signature);
      if (!res) return;
      if (isSameAccount(res, account)) {
        setSuccess(true);
      } else {
        setError(true);
      }
    } catch (error) {}
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
              value={json}
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
            onClick={
              error || success
                ? close
                : analytics.sendEventAndRunFunc.bind(
                    null,
                    EVENTS.verifySignatureClicked,
                    recoverSignature
                  )
            }
            content={
              error || success ? (
                <p>Close</p>
              ) : (
                <div className="button-with-img">
                  <img src={images.MetamaskImg} alt="metamask" />
                  <p>Verify</p>
                </div>
              )
            }
          />
        </form>
        {error && <Error text="Verification Failed" />}
        {success && <Success text="Verification Successful" />}
      </div>
    </div>
  );
}

export default VerifyAgain;

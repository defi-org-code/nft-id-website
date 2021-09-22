import { useState } from "react";
import Web3 from "web3";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import images from "../../../consts/images";
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
  const verify = async () => {
    const web3 = new Web3(Web3.givenProvider);
    try {
      const res = await web3?.eth.personal.ecRecover(json, signature);
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
            onClick={error || success ? close : verify}
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

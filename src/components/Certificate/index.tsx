import images from "../../consts/images";
import { ICertificate } from "../../types";

import Spinner from "../Spinner";
import Content from "./Content";
const Fade = require("react-reveal/Fade");

interface IProps {
  certificate: ICertificate | null;
  isLoading?: boolean;
  isVerified?: boolean;
}

function Cretificate({ certificate, isLoading, isVerified }: IProps) {
  const className = isLoading
    ? "certificate certificate-loading"
    : !isVerified
    ? "certificate certificate-not-verified"
    : "certificate";

  return (
    <span className="certificate-wrapper">
      {!isLoading && !isVerified && (
        <Fade>
          <img
            src={images.notVerified}
            alt="not verified"
            className="certificate-x"
          />
        </Fade>
      )}
      <div className={className}>
        {isLoading ? (
          <div className="asset-loader">
            <Spinner />
          </div>
        ) : !certificate ? (
          <img
            src={images.emptyCertificate}
            alt="empty certificate"
            className="certificate-empty"
          />
        ) : (
          <>
            {certificate && (
              <Content certificate={certificate} isVerified={isVerified} />
            )}
          </>
        )}
      </div>
    </span>
  );
}

export default Cretificate;

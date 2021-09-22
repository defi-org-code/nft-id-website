import images from "../../consts/images";
import { ICertificate } from "../../types";

import Spinner from "../Spinner";
import Content from "./Content";
interface IProps {
  certificate: ICertificate | null;
  isLoading?: boolean;
}

const isVerified = (certificate: ICertificate | null) => {
  if (certificate) {
    return certificate.twitter_user_info.verified;
  }
  return false;
};

function Cretificate({ certificate, isLoading }: IProps) {
  const className = isLoading
    ? "certificate certificate-loading"
    : isVerified(certificate)
    ? "certificate"
    : "certificate certificate-not-verified";
  return (
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
          {!isVerified(certificate) && (
            <img
              src={images.notVerified}
              alt="not verified"
              className="certificate-x"
            />
          )}
          {certificate && <Content certificate={certificate} />}
        </>
      )}
    </div>
  );
}

export default Cretificate;

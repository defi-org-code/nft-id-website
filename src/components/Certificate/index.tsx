import images from "../../consts/images";
import { ICertificate } from "../../types";

import Spinner from "../Spinner";
import Content from "./Content";
interface IProps {
  certificate: ICertificate | null;
  isLoading?: boolean;
  notVerified?: boolean;
}

function Cretificate({ certificate, isLoading, notVerified }: IProps) {
  const className = isLoading
    ? "certificate certificate-loading"
    : notVerified
    ? "certificate certificate-not-verified"
    : "certificate";

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
          {notVerified && (
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

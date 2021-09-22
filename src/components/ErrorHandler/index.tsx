import React, { ReactNode } from "react";
import Button from "../Button";

interface IProps {
  retry?: () => void;
  content: string | ReactNode;
  children: ReactNode;
  buttonText: string;
  isError: boolean;
}

function ErrorHandler({
  retry,
  content,
  children,
  buttonText,
  isError,
}: IProps) {
  return isError ? (
    <div className="error-handler">
      <section className="error-handler-overlay"></section>
      <div className="error-handler-content">
        <div className="error-handler-content-text"> {content}</div>

        <Button
          active
          content={<p>{buttonText}</p>}
          onClick={retry ? retry : () => {}}
        />
      </div>
    </div>
  ) : (
    <>{children}</>
  );
}

export default ErrorHandler;

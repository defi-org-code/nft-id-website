import React from "react";
import images from "../../consts/images";

interface IProps {
  name: string;
  twitterHandle: string;
  showLine?: boolean;
}

function TwitterAccount({ name, twitterHandle, showLine }: IProps) {
  return (
    <div className="twitter-account">
      <img src={images.TwitterImg} alt="twitter" />
      <h4>{name}</h4>
      <h5>@{twitterHandle}</h5>
      {showLine && (
        <img src={images.line} alt="line" className="twitter-account-line" />
      )}
    </div>
  );
}

export default TwitterAccount;

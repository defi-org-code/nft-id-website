import React from "react";
import images from "../../consts/images";

interface IProps {
  name: string;
  twitterHandle: string;
}

function TwitterAccount({ name, twitterHandle }: IProps) {
  return (
    <div className="twitter-account">
      <img src={images.TwitterImg} alt="twitter" />
      <h4>{name}</h4>
      <h5>@{twitterHandle}</h5>
    </div>
  );
}

export default TwitterAccount;

import React from "react";
import images from "../../../../consts/images";

function Varified() {
  return (
    <div className="send-tweet-varified">
      <div className="send-tweet-varified-content">
        <img src={images.VarifiedImg} alt="varified" />
        <h5>NFT ownership was </h5>
        <h3>Successfully Verified!</h3>
      </div>
      <p>
        Tap <strong>Done</strong> to see your certificate
      </p>
    </div>
  );
}

export default Varified;

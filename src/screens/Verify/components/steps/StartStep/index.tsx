import React from "react";
import Image from "../../../../../components/Image";
import images from "../../../../../consts/images";
const Fade = require("react-reveal/Fade");

function StartStep() {
  return (
    <Fade delay={300}>
      <div className="start-step">
        <Image src={images.verifyCode} alt="code" id="start-step-img" />
      </div>
    </Fade>
  );
}

export default StartStep;

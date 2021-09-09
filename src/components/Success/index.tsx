import React from "react";
import images from "../../consts/images";

interface IProps {
  text: string;
}

function Success({ text }: IProps) {
  return (
    <div className="success">
      <img src={images.SuccessImg} alt="success" />
      <p>{text}</p>
    </div>
  );
}

export default Success;

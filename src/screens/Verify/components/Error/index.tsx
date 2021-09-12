import React from "react";
import images from "../../../../consts/images";

interface IProps {
  text: string;
}

function Error({ text }: IProps) {
  return (
    <section className="step-error">
      <img src={images.ErrorImg} alt="error" />
      <p>{text}</p>
    </section>
  );
}

export default Error;

import React, { useState } from "react";

interface IProps {
  src: string;
  alt: string;
  id?: string;
}

function Image({ src, alt, id = "" }: IProps) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="image" id={id}>
      {!loaded && <figure className="image-loader" />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={!loaded ? "image image-loading" : "image"}
      />
    </div>
  );
}

export default Image;

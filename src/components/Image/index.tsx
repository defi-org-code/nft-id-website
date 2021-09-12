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
        style={{ opacity: loaded ? 1 : 0 }}
      />
    </div>
  );
}

export default Image;

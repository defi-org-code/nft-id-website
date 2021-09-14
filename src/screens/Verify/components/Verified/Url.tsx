import Button from "../../../../components/Button";
import images from "../../../../consts/images";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";
import { delay } from "../../../../utils";
const Fade = require("react-reveal/Fade");

interface IProps {
  value: string;
  urlParams: string;
}

function Url({ value, urlParams }: IProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    setCopied(true);
    await delay(2000);
    setCopied(false);
  };
  return (
    <Fade bottom>
      <div className="verified-url">
        <a rel="noreferrer" target="_blank" href={`https://mynft.fyi/${value}`}>
          <img src={images.url} alt="url" />
          {`https://mynft.fyi/${value}`}
        </a>
        <CopyToClipboard
          text={`https://mynft.fyi/${urlParams}`}
          onCopy={() => {}}
        >
          <Button
            onClick={copy}
            content={
              <div className="button-with-img">
                {copied && <aside className="button-copied">Copied!</aside>}
                <img src={images.copy} alt="copy" />
                <p>Copy</p>
              </div>
            }
            active={true}
            isLoading={false}
          />
        </CopyToClipboard>
      </div>
    </Fade>
  );
}

export default Url;

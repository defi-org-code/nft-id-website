import Button from "../../../../components/Button";
import images from "../../../../consts/images";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";
import { delay } from "../../../../utils";

interface IProps {
  value: string;
}

function Url({ value }: IProps) {
  const [copied, setCopied] = useState(false);

  const url = `https://mynft.fyi/${value}`;
  const copy = async () => {
    setCopied(true);
    await delay(2000);
    setCopied(false);
  };
  return (
    <div className="verified-url">
      <a href="/">
        <img src={images.url} alt="url" />
        {url}
      </a>
      <CopyToClipboard text={url} onCopy={() => {}}>
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
  );
}

export default Url;

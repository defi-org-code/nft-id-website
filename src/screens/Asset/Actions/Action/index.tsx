import { ReactNode, useEffect, useState } from "react";

interface IProps {
  content: ReactNode | string;
  active: boolean;
  name: ReactNode | string;
}

function Action({ content, active, name }: IProps) {
  const [showContent, setShowContent] = useState(false);
  useEffect(() => {
    if (active) {
      setTimeout(() => {
        setShowContent(true);
      }, 700);
    }
  }, [active]);

  return active ? (
    <div className="asset-proof-action">
      <section className="asset-proof-action-content">{name}</section>
      {showContent && (
        <section className="asset-proof-action-content">{content}</section>
      )}
    </div>
  ) : null;
}

export default Action;

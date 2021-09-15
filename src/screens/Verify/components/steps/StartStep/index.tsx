import CodeFrame from "../../../../../components/CodeFrame";

const Fade = require("react-reveal/Fade");

function StartStep() {
  return (
    <Fade delay={300}>
      <div className="start-step">
        <p>
          ☑ Claim the page with your Twitter handle - https://mynft.fyi/yourname{" "}
        </p>
        <p>
          ☑ Showcase your asset image with a complete on-chain proof of
          ownership
        </p>
        <p>☑ Use this URL for bragging rights to your NFT profile image</p>
        <CodeFrame />
      </div>
    </Fade>
  );
}

export default StartStep;

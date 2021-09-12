import images from "../../../../../consts/images";
const Fade = require("react-reveal/Fade");

function Varified() {
  return (
    <Fade>
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
    </Fade>
  );
}

export default Varified;

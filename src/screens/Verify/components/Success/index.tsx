import images from "../../../../consts/images";
const Fade = require("react-reveal/Fade");

interface IProps {
  text: string;
  disableAnimation?: boolean;
}

function Success({ text, disableAnimation }: IProps) {
  return disableAnimation ? (
    <div className="success">
      <img src={images.SuccessImg} alt="success" />
      <p>{text}</p>
    </div>
  ) : (
    <Fade duration={300} bottom>
      <div className="success">
        <img src={images.SuccessImg} alt="success" />
        <p>{text}</p>
      </div>
    </Fade>
  );
}

export default Success;

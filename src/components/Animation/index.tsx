import Lottie from "react-lottie";

interface IProps {
  data: any;
  loop?: boolean;
}

function Animation({ data: animationData, loop = true }: IProps) {
  const defaultOptions = {
    loop,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="lottie">
      <Lottie options={defaultOptions} />
    </div>
  );
}

export default Animation;

import { useSteps } from "../../../../../context/StepsContext";
import { IStep } from "../../../../../types";
const Fade = require("react-reveal/Fade");

interface IProps {
  step: IStep;
  index: number;
}
function Step({ step, index }: IProps) {
  const { currentStep } = useSteps();
  const isActive = index === currentStep;
  const { component: Component, title } = step;
  return isActive ? (
    <div className="step-container">
      {currentStep === 0 && (
        <Fade>
          <h2 className="step-container-title">
            Verify ownership of your NFT asset now
          </h2>
        </Fade>
      )}

      <Fade delay={300}>
        <h3 className="step-container-subtitle">{title}</h3>
      </Fade>
      {Component}
    </div>
  ) : null;
}

export default Step;

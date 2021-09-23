import images from "../../../../consts/images";
import { useStepsStore } from "../../../../context/StepsContext";
import { IStep } from "../../../../types";
const Bounce = require("react-reveal/Bounce");

interface IProps {
  steps: IStep[];
}

const StepsProgress = ({ steps }: IProps) => {
  const { currentStep } = useStepsStore();

  return (
    <Bounce top>
      <div className="steps-progress">
        {steps.map((step, index) => {
          return (
            <section
              className="steps-progress-step"
              id={index === currentStep ? "active-step" : ""}
              key={index}
            >
              <img src={images.ActiveStepImg} alt="active-step" />
            </section>
          );
        })}
      </div>
    </Bounce>
  );
};

export default StepsProgress;

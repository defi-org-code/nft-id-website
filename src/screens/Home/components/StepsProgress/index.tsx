import images from "../../../../consts/images";
import { useSteps } from "../../../../context/StepsContext";
import { IStep } from "../../../../types";

interface IProps {
  steps: IStep[];
}

const StepsProgress = ({ steps }: IProps) => {
  const { currentStep } = useSteps();

  return (
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
  );
};

export default StepsProgress;

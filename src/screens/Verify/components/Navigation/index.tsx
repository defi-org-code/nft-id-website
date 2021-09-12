import Button from "../../../../components/Button";
import { useSteps } from "../../../../context/StepsContext";
import { steps } from "../../Data";
const Bounce = require("react-reveal/Bounce");

function Navigation() {
  const { setCurrectStep, currentStep, allowNextStep } = useSteps();
  const disabled = !allowNextStep;
  const isLastStep = steps.length - 1 === currentStep;
  const isFirstStep = currentStep === 0;
  const next = () => {
    if (disabled) {
      return;
    }
    if (currentStep < steps.length - 1) {
      setCurrectStep(currentStep + 1);
    }
  };

  return (
    <Bounce bottom>
      <div className="steps-navigation">
        <Button
          onClick={next}
          content={<>{isLastStep ? "Done" : isFirstStep ? "Start" : "Next"}</>}
          disabled={disabled}
          active={!disabled}
        />
      </div>
    </Bounce>
  );
}

export default Navigation;

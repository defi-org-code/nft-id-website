import Button from "../../../../components/Button";
import { useSteps } from "../../../../context/StepsContext";
import { steps } from "../../Data";
const Bounce = require("react-reveal/Bounce");

function Navigation() {
  const { setCurrectStep, currentStep, allowNextStep, setDone } = useSteps();
  // const disabled = !allowNextStep;
  const disabled = false;

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
          onClick={isLastStep ? () => setDone(true) : next}
          content={<>{isLastStep ? "Done" : isFirstStep ? "Start" : "Next"}</>}
          disabled={disabled}
          active={!disabled}
        />
      </div>
    </Bounce>
  );
}

export default Navigation;

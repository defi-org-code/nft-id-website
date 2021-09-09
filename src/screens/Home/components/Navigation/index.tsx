import Button from "../../../../components/Button";
import { steps } from "../../../../consts";
import { useSteps } from "../../../../context/StepsContext";

function Navigation() {
  const { setCurrectStep, currentStep, allowNextStep } = useSteps();
  const disabled = !allowNextStep;

  const isLastStep = steps.length - 1 === currentStep;
  const next = () => {
    if (disabled) {
      return;
    }
    if (currentStep < steps.length - 1) {
      setCurrectStep(currentStep + 1);
    }
  };

  return (
    <div className="steps-navigation">
      <Button
        onClick={next}
        content={<>{isLastStep ? "Done" : "Next"}</>}
        disabled={disabled}
        active={!disabled}
      />
    </div>
  );
}

export default Navigation;

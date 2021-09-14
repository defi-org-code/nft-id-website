import Button from "../../../../components/Button";
import { useSteps } from "../../../../context/StepsContext";
import analytics from "../../../../services/analytics";
import { steps } from "../../Data";
const Bounce = require("react-reveal/Bounce");

function Navigation() {
  const { setCurrectStep, currentStep, allowNextStep, setDone } = useSteps();
  const disabled = !allowNextStep;

  const isLastStep = steps.length - 1 === currentStep;
  const isFirstStep = currentStep === 0;

  const onClick = () => {
    if (disabled) {
      return;
    }
    if (isLastStep) {
      analytics.sendEvent("TAP_ON_DONE_AFTER_VERIFY");
      return setDone(true);
    }
    if (currentStep < steps.length - 1) {
      setCurrectStep(currentStep + 1);
    }
  };

  return (
    <Bounce bottom>
      <div className="steps-navigation">
        <Button
          onClick={onClick}
          content={<>{isLastStep ? "Done" : isFirstStep ? "Start" : "Next"}</>}
          disabled={disabled}
          active={!disabled}
        />
      </div>
    </Bounce>
  );
}

export default Navigation;

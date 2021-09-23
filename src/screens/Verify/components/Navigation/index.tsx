import Button from "../../../../components/Button";
import { useStepsStore } from "../../../../context/StepsContext";
import analytics from "../../../../services/analytics";
import { EVENTS } from "../../../../services/analytics/consts";
import { steps } from "../../Data";
const Bounce = require("react-reveal/Bounce");

const sendAnalyticsEvent = (step: number) => {
  switch (step) {
    case 0:
      analytics.sendEvent(EVENTS.startVerificationButton);
      break;
    case 1:
      analytics.sendEvent(EVENTS.fetchNftNextStepClick);
      break;
    case 2:
      analytics.sendEvent(EVENTS.connectWalletnextStepClick);
      break;
    case 3:
      analytics.sendEvent(EVENTS.signWithMetamaskNextStepClick);
      break;
    case 4:
      analytics.sendEvent(EVENTS.doneClick);
      break;

    default:
      break;
  }
};

function Navigation() {
  const {
    setCurrectStep,
    currentStep,
    allowNextStep,
    setDone,
  } = useStepsStore();
  const disabled = !allowNextStep;

  const isLastStep = steps.length - 1 === currentStep;
  const isFirstStep = currentStep === 0;

  const onClick = () => {
    if (disabled) {
      return;
    }
    window.scrollTo(0, 0);
    if (isLastStep) {
      sendAnalyticsEvent(steps.length - 1);
      return setDone(true);
    }
    if (currentStep < steps.length - 1) {
      sendAnalyticsEvent(currentStep);
      setCurrectStep(currentStep + 1);
    }
  };

  return (
    <Bounce bottom>
      <div
        className={
          isFirstStep
            ? "steps-navigation steps-navigation-first"
            : "steps-navigation"
        }
      >
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

import images from "../../consts/images";
import { IStep } from "../../types";
import Navigation from "./components/Navigation";
import Step from "./components/steps/Step";
import StepsProgress from "./components/StepsProgress";
import { steps } from "./Data";

function Verify() {
  return (
    <div className="verify">
      <div className="verify-overlay"></div>
      <img src={images.StepsBg} alt="background" className="verify-bg" />
      <div className="verify-content">
        <StepsProgress steps={steps} />
        {steps.map((step: IStep, index: number) => {
          return <Step key={index} step={step} index={index} />;
        })}
        <Navigation />
      </div>
    </div>
  );
}

export default Verify;

import images from "../../consts/images";
import { useSteps } from "../../context/StepsContext";
import { IStep } from "../../types";
import Navigation from "./components/Navigation";
import Verified from "./components/Verified";
import Step from "./components/steps/Step";
import StepsProgress from "./components/StepsProgress";
import { steps } from "./Data";
import { useEffect } from "react";

function Verify() {
  const { done } = useSteps();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="verify">
      <div className="verify-overlay"></div>
      <img src={images.StepsBg} alt="background" className="verify-bg" />
      <div className="verify-content">
        {!done ? (
          <>
            <StepsProgress steps={steps} />
            {steps.map((step: IStep, index: number) => {
              return <Step key={index} step={step} index={index} />;
            })}
            <Navigation />
          </>
        ) : (
          <Verified />
        )}
      </div>
    </div>
  );
}

export default Verify;

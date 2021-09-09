import { steps } from "../../consts";
import images from "../../consts/images";
import { useSteps } from "../../context/StepsContext";
import { IStep } from "../../types";
import Navigation from "./components/Navigation";
import StepsProgress from "./components/StepsProgress";

function Home() {
  const store = useSteps();
  const { currentStep, allowNextStep } = store;
  return (
    <div className="home">
      <div className="home-overlay"></div>
      <img src={images.StepsBg} alt="background" className="home-bg" />
      <div className="home-content">
        <StepsProgress steps={steps} />
        {steps.map((step: IStep, index) => {
          const { component: Component, title } = step;
          if (index === currentStep) {
            return (
              <div className="step" key={index}>
                <h3 className="step-title">{title}</h3>
                <Component />
              </div>
            );
          }
          return null;
        })}
        <Navigation />
      </div>
    </div>
  );
}

export default Home;

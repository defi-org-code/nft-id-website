import { useEffect } from "react";
import Button from "../../components/Button";
import images from "../../consts/images";
import { useHistory } from "react-router-dom";
import { routes } from "../../consts";
import analytics from "../../services/analytics";
import { EVENTS } from "../../services/analytics/consts";
const Bounce = require("react-reveal/Bounce");

function Home() {
  const history = useHistory();

  useEffect(() => {
    analytics.sendEvent(EVENTS.homePageLoad);
  }, []);

  return (
    <div className="home">
      <img src={images.homeBG} alt="background" className="home-bg" />
      <img src={images.logo} alt="logo" className="home-logo" />
      <div className="home-flex">
        <img src={images.title} alt="my nft" className="home-flex-mobile-img" />
        <Bounce left>
          <div className="home-left">
            <img src={images.title} alt="my nft" />
            <h5>You own an NFT ?</h5>
            <h3>Prove it !</h3>
            <Button
              content={<p>Verify your asset now</p>}
              onClick={analytics.sendEventAndRunFunc.bind(
                null,
                EVENTS.verifyAssetFromHomePageButtonClick,
                null,
                history.push.bind(null, routes.verify)
              )}
              active={true}
            />
          </div>
        </Bounce>
        <Bounce right>
          <div className="home-right">
            <img src={images.homeImages} alt="" />
          </div>
        </Bounce>
      </div>
    </div>
  );
}

export default Home;

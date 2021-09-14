import Image from "../Image";
import TwitterAccount from "../TwitterAccount";
import images from "../../consts/images";
import Animation from "../Animation";
import animations from "../../consts/animations";

function Cretificate() {
  return (
    <div className="certificate">
      <div className="certificate-avatar">
        <Image src={images.monkey} alt="" />
        <Animation data={animations.stamp} loop={false} />

        <figure className="certificate-avatar-frame"></figure>
        <figure className="certificate-avatar-shadow"></figure>
      </div>
      <div className="certificate-details">
        <TwitterAccount name="Stephen Curry" twitterHandle="StephenCurry30" />
        <h2 className="certificate-details-title">
          Certificate
          <br />
          of Ownership
        </h2>
        <div className="certificate-details-bottom">
          <section>
            <h5>This NFT was verified on:</h5>
            <h4>10th September, 2021</h4>
          </section>
          <section>
            <h5>Verified by:</h5>
            <span>
              <img src={images.logo} alt="logo" />
              <img src={images.VarifiedImg} alt="verified" />
            </span>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Cretificate;

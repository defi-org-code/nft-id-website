import images from "../../../consts/images";

const links = [
  { image: images.binance, alt: "binance", url: "https://www.binance.com/en" },
  { image: images.orbs, alt: "orbs", url: "https://www.orbs.com/" },
  {
    image: images.moonstake,
    alt: "moonstake",
    url: "https://moonstake.io/",
  },
];

function Partners() {
  return (
    <div className="partners">
      <div className="partners-overlay"></div>
      <div className="partners-section partners-top">
        <h5>Alunmi of</h5>
        <span>
          <img src={images.defi} alt="defi" />
          <h3>Accelerator Program</h3>
        </span>
      </div>
      <div className="partners-section partners-bottom">
        <h5>Managing partners</h5>
        <section className="partners-bottom-list">
          {links.map((link) => {
            return (
              <a
                className="partners-bottom-list-item"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={link.image} alt={link.alt} />
              </a>
            );
          })}
        </section>
      </div>
    </div>
  );
}

export default Partners;

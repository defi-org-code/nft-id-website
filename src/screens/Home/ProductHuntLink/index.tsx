/* eslint-disable jsx-a11y/img-redundant-alt */

interface Props {
  id?: string;
}

function ProductHuntLink({ id = "" }: Props) {
  return (
    <a
      id={id}
      href="https://www.producthunt.com/posts/mynft-fyi?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-mynft-fyi"
      target="_blank"
      rel="noreferrer"
      className="home-product-hunt"
    >
      <img
        src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=318044&theme=dark"
        alt="MyNFT.fyi - Prove your on-chain ownership of your NFT profile picture | Product Hunt"
        style={{ width: "250px", height: "54px" }}
        width={250}
        height={54}
      />
    </a>
  );
}

export default ProductHuntLink;

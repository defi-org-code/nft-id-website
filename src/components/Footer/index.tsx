import React from "react";
import { TELEGRAM, TWITTER } from "../../consts";
import images from "../../consts/images";

function Footer() {
  return (
    <footer className="footer">
      <img src={images.myNftFooter} alt="my nft" className="footer-mynft" />
      <div className="footer-socials">
        <a href={TWITTER} target="_blank" rel="noreferrer">
          <img src={images.twitterIcon} alt="twitter" />
        </a>
        <a href={TELEGRAM} target="_blank" rel="noreferrer">
          <img src={images.telegramIcon} alt="telegram" />
        </a>
      </div>
      <p className="footer-year">2021</p>
    </footer>
  );
}

export default Footer;

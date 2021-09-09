import React from "react";
import { useParams } from "react-router-dom";

type PramasFirstOption = {
  twitterHandle: string;
};

type PramasSecondOption = {
  tokenId: string;
  contractAddress: string;
};

type Params = PramasFirstOption | PramasSecondOption;

function Asset() {
  const params: Params = useParams();
  console.log(params);
  return <div></div>;
}

export default Asset;

import { ReactElement } from "react";

export interface IStep {
  title: string;
  component: ReactElement;
}

export interface ITwitterUserInfo {
  friends_count: number;
  followers_count: number;
  name: string;
  description: string;
  verified: boolean;
  profile_background_color: string;
}

export interface IBaseCertificate {
  json: string;
  nft_contract_address: string;
  nft_id: string;
  nft_image: string;
  owner_public_key: string;
  signature: string;
  tweet_id: string;
  twitter_handle: string;
  verified_time: string;
}

export interface ICertificate extends IBaseCertificate {
  twitter_user_info: any;
}

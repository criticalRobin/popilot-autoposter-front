export interface IBaseSocialNetwork {
  id?: number;
  name: string;
  social_network_type: string;
  created_at: Date;
  status?: boolean;
  user_owner?: number;
}

export interface IFacebook extends IBaseSocialNetwork {
  page_id?: string;
  page_access_token?: string;
}

export interface IInstagram extends IBaseSocialNetwork {
  username?: string;
  password?: string;
}

export interface IX extends IBaseSocialNetwork {
  access_key?: string;
  access_secret?: string;
  consumer_key?: string;
  consumer_secret?: string;
  bearerToken?: string;
}

export interface ISocialNetworks {
  facebook_accounts: IFacebook[];
  instagram_accounts: IInstagram[];
  x_accounts: IX[];
}

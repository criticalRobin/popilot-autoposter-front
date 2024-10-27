import {
  IFacebook,
  IInstagram,
  IX,
} from "../interfaces/social-network.interface";

export function useSocialNetworkBuilder() {
  const buildSocialNetwork = (
    type: string,
    data: any
  ): IFacebook | IInstagram | IX | null => {
    let socialNetwork: IFacebook | IInstagram | IX | null = null;

    if (type === "FB") {
      socialNetwork = {
        social_network_type: type,
        name: data.name,
        page_id: data.page_id,
        page_access_token: data.page_access_token,
      };
    } else if (type === "IG") {
      socialNetwork = {
        social_network_type: type,
        name: data.name,
        username: data.username,
        password: data.password,
      };
    } else if (type === "X") {
      socialNetwork = {
        social_network_type: type,
        name: data.name,
        access_key: data.access_key,
        access_secret: data.access_secret,
        consumer_key: data.consumer_key,
        consumer_secret: data.consumer_secret,
        bearer_token: data.bearer_token,
      };
    }

    return socialNetwork;
  };

  return { buildSocialNetwork };
}

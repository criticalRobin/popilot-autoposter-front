import axios from "axios";
import { useAuthStore } from "../stores/authStore";
import {
  IFacebook,
  IInstagram,
  IX,
} from "../interfaces/social-network.interface";

const BASE_API_URL = import.meta.env.VITE_API_URL;
const authStore = useAuthStore();

export const socialNetworkService = {
  getSocialNetworks: async () => {
    const response = await axios.get(`${BASE_API_URL}social-network/list`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.data);
    }
  },
  createSocialNetwork: async (socialNetwork: any) => {
    let newSocialNetwork: IFacebook | IInstagram | IX | null = null;

    if (socialNetwork.social_network_type === "FB") {
      newSocialNetwork = {
        social_network_type: socialNetwork.social_network_type,
        name: socialNetwork.name,
        page_id: socialNetwork.page_id,
        page_access_token: socialNetwork.page_access_token,
      };
    }

    if (socialNetwork.social_network_type === "IG") {
      newSocialNetwork = {
        social_network_type: socialNetwork.social_network_type,
        name: socialNetwork.name,
        username: socialNetwork.username,
        password: socialNetwork.password,
      };
    }

    if (socialNetwork.social_network_type === "X") {
      newSocialNetwork = {
        social_network_type: socialNetwork.social_network_type,
        name: socialNetwork.name,
        access_key: socialNetwork.access_key,
        access_secret: socialNetwork.access_secret,
        consumer_key: socialNetwork.consumer_key,
        consumer_secret: socialNetwork.consumer_secret,
        bearer_token: socialNetwork.bearer_token,
      };
    }

    const response = await axios.post(
      `${BASE_API_URL}social-network/create/`,
      newSocialNetwork,
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      }
    );

    if (response.status === 201) {
      return response.status;
    } else {
      throw new Error(response.data);
    }
  },
};

import axios from "axios";
import { useAuthStore } from "../stores/authStore";

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
};

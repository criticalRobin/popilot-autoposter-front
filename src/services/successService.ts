import axios from "axios";

const BASE_API_URL = import.meta.env.VITE_API_URL;

export const successService = {
  updateUserIsPremiumStatus: async () => {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${BASE_API_URL}payment/update-user-is-premium-status/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.status;
  },
};

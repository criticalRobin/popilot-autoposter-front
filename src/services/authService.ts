import axios from "axios";
import { IAuth } from "../interfaces/auth.interface";

const BASE_API_URL = import.meta.env.VITE_API_URL;

export const authService = {
  login: async (authData: IAuth) => {
    const response = await axios.post(`${BASE_API_URL}token/`, {
      username: authData.username,
      password: authData.password,
    });

    return response.data;
  },
  getLoggedUser: async (token: string | null) => {
    const response = await axios.get(`${BASE_API_URL}auth/logged-user/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },
};

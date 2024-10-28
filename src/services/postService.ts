import axios from "axios";
import { useAuthStore } from "../stores/authStore";

const BASE_API_URL = import.meta.env.VITE_API_URL;
const authStore = useAuthStore();

export const postService = {
  getPosts: async () => {
    const response = await axios.get(`${BASE_API_URL}post/list`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });

    return response.data;
  },
  createPost: async (formData: FormData) => {
    const response = await axios.post(`${BASE_API_URL}post/create/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${authStore.token}`,
      },
    });
    return response.data;
  },
};

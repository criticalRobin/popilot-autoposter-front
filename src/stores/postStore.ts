import { defineStore } from "pinia";
import { ref } from "vue";
import { IPost } from "../interfaces/post.interface";
import { postService } from "../services/postService";

export const usePostStore = defineStore("post", () => {
  const posts = ref<IPost[]>([]);

  const getSocialNetworks = async () => {
    const data = await postService.getPosts();

    posts.value = data;
  };

  const createPost = async (formData: FormData) => {
    try {
      await postService.createPost(formData);
    } catch (e) {
      console.error(e);
    }
  };

  return {
    posts,
    getSocialNetworks,
    createPost,
  };
});

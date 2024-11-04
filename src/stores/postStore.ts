import { defineStore } from "pinia";
import { ref } from "vue";
import { IPost } from "../interfaces/post.interface";
import { postService } from "../services/postService";

export const usePostStore = defineStore("post", () => {
  const posts = ref<IPost[]>([]);
  const scheduledPosts = ref<IPost[]>([]);

  const getSocialNetworks = async () => {
    const data = await postService.getPosts();

    posts.value = data;
  };

  const getScheduledPosts = async () => {
    const data = await postService.getScheduledPosts();

    scheduledPosts.value = data;
  };

  const createPost = async (formData: FormData) => {
    try {
      await postService.createPost(formData);
    } catch (e) {
      throw e;
    }
  };

  return {
    posts,
    scheduledPosts,
    getSocialNetworks,
    createPost,
    getScheduledPosts,
  };
});

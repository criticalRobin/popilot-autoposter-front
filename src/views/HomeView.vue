<script lang="ts" setup>
import Title from "../components/shared/Title.vue";
import { useAuthStore } from "../stores/authStore";
import PremiumPromotion from "../components/premium/PremiumPromotion.vue";
import PostCard from "../components/post/PostCard.vue";
import { usePostStore } from "../stores/postStore";
import { onMounted } from "vue";

const authStore = useAuthStore();
const postStore = usePostStore();

onMounted(() => {
  postStore.getScheduledPosts();
});
</script>

<template>
  <Title />
  <div v-if="!authStore.isPremiumUser" class="flex justify-center items-center">
    <PremiumPromotion class="mt-1" />
  </div>
  <div v-else class="flex flex-wrap">
    <div v-for="post in postStore.scheduledPosts" class="w-1/3 p-2">
      <PostCard
        :title="post.title"
        :description="post.description"
        :image-url="post.image_url"
        :shceduled-at="post.scheduled_at"
      />
    </div>
  </div>
</template>

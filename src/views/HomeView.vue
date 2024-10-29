<script lang="ts" setup>
import Title from "../components/shared/Title.vue";
import { useAuthStore } from "../stores/authStore";
import PremiumPromotion from "../components/premium/PremiumPromotion.vue";

const authStore = useAuthStore();
</script>

<template>
  <Title />
  <div v-if="!authStore.isPremiumUser" class="flex justify-center items-center">
    <PremiumPromotion class="mt-1" />
  </div>
</template>

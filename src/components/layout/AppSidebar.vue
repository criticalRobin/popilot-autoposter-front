<script lang="ts" setup>
import { ref } from "vue";
import { useAuthStore } from "../../stores/authStore";
import { useRouter } from "vue-router";

const active = ref("home");
const authStore = useAuthStore();
const router = useRouter();

const setActive = (menu: string) => {
  active.value = menu;
  
  if(menu === 'home') {
    router.push({ name: "Home" });
  }

  if (menu === 'social-network') {
    router.push({ name: "SocialNetwork" });
  }
}
</script>

<template>
  <ul class="menu bg-erieblack rounded-none w-56">
    <img class="mb-2 px-4 py-4" src="../../assets/logo.svg" alt="popilot-logo" />
    <li @click="setActive('home')">
      <a
        :class="[
          'font-medium',
          active === 'home' ? 'text-moonstone' : 'text-white',
        ]"
        ><i class="fa fa-home text-xl mr-3"></i>Inicio</a
      >
    </li>
    <li @click="setActive('social-network')">
      <a
        :class="[
          'font-medium',
          active === 'social-network' ? 'text-moonstone' : 'text-white',
        ]"
        ><i class="fa fa-gratipay text-xl mr-3"</i>Redes Sociales</a
      >
    </li>
    <li @click="setActive('posts')">
      <a
        :class="[
          'font-medium',
          active === 'posts' ? 'text-moonstone' : 'text-white',
        ]"
        ><i class="fa fa-thumbs-o-up text-xl mr-3"></i>Posts</a
      >
    </li>
    <li v-if="!authStore.isPremiumUser" @click="setActive('premium')">
      <a
        :class="[
          'font-medium',
          active === 'premium' ? 'text-moonstone' : 'text-white',
        ]"
        ><i class="fa fa-cc-stripe text-lg mr-2"></i>Premium</a
      >
    </li>
  </ul>
</template>

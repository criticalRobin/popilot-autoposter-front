<script>
import { ref } from "vue";

export default {
  setup() {
    const active = ref("home");

    const setActive = (item) => {
      active.value = item;
    };

    return {
      active,
      setActive,
    };
  },
};
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
    <li @click="setActive('socials')">
      <a
        :class="[
          'font-medium',
          active === 'socials' ? 'text-moonstone' : 'text-white',
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
    <li @click="setActive('premium')">
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

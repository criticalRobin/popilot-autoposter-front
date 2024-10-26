<script lang="ts" setup>
import Breadcrumbs from "./Breadcrumbs.vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/authStore";
import { IBreadcrumb } from "../../interfaces/breadcrumb.interface";

defineProps<{
  title?: string;
  breadcrumbs?: IBreadcrumb[];
}>();

const authStore = useAuthStore();
authStore.loadFromLocalStorage();

const router = useRouter();
</script>

<template>
  <div class="flex flex-col">
    <span v-if="router.currentRoute.value.name === 'Home'" class="text-xl">
      Bienvenido de vuelta <strong>{{ authStore.user?.username }}</strong
      >, te hemos hechado de menos! 👋
    </span>
    <span
      v-else="router.currentRoute.value.name !== 'Home'"
      class="text-xl font-semibold text-lapislazuli"
      >{{ title }}</span
    >
    <span
      v-if="
        !authStore.isPremiumUser && router.currentRoute.value.name === 'Home'
      "
      class="text-base"
    >
      Hazte premium para habilitar funciones increibles!
    </span>
    <span
      v-else-if="
        authStore.isPremiumUser && router.currentRoute.value.name === 'Home'
      "
      class="text-base"
    >
      Este es el listado de posts agendados que tienes!
    </span>
    <Breadcrumbs v-if="breadcrumbs" :items="breadcrumbs" />
  </div>
  <hr
    class="bg-moonstone mb-4"
    :class="{ 'mt-3': router.currentRoute.value.name === 'Home' }"
    style="height: 1.5px"
  />
</template>

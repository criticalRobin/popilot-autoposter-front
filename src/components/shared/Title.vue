<script lang="ts" setup>
import { useAuthStore } from "../../stores/authStore";

const authStore = useAuthStore();
authStore.loadFromLocalStorage();
</script>

<template>
  <div class="flex flex-col">
    <span class="text-xl">
      Bienvenido de vuelta <strong>{{ authStore.user?.username }}</strong
      >, te hemos hechado de menos! 👋
    </span>
    <span class="text-base">
      Hazte premium para habilitar funciones increibles!
    </span>
  </div>
  <hr class="mt-3 bg-moonstone" style="height: 1.5px" />
</template>

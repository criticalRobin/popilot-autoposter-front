<script lang="ts" setup>
import AppNavbar from "../components/AppNavbar.vue";
import AppSidebar from "../components/AppSidebar.vue";
</script>

<template>
  <div class="flex h-screen">
    <AppSidebar />
    <div class="flex-1">
      <AppNavbar />
      <slot />
    </div>
  </div>
</template>

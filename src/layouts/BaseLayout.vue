<script lang="ts" setup>
import AppNavbar from "../components/layout/AppNavbar.vue";
import AppSidebar from "../components/layout/AppSidebar.vue";
</script>

<template>
  <div class="flex h-screen">
    <AppSidebar />
    <div class="flex-1 flex flex-col">
      <AppNavbar />
      <main class="flex-1 overflow-auto py-5 px-8">
        <slot />
      </main>
    </div>
  </div>
</template>

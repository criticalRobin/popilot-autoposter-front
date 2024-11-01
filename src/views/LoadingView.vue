<script lang="ts" setup></script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <img
      src="../assets/process.gif"
      alt="loading-image"
      class="w-64 h-64"
    />
    <h1 class="text-3xl font-semibold text-lapislazuli">
      Publicando tu post...
    </h1>
    <p class="mt-1 text-lg text-moonstone">
      Esto puede tardar unos momentos. ¡Gracias por tu paciencia!
    </p>
    <div class="flex items-center mt-4">
      <div class="loader"></div>
    </div>
  </div>
</template>

<style scoped>
.loader {
  border: 8px solid transparent;
  border-top: 8px solid #639fab;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

<script lang="ts" setup>
import Loginform from "../components/login/LoginForm.vue";
</script>

<template>
  <div class="flex flex-row bg-white h-screen">
    <div class="basis-3/5">
      <img
        src="../assets/login.svg"
        alt="login-image"
        class="px-48 py-24 object-cover"
      />
    </div>
    <div class="basis-2/5 bg-erieblack py-44">
      <div class="flex flex-col justify-center items-center gap-4">
        <span class="text-4xl font-semibold text-white">Hola de nuevo!</span>
        <span class="text-lg font-semibold text-powderblue"
          >Es hora de iniciar sesión!</span
        >
      </div>
      <Loginform />
    </div>
  </div>
</template>

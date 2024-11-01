<script lang="ts" setup>
import { ref } from "vue";
import Loginform from "../components/login/LoginForm.vue";
import Alert from "../components/shared/Alert.vue";

const showAlert = ref(false);
const alertMessage = ref("");
const alertStatus = ref<"success" | "error">("success");

function handleAlert(event: { status: "success" | "error"; message: string }) {
  console.log("Evento recibido en handleAlert:", event);
  showAlert.value = true;
  alertMessage.value = event.message;
  alertStatus.value = event.status;

  setTimeout(() => {
    showAlert.value = false;
  }, 3000);
}
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
    <div class="basis-2/5 bg-erieblack py-44 relative">
      <div class="flex justify-end absolute top-10 right-3 w-full z-50">
        <Alert v-if="showAlert" :status="alertStatus" :message="alertMessage" />
      </div>
      <div class="flex flex-col justify-center items-center gap-4">
        <span class="text-4xl font-semibold text-white">Hola de nuevo!</span>
        <span class="text-lg font-semibold text-powderblue"
          >Es hora de iniciar sesión!</span
        >
      </div>
      <Loginform @showAlert="handleAlert" />
    </div>
  </div>
</template>

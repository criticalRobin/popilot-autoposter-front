<script lang="ts" setup>
import Title from "../components/shared/Title.vue";
import PostCreateForm from "../components/post-create/PostCreateForm.vue";
import { ref } from "vue";

const items = [
  { label: "Inicio", urlPathName: "Home" },
  { label: "Posts", urlPathName: "Post" },
  { label: "Nuevo Post" },
];

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
  <Title title="Nuevo Post" :breadcrumbs="items" />
  <PostCreateForm @showAlert="handleAlert" />
</template>

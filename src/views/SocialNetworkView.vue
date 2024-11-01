<script lang="ts" setup>
import { onMounted, computed, ref } from "vue";
import Title from "../components/shared/Title.vue";
import SocialNetworkTable from "../components/social-network/SocialNetworkTable.vue";
import { IBaseSocialNetwork } from "../interfaces/social-network.interface";
import { useSocialNetworkStore } from "../stores/socialNetworkStore";
import Alert from "../components/shared/Alert.vue";

const socialNetworkStore = useSocialNetworkStore();

const items = [
  { label: "Inicio", urlPathName: "Home" },
  { label: "Redes Sociales" },
];
const columns = ["Nombre", "Tipo", "Fecha Creación", "Acciones"];

const socialNetworks = computed<IBaseSocialNetwork[]>(() => [
  ...socialNetworkStore.facebookAccounts,
  ...socialNetworkStore.instagramAccounts,
  ...socialNetworkStore.xAccounts,
]);

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

const currentPage = ref(1);
const itemsPerPage = 5;
const totalPages = computed(() =>
  Math.ceil(socialNetworks.value.length / itemsPerPage)
);

const paginatedData = computed(() =>
  socialNetworks.value.slice(
    (currentPage.value - 1) * itemsPerPage,
    currentPage.value * itemsPerPage
  )
);

const pageChange = (page: number) => {
  currentPage.value = page;
};

onMounted(() => {
  socialNetworkStore.getSocialNetworks();
});
</script>

<template>
  <div class="flex flex-row justify-between">
    <Title title="Redes Sociales" :breadcrumbs="items" />
    <Alert v-if="showAlert" :status="alertStatus" :message="alertMessage" />
  </div>
  <SocialNetworkTable
    :columns="columns"
    :data="paginatedData"
    :pageChange="pageChange"
    :currentPage="currentPage"
    :totalPages="totalPages"
    @showAlert="handleAlert"
  />
</template>

<script lang="ts" setup>
import { onMounted, computed, ref } from "vue";
import Title from "../components/shared/Title.vue";
import SocialNetworkTable from "../components/social-network/SocialNetworkTable.vue";
import { IBaseSocialNetwork } from "../interfaces/social-network.interface";
import { useSocialNetworkStore } from "../stores/socialNetworkStore";

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
  <Title title="Redes Sociales" :breadcrumbs="items" />
  <SocialNetworkTable
    :columns="columns"
    :data="paginatedData"
    :pageChange="pageChange"
    :currentPage="currentPage"
    :totalPages="totalPages"
  />
</template>

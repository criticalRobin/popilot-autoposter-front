<script lang="ts" setup>
import Title from "../components/shared/Title.vue";

const items = [
  { label: "Inicio", urlPathName: "Home" },
  { label: "Redes Sociales" },
];
</script>

<template>
  <Title title="Redes Sociales" :breadcrumbs="items" />
</template>

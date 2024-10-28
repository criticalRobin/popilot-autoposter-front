<script lang="ts" setup>
import Title from "../components/shared/Title.vue";

const items = [{ label: "Inicio", urlPathName: "Home" }, { label: "Premium" }];
</script>

<template>
  <Title title="Posts" :breadcrumbs="items" />
</template>

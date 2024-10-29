<script lang="ts" setup>
import Title from "../components/shared/Title.vue";
import PremiumPromotion from "../components/premium/PremiumPromotion.vue";

const items = [{ label: "Inicio", urlPathName: "Home" }, { label: "Premium" }];
</script>

<template>
  <Title title="Hazte Premium" :breadcrumbs="items" />
  <div class="flex justify-center items-center">
    <PremiumPromotion class="mt-1" />
  </div>
</template>

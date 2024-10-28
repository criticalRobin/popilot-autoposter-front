<script lang="ts" setup>
import Title from "../components/shared/Title.vue";
import PostCreateForm from "../components/post-create/PostCreateForm.vue";

const items = [
  { label: "Inicio", urlPathName: "Home" },
  { label: "Posts", urlPathName: "Post" },
  { label: "Nuevo Post" },
];
</script>

<template>
  <Title title="Nuevo Post" :breadcrumbs="items" />
  <PostCreateForm />
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import Title from "../components/shared/Title.vue";
import { usePostStore } from "../stores/postStore";
import { IPost } from "../interfaces/post.interface";
import PostTable from "../components/post/PostTable.vue";

const postStore = usePostStore();
const posts = computed<IPost[]>(() => postStore.posts);

const items = [{ label: "Inicio", urlPathName: "Home" }, { label: "Posts" }];
const columns = ["Título", "Descripción", "Imagen", "Posteado En"];

const currentPage = ref(1);
const itemsPerPage = 3;
const totalPages = computed(() => Math.ceil(posts.value.length / itemsPerPage));

const paginatedData = computed(() =>
  posts.value.slice(
    (currentPage.value - 1) * itemsPerPage,
    currentPage.value * itemsPerPage
  )
);

const pageChange = (page: number) => {
  currentPage.value = page;
};

onMounted(() => {
  postStore.getSocialNetworks();
});
</script>

<template>
  <Title title="Posts" :breadcrumbs="items" />
  <PostTable
    :columns="columns"
    :data="paginatedData"
    :pageChange="pageChange"
    :currentPage="currentPage"
    :totalPages="totalPages"
  />
</template>

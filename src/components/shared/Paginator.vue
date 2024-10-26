<script lang="ts" setup>
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  (e: "pageChange", page: number): void;
}>();

const pages = computed(() => {
  return Array.from({ length: props.totalPages }, (_, i) => i + 1);
});

const goToPage = (page: number) => {
  emit("pageChange", page);
};
</script>

<template>
  <div class="join">
    <button
      v-for="page in pages"
      :key="page"
      @click="goToPage(page)"
      :class="['join-item btn', { 'btn-active': page === props.currentPage }]"
    >
      {{ page }}
    </button>
  </div>
</template>

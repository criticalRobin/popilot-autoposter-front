<script lang="ts" setup>
import { useRouter } from "vue-router";
import { IBreadcrumb } from "../../interfaces/breadcrumb.interface";

defineProps<{
  items: IBreadcrumb[];
}>();

const router = useRouter();

const navigate = (urlPathName: string) => {
  router.push({ name: urlPathName });
};
</script>

<template>
  <div class="breadcrumbs text-sm">
    <ul>
      <li v-for="item in items">
        <a
          v-if="item.urlPathName"
          @click="navigate(item.urlPathName)"
          class="font-semibold text-moonstone"
          >{{ item.label }}</a
        >
        <span v-else="!item.urlPathName" class="font-semibold text-erieblack">{{
          item.label
        }}</span>
      </li>
    </ul>
  </div>
</template>

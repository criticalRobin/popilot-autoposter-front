<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import Paginator from "../shared/Paginator.vue";
import { useFilter } from "../../composables/useFilter";
import Searcher from "../shared/Searcher.vue";
import { IPost } from "../../interfaces/post.interface";
import { useRouter } from "vue-router";
import { useSocialNetworkStore } from "../../stores/socialNetworkStore";

const props = defineProps<{
  columns: string[];
  data: IPost[];
  pageChange: (page: number) => void;
  currentPage: number;
  totalPages: number;
}>();

const router = useRouter();
const socialNetworkStore = useSocialNetworkStore();

const filterText = ref("");

const filteredData = computed(() => {
  const { filteredData: newFilteredData } = useFilter(
    props.data,
    "title",
    filterText.value
  );
  return newFilteredData.value;
});

function getSocialNetworkNameAndType(id: number): string[] {
  let socialNetwork = socialNetworkStore.facebookAccounts.find(
    (sn) => sn.id === id
  );

  if (!socialNetwork) {
    socialNetwork = socialNetworkStore.instagramAccounts.find(
      (sn) => sn.id === id
    );
  }

  if (!socialNetwork) {
    socialNetwork = socialNetworkStore.xAccounts.find((sn) => sn.id === id);
  }

  return socialNetwork
    ? [socialNetwork.name, socialNetwork.social_network_type]
    : [];
}

function redirect() {
  router.push({ name: "NewPost" });
}

onMounted(() => {
  socialNetworkStore.getSocialNetworks();
});
</script>

<template>
  <div class="overflow-x-auto">
    <div class="flex justify-between">
      <Searcher placeholder="Buscar..." v-model="filterText" />
      <button
        @click="redirect()"
        type="button"
        class="btn bg-lapislazuli hover:bg-erieblack border-none w-44 text-white"
      >
        <i class="fa fa-id-badge text-xl"></i> Postear
      </button>
    </div>
    <table class="table w-full text-center">
      <thead>
        <tr class="border-b border-gray-300">
          <th v-for="(col, index) in columns" :key="index" class="text-center">
            {{ col }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredData" class="border-gray-300">
          <td>{{ item.title }}</td>
          <td>{{ item.description }}</td>
          <td>
            <div class="avatar">
              <div class="w-20 rounded-xl">
                <img :src="item.image_url" />
              </div>
            </div>
          </td>
          <td class="flex flex-col">
            <div v-for="sn in item.social_networks">
              <span
                v-if="getSocialNetworkNameAndType(sn)[1] === 'FB'"
                class="font-semibold text-lapislazuli"
                >{{ getSocialNetworkNameAndType(sn)[0] }}</span
              >
              <span
                v-if="getSocialNetworkNameAndType(sn)[1] === 'IG'"
                class="font-semibold text-ig"
                >{{ getSocialNetworkNameAndType(sn)[0] }}</span
              >
              <span
                v-if="getSocialNetworkNameAndType(sn)[1] === 'X'"
                class="font-semibold text-erieblack"
                >{{ getSocialNetworkNameAndType(sn)[0] }}</span
              >
            </div>
          </td>
        </tr>
      </tbody>
      <tfoot class="border-t border-gray-300 w-full">
        <tr>
          <td colspan="4" class="text-center py-2">
            <div class="flex justify-center items-center">
              <Paginator
                :currentPage="props.currentPage"
                :totalPages="props.totalPages"
                @pageChange="props.pageChange"
              />
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { IBaseSocialNetwork } from "../../interfaces/social-netowrk.interface";
import Paginator from "../shared/Paginator.vue";

const props = defineProps<{
  columns: string[];
  data: IBaseSocialNetwork[];
  onEdit: (item: IBaseSocialNetwork) => void;
  onDelete: (item: IBaseSocialNetwork) => void;
  pageChange: (page: number) => void;
  currentPage: number;
  totalPages: number;
}>();
</script>

<template>
  <div class="overflow-x-auto">
    <table class="table w-full text-center">
      <thead>
        <tr class="border-b border-gray-300">
          <th v-for="(col, index) in columns" :key="index" class="text-center">
            {{ col }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in data"
          :key="item.id || index"
          class="border-b border-gray-300"
        >
          <td>{{ item.name }}</td>
          <td>
            <div class="flex items-center gap-3 justify-center">
              <div class="avatar">
                <div class="mask mask-squircle h-12 w-12">
                  <img
                    v-if="item.social_network_type === 'FB'"
                    src="../../assets/face.png"
                    alt="Facebook Logo"
                  />
                  <img
                    v-else-if="item.social_network_type === 'IG'"
                    src="../../assets/ig.png"
                    alt="Instagram Logo"
                  />
                  <img v-else src="../../assets/x.jpg" alt="X Logo" />
                </div>
              </div>
              <div class="text-center">
                <div
                  v-if="item.social_network_type === 'FB'"
                  class="font-bold text-lapislazuli"
                >
                  Facebook
                </div>
                <div
                  v-else-if="item.social_network_type === 'IG'"
                  class="font-bold text-ig"
                >
                  Instagram
                </div>
                <div v-else class="font-bold text-erieblack">X</div>
                <div
                  v-if="
                    item.social_network_type === 'FB' ||
                    item.social_network_type === 'IG'
                  "
                  class="text-sm opacity-50"
                >
                  By Meta
                </div>
                <div v-else class="text-sm opacity-50">X(Twitter)</div>
              </div>
            </div>
          </td>
          <td class="text-center">
            {{ new Date(item.created_at).toLocaleDateString() }}
          </td>
          <td class="text-center flex justify-center gap-2">
            <button
              @click="props.onEdit(item)"
              class="btn btn-square text-erieblack bg-yellow-400 hover:bg-yellow-500"
            >
              <i class="fa fa-edit text-xl"></i>
            </button>
            <button
              @click="props.onDelete(item)"
              class="btn btn-square text-erieblack bg-red-400 hover:bg-red-500"
            >
              <i class="fa fa fa-trash text-xl"></i>
            </button>
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

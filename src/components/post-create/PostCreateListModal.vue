<script lang="ts" setup>
import { ref, computed } from "vue";
import { IBaseSocialNetwork } from "../../interfaces/social-network.interface";
import { useFilter } from "../../composables/useFilter";
import Searcher from "../shared/Searcher.vue";

const props = defineProps<{
  socialNetworks: IBaseSocialNetwork[];
}>();

const emit = defineEmits<{
  (e: "delete-social-network", sn: IBaseSocialNetwork): void;
}>();

const dialogRef = ref<HTMLDialogElement | null>(null);
const filterText = ref("");

const closeModal = () => {
  dialogRef.value?.close();
};

defineExpose({
  openModal() {
    dialogRef.value?.showModal();
  },
  closeModal,
});

const filteredData = computed(() => {
  const { filteredData: newFilteredData } = useFilter(
    props.socialNetworks,
    "name",
    filterText.value
  );
  return newFilteredData.value;
});

function deleteSocialNetwork(sn: IBaseSocialNetwork) {
  emit("delete-social-network", sn);
}
</script>

<template>
  <dialog
    ref="dialogRef"
    id="social_network_modal"
    class="modal-middle bg-transparent w-9/12"
  >
    <div class="modal-box">
      <form method="dialog">
        <button
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          @click="closeModal"
        >
          ✕
        </button>
      </form>

      <h3 class="text-lg text-erieblack font-semibold">
        Listado de redes sociales para postear
      </h3>
      <div class="overflow-x-auto">
        <Searcher placeholder="Buscar..." v-model="filterText" />
        <table class="table w-full text-center">
          <thead>
            <tr class="border-b border-gray-300">
              <th class="text-center">Nombre</th>
              <th class="text-center">Tipo</th>
              <th class="text-center">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in filteredData"
              :key="item.id || index"
              class="border-gray-300"
            >
              <td>{{ item.name }}</td>
              <td>
                <span
                  v-if="item.social_network_type === 'FB'"
                  class="font-bold text-lapislazuli"
                >
                  Facebook
                </span>
                <span
                  v-else-if="item.social_network_type === 'IG'"
                  class="font-bold text-ig"
                >
                  Instagram
                </span>
                <span v-else class="font-bold text-erieblack">X</span>
              </td>
              <td class="text-center flex justify-center gap-2">
                <button
                  @click="() => deleteSocialNetwork(item)"
                  class="btn btn-square text-erieblack bg-red-400 hover:bg-red-500"
                >
                  <i class="fa fa fa-trash text-xl"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </dialog>
</template>

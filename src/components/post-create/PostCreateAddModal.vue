<script lang="ts" setup>
import { ref, computed } from "vue";
import { IBaseSocialNetwork } from "../../interfaces/social-network.interface";
import { useFilter } from "../../composables/useFilter";
import { useSocialNetworkStore } from "../../stores/socialNetworkStore";
import Searcher from "../shared/Searcher.vue";

const dialogRef = ref<HTMLDialogElement | null>(null);
const filterText = ref("");

const emit = defineEmits<{
  (e: "add-social-network", sn: IBaseSocialNetwork): void;
}>();

const socialNetworkStore = useSocialNetworkStore();
const socialNetworks = computed<IBaseSocialNetwork[]>(() => [
  ...socialNetworkStore.facebookAccounts,
  ...socialNetworkStore.instagramAccounts,
  ...socialNetworkStore.xAccounts,
]);

const closeModal = () => {
  dialogRef.value?.close();
};

defineExpose({
  openModal() {
    socialNetworkStore.getSocialNetworks();
    dialogRef.value?.showModal();
  },
  closeModal,
});

const filteredData = computed(() => {
  const { filteredData: newFilteredData } = useFilter(
    socialNetworks.value,
    "name",
    filterText.value
  );
  return newFilteredData.value;
});

function addSocialNetwork(sn: IBaseSocialNetwork) {
  emit("add-social-network", sn); // Emitir el evento con el objeto de red social
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
        Listado de redes sociales para agregar
      </h3>
      <div class="overflow-x-auto">
        <Searcher placeholder="Buscar..." v-model="filterText" />
        <table class="table w-full text-center">
          <thead>
            <tr class="border-b border-gray-300">
              <th class="text-center">Nombre</th>
              <th class="text-center">Tipo</th>
              <th class="text-center">Agregar</th>
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
                  @click="addSocialNetwork(item)"
                  class="btn btn-square text-white bg-lapislazuli hover:bg-erieblack"
                >
                  <i class="fa fa-check text-xl"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </dialog>
</template>

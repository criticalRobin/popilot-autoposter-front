<script lang="ts" setup>
import { ref, defineExpose } from "vue";
import { useSocialNetworkStore } from "../../stores/socialNetworkStore";

const dialogRef = ref<HTMLDialogElement | null>(null);
const socialNetworkObjectRef: any = ref(null);
const socialNetworkTypeRef = ref("");

const socialNetworkStore = useSocialNetworkStore();

const closeModal = () => {
  dialogRef.value?.close();
};

defineExpose({
  openModal(socialNetworkObject: any | null) {
    dialogRef.value?.showModal();

    if (socialNetworkObject) {
      socialNetworkObjectRef.value = socialNetworkObject;
      socialNetworkTypeRef.value = socialNetworkObject.social_network_type;
    }
  },
  closeModal,
});

const deleteSocialNetwork = async () => {
  if (socialNetworkObjectRef.value) {
    await socialNetworkStore.deleteSocialNetwork(
      socialNetworkObjectRef.value.id
    );
    closeModal();
    socialNetworkStore.getSocialNetworks();
  }
};
</script>

<template>
  <dialog
    ref="dialogRef"
    id="delete_modal"
    class="modal-middle bg-transparent w-9/12"
  >
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <h3
        v-if="socialNetworkTypeRef === 'FB'"
        class="text-lg text-erieblack font-semibold"
      >
        Eliminar cuenta de Facebook:
        <span class="text-lapislazuli font-bold">{{
          socialNetworkObjectRef?.name
        }}</span>
      </h3>
      <h3
        v-else-if="socialNetworkTypeRef === 'IG'"
        class="text-lg text-erieblack font-semibold"
      >
        Eliminar cuenta de Instagram:
        <span class="text-ig font-bold">{{
          socialNetworkObjectRef?.name
        }}</span>
      </h3>
      <h3 v-else class="text-lg text-erieblack font-semibold">
        Eliminar cuenta de X:
        <span class="text-erieblack font-bold">{{
          socialNetworkObjectRef?.name
        }}</span>
      </h3>
      <p class="text-erieblack">Estas seguro de eliminar la red social?</p>
      <p class="text-erieblack">
        Recuerda que si la eliminas no la vas a poder recuperar
      </p>
      <button
        @click="deleteSocialNetwork"
        class="btn bg-lapislazuli hover:bg-powderblue hover:text-erieblack border-none w-full mt-4 text-white"
      >
        Eliminar <i class="fa fa-trash text-xl"></i>
      </button>
    </div>
  </dialog>
</template>

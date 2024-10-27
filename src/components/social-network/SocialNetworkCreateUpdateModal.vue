<script lang="ts" setup>
import { ref, defineExpose } from "vue";
import SocialNetworkForm from "./SocialNetworkForm.vue";

const dialogRef = ref<HTMLDialogElement | null>(null);
const socialNetworkTypeRef = ref("");
const socialNetworkObjectRef: any = ref(null);

const closeModal = () => {
  dialogRef.value?.close();
};

defineExpose({
  openModal(socialNetworkType: string, socialNetworkObject: any | null) {
    dialogRef.value?.showModal();
    socialNetworkTypeRef.value = socialNetworkType;

    if (socialNetworkObject) {
      socialNetworkObjectRef.value = socialNetworkObject;
    } else {
      socialNetworkObjectRef.value = null;
    }
  },
  closeModal,
});
</script>

<template>
  <dialog
    ref="dialogRef"
    id="sn_modal"
    class="modal-middle bg-transparent w-9/12"
  >
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <h3
        v-if="socialNetworkObjectRef !== null"
        class="text-lg text-erieblack font-semibold"
      >
        Editar Red Social
      </h3>
      <h3 v-else class="text-lg text-erieblack font-semibold">
        Crear Red Social
      </h3>
      <SocialNetworkForm
        :social-network-type="socialNetworkTypeRef"
        :social-network-object="
          socialNetworkObjectRef !== null ? socialNetworkObjectRef : null
        "
        @submitSuccess="closeModal"
      />
    </div>
  </dialog>
</template>

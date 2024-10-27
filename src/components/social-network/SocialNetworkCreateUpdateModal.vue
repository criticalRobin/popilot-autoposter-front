<script lang="ts" setup>
import { ref, defineExpose } from "vue";
import SocialNetworkForm from "./SocialNetworkForm.vue";

const dialogRef = ref<HTMLDialogElement | null>(null);
const socialNetworkTypeRef = ref("");

defineExpose({
  openModal(socialNetworkType: string) {
    dialogRef.value?.showModal();
    socialNetworkTypeRef.value = socialNetworkType;
  },
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
      <h3 class="text-lg text-erieblack font-semibold">Crear Red Social</h3>
      <SocialNetworkForm :social-network-type="socialNetworkTypeRef" />
    </div>
  </dialog>
</template>

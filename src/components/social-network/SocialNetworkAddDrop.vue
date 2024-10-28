<script lang="ts" setup>
import { ref } from "vue";
import SocialNetworkCreateUpdateModal from "./SocialNetworkCreateUpdateModal.vue";

const modalRef = ref<InstanceType<
  typeof SocialNetworkCreateUpdateModal
> | null>(null);

function openModal(socialNetworkType: string) {
  modalRef.value?.openModal(socialNetworkType, null);
}
</script>

<template>
  <details class="dropdown dropdown-end">
    <summary class="btn m-1 bg-lapislazuli hover:bg-erieblack text-white">
      <i class="fa fa-plus text-xl mt-1"></i> Nueva Red Social
    </summary>
    <ul
      class="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
    >
      <li @click="openModal('FB')"><a>Facebook</a></li>
      <li @click="openModal('IG')"><a>Instagram</a></li>
      <li @click="openModal('X')"><a>X</a></li>
    </ul>
  </details>
  <SocialNetworkCreateUpdateModal ref="modalRef" />
</template>

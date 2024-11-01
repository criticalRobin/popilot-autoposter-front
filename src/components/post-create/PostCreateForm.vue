<script lang="ts" setup>
import { ref } from "vue";
import { useAuthStore } from "../../stores/authStore";
import PostCreateAddModal from "./PostCreateAddModal.vue";
import PostCreateListModal from "./PostCreateListModal.vue";
import { IBaseSocialNetwork } from "../../interfaces/social-network.interface";
import { usePostStore } from "../../stores/postStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const postStore = usePostStore();
const router = useRouter();
const title = ref("");
const description = ref("");
const scheduledAt = ref("");
const image = ref<File | null>(null);
const socialNetworks = ref<IBaseSocialNetwork[]>([]);
const addModalRef = ref<InstanceType<typeof PostCreateAddModal> | null>(null);
const listModalRef = ref<InstanceType<typeof PostCreateListModal> | null>(null);

function openAddModal() {
  addModalRef.value?.openModal();
}

function closeAddModal() {
  addModalRef.value?.closeModal();
}

function openListModal() {
  listModalRef.value?.openModal();
}

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target && target.files && target.files[0]) {
    image.value = target.files[0];
  }
};

const addSocialNetwork = (sn: IBaseSocialNetwork) => {
  if (!socialNetworks.value.some((n) => n.id === sn.id)) {
    socialNetworks.value.push(sn);
    closeAddModal();
    openListModal();
  }
};

const deleteSocialNetwork = (sn: IBaseSocialNetwork) => {
  socialNetworks.value = socialNetworks.value.filter((n) => n.id !== sn.id);
};

const handleSubmit = async () => {
  const socialNetworksIdArray = socialNetworks.value.map((sn) => sn.id);

  const formData = new FormData();
  formData.append("title", title.value);
  formData.append("description", description.value);
  if (scheduledAt.value !== "") {
    formData.append("scheduled_at", scheduledAt.value);
  }
  socialNetworksIdArray.forEach((id) =>
    formData.append("social_networks", id!.toString())
  );
  if (image.value) {
    formData.append("image", image.value);
  }

  await postStore.createPost(formData);
};
</script>

<template>
  <form
    ref="formRef"
    @submit.prevent="handleSubmit"
    class="flex flex-col justify-center items-center"
  >
    <label class="form-control w-full max-w-xs">
      <div class="label">
        <span class="label-text text-moonstone">Título del post</span>
      </div>
      <input
        type="text"
        placeholder="Título"
        class="input input-bordered w-full max-w-xs"
        required
        v-model="title"
      />
    </label>
    <label class="form-control w-full max-w-xs">
      <div class="label">
        <span class="label-text text-moonstone">Descripción del post</span>
      </div>
      <input
        type="text"
        placeholder="Descripción"
        class="input input-bordered w-full max-w-xs"
        required
        v-model="description"
      />
    </label>
    <label v-if="authStore.isPremiumUser" class="form-control w-full max-w-xs">
      <div class="label">
        <span class="label-text text-moonstone">Fecha de Posteo</span>
      </div>
      <input
        type="datetime-local"
        class="input input-bordered w-full max-w-xs"
        required
        v-model="scheduledAt"
      />
    </label>
    <label class="form-control w-full max-w-xs">
      <div class="label">
        <span class="label-text text-moonstone">Redes Sociales</span>
      </div>
      <div class="flex flex-col w-full max-w-xs gap-4">
        <button
          type="button"
          @click="openListModal"
          class="btn bg-erieblack hover:bg-lapislazuli border-none w-full text-white"
        >
          Listado <i class="fa fa-reorder text-xl mt-1"></i>
        </button>
        <button
          type="button"
          @click="openAddModal"
          class="btn bg-erieblack hover:bg-lapislazuli border-none w-full text-white"
        >
          Agregar <i class="fa fa-plus text-xl mt-1"></i>
        </button>
      </div>
    </label>
    <label class="form-control w-full max-w-xs">
      <div class="label">
        <span class="label-text text-moonstone">Imagen</span>
      </div>
      <input
        type="file"
        class="file-input file-input-bordered w-full max-w-xs"
        required
        @change="handleFileChange"
      />
    </label>
    <button
      type="submit"
      class="btn bg-lapislazuli hover:bg-erieblack border-none w-full max-w-xs mt-2 text-white"
    >
      Guardar <i class="fa fa-save text-xl"></i>
    </button>
  </form>
  <PostCreateAddModal
    ref="addModalRef"
    @add-social-network="addSocialNetwork"
  />
  <PostCreateListModal
    ref="listModalRef"
    :social-networks="socialNetworks"
    @delete-social-network="deleteSocialNetwork"
  />
</template>

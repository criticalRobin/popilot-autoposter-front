<script lang="ts" setup>
import { ref, onBeforeUnmount, watch } from "vue";
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
const imagePreviewUrl = ref<string | null>(null);
const socialNetworks = ref<IBaseSocialNetwork[]>([]);
const addModalRef = ref<InstanceType<typeof PostCreateAddModal> | null>(null);
const listModalRef = ref<InstanceType<typeof PostCreateListModal> | null>(null);

const emit = defineEmits(["showAlert"]);

watch(image, (newImage) => {
  if (newImage) {
    imagePreviewUrl.value = URL.createObjectURL(newImage);
  } else {
    imagePreviewUrl.value = null;
  }
});

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

  try {
    router.push({ name: "Loading" });
    await postStore.createPost(formData);
  } catch (error) {
    emit("showAlert", {
      status: "error",
      message: "Error al crear el post",
    });
    router.push({ name: "Post" });
  } finally {
    router.push({ name: "Post" });
  }
};

onBeforeUnmount(() => {
  if (image.value) {
    URL.revokeObjectURL(imagePreviewUrl.value!);
  }
});
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
    <label v-if="authStore.isPremiumUser" class="form-control">
      <div class="label">
        <span class="label-text text-moonstone ml-4">Previsualización</span>
      </div>
      <div class="mockup-phone">
        <div class="camera"></div>
        <div class="display">
          <div
            class="artboard artboard-demo phone-1 flex flex-col justify-center items-center"
          >
            <div
              class="relative w-full max-w-md bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden"
            >
              <div class="flex items-center px-2 py-4">
                <div>
                  <h3 class="text-lg font-semibold text-lapislazuli">
                    {{ authStore.user?.username }}
                  </h3>
                  <p class="text-xs text-gray-500">Hace 5 minutos</p>
                </div>
              </div>
              <img
                v-if="imagePreviewUrl"
                :src="imagePreviewUrl"
                alt="Post Image"
                class="w-full h-72 object-cover"
              />
              <div class="p-2">
                <h2 class="text-xl font-semibold text-lapislazuli truncate">
                  {{ title }}
                </h2>
                <p class="text-sm text-erieblack mt-1">{{ description }}</p>
              </div>
              <div class="flex justify-between border-t border-gray-200 p-2">
                <button
                  disabled
                  class="flex items-center text-moonstone hover:text-lapislazuli"
                >
                  <i class="fa fa-heart"></i>
                  <span class="ml-1">Me gusta</span>
                </button>
                <button
                  disabled
                  class="flex items-center text-moonstone hover:text-lapislazuli"
                >
                  <i class="fa fa-comment"></i>
                  <span class="ml-1">Comentar</span>
                </button>
                <button
                  disabled
                  class="flex items-center text-moonstone hover:text-lapislazuli"
                >
                  <i class="fa fa-share"></i>
                  <span class="ml-1">Compartir</span>
                </button>
              </div>
              <div class="p-4 border-t border-gray-200">
                <h4 class="font-semibold text-erieblack">Comentarios:</h4>
                <div class="mt-2">
                  <div class="flex items-start mb-2">
                    <img
                      src="../../assets/user-logo.png"
                      alt="Commenter Picture"
                      class="w-8 h-8 rounded-full mr-2"
                    />
                    <div>
                      <span class="font-semibold text-erieblack">Comentador123:</span>
                      <span class="text-sm text-erieblack"
                        > Gran publicación!</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </label>
    <button
      type="submit"
      class="btn bg-lapislazuli hover:bg-erieblack border-none w-full max-w-xs mt-4 text-white"
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

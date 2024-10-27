<script lang="ts" setup>
import { ref } from "vue";
import {
  IFacebook,
  IInstagram,
  IX,
} from "../../interfaces/social-network.interface";
import { useSocialNetworkStore } from "../../stores/socialNetworkStore";

const props = defineProps<{
  socialNetworkType: string;
}>();

const name = ref("");
const pageId = ref("");
const accessToken = ref("");
const username = ref("");
const password = ref("");
const accessKey = ref("");
const accessSecret = ref("");
const consumerKey = ref("");
const consumerSecret = ref("");
const bearerToken = ref("");

const socialNetworkStore = useSocialNetworkStore();

const handleSubmit = async () => {
  let socialNetwork: IFacebook | IInstagram | IX | null = null;

  if (props.socialNetworkType === "FB") {
    socialNetwork = {
      social_network_type: props.socialNetworkType,
      name: name.value,
      page_id: pageId.value,
      page_access_token: accessToken.value,
    };
  }

  if (props.socialNetworkType === "IG") {
    socialNetwork = {
      social_network_type: props.socialNetworkType,
      name: name.value,
      username: username.value,
      password: password.value,
    };
  }

  if (props.socialNetworkType === "X") {
    socialNetwork = {
      social_network_type: props.socialNetworkType,
      name: name.value,
      access_key: accessKey.value,
      access_secret: accessSecret.value,
      consumer_key: consumerKey.value,
      consumer_secret: consumerSecret.value,
      bearer_token: bearerToken.value,
    };
  }

  await socialNetworkStore.createSocialNetwork(socialNetwork);
};
</script>

<template>
  <form
    @submit.prevent="handleSubmit"
    class="flex flex-col justify-center items-center"
  >
    <label class="form-control w-full max-w-xs">
      <div class="label">
        <span class="label-text text-moonstone">Nombre de la red social</span>
      </div>
      <input
        type="text"
        placeholder="Nombre"
        class="input input-bordered w-full max-w-xs"
        required
        v-model="name"
      />
    </label>
    <label
      v-if="props.socialNetworkType === 'FB'"
      class="form-control w-full max-w-xs"
    >
      <div class="label">
        <span class="label-text text-moonstone">ID de la Página</span>
      </div>
      <input
        type="text"
        placeholder="ID Página"
        class="input input-bordered w-full max-w-xs"
        required
        v-model="pageId"
      />
    </label>
    <label
      v-if="props.socialNetworkType === 'FB'"
      class="form-control w-full max-w-xs"
    >
      <div class="label">
        <span class="label-text text-moonstone">Token de Acceso</span>
      </div>
      <input
        type="text"
        placeholder="Token"
        class="input input-bordered w-full max-w-xs"
        required
        v-model="accessToken"
      />
    </label>
    <label
      v-if="props.socialNetworkType === 'IG'"
      class="form-control w-full max-w-xs"
    >
      <div class="label">
        <span class="label-text text-moonstone">Nombre de Usuario</span>
      </div>
      <input
        type="text"
        placeholder="Username"
        class="input input-bordered w-full max-w-xs"
        required
        v-model="username"
      />
    </label>
    <label
      v-if="props.socialNetworkType === 'IG'"
      class="form-control w-full max-w-xs"
    >
      <div class="label">
        <span class="label-text text-moonstone">Contraseña de la Cuenta</span>
      </div>
      <input
        type="text"
        placeholder="Contraseña"
        class="input input-bordered w-full max-w-xs"
        required
        v-model="password"
      />
    </label>
    <label
      v-if="props.socialNetworkType === 'X'"
      class="form-control w-full max-w-xs"
    >
      <div class="label">
        <span class="label-text text-moonstone">Llave de Acceso</span>
      </div>
      <input
        type="text"
        placeholder="Llave"
        class="input input-bordered w-full max-w-xs"
        required
        v-model="accessKey"
      />
    </label>
    <label
      v-if="props.socialNetworkType === 'X'"
      class="form-control w-full max-w-xs"
    >
      <div class="label">
        <span class="label-text text-moonstone">Llave de Acceso Secreta</span>
      </div>
      <input
        type="text"
        placeholder="Llave Secreta"
        class="input input-bordered w-full max-w-xs"
        required
        v-model="accessSecret"
      />
    </label>
    <label
      v-if="props.socialNetworkType === 'X'"
      class="form-control w-full max-w-xs"
    >
      <div class="label">
        <span class="label-text text-moonstone">Llave de Consumidor</span>
      </div>
      <input
        type="text"
        placeholder="Llave"
        class="input input-bordered w-full max-w-xs"
        required
        v-model="consumerKey"
      />
    </label>
    <label
      v-if="props.socialNetworkType === 'X'"
      class="form-control w-full max-w-xs"
    >
      <div class="label">
        <span class="label-text text-moonstone"
          >Llave de Consumidor Secreta</span
        >
      </div>
      <input
        type="text"
        placeholder="Llave Secreta"
        class="input input-bordered w-full max-w-xs"
        required
        v-model="consumerSecret"
      />
    </label>
    <label
      v-if="props.socialNetworkType === 'X'"
      class="form-control w-full max-w-xs"
    >
      <div class="label">
        <span class="label-text text-moonstone">Bearer Token</span>
      </div>
      <input
        type="text"
        placeholder="Token"
        class="input input-bordered w-full max-w-xs"
        required
        v-model="bearerToken"
      />
    </label>
    <button
      class="btn bg-lapislazuli hover:bg-powderblue hover:text-erieblack border-none w-5/12 mt-4 text-white"
    >
      Guardar <i class="fa fa-save text-xl"></i>
    </button>
  </form>
</template>

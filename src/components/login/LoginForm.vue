<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../../stores/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
const username = ref("");
const password = ref("");

onMounted(() => {
  authStore.loadFromLocalStorage();

  if (authStore.isLogged) {
    router.push("/home");
  }
});

const handleSubmit = async () => {
  await authStore.login({ username: username.value, password: password.value });

  if (authStore.isLogged) {
    console.log(authStore.user);
    router.push("/home");
  }
};
</script>

<template>
  <form
    @submit.prevent="handleSubmit"
    class="px-32 py-10 flex flex-col justify-center items-center"
  >
    <label class="form-control w-full max-w-xs">
      <div class="label">
        <span class="label-text text-moonstone"
          >Cual es tu nombre de usuario?</span
        >
      </div>
      <input
        type="text"
        placeholder="Usuario"
        class="input input-bordered w-full max-w-xs"
        required
        v-model="username"
      />
    </label>
    <label class="form-control w-full max-w-xs">
      <div class="label">
        <span class="label-text text-moonstone">Cual es tu contraseña?</span>
      </div>
      <input
        type="password"
        placeholder="Contraseña"
        class="input input-bordered w-full max-w-xs"
        required
        v-model="password"
      />
    </label>
    <button
      class="btn bg-lapislazuli hover:bg-powderblue hover:text-erieblack border-none w-full max-w-xs mt-12 text-white"
    >
      Iniciar Sesión <i class="fa fa-sign-in text-xl"></i>
    </button>
  </form>
</template>

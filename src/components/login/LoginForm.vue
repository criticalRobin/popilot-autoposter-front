<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../../stores/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
const username = ref("");
const password = ref("");

const emit = defineEmits(["showAlert"]);

onMounted(() => {
  authStore.loadFromLocalStorage();

  if (authStore.isLogged) {
    router.push("/home");
  }
});

const redirectToRegister = () => {
  router.push({ name: "Register" });
};

const handleSubmit = async () => {
  try {
    await authStore.login({
      username: username.value,
      password: password.value,
    });

    if (authStore.isLogged) {
      emit("showAlert", {
        status: "success",
        message: "Inicio de sesión exitoso",
      });
      router.push({ name: "Home" });
    }
  } catch (error) {
    emit("showAlert", {
      status: "error",
      message: "Error al iniciar sesión",
    });
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
    <span
      @click="redirectToRegister"
      class="text-sm text-powderblue hover:text-moonstone pt-2 cursor-pointer"
      >No tienes cuenta? Registrate</span
    >
    <button
      class="btn bg-lapislazuli hover:bg-moonstone hover:text-erieblack border-none w-full max-w-xs mt-6 text-white"
    >
      Iniciar Sesión <i class="fa fa-sign-in text-xl"></i>
    </button>
  </form>
</template>

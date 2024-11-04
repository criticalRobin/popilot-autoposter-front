<script lang="ts" setup>
import { ref } from "vue";
import { useAuthStore } from "../../stores/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
const username = ref("");
const email = ref("");
const password = ref("");

const emit = defineEmits(["showAlert"]);

const redirectToLogin = () => {
  router.push({ name: "Login" });
};

const handleSubmit = async () => {
  try {
    await authStore.createUser({
      username: username.value,
      email: email.value,
      password: password.value,
    });

    if (authStore.createdUser) {
      emit("showAlert", {
        status: "success",
        message: "Usuario creado exitosamente",
      });

      await authStore.login({
        username: username.value,
        password: password.value,
      });

      if (authStore.isLogged) {
        router.push({ name: "Home" });
      } else {
        router.push({ name: "Login" });
      }
    }
  } catch (error) {
    emit("showAlert", {
      status: "error",
      message: "Ha ocurrido un error al crear el usuario",
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
          >Usa un nombre de usuario genial</span
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
        <span class="label-text text-moonstone">Ingresa tu correo</span>
      </div>
      <input
        type="email"
        placeholder="Correo"
        class="input input-bordered w-full max-w-xs"
        required
        v-model="email"
      />
    </label>
    <label class="form-control w-full max-w-xs">
      <div class="label">
        <span class="label-text text-moonstone"
          >Crea una contraseña segura (min. 6 caracteres)</span
        >
      </div>
      <input
        minlength="6"
        type="password"
        placeholder="Contraseña"
        class="input input-bordered w-full max-w-xs"
        required
        v-model="password"
      />
    </label>
    <span
      @click="redirectToLogin"
      class="text-sm text-powderblue hover:text-moonstone pt-2 cursor-pointer"
      >Ya tienes cuenta? Inicia Sesión</span
    >
    <button
      class="btn bg-lapislazuli hover:bg-moonstone hover:text-erieblack border-none w-full max-w-xs mt-6 text-white"
    >
      Registrarse <i class="fa fa-user-plus text-xl"></i>
    </button>
  </form>
</template>

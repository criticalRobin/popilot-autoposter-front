<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useSuccessStore } from "../../stores/successStore";

const successStore = useSuccessStore();
const router = useRouter();

const handleContinue = async () => {
  await successStore.updateUserPremiumStatus();

  router.push({ name: "Home" });
};
</script>

<template>
  <div
    class="bg-white rounded-xl px-12 text-center h-3/5 w-3/5 flex flex-col justify-center"
  >
    <div class="flex flex-col flex-1 justify-center">
      <span class="text-3xl mt-1 mb-1">👑</span>
      <span class="text-lapislazuli font-semibold text-lg">
        Ahora eres un usuario premium!
      </span>
      <span class="text-erieblack">
        Gracias por confiar en nosotros, ahora puedes disfrutar de todas las
        ventajas de ser un usuario premium.
      </span>
    </div>
    <div class="flex flex-row mt-4">
      <div class="basis-5/12">
        <img
          src="../../assets/purchase.svg"
          alt="payment-image"
          class="object-cover"
        />
      </div>
      <div
        class="flex flex-col items-start py-4 px-4 gap-2 shadow-md rounded-xl mb-4 basis-7/12"
      >
        <span class="text-erieblack font-bold text-2xl">Tu plan actual</span>
        <p class="text-start text-erieblack">
          Con tu plan actual puedes disfrutar de los siguientes beneficios:
        </p>
        <ul class="flex flex-col items-start mt-1">
          <li class="text-moonstone font-semibold">
            <i class="fa fa-check"></i> Gestión de tus redes sociales
          </li>
          <li class="text-moonstone font-semibold">
            <i class="fa fa-check"></i> Agendar posts a tus redes
          </li>
          <li class="text-moonstone font-semibold">
            <i class="fa fa-check"></i> Preview de tus posts
          </li>
          <li class="text-moonstone font-semibold">
            <i class="fa fa-check"></i> Beneficios standard
          </li>
        </ul>
        <div class="flex flex-col items-start mt-1">
          <span class="text-erieblack font-bold text-3xl">$10</span>
          <span class="text-powderblue font-semibold text-xs"
            >Monto pagado</span
          >
        </div>
        <button
          type="button"
          @click="handleContinue"
          class="btn bg-lapislazuli hover:bg-erieblack border-none w-32 text-white"
        >
          <i class="fa fa-heart text-md mt-1"></i> Continuar
        </button>
      </div>
    </div>
  </div>
</template>

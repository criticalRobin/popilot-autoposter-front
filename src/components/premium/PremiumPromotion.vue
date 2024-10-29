<script lang="ts" setup>
import { createCheckoutSession } from "../../services/paymentService";

const goToCheckout = () => {
  createCheckoutSession();
};
</script>

<template>
  <div
    class="bg-white rounded-xl px-12 text-center h-full w-3/5 flex flex-col justify-center"
  >
    <div class="flex flex-col flex-1 justify-center">
      <span class="text-3xl mt-1 mb-1">👑</span>
      <span class="text-lapislazuli font-semibold text-lg">
        Conviertete en Premium
      </span>
      <span class="text-erieblack">
        No te conformes con lo que ofrece tu cuenta gratuita, llévala al
        siguiente nivel 🚀!
      </span>
    </div>
    <div class="flex flex-row mt-4">
      <div class="basis-3/5">
        <img
          src="../../assets/payment.svg"
          alt="payment-image"
          class="object-cover"
        />
      </div>
      <div
        class="flex flex-col items-start py-4 px-4 gap-2 shadow-md rounded-xl mb-4 basis-2/5"
      >
        <span class="text-erieblack font-bold text-2xl">Premium</span>
        <p class="text-start text-erieblack">
          Con una cuenta premium vas a tener acceso a las siguientes
          características de PoPilot:
        </p>
        <ul class="flex flex-col items-start mt-1">
          <li class="text-moonstone font-semibold">
            <i class="fa fa-check"></i> Gestión de tus redes sociales
          </li>
          <li class="text-moonstone font-semibold">
            <i class="fa fa-check"></i> Agendar posts a tus redes
          </li>
          <li class="text-moonstone font-semibold">
            <i class="fa fa-check"></i> Estadísticas de tus redes
          </li>
          <li class="text-moonstone font-semibold">
            <i class="fa fa-check"></i> Beneficios standard
          </li>
        </ul>
        <div class="flex flex-col items-start mt-1">
          <span class="text-erieblack font-bold text-3xl">$10</span>
          <span class="text-powderblue font-semibold text-xs"
            >Un solo pago!</span
          >
        </div>
        <button
          type="button"
          @click="goToCheckout"
          class="btn bg-lapislazuli hover:bg-erieblack border-none w-32 text-white"
        >
          <i class="fa fa-credit-card text-md mt-1"></i> Ir a Pagar
        </button>
      </div>
    </div>
  </div>
</template>

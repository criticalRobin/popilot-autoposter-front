import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useAuthStore } from "../stores/authStore";

const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const BASE_API_URL = import.meta.env.VITE_API_URL;
const authStore = useAuthStore();

export const createCheckoutSession = async () => {
  try {
    const successURL = `${window.location.origin}/success`;
    const cancelURL = `${window.location.origin}/home`;

    const response = await axios.post(
      `${BASE_API_URL}payment/create-checkout-session/`,
      {
        items: [{ price: "price_1QF2gHFMrc1eZvoEPGMFkPGq", quantity: 1 }],
        successURL,
        cancelURL,
      },
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      }
    );

    const { sessionId } = response.data;

    return stripe?.redirectToCheckout({ sessionId });
  } catch (error) {
    console.error("Error en la sesión de Stripe Checkout:", error);
  }
};

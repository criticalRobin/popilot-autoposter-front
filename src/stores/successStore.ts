import { defineStore } from "pinia";
import { successService } from "../services/successService";
import { authService } from "../services/authService";
import { useAuthStore } from "./authStore";
import { ILoggedUser } from "../interfaces/auth.interface";

export const useSuccessStore = defineStore("success", () => {
  const authStore = useAuthStore();

  const updateUserPremiumStatus = async () => {
    try {
      await successService.updateUserIsPremiumStatus();

      const loggedUser: ILoggedUser = await authService.getLoggedUser(
        localStorage.getItem("token")
      );
      authStore.user = loggedUser;
      authStore.isPremiumUser = loggedUser.is_premium_user;

      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(loggedUser));
    } catch (e) {
      console.error(e);
    }
  };

  return {
    updateUserPremiumStatus,
  };
});

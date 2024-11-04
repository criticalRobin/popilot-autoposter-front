import { defineStore } from "pinia";
import { ref } from "vue";
import { authService } from "../services/authService";
import { IAuth, ILoggedUser } from "../interfaces/auth.interface";
import { useRouter } from "vue-router";
import { IUser } from "../interfaces/user.interface";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<ILoggedUser | null>(null);
  const token = ref<string | null>(null);
  const isLogged = ref<boolean | null>(false);
  const isPremiumUser = ref<boolean | null>(false);
  const createdUser = ref<IUser | null>(null);
  const router = useRouter();

  const loadFromLocalStorage = () => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken) {
      token.value = storedToken;
      isLogged.value = true;
    }
    if (storedUser) {
      user.value = JSON.parse(storedUser);
      isPremiumUser.value = user.value?.is_premium_user || false;
    }
  };

  const login = async (authData: IAuth) => {
    try {
      const authResponseData = await authService.login(authData);
      token.value = authResponseData.access;
      isLogged.value = true;

      if (token.value) {
        const loggedUser = await authService.getLoggedUser(token.value);
        user.value = loggedUser;
        isPremiumUser.value = loggedUser.is_premium_user;

        localStorage.setItem("token", token.value);
        localStorage.setItem("user", JSON.stringify(loggedUser));
      }
    } catch (e) {
      throw e;
    }
  };

  const createUser = async (user: IUser) => {
    try {
      await authService.createUser(user);
      createdUser.value = user;
    } catch (e) {
      throw e;
    }
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    isLogged.value = false;
    isPremiumUser.value = false;

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  return {
    user,
    token,
    isLogged,
    isPremiumUser,
    createdUser,
    login,
    logout,
    loadFromLocalStorage,
    createUser,
  };
});

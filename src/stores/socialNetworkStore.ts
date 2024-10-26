import { defineStore } from "pinia";
import {
  IFacebook,
  IInstagram,
  IX,
} from "../interfaces/social-netowrk.interface";
import { ref } from "vue";
import { socialNetworkService } from "../services/socialNetworkService";

export const useSocialNetworkStore = defineStore("socialNetwork", () => {
  const facebookAccounts = ref<IFacebook[]>([]);
  const instagramAccounts = ref<IInstagram[]>([]);
  const xAccounts = ref<IX[]>([]);

  const getSocialNetworks = async () => {
    const data = await socialNetworkService.getSocialNetworks();

    facebookAccounts.value = data.facebook_accounts;
    instagramAccounts.value = data.instagram_accounts;
    xAccounts.value = data.x_accounts;
  };

  return {
    facebookAccounts,
    instagramAccounts,
    xAccounts,
    getSocialNetworks,
  };
});

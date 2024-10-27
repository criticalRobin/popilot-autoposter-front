import { defineStore } from "pinia";
import {
  IFacebook,
  IInstagram,
  IX,
} from "../interfaces/social-network.interface";
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

  const createSocialNetwork = async (socialNetwork: any) => {
    try {
      await socialNetworkService.createSocialNetwork(socialNetwork);
    } catch (e) {
      console.error(e);
    }
  };

  const updateSocialNetwork = async (id: number, socialNetwork: any) => {
    try {
      await socialNetworkService.updateSocialNetwork(id, socialNetwork);
    } catch (e) {
      console.error(e);
    }
  };

  return {
    facebookAccounts,
    instagramAccounts,
    xAccounts,
    getSocialNetworks,
    createSocialNetwork,
    updateSocialNetwork,
  };
});

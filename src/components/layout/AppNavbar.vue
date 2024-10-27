<script lang="ts" setup>
import { useAuthStore } from "../../stores/authStore";

const authStore = useAuthStore();
</script>

<template>
  <div class="navbar bg-white">
    <div class="flex-1">
      <a class="btn btn-ghost text-2xl font-bold text-erieblack">PoPilot</a>
    </div>
    <div class="flex-none gap-2">
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img alt="user-avatar" src="../../assets/user-logo.png" />
          </div>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-36 p-2 shadow"
        >
          <button @click="authStore.logout()" class="btn">
            <i class="fa fa-home text-xl mr-3"></i>
            Logout
          </button>
        </ul>
      </div>
    </div>
  </div>
</template>

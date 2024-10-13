<script lang="ts" setup></script>

<template>
  <div class="navbar bg-white">
    <div class="flex-1">
      <a class="btn btn-ghost text-2xl font-bold text-erieblack">PoPilot</a>
    </div>
    <div class="flex-none gap-2">
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img
              alt="user-avatar"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-powderblue rounded-box z-[1] mt-3 w-36 p-2 shadow"
        >
          <li><a class="text-erieblack font-semibold">Cerrar Sesión</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

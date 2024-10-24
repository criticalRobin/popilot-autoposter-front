import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import BaseLayout from "../layouts/BaseLayout.vue";
import { useAuthStore } from "../stores/authStore";

const routes = [
  {
    path: "/",
    component: LoginView,
    name: "Login",
  },
  {
    path: "/home",
    component: () => BaseLayout,
    children: [
      {
        path: "",
        component: () => HomeView,
        name: "Home",
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isLogged) {
    next({ path: "/" });
  } else {
    next();
  }
});

export default router;

import { createMemoryHistory, createRouter } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";

const routes: any = [
  {
    path: "/",
    component: LoginView,
  },
  {
    path: "/home",
    component: HomeView,
  },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;

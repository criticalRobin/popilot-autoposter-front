import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/authStore";

const HomeView = () => import("../views/HomeView.vue");
const LoginView = () => import("../views/LoginView.vue");
const RegisterView = () => import("../views/RegisterView.vue");
const SuccessView = () => import("../views/SuccessView.vue");
const LoadingView = () => import("../views/LoadingView.vue");
const SocialNetworkView = () => import("../views/SocialNetworkView.vue");
const PostView = () => import("../views/PostView.vue");
const PostCreateView = () => import("../views/PostCreateView.vue");
const PremiumView = () => import("../views/PremiumView.vue");
const BaseLayout = () => import("../layouts/BaseLayout.vue");

const routes = [
  {
    path: "/",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/success",
    name: "Success",
    component: SuccessView,
    meta: { requiresAuth: true },
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterView,
  },
  {
    path: "/loading",
    name: "Loading",
    component: LoadingView,
    meta: { requiresAuth: true },
  },
  {
    path: "/home",
    component: BaseLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "Home",
        component: HomeView,
      },
      {
        path: "social-network",
        name: "SocialNetwork",
        component: SocialNetworkView,
        meta: { requiresAuth: true },
      },
      {
        path: "post",
        name: "Post",
        component: PostView,
        meta: { requiresAuth: true },
      },
      {
        path: "newpost",
        name: "NewPost",
        component: PostCreateView,
        meta: { requiresAuth: true },
      },
      {
        path: "premium",
        name: "Premium",
        component: PremiumView,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.path === "/success") {
    next();
  } else if (to.meta.requiresAuth && !authStore.isLogged) {
    next({ path: "/" });
  } else {
    next();
  }
});

export default router;

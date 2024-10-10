import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

import authRouter from "../modules/auth/router";
import daybookRouter from "../modules/daybook/router";
import {
  isAuthenticatedGuard,
  isAuthenticated,
} from "@/modules/auth/router/auth-guard";

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/auth",
    name: "auth",
    beforeEnter: [isAuthenticated],
    ...authRouter,
  },
  {
    path: "/",
    beforeEnter: [isAuthenticatedGuard],
    ...daybookRouter,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

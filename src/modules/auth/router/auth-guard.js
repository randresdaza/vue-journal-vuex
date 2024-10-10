import store from "@/store";
import { useRouter } from "vue-router";

export const isAuthenticatedGuard = async (to, from, next) => {
  const { ok } = await store.dispatch("auth/checkAuthentication");

  if (ok) next();
  else next({ name: "login" });
};

export const isAuthenticated = () => {
  const router = useRouter();

  const refresh = localStorage.getItem("refreshToken");

  if (refresh) {
    return router.push({ name: "daybook" });
  }
};

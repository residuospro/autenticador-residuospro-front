import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Register from "@/containers/RegisterContainer.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/cadastro/:params/:id",
    name: "Cadastro",
    component: Register,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

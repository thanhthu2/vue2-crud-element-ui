import Vue from "vue";
import VueRouter from "vue-router";
import { routesName } from "./routes-name";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: routesName.USERS_MANAGEMENT,
    component: () => import("@/modules/pages/UsersManagement.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;

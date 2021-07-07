import Vue from "vue";
import VueRouter from "vue-router";
import LemonSoursIndex from "@/components/pages/LemonSoursIndex.vue";
import LemonSour from "@/components/pages/LemonSour.vue";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   name: "top",
  //   component: Index,
  // },
  {
    path: "/lemon_sours",
    name: "lemonSoursIndex",
    component: LemonSoursIndex,
  },
  {
    path: "/lemon_sours/:id",
    name: "lemonSour",
    component: LemonSour,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

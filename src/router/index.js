import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/components/pages/Home";
import LemonSoursIndex from "@/components/pages/LemonSoursIndex";
import LemonSour from "@/components/pages/LemonSour";
import User from "@/components/pages/User";
import RouterAuth from "@/modules/router-auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
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
  {
    path: "/users/:id",
    name: "user",
    component: User,
    beforeEnter: (to, from, next) => {
      RouterAuth.guardAccessToUser(Vue, to, from, next);
    },
    props: { currentUser: RouterAuth.currentUser },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

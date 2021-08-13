import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/components/pages/Home";
import AgeConfirmation from "@/components/pages/AgeConfirmation";
import LemonSoursIndex from "@/components/pages/LemonSoursIndex";
import LemonSour from "@/components/pages/LemonSour";
import User from "@/components/pages/User";
import UserPasswordReset from "@/components/pages/UserPasswordReset";
import Calculation from "@/components/pages/Calculation";
import DrinkingRecord from "@/components/pages/DrinkingRecord";
import RouterAuth from "@/modules/router-auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/age_confirmation",
    name: "ageConfirmation",
    component: AgeConfirmation,
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
      RouterAuth.guardAccessToPageRequiresAuth(Vue, to, from, next);
    },
    props: { currentUser: RouterAuth.currentUser },
  },
  {
    path: "/user/password_reset",
    name: "userPasswordReset",
    component: UserPasswordReset,
  },
  {
    path: "/calculation",
    name: "calculation",
    component: Calculation,
    props: true,
  },
  {
    path: "/drinking_records/:id",
    name: "drinkingRecord",
    component: DrinkingRecord,
    beforeEnter: (to, from, next) => {
      RouterAuth.guardAccessToPageRequiresAuth(Vue, to, from, next);
    },
    props: { currentUser: RouterAuth.currentUser },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (
    Vue.$cookies.isKey("age-confirmation") &&
    to.path !== "/age_confirmation"
  ) {
    next();
  } else if (
    Vue.$cookies.isKey("age-confirmation") &&
    to.path == "/age_confirmation"
  ) {
    next(from);
  } else if (
    !Vue.$cookies.isKey("age-confirmation") &&
    to.path !== "/age_confirmation"
  ) {
    next("/age_confirmation");
  } else if (
    !Vue.$cookies.isKey("age-confirmation") &&
    to.path == "/age_confirmation"
  ) {
    next();
  }
});

export default router;

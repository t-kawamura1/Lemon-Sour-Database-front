import Vue from "vue";
import VueRouter from "vue-router";
import LemonSoursIndex from "@/components/pages/LemonSoursIndex.vue";
import LemonSour from "@/components/pages/LemonSour.vue";
import User from "@/components/pages/User.vue";
import axios from "axios";
import crypto from "crypto-js";

Vue.use(VueRouter);

const authHeader =  {
  "access-token": "",
  client: "",
  uid: "",
}

const routes = [
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
    name: "User",
    component: User,
    beforeEnter: (to, from, next) => {
      if (Vue.$cookies.isKey("auth-header")) {
        const decryptedAccessToken = crypto.AES.decrypt(
          Vue.$cookies.get("auth-header")["access-token"],
          Vue.prototype.$encryptKey
        ).toString(crypto.enc.Utf8);
        const decryptedClient = crypto.AES.decrypt(
          Vue.$cookies.get("auth-header")["client"],
          Vue.prototype.$encryptKey
        ).toString(crypto.enc.Utf8);
        const decryptedUid = crypto.AES.decrypt(
          Vue.$cookies.get("auth-header")["uid"],
          Vue.prototype.$encryptKey
        ).toString(crypto.enc.Utf8);
        authHeader["access-token"] = decryptedAccessToken;
        authHeader["client"] = decryptedClient;
        authHeader["uid"] = decryptedUid;
        axios
          .get("/api/v1/auth/validate_token", {
            headers: authHeader,
          })
          .then((res) => {
            console.log(res);
            if (res.data.data.id == to.params.id) {
              next();
            } else {
              throw "認証失敗"
            }
          })
          .catch((err) => {
            console.log(err);
            next({ path: "/lemon_sours" })
          });
      } else {
        next(from)
      }
    }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import axios from "axios";
import VueI18n from "vue-i18n";
import VueMq from "vue-mq";

// Vue.prototype.$axios = axios; 及び
// コンポーネント中で this.$axios とすると、テストでモック化が機能しないので、ここでは記述しない。
axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;
Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(VueMq, {
  breakpoints: {
    sp: 768,
    pc: 769,
  },
});

require("@/assets/style/common.scss");

const i18n = new VueI18n({
  locale: "ja",
});

new Vue({
  router,
  i18n,
  render: (h) => h(App),
}).$mount("#app");

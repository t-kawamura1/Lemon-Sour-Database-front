import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import axios from "axios";
import VueI18n from "vue-i18n";
import VueMq from "vue-mq";
import { library } from "@fortawesome/fontawesome-svg-core"
import { faUserSecret } from "@fortawesome/free-solid-svg-icons"
import { faFontAwesome } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

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

library.add(faUserSecret, faFontAwesome)
Vue.component('font-awesome-icon', FontAwesomeIcon)

require("@/assets/style/common.scss");

const i18n = new VueI18n({
  locale: "ja",
});

new Vue({
  router,
  i18n,
  render: (h) => h(App),
}).$mount("#app");

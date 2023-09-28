import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";
import Vue3Lottie from "vue3-lottie";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { setupClient } from "./clients/AxiosClient";

setupClient(process.env.VUE_APP_BACK);

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(router).use(Vue3Lottie).use(vuetify).mount("#app");

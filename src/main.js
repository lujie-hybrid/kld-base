import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/assets/scss/common.scss";

// elementui的引入
import "@/plugins/elementui";

// echarts的引入
import MyChart from "@/plugins/echarts";
Vue.use(MyChart);

// 通用组件的注册
import BaseComp from "@comp";
Vue.use(BaseComp);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const importView = (vPath) => () => import(`@/views/${vPath}.vue`);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/victor",
    name: "victor",
    component: importView("Victor"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

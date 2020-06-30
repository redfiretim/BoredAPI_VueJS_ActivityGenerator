import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ActivityGenerator from "../views/ActivityGenerator.vue";
import ActivityFilter from "../views/ActivityFilter.vue";

Vue.use(VueRouter);

// Hard coded routes because this app is really small.
// Should make it variable with parameters in bigger app.
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/activitygenerator",
    name: "ActivityGenerator",
    component: ActivityGenerator
  },
  {
    path: "/activityfilter",
    name: "ActivityFilter",
    component: ActivityFilter
  }
];

const router = new VueRouter({
  routes: routes
});

export default router;

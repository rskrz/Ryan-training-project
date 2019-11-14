import Vue from "vue";
import Router from "vue-router";
// import Trending from "./views/Trending.vue";
// import LoginPage from "./views/LoginPage.vue";
// import Issues from "./views/Issues.vue";
// import Loading from "./views/Loading.vue";

const Trending = () => import(/* webpackChunkName: "Trending" */ "./views/Trending.vue");
const LoginPage = () => import(/* webpackChunkName: "LoginPage" */ "./views/LoginPage.vue");
const Issues = () => import(/* webpackChunkName: "Issues" */ "./views/Issues.vue");
const Loading = () => import(/* webpackChunkName: "Loading" */ "./views/Loading.vue");

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/Trending",
      name: "Trending",
      component: Trending
    },
    {
      path: "/Issues",
      name: "Issues",
      component: Issues
    },
    {
      path: "/LoginPage",
      name: "Login",
      component: LoginPage
    },
    {
      path: "/Loading",
      name: "Loading",
      component: Loading
    },
    {
      path: "*",
      redirect: "/Trending"
    }
  ]
});

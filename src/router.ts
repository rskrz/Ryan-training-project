import Vue from "vue";
import Router from "vue-router";

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

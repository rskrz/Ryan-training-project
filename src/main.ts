import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueProgressBar from "vue-progressbar";
import HoneybadgerVue from "@honeybadger-io/vue";
import LazyLoadDirective from "./directives/LazyLoadDirective";

Vue.use(VueProgressBar, {
  color: "white",
  failedColor: "#874b4b",
  thickness: "0.5em"
});

Vue.directive("lazyload", LazyLoadDirective);

const getVariableOrThrow = (variableName: string): string => {
  let variableValue = process.env[variableName];
  if (!variableValue)
    throw new Error(`You did not define environment variable: ${variableName}`);
  return variableValue;
};

export const honeyBadgerApiKey: string = getVariableOrThrow(
  "VUE_APP_HONEYBADGER_API_KEY"
);

const config = {
  apiKey: honeyBadgerApiKey,
  environment: "production",
  revision: "git SHA/project version"
};

Vue.use(HoneybadgerVue, config);

Vue.config.productionTip = false;

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

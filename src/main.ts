import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueProgressBar from 'vue-progressbar'
import HoneybadgerVue from '@honeybadger-io/vue'

Vue.use(VueProgressBar, {
    color: 'white',
    failedColor: '#874b4b',
    thickness: '0.5em',
})

const config = {
    apiKey: 'project api key',
    environment: 'production',
    revision: 'git SHA/project version'
}

Vue.use(HoneybadgerVue, config)

Vue.config.productionTip = false;
  
export default new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");

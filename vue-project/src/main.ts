import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueProgressBar from 'vue-progressbar'

Vue.use(VueProgressBar, {
    color: 'white',
    failedColor: '#874b4b',
    thickness: '0.5em',
})

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");

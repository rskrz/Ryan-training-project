import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		loggedIn: false,
		token: '',
		lastPage: 'Trending'
	},
	mutations: {
		logIn(state, payload){
			state.loggedIn = payload.value
		},
		changeToken(state, payload){
			state.token = payload.value
		},
		changePage(state, payload){
			state.lastPage = payload.value
		}
	},
	actions: {}
});

<template lang="pug">
	div(id="Trending").flex.flex-column.items-center-ns
		.flex.flex-column.justify-center.items-center.w-50-ns.w-100.w-75-m
			div(id="Header").w-90.w-75-ns
				h1.tc.tl-l GitHub Trending Repos
				h3.mb0.tc.tl-ns Explore the top starred Typescript public repositories in the past 24 hours.
			.flex.flex-column.self-end-ns.items-center.mt0
				button(type="button" v-on:click="refresh").reset
					img(src="../assets/refresh.png").w2.h-auto.flex.justify-center
				p.mt0 {{ time }} minutes old 
		Repos(v-bind:repos="repos")
		.flex.flex-column.justify-center.items-center.tc.tl-ns
			h3(v-if="isError") {{error_status}}
			img(v-if="repos.length==0" src="../assets/github.png").loader
</template>

<script>
import Repos from '@/components/Repos.vue';
import axios from 'axios';
import { AppService, Controller } from '@/controller.ts';

export default {
	name: 'Trending',
	components: {
        Repos,
	},
	data() {
		return {
			repos: [],
			time: 0,
			repeat: true,
			isError: false,
            error_status: '',
            controller: new Controller(new AppService(axios.create({})))
		}
	},
	created() {
		this.$store.commit('changePage', {value: 'Trending'})
        this.startTimer()
        this.refresh()
	},
	methods: {
		start: function () {
			this.$Progress.start()
		},
		finish: function () {
			this.$Progress.finish()
		},
		fail: function () {
			this.$Progress.fail()
		},
        refresh: function() {
            this.start()
			this.repos = []
            this.controller.getTrendingRepos()
                .then(response=>{
                    this.finish()
                    this.repos = response
                    this.time = 0
                    this.clearTimer()
                })
                .catch(error=> {
					if(error.response){
						this.fail()
						console.log(error.response)
						this.isError = true
						this.error_status = "ERROR " + error.response.status + " - " + error.response.statusText
					}
				})
        },
		startTimer: function() {
            this.time = this.time+1
            var timer = setTimeout(() => {
            this.startTimer()
            }, 60*1000);
		},
		clearTimer: function() {
			clearTimeout(timer)
			this.startTimer()
		},
	}
} 
</script>

<style scoped lang='scss'>
#Trending{
}
</style>

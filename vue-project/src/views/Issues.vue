<template lang="pug">
    div
        h3.flex.justify-end.mr5
                a(href="./#/" v-on:click="logout") Logout
        div(id="Home").flex.flex-column.items-center-ns
            .flex.flex-column.justify-center.items-center.w-50-ns.w-100.w-75-m
                div(id="Header").w-90.w-75-ns
                    h1.tc.tl-l GitHub Issues
                    h3.tc.tl-ns Issues created by you, mentioning you, or assigned to you.
                .flex.flex-column.self-end-ns.items-center.mt0    
                    button(type="button" v-on:click="refresh").reset
                        img(src="../assets/refresh.png").w2.h-auto.flex.justify-center
                    p.mt0 {{ time }} minutes old 
            IssueList(v-bind:issues="issues")
            .flex.flex-column.justify-center.items-center.tc.tl-ns
                h3(v-if="isError") {{error_status}}
                img(v-if="issues.length==0" src="../assets/github.png").loader
</template>

<script>
import IssueList from '@/components/IssueList.vue';
import axios from 'axios';
import { AppService, Controller } from '@/controller.ts';

export default {
    name: 'Issues',
    components: {
        IssueList
    },
    data() {
        return {
            issues: [],
            time: 0,
            repeat: true,
            isError: false,
            error_status: '',
            controller: new Controller(new AppService(axios.create({})))
        }
    },
    created() {
        this.refresh()
        this.startTimer()
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
        logout: function () {
            this.$store.commit('logIn', {value: false})
            //this.$store.commit('changeToken', {value: ''})
        },
        refresh: function() {
            this.start()
			this.repos = []
            this.controller.getIssues(this.$store.state.token)
                .then(response=>{
                    this.finish()
                    this.issues = response
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
        }
    },
    beforeCreate() {
        if(this.$store.state.loggedIn == false){
            this.$store.commit('changePage', {value: 'Issues'})
            window.location.href = "./#/LoginPage"
            alert('You need to login!')
        }
    }
}
</script>

<style lang="scss" scoped>
#Issues{
}
</style>


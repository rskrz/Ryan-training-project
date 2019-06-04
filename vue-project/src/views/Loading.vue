<template lang="pug">
    div(id="Loading").flex.flex-column.items-center-ns
        .flex.flex-column.justify-center.items-center.w-50-ns.w-100.w-75-m
            div(id="Header").w-90.w-75-ns
                h1.tc.tl-l Finishing GitHub login
                h3.tc.tl-ns It should only be a second or two...
</template>

<script>
import axios from 'axios'
import router from '../router'
import { AppService, Controller } from '@/controller.ts';
export default {
    name: 'Loading',
    router,
    data () {
        return {
            controller: new Controller(new AppService(axios.create({})))
        }
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
        getToken: function(code,state) {
            this.controller.postCode(code, state)
                .then(response=>{
                    console.log(response)
                    this.$store.commit('logIn', {value: true})
                    if(response.data.body.access_token){
                        this.$store.commit('changeToken', {value: response.data.body.access_token})
                        this.$store.commit('changePage', {value: state})
                        console.log(this.$store.state.token)
                        console.log('/'+this.$store.state.lastPage)
                        this.$router.replace('/'+this.$store.state.lastPage)
                    }    
                })
                .catch(error=> {
					console.log(error)
				})
        }
    },
    created(){
        const urlParams = new URLSearchParams(window.location.search)
        const code = urlParams.get('code')
        const state = urlParams.get('state')
        if(code){
            this.getToken(code, state)
        }
    }
} 
</script>

<style scoped lang='scss'>
#Loading{
}
</style>

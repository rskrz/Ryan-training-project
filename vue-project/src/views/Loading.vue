<template lang="pug">
    div(id="Loading").flex.flex-column.items-center-ns
        .flex.flex-column.justify-center.items-center.w-50-ns.w-100.w-75-m
            div(id="Header").w-90.w-75-ns
                h1.tc.tl-l Finishing GitHub login
                h3.tc.tl-ns It should only be a second or two...
</template>

<script lang='ts'>
import axios from 'axios'
import router from '../router'
import { AppService, Controller } from '@/controller.ts';
import { Component, Vue } from 'vue-property-decorator'
@Component({
    name: 'Loading',
    router,
})
export default class Loading extends Vue {
    controller = new Controller(new AppService(axios.create({})))
    created(): void {
        const urlParams = new URLSearchParams(window.location.search)
        const code = urlParams.get('code')
        const state = urlParams.get('state')
        if(code){
            this.getToken(code, state)
        }
    }
    getToken(code, state): void {
        this.controller.postCode(code, state)
            .then(response=>{
                this.$store.commit('logIn', {value: true})
                if(response.body.access_token){
                    this.$store.commit('changeToken', {value: response.body.access_token})
                    this.$store.commit('changePage', {value: state})
                    this.$router.replace('/'+this.$store.state.lastPage)
                }    
            })
            .catch(error=> {
                console.log(error)
            })
    }
}
</script>

<style scoped lang='scss'>
#Loading{
}
</style>

<template lang="pug">
  div(id="Home").flex.flex-column.justify-center.items-center
    Header
    button(type="button" v-on:click="refresh").reset
      img(src="../assets/refresh.png").w3.h-auto.flex.justify-center
    p {{ time }} minutes old 
    Repos(v-bind:repos="repos")
    h3(v-if="isError") {{error_status}}
    img(v-if="repos.length==0" src="../assets/github.png").loader
</template>

<script>
import Repos from '@/components/Repos.vue';
import Header from '@/components/Header.vue';
import axios from 'axios';

export default {
  name: 'Home',
  components: {
    Repos,
    Header
  },
  data() {
    return {
      repos: [],
      time: 0,
      repeat: true,
      isError: false,
      error_status: ''
    }
  },
  created() {
    this.refresh()
    this.startTimer()
  },
  methods: {
    refresh: function() {
      this.repos = []
      const axios = require('axios')
      axios.get('https://api.github.com/search/repositories?q=language:typescript&sort=stars&order=desc')
        .then(response => {
          this.repos = response.data.items
          this.time = 0
          this.clearTimer()
        })
        .catch(error=> {
          if(error.response){
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
  } 
}
</script>

<style scoped lang='scss'>
#Home{
}
</style>

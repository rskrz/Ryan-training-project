<template lang="pug">
  .home
    Repos(v-bind:repos="repos")
</template>

<script>
import Repos from '@/components/Repos.vue';
import axios from 'axios';

export default {
  name: 'Home',
  components: {
    Repos
  },
  data() {
    return {
      repos: []
    }
  },
  created() {
    const axios = require('axios')
    axios.get('https://api.github.com/search/repositories?q=language:typescript&sort=stars&order=desc')
      .then(response => {
        this.repos = response.data.items
      }
      )
      .catch(function(error){
        console.log('Failure!')
        console.log(error)
      })
  }  
}
</script>


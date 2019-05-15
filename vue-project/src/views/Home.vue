<template lang="pug">
  div.flex.flex-column.justify-center.items-center
    Header
    Repos(v-bind:repos="repos")
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


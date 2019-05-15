<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
const axios = require('axios')
axios.get('https://swapi.co/api/people/1/')
  .then(function(response){
    console.log('Success!')
    console.log(response)
  })
  .catch(function(error){
    console.log('Failure!')
    console.log(error)
  })
export default {
  
}
</script>

<style scoped lang="scss">
// Some SASS code must exist below in order to include all _global SASS code. 
#app {  
}
</style>

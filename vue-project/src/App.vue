<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>


<style scoped lang="scss">
// Some SASS code must exist below in order to include all _global SASS code. 
#app {
}
</style>
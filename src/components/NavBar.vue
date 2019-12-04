<template lang="pug">
  .navbar
    router-link(to="../Trending").white.mr4.no-underline Trending
    router-link(to="../Issues").white.mr5.no-underline Issues
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "NavBar"
})
export default class NavBar extends Vue {}
</script>

<style lang="scss" scoped>
#navbar {
}
a.router-link-exact-active {
  text-decoration: underline;
}
</style>

<template lang="pug">
  .about
    Logo
    HelloWorld(msg='This is the About page!')
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import Logo from "@/components/Logo.vue"

@Component({
  components: {
    HelloWorld,
    Logo
  }
})
export default class About extends Vue {}
</script>
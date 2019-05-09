<template lang="pug">
  .home
    Logo
    HelloWorld(msg="It's alive!!!")
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import Logo from "@/components/Logo.vue";

@Component({
  components: {
    HelloWorld,
    Logo
  }
})
export default class Home extends Vue {}
</script>

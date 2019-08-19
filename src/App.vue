<template lang="pug">
    div(id="App")
        NavBar
        router-view
        vue-progress-bar
</template>

<script>
import NavBar from "@/components/NavBar.vue"
import { Component, Vue } from 'vue-property-decorator'
@Component({
    name: 'App',
    components: {
        NavBar
    }
})
export default class App extends Vue {
}

</script>

<style scoped lang="scss">
#App {
}
</style>
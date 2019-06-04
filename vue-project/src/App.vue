<template lang="pug">
    div(id="app")
        NavBar
        router-view
        vue-progress-bar
</template>

<script>
import NavBar from "@/components/NavBar.vue"
export default {
    name: 'app',
    components: {
        NavBar
    }
}

</script>

<style scoped lang="scss">
// Some SASS code must exist below in order to include all _global SASS code. 
#app {
}
</style>
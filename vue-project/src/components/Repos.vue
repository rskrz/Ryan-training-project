<template lang="pug">
    div(id="Repos").w-50-ns.w-100.border.w-90-m
        div(v-for="repo in repos" :key="repo.id")
            RepoItem(:repo="repo")
</template>

<script>
import RepoItem from './RepoItem.vue'
export default {
    name: 'Repos',
    components: {
        RepoItem
    },
    props: ["repos"]
}
</script>

<style scoped lang="scss">
#Repos {
}
</style>
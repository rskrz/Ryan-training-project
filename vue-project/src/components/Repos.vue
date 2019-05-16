<template lang="pug">
    div(id="Repos").w-50-ns.w-100.border
        div(v-for="repo in repos" :key="repo.id")
            RepoItem(:repo="repo")
</template>

<script>
import RepoItem from '@/components/RepoItem'
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
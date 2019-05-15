<template lang="pug">
    div(id="Repos").w-50
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
    outline: 0.1px solid #979797;
}
</style>
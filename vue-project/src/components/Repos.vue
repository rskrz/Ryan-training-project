<template lang="pug">
    div
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

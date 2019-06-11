<template lang="pug">
    div(id="Repos").w-50-ns.w-100.border.w-90-m
        div(v-for="repo in repos" :key="repo.id")
            RepoItem(:repo="repo")
</template>

<script lang='ts'>
import RepoItem from './RepoItem.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
    name: 'Repos',
    components: {
        RepoItem
    },
    props: {
        repos: Array
    }
})
export default class Repos extends Vue {
}
</script>

<style scoped lang="scss">
#Repos {
}
</style>
<template lang="pug">
    div(id="IssueList").w-50-ns.w-100.border.w-90-m
        div(v-for="issue in issues" :key="issue.id")
            IssueItem(:issue="issue")
</template>

<script>
import IssueItem from './IssueItem.vue'
export default {
    name: 'IssueList',
    components: {
        IssueItem
    },
    props: ["issues"]
}
</script>

<style scoped lang="scss">
#IssueList {
}
</style>
<template lang="pug">
    div(id="IssueItem")
        .flex.items-center.pa3
            .dib-ns.ml3.mb0.mt0
                h3.mt0.mb2.db 
                    a(:href="issue.html_url") {{ issue.title }}
                p.mt0.db {{ issue.user.login }} / {{ issue.repository.name }}
</template>

<script>
export default {
    name: 'IssueItem',
    props: ['issue']
}
</script>

<style scoped lang="scss">
#IssueItem {
}
</style>

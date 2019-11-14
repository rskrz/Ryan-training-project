<template lang="pug">
    div(id="IssueList").w-50-ns.w-100.border.w-90-m
        div(v-for="issue in issues" :key="issue.id")
            IssueItem(:issue="issue")
</template>

<script lang="ts">
import IssueItem from "./IssueItem.vue";
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "IssueList",
  components: {
    IssueItem
  },
  props: {
    issues: Array
  }
})
export default class IssueList extends Vue {}
</script>

<style lang="scss">
#IssueList {
}
</style>

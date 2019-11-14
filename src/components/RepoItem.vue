<template lang="pug">
    div(id="RepoItem")
        .flex.items-center.pa3
            img(:src="repo.owner.avatar_url").w4.h4.dib.br3
            .dib-ns.ml3.mb0.mt0
                h3.mt0.mb2.db
                    a(:href="repo.owner.html_url") {{ repo.owner.login }} 
                    a / 
                    a(:href="repo.html_url") {{ repo.name }}
                p.mt0.db {{ repo.description }}
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "RepoItem",
  props: {
    repo: Object
  }
})
export default class RepoItem extends Vue {}
</script>

<style lang="scss">
#RepoItem {
}
</style>

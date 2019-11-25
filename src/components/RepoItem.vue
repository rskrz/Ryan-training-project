<template lang="pug">
    div
        .flex.items-center.pa3
            //img(:src="repo.owner.avatar_url").w4.h4.dib.br3
            v-lazy-image(
                :src="repo.owner.avatar_url"
                :src-placeholder="'@/assets/github.png'"
                :alt="repo.name"
            ).w4.h4.dib.br3
            .dib-ns.ml3.mb0.mt0
                h3.mt0.mb2.db
                    a(:href="repo.owner.html_url") {{ repo.owner.login }} 
                    a / 
                    a(:href="repo.html_url") {{ repo.name }}
                p.mt0.db {{ repo.description }}
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VLazyImage from "v-lazy-image";
@Component({
  name: "RepoItem",
  props: {
    repo: Object
  },
  components: {
    VLazyImage
  }
})
export default class RepoItem extends Vue {}
</script>

<style scoped lang="scss">
.v-lazy-image {
  filter: blur(10px);
  transition: filter 0.2s;
}
.v-lazy-image-loaded {
  filter: blur(0);
}
</style>

<template lang="pug">
        div(id="Loginpage").flex.flex-column.items-center-ns
            .flex.flex-column.justify-center.items-center.w-50-l.w-100
                div(id="Header").w-90.w-75-ns.mb5
                    h1.tc.tl-l Login to GitHub
                    h3.tl In order to view issues for your GitHub account, you must login to your GitHub account.
                button(type="button" @click="login").loginbutton.mb5 
                    h3.white Login to GitHub
                p.w-40-l.w-60-m.w-100.tl-ns.tc We do not store or share your personal information. We ask the minimum permissions required for the application to work.
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "LoginPage"
})
export default class LoginPage extends Vue {
  login(): void {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=c3bcbb2fc1175dae2d26&response_type=code&scope=repo&state=${
        this.$store.state.lastPage
      }`
    );
    //window.location.href="https://github.com/login/oauth/authorize?client_id=c3bcbb2fc1175dae2d26&response_type=code&scope=repo&state="+this.$store.state.lastPage
  }
}
</script>

<style lang="scss" scoped>
#LoginPage {
}
</style>

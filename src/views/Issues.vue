<template lang="pug">
    div
        h3.flex.justify-end.mr5
                a(href="./#/" v-on:click="logout") Logout
        div(id="Home").flex.flex-column.items-center-ns
            .flex.flex-column.justify-center.items-center.w-50-ns.w-100.w-75-m
                div(id="Header").w-90.w-75-ns
                    h1.tc.tl-l GitHub Issues
                    h3.tc.tl-ns Issues created by you, mentioning you, or assigned to you.
                .flex.flex-column.self-end-ns.items-center.mt0    
                    button(type="button" v-on:click="refresh").reset
                        img(src="../assets/refresh.png").w2.h-auto.flex.justify-center
                    p.mt0.time {{ time }} minutes old 
            IssueList(v-bind:issues="issues")
            .flex.flex-column.justify-center.items-center.tc.tl-ns
                h3(v-if="isError").err {{error_status}}
                img(v-if="issues.length==0" src="../assets/github.png").loader
</template>

<script lang="ts">
import IssueList from "@/components/IssueList.vue";
import axios from "axios";
import { AppService, Controller, Repo } from "@/controller.ts";
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "Issues",
  components: {
    IssueList
  }
})
export default class Issues extends Vue {
  timer: any;
  issues: Repo[] | undefined = [];
  time: number = 0;
  repeat: boolean = true;
  isError: boolean = false;
  error_status: string = "";
  controller = new Controller(new AppService(axios.create({})));
  beforeCreate() {
    if (this.$store.state.loggedIn == false) {
      this.$store.commit("changePage", { value: "Issues" });
      window.location.href = "./#/LoginPage";
      alert("You need to login!");
    }
  }
  created(): void {
    this.refresh();
  }
  refresh(): void {
    //this.$Progress.start()
    this.issues = [];
    this.controller
      .getIssues(this.$store.state.token)
      .then(result => {
        //this.$Progress.finish()
        this.issues = result.repos;
        this.time = -1;
        this.clearTimer();
      })
      .catch(error => {
        //console.log(error)
        if (error.response) {
          //this.$Progress.fail()
          //console.log(error.response)
          this.isError = true;
          this.error_status = `Error ${error.response.status} - ${
            error.response.statusText
          }`;
        }
      })
      .catch(e => {
        //console.log(e)
      });
  }
  startTimer(): void {
    this.time = this.time + 1;
    var timer = setTimeout(() => {
      this.startTimer();
    }, 60 * 1000);
  }
  clearTimer(): void {
    clearTimeout(this.timer);
    this.startTimer();
  }
  logout(): void {
    this.$store.commit("logIn", { value: false });
  }
}
</script>

<style lang="scss" scoped>
#Issues {
}
</style>

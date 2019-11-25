<template lang="pug">
	div(id="Trending").flex.flex-column.items-center-ns
		.flex.flex-column.justify-center.items-center.w-50-ns.w-100.w-75-m
			div(id="Header").w-90.w-75-ns
				h1.tc.tl-l GitHub Trending Repos
				h3.mb0.tc.tl-ns Explore the top starred Typescript public repositories in the past 24 hours.
			.flex.flex-column.self-end-ns.items-center.mt0
				button(type="button" @click="refresh").reset
					img(src="../assets/refresh.png" alt="Refresh").w2.h-auto.flex.justify-center
				p.mt0.time {{ time }} minutes old 
		Repos(v-bind:repos="repos")
		.flex.flex-column.justify-center.items-center.tc.tl-ns
			h3(v-if="isError").err {{error_status}}
			img(v-if="repos.length==0" src="../assets/github.png" alt="Loading...").loader
</template>

<script lang="ts">
import Repos from "@/components/Repos.vue";
import axios from "axios";
import { AppService, Controller, Repo } from "@/controller";
import { Component, Vue } from "vue-property-decorator";
import { container } from "../../services/container";
import { TYPE } from "../../services/types";

@Component({
  name: "Trending",
  components: {
    Repos
  }
})
export default class Trending extends Vue {
  timer: any;
  repos: Repo[] | undefined = [];
  time: number = 0;
  repeat: boolean = true;
  isError: boolean = false;
  error_status: string = "";
  controller = new Controller(new AppService(axios.create({})));
  created(): void {
    this.refresh();
    //this.$store.commit('changePage', {value: 'Trending'})
  }
  refresh(): void {
    //this.$Progress.start()
    this.repos = [];
    this.controller
      .getTrendingRepos()
      .then(response => {
        //this.$Progress.finish()
        this.repos = response.repos;
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
      });
  }
  startTimer(): void {
    this.time = this.time + 1;
    this.timer = setTimeout(() => {
      this.startTimer();
    }, 60 * 1000);
  }
  clearTimer(): void {
    clearTimeout(this.timer);
    this.startTimer();
  }
}
</script>

<style scoped lang="scss">
#Trending {
}
</style>

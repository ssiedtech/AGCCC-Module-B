<template>
  <div class="header">
    <div class="first-area">
      <img class="home-icon" src="../assets/white-home.svg" @click="goHome()">
    </div>
    <div class="title-text">HRMQC<span v-if="!$store.state.home && !$store.state.completed">:</span></div>
    <div class="lesson-title" v-if="!$store.state.home && !$store.state.completed"><span v-html="$store.state.lessonTitles[$store.state.lessonNum - 1]"></span></div>
    <div class="second-area">
      <img class="crest-icon" src="../assets/ags_crest.png">
    </div>
    </div>
</template>

<script>
export default {
  name: 'headerComp',
  components: {
  },
  methods: {
    goHome() {
      if (!this.$store.state.postTest && !this.$store.state.completed)
        this.$store.commit('goHome')
    },
  }
}
</script>

<style>
.header {
  position: relative;
  height: 100%;
  display: flex;
}

.first-area {
  display: flex;
  align-items: center;
  padding-right: 2%;
  padding-left: 2%;
}
.second-area {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 2%;
  height: 100%;
  /* border: 1px solid green; */
}

.area {
  align-self: center;
}

.home-icon {
  height: 45%;
  cursor: pointer;
}

.crest-icon {
  height: 45%;
}

.title-text {
  color: white;
  align-self: center;
  font-size: 3vmin;
  letter-spacing: .8vmin;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
}

.lesson-title {
  color: white;
  align-self: center;
  font-size: 2vmin;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
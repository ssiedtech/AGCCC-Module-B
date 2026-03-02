<template>
  <div class="background" id="ModA">
    <div class="layout-grid">
      <div class="header-area">
        <header-comp />
      </div>
      <div class="frame-area">
        <div class="frame-content-area">
          <frame-comp />
        </div>
      </div>
      <div class="footer-area"></div>
    </div>
    <MultiModal v-if="$store.state.showModal" @click="$store.state.showModal = false">
      <div v-if="$store.state.results">Correct!</div>
      <div v-else-if="$store.state.results == undefined">Please review the course content and try again.</div>
      <div v-else> Incorrect! <br />Please try again.</div>
    </MultiModal>
    <MultiModal v-if="$store.state.failedTest" @click="closeModal">
      <div>Your score was: {{ ($store.state.grade * 100).toFixed(2) }}%. You must score at least an 80% to pass the
        test.
        Please review the content and try again.</div>
    </MultiModal>
  </div>
</template>

<script>
import headerComp from "./components/headerComp.vue"
import frameComp from "./components/frameComp.vue"
import MultiModal from './components/MultiModal.vue'
import examInfo from './data/exam.json'
import pipwerks from '@/assets/scorm-api-wrapper.js'

export default {
  name: 'App',
  components: {
    headerComp,
    frameComp,
    MultiModal
  },
  mounted() {
    let url = window.location.origin
    if (url.includes('http://localhost:')) {
      this.$store.commit('local')
    }
    console.log("LOCAL", this.$store.state.local)
    this.$store.state.examInfo = examInfo.postTest
    this.$store.commit('shuffleExam')
    this.$store.commit('initializeExamAnswers')
    console.log(this.$store.state.examAnswers)

    //pull back saved state if it exists
    let completeLessons = pipwerks.SCORM.get(`cmi.suspend_data`)
    console.log("app mounted:", completeLessons)
    if (completeLessons != 'null') {
      completeLessons = completeLessons.split('-')
      for (let i = 0; i < completeLessons.length; i++) {
        this.$store.commit('setLessonComplete', (completeLessons[i]) - 1)
      }
    }

    // set all lessons complete - for testing
    // for (let i = 0; i < this.$store.state.lessonsCompleted.length; i++) {
    //   this.$store.state.lessonsCompleted[i] = true
    // }
  },
  methods: {
    closeModal() {
      this.$store.commit('shuffleExam')
      this.$store.commit('closeModal')
    }
  }
}
</script>

<style>
* {
  color: white;
  font-family: Arial, Helvetica, sans-serif;
}

.background {
  background-color: #0c1132;
  height: 100vh;
  width: 100vw;
  position: absolute;
  left: 0;
  top: 0;
}

.layout-grid {
  z-index: 5;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 15% 75% 10%;
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-areas:
    "header header header header"
    "frame frame frame frame"
    "footer footer footer footer";
}

.header-area {
  grid-area: header;
  background-color: #19213f;
  /* border: 1px solid black; */
}

.frame-area {
  grid-area: frame;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0a1026;
  height: 100%;
}

.frame-content-area {
  /* background-color: #24476b */
  height: 90%;
  width: 95%;
}

.footer-area {
  grid-area: footer;
  background-color: #0a1026;
  /* border: 1px solid black; */
}

.nav-area {
  grid-area: nav;
  /* border: 1px solid black; */
  background-color: #0a1026;
}
</style>

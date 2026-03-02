<template>
  <div class="content">
    <div class="course-title"> Human Resources Management Qualification Course </div>
    <div class="button-container">
      <span v-for="(titles, index) in $store.state.lessonTitles" :key="titles">
        <button v-if="index != $store.state.lessonTitles.length - 1" class="lesson" :id="'lesson '+ (index + 1)"
          @click="this.$store.commit('changeLesson', index + 1)">
          <span v-html="titles"></span>
          <img src="../../assets/checkbox.svg" class="checkbox" v-if="$store.state.lessonsCompleted[index]" />
        </button>
      </span>

      <button class="lesson-post-test" @click="goToPostTest()" id="final">
        {{ $store.state.lessonTitles[$store.state.lessonTitles.length - 1] }}
        <img src="../../assets/checkbox.svg" class="checkbox" v-if="$store.state.completed" />
      </button>
    </div>
    <MultiModal v-if="modal" @click="modal = false">
      <div>Please complete all lessons before attempting the Post-Test.</div>
    </MultiModal>
  </div>
</template>

<script>
import MultiModal from '@/components/MultiModal.vue'

export default {
  name: 'homePage',
  components: {
    MultiModal
  },
  data() {
    return {
      modal: false,
      finalGrid: '4 / 1'
    }
  },
  //set grid of post test to be at the bottom based on amount of lessons
  mounted() {
    let length = this.$store.state.lessonTitles.length - 1
    let row =  Math.floor((length / 2) + 1)
    let column = 1
    if ((length % 2) == 1)
      column = 2

    this.finalGrid = `${row}/${column}`
    console.log(this.finalGrid)
  },
  methods: {
    goToPostTest() {
      if (this.$store.state.lessonsCompleted.includes(false))
        this.modal = true
      else
        this.$store.commit('goPostTest')
    },
  }
}
</script>

<style>
.content {
  display: grid;
  width: 100%;
  height: 100%;
  grid-auto-flow: row;
  grid-template-rows: 10% 90%;
}

.button-container {
  margin-left: 3%;
  display: grid;
  grid-template-columns: 50% 50%;
  align-content: center;
  row-gap: 3%;
  grid-auto-flow: column;
}

.lesson,
.lesson-post-test {
  width: 80%;
  padding: .5%;
  background-color: #19213f;
  border: none;
  font-size: 1vw;
  text-align: left;
  border-left: 6px solid #be9854;
}

.lesson:hover,
.lesson-post-test:hover {
  background: #6373ae;
  border-color: #f9e6c4;
  cursor: pointer;
}

.lesson-post-test {
  grid-area: v-bind(finalGrid);
}

.course-title {
  font-size: 1.8vw;
  text-align: center;
}

.checkbox {
  width: 3.5%;
  float: right;
  color: #be9854;
}
</style>
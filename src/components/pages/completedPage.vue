<template>
  <div class="page" id="content">
    <div class="title">Summary</div>
    <p class="body-text">
      Congratulations! You have completed the Human Resources Management Qualification Course.
    </p>

    <p>
      Grade: {{ ($store.state.grade * 100).toFixed(2) }}%
    </p>

    <p>
      It is now safe to close this browser page.
    </p>

    <!-- <div class="center-button">
      <button class="homebutton">Exit Course</button>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'contentSlide',
  mounted() {
    // this.$store.commit('pageloaded')
    this.$store.commit('setLessonComplete', 0)
  }
}
</script>

<style scoped>
li {
  margin: 1%;
}

.lesson {
  width: 25%;
  padding: .5%;
  background-color: #19213f;
  border: none;
  font-size: 2vmin;
  text-align: left;
  border-left: 6px solid #be9854;
  margin-top: 2%;
}

.lesson:hover {
  background: #6373ae;
  border-color: #f9e6c4;
  cursor: pointer;
}
</style>

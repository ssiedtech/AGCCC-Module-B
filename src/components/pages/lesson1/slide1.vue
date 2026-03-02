<template>
  <div class="page" id="content">
    <div class="title">Introduction (1 of 2)</div>
    <div class="body-text">
      <p>
        Welcome to the Army Human Resources (HR) Doctrine Lesson. This lesson covers policies which govern HR functions.
        Topics include:
      </p>

      <ul>
        <li>Army Doctrine</li>
        <li>Army HR Doctrine</li>
        <li>HR Support Core Competencies</li>
        <li>Joint Personnel Support</li>
      </ul>

      <p>
        Approximate length: This lesson takes approximately one hour to complete.
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'slideOne',
  mounted() {
    this.$store.commit('pageloaded')
  }
}
</script>
<style scoped>
li {
  margin-bottom: 1%
}
</style>
<template>
  <div class="page" id="content">
    <div class="title">Terminal Learning Objective</div>
    <div class="body-text">

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
.graphic {
  width: 75%;
}
</style>
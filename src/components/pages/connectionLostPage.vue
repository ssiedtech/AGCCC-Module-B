<template>
  <div class="content">
    <div class="title"> CONNECTION LOST </div>
    <p>Please close and reopen the course</p>
  </div>
</template>

<script>

export default {
  name: 'connectionLostPage',
}
</script>

<style scoped>
.content {
  display: grid;
  width: 100%;
  height: 100%;
  grid-auto-flow: row;
  grid-template-rows: 10% 90%;
}
</style>
<template>
  <div class="right-area"></div>
  <div class="nav-buttons">
    <div class="arrow-area">
      <img v-if="$store.state.pageNum > 1" class="arrow" src="../assets/left-arrow.png" @click="$store.commit('prevPage')" id="nav-left">
    </div>
    <div class="arrow-area">
      <img v-if="$store.state.pageNum < $store.state.totalPages[$store.state.lessonNum - 1] && !$store.state.navLock" class="arrow" src="../assets/right-arrow.png" @click="$store.commit('nextPage')" id="nav-right">
    </div>
  </div>
  <div class="progress-area"></div>
</template>

<script>

export default {
  name: 'navComp',
  components: {
  }
}
</script>

<style>
  .nav-buttons {
    grid-area: buttons;
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: flex-start;
    gap: 30%;
  }
  .right-area {
    grid-area: right;
  }
  .progress-area {
    grid-area: progress;
  }
  .arrow-area {
    width: 20%;
    height: 45%;
    align-self: center;
  }
  .arrow {
    height: 100%;
    cursor: pointer;
  }
  .arrow:hover {
    opacity: 0.7;
  }
</style>

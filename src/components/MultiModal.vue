<template>
  <div>
    <div class="modal-backdrop">
      <div class="modal">
        <div class="modal-text">
          <slot class="modal-text"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MultiModal",
}
</script>

<style scoped>
.modal-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 100;
}

.modal {
  position: absolute;
  display: flex;
  background-color: #19213f;
  box-shadow: 1.2px 3px 2px black;
  text-align: center;
  overflow-x: auto;
  border-radius: 8px;
  width: 25%;
  z-index: 1000;
  left: 37%;
  top: 35%;
  font-size: 2.2vmin;
  min-height: 10%;
  padding: 1%;
}

.modal-text {
  position: relative;
  top: 0;
  bottom: 0;
  margin: auto;
}
</style>


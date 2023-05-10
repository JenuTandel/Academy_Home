<template>
  <div class="toaster shadow" :class="`toaster--${type}`">
    <span class="toaster__message">{{ message }}</span>
  </div>
</template>

<script lang="ts">
export default {
  name: "ToasterMessage",
  props: ["type", "message"],
};
</script>

<style scoped>
.toaster {
  height: auto;
  width: 200px;
  position: fixed;
  right: 2%;
  top: 8%;
  padding: 10px;
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  z-index: 100;
}

.toaster--success {
  background-color: #0f6723;
  /* box-shadow: -3px 2px 48px 3px #0f6723; */
}

.toaster--error {
  background-color: #dc3545;
}
</style>

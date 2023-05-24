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

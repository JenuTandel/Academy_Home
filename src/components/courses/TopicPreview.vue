<template>
  <div>
    <div class="d-flex justify-content-end">
      <span class="icon icon-close" @click="onClose"></span>
    </div>
    <h3 class="my-3">{{ contentTitle }}</h3>
    <p class="mb-3 fw-semibold">{{ topic?.topicname }}</p>
    <div class="d-flex flex-column align-items-center" v-if="topic?.videoLink">
      <iframe class="w-100" height="300px" :src="topic?.videoLink"></iframe>
    </div>
    <p v-else>No File Found</p>
  </div>
</template>

<script lang="ts">
export default {
  props: ["topic", "contentTitle"],
  setup(_: any, context: any) {
    function onClose() {
      context.emit("close", true);
    }
    return { onClose };
  },
};
</script>

<style scoped></style>

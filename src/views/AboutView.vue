<template>
  <div class="about">
    <h1 class="text-primary">This is an about page</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  mounted() {
    console.log(process.env.VUE_APP_TITLE);
  },
});
</script>

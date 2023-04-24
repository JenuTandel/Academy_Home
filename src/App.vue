<template>
  <section class="h-100 w-100 d-flex flex-column">
    <header class="container-xl">
      <the-header></the-header>
    </header>
    <main class="container-xl flex-grow-1">
      <router-view></router-view>
    </main>
  </section>
</template>

<script lang="ts">
import TheHeader from "./components/core/TheHeader.vue";
export default {
  components: {
    TheHeader,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body,
html {
  height: 100%;
  width: 100%;
}
</style>

<template>
  <section class="h-100 w-100 d-flex flex-column">
    <header class="container-xl">
      <the-header></the-header>
    </header>
    <main class="container-xl flex-grow-1 overflow-hidden">
      <router-view v-slot="slotProps">
        <transition name="route" mode="out-in">
          <component :is="slotProps?.Component"></component>
        </transition>
      </router-view>
    </main>
  </section>
</template>

<script lang="ts">
import TheHeader from "./components/core/TheHeader.vue";
import { useStore } from "vuex";

export default {
  components: {
    TheHeader,
  },
  setup() {
    const $store = useStore();
    $store.dispatch("tryLogin");
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
  overflow: hidden;
}

.route-enter-from {
  opacity: 0;
  overflow-x: hidden;
  transform: scaleX(0);
  transform-origin: left;
  // transform: translateX(-400px);
}
.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: scaleX(1);
  transform-origin: right;
  overflow-x: hidden;
  // transform: translateX(0);
}
.route-leave-to {
  opacity: 0;
  overflow-x: hidden;
  transform: scaleX(0);
  transform-origin: right;
  // transform: translateX(400px);
}
.route-leave-from {
  transform: scaleX(1);
  transform-origin: left;
}
.route-enter-active {
  transition: all 1s ease-out;
}

.route-leave-active {
  transition: all 0.5s ease-in;
}
</style>

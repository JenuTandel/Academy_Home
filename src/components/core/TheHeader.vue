<template>
  <div class="nav bg-primary justify-content-between align-items-center">
    <figure class="logo">
      <img src="../../assets/images/logo.png" alt="logo" />
    </figure>
    <span
      class="icon icon-menu m-2 fs-3 text-white d-block d-md-none"
      @click="onMenu"
    ></span>
    <ul class="nav bg-primary justify-content-end d-none d-md-flex">
      <header-menu></header-menu>
    </ul>
  </div>
</template>

<script lang="ts">
import HeaderMenu from "./HeaderMenu.vue";
import { useStore } from "vuex";
export default {
  components: { HeaderMenu },
  setup() {
    const $store = useStore();
    function onMenu() {
      $store.state.sidebarOpen = true;
    }
    return { onMenu };
  },
};
</script>

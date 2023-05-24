<template>
  <div class="d-flex flex-column h-100">
    <ul class="nav flex-column bg-primary justify-content-end">
      <header-menu></header-menu>
    </ul>
  </div>
</template>

<script lang="ts">
import HeaderMenu from "./HeaderMenu.vue";
export default {
  components: { HeaderMenu },
};
</script>

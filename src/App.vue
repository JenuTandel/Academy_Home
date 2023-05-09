<template>
  <section class="h-100 w-100 d-flex flex-column">
    <base-spinner v-if="isLoading"></base-spinner>
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
import { computed, watch, ref } from "vue";
import TheHeader from "./components/core/TheHeader.vue";
import { useStore } from "vuex";

export default {
  components: {
    TheHeader,
  },
  setup() {
    const $store = useStore();
    const isLoading = ref(false);
    const isSpinner = computed(() => {
      return $store.getters["courses/isLoading"];
    });
    watch(isSpinner, () => {
      isLoading.value = isSpinner.value;
    });
    $store.dispatch("tryLogin");
    return { isLoading };
  },
};
</script>

<style lang="scss">
@import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
</style>

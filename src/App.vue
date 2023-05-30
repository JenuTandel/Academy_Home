<template>
  <section class="h-100 w-100 d-flex flex-column">
    <base-spinner v-if="isLoading"></base-spinner>
    <!-- start: toaster -->
    <transition name="toaster">
      <toaster-message
        v-if="toasterData"
        :message="toasterData?.message"
        :type="toasterData?.type"
      ></toaster-message>
    </transition>
    <!-- end: toaster -->
    <!-- start: header -->
    <header class="container-xl">
      <the-header></the-header>
    </header>
    <!-- end: header -->
    <!-- start: sidebar -->
    <div v-if="navLinkClick" class="backdrop" @click="onClose"></div>
    <aside
      class="container-xl main-sidebar bg-primary h-100 w-50"
      v-if="navLinkClick"
    >
      <the-sidebar></the-sidebar>
    </aside>
    <!-- end: sidebar -->
    <!-- start: main section -->
    <main class="container-xl flex-grow-1 overflow-auto">
      <router-view v-slot="slotProps">
        <transition name="route" mode="out-in">
          <component :is="slotProps?.Component"></component>
        </transition>
      </router-view>
    </main>
    <!-- end: main section -->
  </section>
</template>

<script lang="ts">
import { computed, watch, ref } from "vue";
import TheHeader from "./components/core/TheHeader.vue";
import { useStore } from "vuex";
import ToasterMessage from "@/components/toaster/ToasterMessage.vue";
import TheSidebar from "./components/core/TheSidebar.vue";

export default {
  components: {
    TheHeader,
    ToasterMessage,
    TheSidebar,
  },
  setup() {
    const $store = useStore();
    const isLoading = ref(false);
    const toasterData = ref();

    const navLinkClick = computed(() => {
      return $store.state.sidebarOpen;
    });

    const isSpinner = computed(() => {
      return $store.getters["isLoading"];
    });
    watch(isSpinner, () => {
      isLoading.value = isSpinner.value;
    });
    $store.dispatch("tryLogin");

    const toaster = computed(() => {
      return $store.getters["getToaster"];
    });
    watch(toaster, () => {
      toasterData.value = toaster.value;
      setTimeout(() => {
        toasterData.value = "";
      }, 3000);
    });

    function onClose() {
      $store.state.sidebarOpen = false;
    }
    return { isLoading, toasterData, toaster, onClose, navLinkClick };
  },
};
</script>

<style lang="scss">
@import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

.main-sidebar {
  position: fixed;
  z-index: 100;
  right: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}
</style>

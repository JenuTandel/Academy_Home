<template>
  <section class="h-100 w-100 d-flex flex-column">
    <base-spinner v-if="isLoading"></base-spinner>
    <transition name="toaster">
      <toaster-message
        v-if="toasterData"
        :message="toasterData?.message"
        :type="toasterData?.type"
      ></toaster-message>
    </transition>
    <header class="container-xl">
      <the-header></the-header>
    </header>

    <main class="container-xl flex-grow-1 overflow-auto">
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
import ToasterMessage from "@/components/toaster/ToasterMessage.vue";

export default {
  components: {
    TheHeader,
    ToasterMessage,
  },
  setup() {
    console.log(process.env.VUE_APP_TITLE);

    const $store = useStore();
    const isLoading = ref(false);
    const toasterData = ref();
    const isSpinner = computed(() => {
      return $store.getters["courses/isLoading"];
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

    // const toasterMessage = ref("Success");
    // const toasterType = ref("success");

    return { isLoading, toasterData, toaster };
  },
};
</script>

<style lang="scss">
@import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
.toaster-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.toaster-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.toaster-enter-active {
  transition: all 0.5s ease-out;
}
</style>

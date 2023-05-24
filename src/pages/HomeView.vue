<template>
  <div class="row gx-0 h-100 align-items-lg-center">
    <div class="col-lg-7 col-12 d-flex justify-content-center">
      <img src="../assets/images/home_bg.png" class="shadow home-hero-image" />
    </div>
    <div
      class="col-lg-5 col-12 d-flex flex-column align-items-md-center justify-content-center p-3"
    >
      <h1 class="text-center text-primary mb-4">
        <span class="d-block"> Explore your creativity </span>
        <span> with your personal guide </span>
      </h1>
      <p class="text-primary fs-4 mb-4 text-center">
        Get experienced expert in specialized area to get knowledge and
        instruction for your work
      </p>
      <button
        type="button"
        class="btn btn-secondary text-white fw-semibold px-5 py-2"
      >
        <span class="fs-5" @click="onGetStarted"> Get Started </span>
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const $router = useRouter();
    const $store = useStore();
    const isLogin = $store.getters.isLogin;

    function onGetStarted() {
      if (!isLogin) {
        $router.push("/login");
      } else {
        $router.push("/courses");
      }
    }
    return {
      onGetStarted,
    };
  },
};
</script>

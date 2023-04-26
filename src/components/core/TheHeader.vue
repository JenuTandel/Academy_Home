<template>
  <ul class="nav bg-primary justify-content-end">
    <li class="nav-item">
      <router-link to="/home" class="nav-link">Home</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/about-us" class="nav-link">About Us</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/contact-us" class="nav-link">Contact Us</router-link>
    </li>
    <li class="nav-item" v-if="!visibleLogout">
      <router-link to="/login" class="nav-link">Login</router-link>
    </li>
    <li class="nav-item" v-if="!visibleLogout">
      <router-link to="/registration" class="nav-link"
        >Registration</router-link
      >
    </li>
    <li class="nav-item" v-if="visibleLogout" @click="onLogout">
      <a class="nav-link">Logout</a>
    </li>
  </ul>
</template>
<script lang="ts">
import { watch, computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const $store = useStore();
    const visibleLogout = computed(() => {
      return $store.getters.isLogin;
    });

    watch(visibleLogout, () => {
      return visibleLogout.value;
    });

    function onLogout() {
      $store.dispatch("logout");
    }
    return {
      visibleLogout,
      onLogout,
    };
  },
};
</script>
<style scoped>
.active,
.active:focus {
  color: orange;
}
</style>

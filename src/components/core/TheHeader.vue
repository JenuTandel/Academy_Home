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
    <li class="nav-item">
      <router-link to="/courses" class="nav-link">Courses</router-link>
    </li>
    <li class="nav-item" v-if="isAdmin">
      <router-link to="/users" class="nav-link">Users</router-link>
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
import { useRouter } from "vue-router";
export default {
  setup() {
    const $store = useStore();
    const $router = useRouter();
    const isAdmin = computed(() => {
      return $store.getters.isAdmin;
    });

    watch(isAdmin, () => {
      return isAdmin.value;
    });

    const visibleLogout = computed(() => {
      return $store.getters.isLogin;
    });

    watch(visibleLogout, () => {
      return visibleLogout.value;
    });

    async function onLogout() {
      await $store.dispatch("logout");
      $router.push("/login");
    }
    return {
      visibleLogout,
      onLogout,
      isAdmin,
    };
  },
};
</script>
<style scoped>
.active,
.active:focus,
.nav-link:hover {
  color: orange;
}
</style>

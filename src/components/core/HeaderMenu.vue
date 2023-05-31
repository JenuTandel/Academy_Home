<template>
  <li class="nav-item" @click="onNavItem">
    <router-link to="/home" class="nav-link">Home</router-link>
  </li>
  <li class="nav-item" @click="onNavItem">
    <router-link to="/about-us" class="nav-link">About Us</router-link>
  </li>
  <li class="nav-item" @click="onNavItem">
    <router-link to="/contact-us" class="nav-link"
      ><span v-if="isAdmin">Contacts</span
      ><span v-else>Contact Us</span></router-link
    >
  </li>
  <li class="nav-item" @click="onNavItem">
    <router-link to="/courses" class="nav-link">Courses</router-link>
  </li>
  <li class="nav-item" @click="onNavItem" v-if="isAdmin">
    <router-link to="/users" class="nav-link">Users</router-link>
  </li>
  <li class="nav-item" @click="onNavItem" v-if="!visibleLogout">
    <router-link to="/login" class="nav-link">Login</router-link>
  </li>
  <li class="nav-item" @click="onNavItem" v-if="!visibleLogout">
    <router-link to="/registration" class="nav-link">Registration</router-link>
  </li>
  <li class="nav-item cursor-pointer" v-if="visibleLogout" @click="onLogout">
    <a class="nav-link">Logout</a>
  </li>
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

    //For hiding the sidebar
    function onNavItem() {
      $store.state.sidebarOpen = false;
    }

    return {
      visibleLogout,
      onLogout,
      isAdmin,
      onNavItem,
    };
  },
};
</script>

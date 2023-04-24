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
      <router-link to="/login" class="nav-link">Login</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/registration" class="nav-link"
        >Registration</router-link
      >
    </li>
  </ul>
</template>
<script lang="ts"></script>
<style scoped>
.active,
.active:focus {
  color: orange;
}
</style>

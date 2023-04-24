<template>
  <!-- start: row -->
  <div class="row gx-0 bg-light h-100">
    <!-- start: column1 -->
    <div class="col-6">
      <img src="./../../assets/images/login_bg.png" class="h-100 w-100" />
    </div>
    <!-- end: column1 -->

    <!-- start: column2 -->
    <div
      class="col-6 d-flex flex-column align-items-center justify-content-center"
    >
      <!-- logo -->
      <img class="logo" src="./../../assets/images/logo.png" />
      <!-- start: form -->
      <form class="rounded border p-3">
        <h4 class="text-white text-center mb-3">Login</h4>
        <div class="mb-3">
          <input
            type="text"
            id="email"
            placeholder="Email"
            class="form-control p-2"
          />
        </div>
        <div class="mb-3">
          <input
            type="password"
            id="password"
            placeholder="Password"
            class="form-control p-2"
          />
        </div>
        <button
          class="form-control bg-secondary text-white mb-3 border-0"
          type="button"
        >
          LOGIN
        </button>
        <div class="text-center text-white">
          Not Regitered???
          <router-link to="/registration" class="text-danger"
            >Click Here</router-link
          >
        </div>
        <div class="text-center">
          <router-link to="/login" class="text-white"
            >Forgot Password???</router-link
          >
        </div>
      </form>
      <!-- end: form -->
    </div>
    <!-- end: column2 -->
  </div>
  <!-- end:row -->
</template>

<script lang="ts"></script>

<style scoped lang="scss">
.logo {
  height: 100px;
  width: 200px;
}
form {
  width: 400px;
  height: 300px;
}
</style>

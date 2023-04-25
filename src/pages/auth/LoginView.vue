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
      <Form
        class="rounded border p-3"
        @submit.prevent="onLogin"
        :validation-schema="schema"
        v-slot="{ errors }"
      >
        <h4 class="text-white text-center mb-3">Login</h4>
        <div class="mb-3">
          <Field
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            class="form-control p-2"
          />
          <ErrorMessage name="email" :class="{ 'text-danger': errors.email }" />
        </div>
        <div class="mb-3">
          <Field
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            class="form-control p-2"
            autocomplete=""
          />
          <ErrorMessage
            name="password"
            :class="{ 'text-danger': errors.password }"
          />
        </div>
        <button
          class="form-control bg-secondary text-white mb-3 border-0"
          type="submit"
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
      </Form>
      <!-- end: form -->
    </div>
    <!-- end: column2 -->
  </div>
  <!-- end:row -->
</template>

<script lang="ts">
import { useStore } from "vuex";
import * as yup from "yup";
import { ErrorMessage, Field, Form } from "vee-validate";
export default {
  components: { ErrorMessage, Field, Form },
  setup() {
    const $store = useStore();
    const schema = yup.object({
      email: yup
        .string()
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter correct mail id")
        .required(),
      password: yup
        .string()
        .min(6, "Password should have min 6 characters")
        .matches(/^\S*$/, "No space required")
        .required(),
    });
    function onLogin() {
      // $store.dispatch("login");
    }
    return { onLogin, schema };
  },
};
</script>

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

<template>
  <section class="h-100">
    <!-- start: row -->
    <base-dialog :show="!!error" title="Error" @close="handleError">
      <template #header></template>
      <template #default>
        <p>{{ error }}</p>
      </template>
      <template #action></template>
    </base-dialog>
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
          @submit="onLogin"
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
            <ErrorMessage
              name="email"
              :class="{ 'text-danger': errors.email }"
            />
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
  </section>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import * as yup from "yup";
import { ErrorMessage, Field, Form } from "vee-validate";
import { ref } from "vue";
export default {
  components: { ErrorMessage, Field, Form },
  setup() {
    const $store = useStore();
    const $router = useRouter();
    const error = ref(null);
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
    async function onLogin(data: any) {
      if (data.email == "admin@1rivet.com" && data.password == "Admin@123") {
        localStorage.setItem("role", "admin");
      }
      try {
        await $store.dispatch("login", {
          email: data.email,
          password: data.password,
        });
      } catch (err: any) {
        error.value = err.response.data.error.message;
      }
      if (!error.value) {
        $router.push("/home");
      }
    }
    function handleError() {
      error.value = null;
    }
    return { onLogin, schema, error, handleError };
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

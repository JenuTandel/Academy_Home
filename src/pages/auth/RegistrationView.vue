<template>
  <base-dialog :show="!!error" title="Error" @close="handleError">
    <template #header></template>
    <template #default>
      <p>{{ error }}</p>
    </template>
    <template #action></template>
  </base-dialog>
  <!-- start: row -->
  <div class="row gx-0 h-100 bg-light">
    <!-- start: column1 -->
    <div class="col-6">
      <img src="../../assets/images/login_bg.png" class="h-100 w-100" />
    </div>
    <!-- end: column1 -->
    <!-- start: column2 -->
    <div
      class="col-6 d-flex flex-column p-4 align-items-center justify-content-center"
    >
      <!-- logo -->
      <img class="logo" src="../../assets/images/logo.png" />
      <!-- start: form -->
      <Form
        class="rounded border p-3"
        ref="registrationForm"
        @submit="onRegistration"
        :validation-schema="schema"
        v-slot="{ errors }"
      >
        <h4 class="text-white text-center font-weight-normal mb-3">
          Create Account
        </h4>
        <div class="mb-3">
          <Field
            type="text"
            id="firstname"
            class="form-control"
            placeholder="Firstname"
            name="firstname"
          />
          <ErrorMessage
            name="firstname"
            :class="{ 'text-danger': errors.firstname }"
          ></ErrorMessage>
        </div>
        <div class="mb-3">
          <Field
            type="text"
            id="lastname"
            class="form-control"
            placeholder="Lastname"
            name="lastname"
          />
          <ErrorMessage
            name="lastname"
            :class="{ 'text-danger': errors.lastname }"
          ></ErrorMessage>
        </div>
        <div class="mb-3">
          <Field
            type="text"
            id="email"
            class="form-control"
            placeholder="Email"
            name="email"
          />
          <ErrorMessage
            name="email"
            :class="{ 'text-danger': errors.email }"
          ></ErrorMessage>
        </div>
        <div class="mb-3">
          <Field
            type="password"
            id="password"
            class="form-control"
            placeholder="Password"
            name="password"
            autocomplete=""
          />
          <ErrorMessage
            name="password"
            :class="{ 'text-danger': errors.password }"
          ></ErrorMessage>
        </div>
        <table class="mb-3">
          <tr>
            <td><label class="text-white me-2">Country</label></td>
            <td>
              <span class="text-white me-2">:</span>
              <Field @change="onCountrySelect" name="country" as="select">
                <!-- v-model="country" -->
                <option value="">Select Country</option>
                <option
                  v-for="country in countryData"
                  :key="country.id"
                  :value="country.id"
                >
                  {{ country.name }}
                </option>
              </Field>
            </td>
          </tr>
          <tr>
            <td><label class="text-white me-2">State</label></td>
            <td>
              <span class="text-white me-2">:</span
              ><Field name="state" @change="onSelectState" as="select">
                <option value="">Select State</option>
                <option
                  v-for="state in statesData"
                  :key="state.id"
                  :value="state.id"
                >
                  {{ state.name }}
                </option>
              </Field>
            </td>
          </tr>
          <tr>
            <td><label class="text-white me-2">City</label></td>
            <td>
              <span class="text-white me-2">:</span
              ><Field name="city" as="select">
                <option value="">Select City</option>
                <option
                  v-for="city in citiesData"
                  :key="city.id"
                  :value="city.id"
                >
                  {{ city.name }}
                </option>
              </Field>
            </td>
          </tr>
        </table>

        <div class="mb-3">
          <Field
            type="phone"
            id="contactno"
            class="form-control"
            placeholder="Contact Number"
            name="phoneno"
          />
          <ErrorMessage
            name="phoneno"
            :class="{ 'text-danger': errors.phoneno }"
          ></ErrorMessage>
        </div>
        <div>
          <span></span>
          <span></span>
        </div>
        <div class="mb-3">
          <Field
            type="text"
            id="skill"
            class="form-control"
            placeholder="Add your skill here"
            name="skills"
          />
        </div>
        <button
          class="form-control bg-secondary text-white mb-3 border-0"
          type="submit"
        >
          Create Account
        </button>
        <div class="text-center text-white">
          Already Logged In???
          <router-link to="/login" class="text-danger">click Here</router-link>
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
import { useRouter } from "vue-router";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import { ref, computed } from "vue";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  setup() {
    const $store = useStore();
    const $router = useRouter();
    const error = ref(null);
    $store.dispatch("location/country");

    // Form validations
    const schema = yup.object({
      firstname: yup
        .string()
        .matches(/^[a-zA-Z]+$/, "It contains alphabets only")
        .required(),
      lastname: yup
        .string()
        .matches(/^[a-zA-Z]+$/, "It contains alphabets only")
        .required(),
      email: yup
        .string()
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter correct mail id")
        .required(),
      password: yup
        .string()
        .min(6, "Password should have min 6 characters")
        .matches(/^\S*$/, "No space required")
        .required(),
      phoneno: yup
        .string()
        .matches(/^[0-9]{10}$/, "Enter correct contact number")
        .required(),
      country: yup.string(),
      state: yup.string(),
      city: yup.string(),
    });

    async function onRegistration(data: any, { resetForm }: any) {
      // const a = countryData.value.find((res: any) => (res.id = data.country));
      // console.log(a.name);

      try {
        await $store.dispatch("registration", {
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          password: data.password,
          countryId: data.country,
          stateId: data.state,
          cityId: data.city,
          phoneno: data.phoneno,
          skills: data.skills,
        });
        await $store.dispatch("signup", {
          email: data.email,
          password: data.password,
        });
      } catch (err: any) {
        error.value = err.response.data.error.message;
      }
      if (!error.value) {
        resetForm();
        $router.push("/login");
      }
    }

    //For close the dialog
    function handleError() {
      error.value = null;
    }

    //To get all countries
    const countryData = computed(() => {
      return $store.getters["location/getCountries"];
    });

    //To get all states according to country
    function onCountrySelect(event: any) {
      const countryId = event.target.value;
      $store.dispatch("location/state", countryId);
    }
    const statesData = computed(() => {
      return $store.getters["location/getStates"];
    });

    //To get all cities according to states
    function onSelectState(event: any) {
      const stateId = event.target.value;
      $store.dispatch("location/city", stateId);
    }
    const citiesData = computed(() => {
      return $store.getters["location/getCities"];
    });

    return {
      onRegistration,
      onCountrySelect,
      onSelectState,
      handleError,
      countryData,
      statesData,
      citiesData,
      schema,
      error,
    };
  },
};
</script>
<style scoped>
.logo {
  height: 100px;
  width: 200px;
}
form {
  width: 400px;
  height: 580px;
}
</style>

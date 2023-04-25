<template>
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
        @submit.prevent="onRegistration"
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
            v-model.trim="firstname"
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
            v-model.trim="lastname"
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
            v-model="email"
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
            v-model="password"
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
              <select @change="onCountrySelect">
                <option value="">Select Country</option>
                <option
                  v-for="country in countryData"
                  :key="country.id"
                  :value="country.id"
                >
                  {{ country.name }}
                </option>
              </select>
            </td>
          </tr>
          <tr>
            <td><label class="text-white me-2">State</label></td>
            <td>
              <span class="text-white me-2">:</span
              ><select name="state" @change="onSelectState">
                <option value="">Select State</option>
                <option
                  v-for="state in statesData"
                  :key="state.id"
                  :value="state.id"
                >
                  {{ state.name }}
                </option>
              </select>
            </td>
          </tr>
          <tr>
            <td><label class="text-white me-2">City</label></td>
            <td>
              <span class="text-white me-2">:</span
              ><select>
                <option value="">Select City</option>
                <option v-for="city in citiesData" :key="city.id">
                  {{ city.name }}
                </option>
              </select>
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
            v-model="phoneno"
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
            v-model="skills"
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
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import { ref, computed, watch } from "vue";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  setup() {
    const $store = useStore();
    const firstname = ref("");
    const lastname = ref("");
    const email = ref("");
    const password = ref("");
    const country = ref("");
    const state = ref("");
    const city = ref("");
    const phoneno = ref("");
    const skills = ref("");

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
    });

    function onRegistration() {
      $store.dispatch("registration", {
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        password: password.value,
        country: country.value,
        state: state.value,
        city: city.value,
        phoneno: phoneno.value,
        skills: skills.value,
      });
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
      countryData,
      statesData,
      citiesData,
      schema,
      firstname,
      lastname,
      email,
      password,
      country,
      state,
      city,
      phoneno,
      skills,
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

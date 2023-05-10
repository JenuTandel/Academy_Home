<template>
  <section v-if="isAdmin" class="p-3">
    <h3>User's Query or Messages</h3>
    <div class="mt-3 p-2">
      <div class="row border p-2 align-items-center">
        <div class="col-1"><h6>Sr. No.</h6></div>
        <div class="col"><h6>Date</h6></div>
        <div class="col"><h6>Time</h6></div>
        <div class="col"><h6>Name</h6></div>
        <div class="col"><h6>Email ID</h6></div>
        <div class="col-3"><h6>Query / Message</h6></div>
        <div class="col-1"><h6>Actions</h6></div>
      </div>
      <div
        class="row border p-2 align-items-center"
        v-for="(contact, index) in contacts"
        :key="index"
      >
        <div class="col-1">
          <p>{{ index + 1 }}</p>
        </div>
        <div class="col">
          <p>{{ contact.date }}</p>
        </div>
        <div class="col">
          <p>{{ contact.time }}</p>
        </div>
        <div class="col">
          <p>{{ contact.name }}</p>
        </div>
        <div class="col">
          <p>{{ contact.email }}</p>
        </div>
        <div class="col-3">
          <p>{{ contact.message }}</p>
        </div>
        <div class="col-1">
          <a :href="'mailto:' + contact.email" class="btn btn-success">Reply</a>
        </div>
      </div>
    </div>
  </section>
  <section v-else class="d-flex flex-column h-100">
    <div class="image-wrapper">
      <img src="../assets/images/contact.jpg" />
    </div>
    <!-- start: contact form -->
    <div
      class="d-flex justify-content-center align-items-center flex-column flex-grow-1"
    >
      <h3 class="text-center text-primary">We want to here you</h3>
      <Form
        class="border rounded p-3 mt-3"
        @submit="onSubmit"
        :validation-schema="schema"
        v-slot="{ errors }"
      >
        <div class="mb-3">
          <Field
            type="text"
            id="name"
            name="name"
            class="form-control"
            placeholder="Name"
          />
          <ErrorMessage name="name" :class="{ 'text-danger': errors.name }" />
        </div>
        <div class="mb-3">
          <Field
            type="text"
            id="email"
            name="email"
            class="form-control"
            placeholder="Email"
          />
          <ErrorMessage name="email" :class="{ 'text-danger': errors.email }" />
        </div>
        <div class="mb-3">
          <Field
            as="textarea"
            class="form-control"
            id="message"
            name="message"
            rows="3"
            placeholder="Your Query or Message"
          />
          <ErrorMessage
            name="message"
            :class="{ 'text-danger': errors.message }"
          />
        </div>
        <button type="submit" class="form-control bg-secondary text-white">
          Submit
        </button>
      </Form>
    </div>
    <!-- end: contact form-->
    <!-- start: contact footer -->
    <div
      class="d-flex justify-content-between bg-primary align-items-center text-white py-3 px-3"
    >
      <div class="text-center">
        <p>Call Us</p>
        <p><span class="icon-phone me-2"></span>9033982833</p>
      </div>
      <div class="text-center">
        <p>Email Us</p>
        <a href="mailto:jinaltandel06@gmail.com"
          ><span class="icon-envelop me-2"></span
          ><span class="text-white">jinaltandel06@gmail.com</span></a
        >
      </div>
      <div class="text-center">
        <p>Contact with Us</p>
        <p>
          <span class="icon-facebook me-2"></span>
          <span class="icon-instagram me-2"></span>
          <span class="icon-twitter me-2"></span>
          <span class="icon-envelop"></span>
        </p>
      </div>
    </div>
    <!-- end: contact footer -->
  </section>
</template>
<script lang="ts">
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { useStore } from "vuex";
import { ref, computed, watch } from "vue";
import months from "../services/months";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  setup() {
    const $store = useStore();
    // const allContacts = ref();
    const isAdmin = computed(() => {
      return localStorage.getItem("role");
    });
    $store.dispatch("contact/getQueries");
    const contacts = computed(() => {
      return $store.getters["contact/getContacts"];
    });

    // watch(contacts, () => {
    //   allContacts.value = contacts.value;
    // });

    // console.log(allContacts);

    const schema = yup.object({
      name: yup.string().required(),
      email: yup
        .string()
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter correct mail id"),
      message: yup.string().required(),
    });

    function onSubmit(data: any, { resetForm }: any) {
      $store.dispatch("contact/addQuery", {
        name: data.name,
        email: data.email,
        message: data.message,
        date: `${new Date().getDate()}  ${
          months[new Date().getMonth()]
        }  ${new Date().getFullYear()}`,
        time: new Date().toLocaleTimeString(),
      });
      resetForm();
    }
    return { schema, onSubmit, isAdmin, contacts };
  },
};
</script>

<style scoped lang="scss">
.image-wrapper {
  width: 100%;
  height: 400px;
  img {
    height: 100%;
    width: 100%;
  }
}
form {
  width: 400px;
  a {
    cursor: pointer;
  }
}
</style>

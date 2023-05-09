<template>
  <section class="d-flex flex-column h-100">
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
        <button type="button" class="form-control bg-secondary text-white">
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
import { Form, Field, ErrorMessage, useForm } from "vee-validate";
import * as yup from "yup";
import { useStore } from "vuex";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  setup() {
    const $store = useStore();
    const schema = yup.object({
      name: yup.string().required(),
      email: yup
        .string()
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter correct mail id"),
      message: yup.string().required(),
    });

    function onSubmit(data: any) {
      console.log(data);
      $store.dispatch("contact/addQuery", data);
    }
    return { schema, onSubmit };
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

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
      <form class="border rounded p-3 mt-3">
        <div class="mb-3">
          <input
            type="text"
            id="name"
            class="form-control"
            placeholder="Name"
          />
        </div>
        <div class="mb-3">
          <input
            type="text"
            id="email"
            value="admin@1rivet.com"
            class="form-control"
            placeholder="Email"
          />
        </div>
        <div class="mb-3">
          <textarea
            class="form-control"
            id="message"
            rows="3"
            placeholder="Your Query"
          ></textarea>
        </div>
        <button type="button" class="form-control bg-secondary text-white">
          Submit
        </button>
      </form>
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
<script lang="ts"></script>

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

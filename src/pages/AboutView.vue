<template>
  <div class="d-flex flex-column h-100">
    <div class="image-wrapper">
      <img src="../assets/images/about.jpg" />
    </div>
    <div
      class="text-center mt-3 d-flex flex-column flex-grow-1 justify-content-center"
    >
      <h3>Our Story</h3>
      <p>
        We provide easy learning with your interested area and helps you to
        achieve your task.
      </p>
    </div>
    <!-- start: card-wrapper -->
    <div class="bg-primary w-100 d-flex justify-content-center">
      <div class="card-wrapper d-flex justify-content-between text-center">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title mb-4">What are we?</h5>
            <p class="card-text">
              We provide easy learning with your interested area and helps you
              to achieve your task.
            </p>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title mb-4">What we do?</h5>
            <p class="card-text">
              We provide easy learning with your interested area and helps you
              to achieve your task.
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- end: card-wrapper -->
  </div>
</template>
<script lang="ts"></script>
<style scoped lang="scss">
.image-wrapper {
  height: 400px;
  width: 100%;

  img {
    height: 100%;
    width: 100%;
  }
}
.card-wrapper {
  width: 600px;
  margin-top: -50px;
  margin-bottom: 30px;

  .card {
    height: 230px;
    width: 230px;
  }
}
</style>

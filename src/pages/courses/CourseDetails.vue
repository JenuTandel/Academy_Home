<template>
  <section>
    <h2 class="mb-3">Course Details</h2>
    <div class="img-wrapper">
      <img :src="details.course.courseImage" />
    </div>
    <p>{{ details.course.courseName }}</p>
    <p>{{ details.course.courseDetails }}</p>
    <p>{{ details.course.timeDuration }} Hrs</p>
    <p>{{ details.course.authorName }}</p>
    <button type="button" class="btn btn-secondary">Add more Details</button>
  </section>
</template>
<script lang="ts">
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { reactive } from "vue";

export default {
  setup() {
    const $route = useRoute();
    const $store = useStore();
    const details = reactive({ course: "" });
    getDetails();

    async function getDetails() {
      await $store.dispatch("courses/getCourseById", $route.params.id);
      details.course = await $store.getters["courses/Course"];
    }
    return { details };
  },
};
</script>

<style scoped lang="scss">
.img-wrapper {
  height: 150px;
  width: 200px;
  img {
    height: 100%;
    width: 100%;
  }
}
</style>

<template>
  <section>
    <base-dialog :show="dialogVisibility" @close="closeDialog">
      <details-form></details-form>
    </base-dialog>
    <h2 class="mb-3">Course Details</h2>
    <div class="img-wrapper">
      <img :src="details.course.courseImage" />
    </div>
    <p>{{ details.course.courseName }}</p>
    <p>{{ details.course.courseDetails }}</p>
    <p>{{ details.course.timeDuration }} Hrs</p>
    <p>{{ details.course.authorName }}</p>
    <button type="button" class="btn btn-secondary" @click="addDetails">
      Add more Details
    </button>
  </section>
</template>
<script lang="ts">
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { reactive, ref } from "vue";
import DetailsForm from "@/components/courses/DetailsForm.vue";
export default {
  components: { DetailsForm },
  setup() {
    const $route = useRoute();
    const $store = useStore();
    const details = reactive({ course: "" });
    const dialogVisibility = ref(false);
    getDetails();

    function addDetails() {
      dialogVisibility.value = true;
    }
    async function getDetails() {
      await $store.dispatch("courses/getCourseById", $route.params.id);
      details.course = await $store.getters["courses/Course"];
    }
    function closeDialog() {
      dialogVisibility.value = false;
    }
    return { details, addDetails, dialogVisibility, closeDialog };
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

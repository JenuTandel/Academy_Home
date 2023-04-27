<template>
  <section class="p-3">
    <button type="button" class="btn btn-primary" @click="onAddCourse">
      Add New Course
    </button>
    <base-dialog :show="dialogVisibility" title="Error" @close="closeDialog">
      <course-form @closeDialog="closeForm"></course-form>
    </base-dialog>
    <router-view></router-view>
  </section>
</template>

<script lang="ts">
import { ref } from "vue";
import courseForm from "../../components/courses/CourseForm.vue";
export default {
  components: { courseForm },
  setup() {
    const dialogVisibility = ref(false);
    function onAddCourse() {
      dialogVisibility.value = true;
    }
    function closeDialog() {
      dialogVisibility.value = false;
    }
    function closeForm(y: boolean) {
      dialogVisibility.value = !y;
    }
    return {
      onAddCourse,
      closeDialog,
      dialogVisibility,
      closeForm,
    };
  },
};
</script>

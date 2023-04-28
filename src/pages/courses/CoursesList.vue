<template>
  <section class="p-3">
    <base-dialog
      :show="deleteDialogVisibility"
      title="Delete"
      @close="closeDialog"
    >
      <template #header> </template>
      <template #default>
        <p>Are you sure to delete this course?</p>
      </template>
      <template #action>
        <button class="btn btn-success me-3" @click="onDeleteConfirm">
          Ok
        </button>
        <button class="btn btn-dark" @click="onDeleteCancel">Cancel</button>
      </template>
    </base-dialog>
    <div class="d-flex justify-content-end">
      <button type="button" class="btn btn-primary" @click="onAddCourse()">
        Add New Course
      </button>
    </div>
    <base-dialog :show="dialogVisibility" title="Error" @close="closeDialog">
      <course-form
        @closeDialog="closeForm"
        :patchCourse="patchData.course"
        :isEdit="isEdit"
        :updateId="updateId"
      ></course-form>
    </base-dialog>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Course Name</th>
          <th>Course Details</th>
          <th>Course Time Duration</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="course in allCourses" :key="course.id">
          <td>{{ course.courseName }}</td>
          <td>{{ course.courseDetails }}</td>
          <td>{{ course.timeDuration }}</td>
          <td>
            <button
              type="button"
              class="btn btn-success me-2"
              @click="onEdit(course.id)"
            >
              Edit</button
            ><button
              type="button"
              class="btn btn-danger me-2"
              @click="onDelete(course.id)"
            >
              Delete
            </button>
            <button type="button" class="btn btn-info">Details</button>
          </td>
        </tr>
      </tbody>
    </table>
    <router-view></router-view>
  </section>
</template>

<script lang="ts">
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import courseForm from "../../components/courses/CourseForm.vue";
export default {
  components: { courseForm },
  setup() {
    const dialogVisibility = ref(false);
    const deleteDialogVisibility = ref(false);
    const isEdit = ref(false);
    const $store = useStore();
    const deleteId = ref("");
    const updateId = ref("");
    const patchData = reactive({ course: "" });
    $store.dispatch("courses/getCourses");

    const allCourses = computed(() => {
      return $store.getters["courses/Courses"];
    });

    //add new course
    function onAddCourse() {
      isEdit.value = false;
      dialogVisibility.value = true;
    }
    //delete particular course
    function onDelete(id: any) {
      deleteDialogVisibility.value = true;
      deleteId.value = id;
    }
    async function onDeleteConfirm() {
      await $store.dispatch("courses/deleteCourse", deleteId.value);
      const index = allCourses.value.findIndex((res: any) => {
        res.id == deleteId.value;
      });
      allCourses.value.splice(index, 1);
      deleteDialogVisibility.value = false;
    }
    function onDeleteCancel() {
      deleteDialogVisibility.value = false;
    }

    async function onEdit(id: any) {
      updateId.value = id;
      await $store.dispatch("courses/getCourseById", id);
      patchData.course = $store.getters["courses/Course"];
      dialogVisibility.value = true;
      isEdit.value = true;
    }

    function closeDialog() {
      dialogVisibility.value = false;
      deleteDialogVisibility.value = false;
    }
    function closeForm(y: boolean) {
      dialogVisibility.value = !y;
    }
    return {
      onAddCourse,
      closeDialog,
      dialogVisibility,
      deleteDialogVisibility,
      onDeleteConfirm,
      onDeleteCancel,
      closeForm,
      allCourses,
      onDelete,
      onEdit,
      patchData,
      updateId,
      isEdit,
    };
  },
};
</script>

<style scoped>
img {
  height: 100px;
  width: 150px;
}
.table {
  width: 70%;
  margin: auto;
}
</style>

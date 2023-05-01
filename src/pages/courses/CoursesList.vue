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
    <base-dialog :show="dialogVisibility" title="Error" @close="closeDialog">
      <course-form
        @closeDialog="closeForm"
        :patchCourse="patchData.course"
        :isEdit="isEdit"
        :updateId="updateId"
      ></course-form>
    </base-dialog>
    <div v-if="isAdmin">
      <div class="d-flex justify-content-end">
        <button type="button" class="btn btn-primary" @click="onAddCourse()">
          Add New Course
        </button>
      </div>
      <div class="d-flex justify-content-end mt-3">
        <input type="text" class="search form-control" placeholder="search" />
      </div>
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
            <td class="text-nowrap">
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
              <button
                type="button"
                class="btn btn-info"
                @click="onDetails(course.id)"
              >
                Details
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <course-items v-else :allCourses="allCourses"></course-items>
    <!-- <router-view></router-view> -->
  </section>
</template>

<script lang="ts">
import { computed, provide, reactive, ref } from "vue";
import { useStore } from "vuex";
import courseForm from "../../components/courses/CourseForm.vue";
import courseItems from "../../components/courses/CourseItems.vue";
import { useRouter } from "vue-router";
export default {
  components: { courseForm, courseItems },
  setup() {
    const $router = useRouter();
    const dialogVisibility = ref(false);
    const deleteDialogVisibility = ref(false);
    const isEdit = ref(false);
    const $store = useStore();
    const deleteId = ref("");
    const updateId = ref("");
    const patchData = reactive({ course: "" });

    const allCourses = computed(() => {
      return $store.getters["courses/Courses"];
    });
    console.log(allCourses.value);

    provide("allCourses", allCourses.value);
    const isAdmin = computed(() => {
      return localStorage.getItem("role");
    });

    //add new course
    function onAddCourse() {
      isEdit.value = false;
      updateId.value = "";
      dialogVisibility.value = true;
    }
    //delete particular course
    function onDelete(id: any) {
      deleteDialogVisibility.value = true;
      deleteId.value = id;
    }
    async function onDeleteConfirm() {
      await $store.dispatch("courses/deleteCourse", deleteId.value);
      const index = allCourses.value.findIndex(
        (res: any) => res.id == deleteId.value
      );
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

    function onDetails(id: any) {
      $router.push(`/courses/details/${id}`);
    }
    function closeDialog() {
      dialogVisibility.value = false;
      deleteDialogVisibility.value = false;
    }
    function closeForm(y: boolean) {
      dialogVisibility.value = !y;
    }

    $store.dispatch("courses/getCourses");
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
      onDetails,
      patchData,
      updateId,
      isEdit,
      isAdmin,
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

.search {
  width: 25%;
}
</style>

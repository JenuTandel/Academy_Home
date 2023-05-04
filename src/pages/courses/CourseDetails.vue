<template>
  <section>
    <base-dialog
      :show="learningPointsDialogVisibility"
      @close="closeDialog"
      :height="60"
    >
      <learning-points-form
        @getCall="getCall"
        @close="closeDialog"
      ></learning-points-form>
    </base-dialog>
    <h2 class="mb-3">Course Details</h2>
    <div class="img-wrapper">
      <img :src="details.course.courseImage" />
    </div>
    <p>{{ details.course.courseName }}</p>
    <p>{{ details.course.courseDetails }}</p>
    <p>{{ details.course.timeDuration }} Hrs</p>
    <p>{{ details.course.authorName }}</p>
    <div v-for="(i, index) in details.course.learningPoints" :key="index">
      {{ i.value }}
    </div>
    <button type="button" class="btn btn-secondary" @click="addDetails">
      Add What user will learn
    </button>
    <h3>Course Content</h3>
    <button type="button" class="btn btn-secondary">Add section</button>
    <div class="accordion open" id="accordionExample">
      <div class="accordion-item">
        <h2 class="accordion-header">
          <div
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <form class="d-flex">
              <input type="text" placeholder="title" class="form-control" />
              <button type="submit" class="btn btn-primary">Save</button>
            </form>
          </div>
        </h2>
        <div
          id="collapseOne"
          class="accordion-collapse collapse show"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <p>Hello</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import "../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { reactive, ref, computed, watch } from "vue";
import LearningPointsForm from "@/components/courses/LearningPointsForm.vue";

export default {
  components: { LearningPointsForm },
  setup() {
    const $route = useRoute();
    const $store = useStore();
    const details = reactive({} as any);
    const computedDetails = computed(() => {
      return $store.getters["courses/Course"];
    });
    watch(
      computedDetails,
      () => {
        details.course = computedDetails.value;
      },
      { immediate: true }
    );

    const learningPointsDialogVisibility = ref(false);
    // const id = ref();
    // id.value = $route.params.id;
    getDetails();
    function addDetails() {
      learningPointsDialogVisibility.value = true;
    }
    async function getDetails() {
      await $store.dispatch("courses/getCourseById", $route.params.id);
      // details.course = await $store.getters["courses/Course"];
    }
    function closeDialog() {
      learningPointsDialogVisibility.value = false;
    }
    async function getCall(get: any) {
      if (get) {
        await getDetails();
      }
    }
    return {
      details,
      addDetails,
      learningPointsDialogVisibility,
      closeDialog,
      getCall,
    };
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

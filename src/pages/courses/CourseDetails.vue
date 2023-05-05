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
    <base-dialog :show="contentDialogVisibility" @close="closeDialog">
      <course-topic @close="closeDialog"> </course-topic>
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
    <button type="button" class="btn btn-secondary" @click="addSection">
      Add section
    </button>
    <div
      class="accordion"
      id="accordionExample"
      v-for="(field, index) in content"
      :key="index"
    >
      <div class="accordion-item">
        <h2 class="accordion-header">
          <div
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="`#collapse-${index}`"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <div class="d-flex justify-content-between w-100">
              <form
                class="d-flex"
                @submit.prevent="onSaveTitle"
                v-if="!details.course?.content?.contentTitle[index]?.value"
              >
                <input
                  type="text"
                  :id="'field-' + index"
                  :name="'field-' + index"
                  v-model="field.value"
                  placeholder="title"
                  class="form-control"
                />
                <button type="submit" class="btn btn-primary">Save</button>
              </form>
              <p v-else>
                {{ details.course?.content?.contentTitle[index]?.value }}
              </p>
              <!-- <p v-for="i in details.course.content.contentTitle" :key="i">
                {{ i.value }}
              </p> -->
              <!-- <p>{{ details.course?.content.contentTitle }}</p> -->
              <button type="button" class="btn btn-primary" @click="addContent">
                Add content
              </button>
            </div>
          </div>
        </h2>
        <div
          :id="`collapse-${index}`"
          class="accordion-collapse collapse show"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <!-- <p>{{ details.course?.content?.contentTitle[index]?.value }}</p> -->
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
import CourseTopic from "@/components/courses/CourseTopic.vue";

export default {
  components: { LearningPointsForm, CourseTopic },
  setup() {
    const $route = useRoute();
    const $store = useStore();
    const details = reactive({} as any);
    const title = ref();
    const learningPointsDialogVisibility = ref(false);
    const contentDialogVisibility = ref(false);
    const computedDetails = computed(() => {
      return $store.getters["courses/Course"];
    });
    // const contentTitle = computed(()=>{
    //   return $store.getters["course/Course"]
    // })
    const content = reactive([{ value: "" }]);

    function addSection() {
      content.push({ value: "" });
    }

    watch(
      computedDetails,
      () => {
        details.course = computedDetails.value;
      },
      { immediate: true }
    );

    // const id = ref();
    // id.value = $route.params.id;
    getDetails();
    function addDetails() {
      learningPointsDialogVisibility.value = true;
    }
    async function getDetails() {
      await $store.dispatch("courses/getCourseById", $route.params.id);
      await $store.dispatch("courses/getContentTitle", $route.params.id);
      // details.course = await $store.getters["courses/Course"];
    }
    function closeDialog() {
      learningPointsDialogVisibility.value = false;
      contentDialogVisibility.value = false;
    }
    async function getCall(get: any) {
      if (get) {
        await getDetails();
      }
    }

    function onSaveTitle() {
      $store.dispatch("courses/addContentTitle", {
        id: $route.params.id,
        title: content,
      });
    }

    function addContent() {
      contentDialogVisibility.value = true;
    }
    return {
      details,
      addDetails,
      learningPointsDialogVisibility,
      closeDialog,
      getCall,
      onSaveTitle,
      title,
      addSection,
      addContent,
      content,
      contentDialogVisibility,
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

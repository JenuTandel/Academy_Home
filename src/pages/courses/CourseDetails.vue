<template>
  <section class="h-100 overflow-auto">
    <!-- start: learningPoints dialog form -->
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
    <!-- end: learningPoints dialog form -->

    <!-- start: content topics form -->
    <base-dialog :show="contentDialogVisibility" @close="closeDialog">
      <course-topic @close="closeDialog" :id="titleId"> </course-topic>
    </base-dialog>
    <!-- end: content topics form -->

    <!-- start: course all details -->
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

    <!-- start: accordian -->
    <div
      class="accordion"
      id="accordionExample"
      v-for="(field, index) in data"
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
                @submit.prevent="onSaveTitle(index)"
                v-if="!data[index].contentTitle"
              >
                <!-- v-if="!details.course?.content?.contentTitle[index]?.value" -->
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
              <p>
                {{ data[index].contentTitle }}
              </p>
              <button
                type="button"
                class="btn btn-primary"
                @click="addContent(data[index].id)"
              >
                Add content
              </button>
            </div>
          </div>
        </h2>
        <div
          :id="`collapse-${index}`"
          class="accordion-collapse collapse"
          data-bs-parent="#accordionExample"
        >
          <template v-for="topic in topics" :key="topic.id">
            <div
              class="accordion-body"
              v-if="topic.contentId == data[index].id"
            >
              <p>{{ topic.topicname }}</p>
            </div>
          </template>
        </div>
      </div>
      <!-- end: accordian -->
    </div>
    <!-- start: course all details -->
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
    const titleId = ref();
    const computedDetails = computed(() => {
      return $store.getters["courses/Course"];
    });
    // const contentTitle = computed(()=>{
    //   return $store.getters["course/Course"]
    // })
    // const content = reactive([{ value: "" }]);
    const data = ref();
    data.value = [{ value: "" }];
    const topics = ref();

    const contentTitles = computed(() => {
      return $store.getters["courses/ContentTitles"];
    });
    watch(
      contentTitles,
      () => {
        data.value = contentTitles.value;
      },
      { immediate: true }
    );
    const topicData = computed(() => {
      return $store.getters["courses/Topics"];
    });

    watch(
      topicData,
      () => {
        topics.value = topicData.value;
      },
      { immediate: true }
    );
    console.log(topics.value);

    function addSection() {
      data.value.push({ value: "" });
    }
    watch(
      computedDetails,
      () => {
        details.course = computedDetails.value;
      },
      { immediate: true }
    );

    getDetails();
    function addDetails() {
      learningPointsDialogVisibility.value = true;
    }
    async function getDetails() {
      await $store.dispatch("courses/getCourseById", $route.params.id);
      await $store.dispatch("courses/getContentTitle", {
        id: $route.params.id,
      });
      await $store.dispatch("courses/getTopics");
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

    async function onSaveTitle(index: any) {
      await $store.dispatch("courses/addContentTitle", {
        id: $route.params.id,
        title: data.value[index].value,
      });
      $store.dispatch("courses/getContentTitle", { id: $route.params.id });
    }

    function addContent(id: any) {
      titleId.value = id;
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
      contentDialogVisibility,
      data,
      titleId,
      topics,
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

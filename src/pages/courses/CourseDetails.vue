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

    <!-- start: topics video -->
    <base-dialog :show="topicDialogVisibility" @close="closeDialog">
      <topic-preview
        @close="closeDialog"
        :topic="topic"
        :contentTitle="topicContentTitle"
      ></topic-preview>
    </base-dialog>
    <!-- end: topics video -->

    <!-- start: course all details -->
    <div class="row bg-light p-5 align-items-center">
      <div class="col-7 text-white">
        <h2 class="mb-3">{{ details.course.courseName }}</h2>
        <p class="mb-3 fs-5">{{ details.course.courseDetails }}</p>
        <p class="mb-3">Created By : {{ details.course.authorName }}</p>
        <p class="mb-3">
          Last updated on
          <span class="fw-semibold">{{ details.course.courseDate }}</span>
        </p>
        <button
          type="button"
          class="btn btn-secondary text-white px-3 py-2"
          v-if="!isAdmin"
        >
          Enroll Now
        </button>
      </div>
      <div class="col-5">
        <div class="bg-white p-3 rounded-2">
          <div class="img-wrapper mb-3">
            <img :src="details.course.courseImage" />
          </div>
          <p class="border-top pt-2">
            <span class="fw-semibold">Total Hours: </span>
            {{ details.course.timeDuration }} Hrs
          </p>
          <p>
            <span class="fw-semibold">Sponsored By: </span>
            <span class="text-danger">1</span>Rivet
          </p>
        </div>
      </div>
    </div>
    <div class="border rounded-2 p-3 m-5">
      <div class="d-flex justify-content-between">
        <h3 class="mb-3">What you'll learn</h3>
        <button
          type="button"
          class="btn btn-secondary text-white"
          @click="addDetails"
          v-if="isAdmin"
        >
          Add What user will learn
        </button>
      </div>
      <div v-for="(i, index) in details.course.learningPoints" :key="index">
        <p class="mb-2">
          <span class="icon icon-done me-3"></span>
          {{ i.value }}
        </p>
      </div>
    </div>
    <div class="d-flex justify-content-between mx-5">
      <h3>Course Content</h3>
      <button
        type="button"
        class="btn btn-secondary text-white"
        @click="addSection"
        v-if="isAdmin"
      >
        Add section
      </button>
    </div>
    <div class="mx-5 my-3">
      <!-- start: accordian -->
      <div
        class="accordion mb-2"
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
              <div
                class="d-flex justify-content-between align-items-center w-100"
              >
                <form
                  class="d-flex"
                  @submit.prevent="onSaveTitle(index)"
                  v-if="!data[index].contentTitle"
                >
                  <input
                    type="text"
                    :id="'field-' + index"
                    :name="'field-' + index"
                    v-model="field.value"
                    placeholder="title"
                    class="form-control"
                  />
                  <button type="submit" class="btn btn-primary ms-2">
                    Save
                  </button>
                </form>
                <p>
                  {{ data[index].contentTitle }}
                </p>
                <button
                  type="button"
                  class="btn btn-primary me-3"
                  @click="addContent(data[index].id)"
                  v-if="isAdmin"
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
                <p
                  class="cursor-pointer topicName"
                  @click="onTopic(topic, data[index].contentTitle)"
                >
                  <span
                    class="icon-ondemand_video me-2"
                    v-if="topic.fileType == 'videofile'"
                  ></span>
                  <span
                    class="icon-file-text me-2"
                    v-if="topic.fileType == 'textfile'"
                  ></span>
                  {{ topic.topicname }}
                </p>
              </div>
            </template>
          </div>
        </div>
        <!-- end: accordian -->
      </div>
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
import TopicPreview from "@/components/courses/TopicPreview.vue";

export default {
  components: { LearningPointsForm, CourseTopic, TopicPreview },
  setup() {
    const $route = useRoute();
    const $store = useStore();
    const details = reactive({} as any);
    const title = ref();
    const learningPointsDialogVisibility = ref(false);
    const contentDialogVisibility = ref(false);
    const topicDialogVisibility = ref(false);
    const titleId = ref();
    const topic = ref();
    const topicContentTitle = ref();
    const isAdmin = computed(() => {
      return localStorage.getItem("role");
    });
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
      topicDialogVisibility.value = false;
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

    function onTopic(topicData: any, contentTitle: any) {
      // console.log(topicData);
      topic.value = topicData;
      topicContentTitle.value = contentTitle;
      topicDialogVisibility.value = true;
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
      isAdmin,
      onTopic,
      topicDialogVisibility,
      topic,
      topicContentTitle,
    };
  },
};
</script>

<style scoped lang="scss">
.img-wrapper {
  height: 200px;
  img {
    height: 100%;
    width: 100%;
  }
}
.topicName:hover {
  color: purple;
}
</style>

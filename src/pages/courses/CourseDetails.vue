<template>
  <section class="h-100">
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
      <course-topic
        @close="closeDialog"
        :id="titleId"
        :Editabletopic="Editabletopic"
        :buttonName="buttonName"
      >
      </course-topic>
    </base-dialog>
    <!-- end: content topics form -->

    <!-- start: topics video -->
    <base-dialog
      :show="topicDialogVisibility"
      @close="closeDialog"
      v-if="userLoggedIn"
    >
      <topic-preview
        @close="closeDialog"
        :topic="topic"
        :contentTitle="topicContentTitle"
        :closeButton="true"
        :iframeHeight="300"
      ></topic-preview>
    </base-dialog>
    <!-- end: topics video -->

    <!-- start: delete section dialog -->
    <base-dialog
      :show="deleteDialogVisibility"
      title="Delete"
      @close="closeDialog"
    >
      <template #header> </template>
      <template #default>
        <p>Are you sure to delete this section?</p>
      </template>
      <template #action>
        <button class="btn btn-success me-3" @click="onDeleteConfirm">
          Ok
        </button>
        <button class="btn btn-dark" @click="closeDialog">Cancel</button>
      </template>
    </base-dialog>
    <!-- end: delete section dialog -->

    <!-- start: delete topic dialog -->
    <base-dialog
      :show="deleteTopicDialogVisibility"
      title="Delete"
      @close="closeDialog"
    >
      <template #header> </template>
      <template #default>
        <p>Are you sure to delete this section?</p>
      </template>
      <template #action>
        <button class="btn btn-success me-3" @click="onDeleteTopicConfirm">
          Ok
        </button>
        <button class="btn btn-dark" @click="closeDialog">Cancel</button>
      </template>
    </base-dialog>
    <!-- end: delete topic dialog -->

    <!-- start: delete learningPoint dialog -->
    <base-dialog
      :show="deleteLearningPointDialogVisibility"
      title="Delete"
      @close="closeDialog"
    >
      <template #header> </template>
      <template #default>
        <p>Are you sure to delete this learningPoint?</p>
      </template>
      <template #action>
        <button
          class="btn btn-success me-3"
          @click="onDeleteLearningPointConfirm"
        >
          Ok
        </button>
        <button class="btn btn-dark" @click="closeDialog">Cancel</button>
      </template>
    </base-dialog>
    <!-- end: delete learningPoint dialog -->

    <!-- start: course all details -->
    <div class="row bg-light p-5 align-items-center gx-0">
      <div class="col-md-7 col-12 text-white order-1 order-md-0">
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
          @click="onEnroll()"
        >
          {{ enrollButtonText }}
        </button>
      </div>
      <div class="col-md-5 col-12 order-0 order-md-1 mb-3">
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
          <span
            class="icon icon-delete text-danger"
            @click="removeLearningPoint(index)"
            v-if="isAdmin"
          ></span>
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
                  v-if="!data[index].contentTitle || isEditable === index"
                >
                  <input
                    type="text"
                    :id="'field-' + index"
                    :name="'field-' + index"
                    placeholder="title"
                    class="form-control"
                    v-model="field.value"
                  />
                  <button type="submit" class="btn btn-primary ms-2">
                    Save
                  </button>
                  <!-- v-if="data[index].contentTitle" -->
                </form>
                <div class="d-flex" v-if="isEditable !== index">
                  <p>
                    {{ data[index].contentTitle }}
                  </p>
                  <span
                    class="icon-edit ms-3"
                    v-if="isAdmin && data[index].contentTitle"
                    @click="onEditTitle(index, data[index].contentTitle)"
                  ></span>
                </div>
                <div v-if="isAdmin">
                  <button
                    type="button"
                    class="btn btn-primary me-3"
                    @click="addContent(data[index].id)"
                  >
                    Add content
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger me-3"
                    @click="onDeleteSection(data[index].id)"
                  >
                    Delete section
                  </button>
                </div>
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
                  class="d-inline"
                  :class="{
                    topicName: !isAdmin && (index == 1 || index == 0),
                    'cursor-pointer': isAdmin,
                  }"
                  @click="onTopic(topic, index, data[index].contentTitle)"
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
                <span
                  class="icon icon-edit ms-3"
                  v-if="isAdmin"
                  @click="onEditTopic(topic)"
                ></span>
                <span
                  class="icon icon-delete text-danger ms-2"
                  v-if="isAdmin"
                  @click="onDeleteTopic(topic.id)"
                ></span>
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
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { reactive, ref, computed, watch } from "vue";
import LearningPointsForm from "@/components/courses/LearningPointsForm.vue";
import CourseTopic from "@/components/courses/CourseTopic.vue";
import TopicPreview from "@/components/courses/TopicPreview.vue";

export default {
  components: { LearningPointsForm, CourseTopic, TopicPreview },
  setup() {
    const $route = useRoute();
    const $router = useRouter();
    const $store = useStore();
    const id = $route.params.id;

    const details = reactive({} as any);
    const title = ref();
    const learningPointsDialogVisibility = ref(false);
    const contentDialogVisibility = ref(false);
    const topicDialogVisibility = ref(false);
    const deleteDialogVisibility = ref(false);
    const deleteTopicDialogVisibility = ref(false);
    const deleteLearningPointDialogVisibility = ref(false);
    const titleId = ref();
    const topic = ref();
    const topicContentTitle = ref();
    const data = ref();
    data.value = [{ value: "" }];
    const topics = ref();
    const isEditable = ref();
    const deleteSectionId = ref();
    const deleteTopicId = ref();
    const Editabletopic = ref();
    const buttonName = ref("Add");
    const learningPointIndex = ref();

    const userLoggedIn = computed(() => {
      return localStorage.getItem("userId");
    });
    const isAdmin = computed(() => {
      return localStorage.getItem("role");
    });
    const enrollButtonText = computed(() => {
      return $store.getters["getEnrollText"];
    });

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

    function addSection() {
      data.value.push({ value: "" });
    }

    getDetails();
    function addDetails() {
      learningPointsDialogVisibility.value = true;
    }
    async function getDetails() {
      await $store.dispatch("getUserById", $route.params.id);
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
      deleteDialogVisibility.value = false;
      deleteLearningPointDialogVisibility.value = false;
    }
    async function getCall(get: any) {
      if (get) {
        await getDetails();
      }
    }

    async function onSaveTitle(index: any) {
      if (data.value[index].contentTitle) {
        await $store.dispatch("courses/editContentTitle", {
          id: $route.params.id,
          contentId: data.value[index].id,
          title: data.value[index].value,
        });
        isEditable.value = null;
      } else {
        await $store.dispatch("courses/addContentTitle", {
          id: $route.params.id,
          title: data.value[index].value,
        });
      }
      await $store.dispatch("courses/getContentTitle", {
        id: $route.params.id,
      });
    }

    function addContent(id: any) {
      titleId.value = id;
      contentDialogVisibility.value = true;
      buttonName.value = "Add";
    }

    function onTopic(topicData: any, index: any, contentTitle: any) {
      if (!isAdmin.value) {
        if (!userLoggedIn.value) {
          $router.replace("/login");
        } else {
          if (index == 0 || index == 1) {
            topic.value = topicData;
            topicContentTitle.value = contentTitle;
            topicDialogVisibility.value = true;
          }
        }
      } else {
        topic.value = topicData;
        topicContentTitle.value = contentTitle;
        topicDialogVisibility.value = true;
      }
    }

    function onEnroll() {
      if (!userLoggedIn.value) {
        $router.replace("/login");
      } else if (enrollButtonText.value == "Enroll Now") {
        $store.dispatch("updateUser", { id: id, enrolled: "Go to the Course" });
      } else {
        $router.push(`/courses/${id}/${details.course.courseName}`);
      }
    }

    function onDeleteSection(id: any) {
      deleteDialogVisibility.value = true;
      deleteSectionId.value = id;
    }
    function onDeleteConfirm() {
      $store.dispatch("courses/deleteContentTitle", {
        deleteId: deleteSectionId.value,
        courseId: id,
      });
      deleteDialogVisibility.value = false;
    }
    function onEditTitle(idx: number, title: any) {
      isEditable.value = idx;
      data.value[idx].value = title;
    }

    function onDeleteTopic(id: any) {
      deleteTopicDialogVisibility.value = true;
      deleteTopicId.value = id;
    }

    function onDeleteTopicConfirm() {
      $store.dispatch("courses/deleteTopic", {
        id: deleteTopicId.value,
        courseId: id,
      });
      deleteTopicDialogVisibility.value = false;
    }

    function onEditTopic(topicData: any) {
      Editabletopic.value = topicData;
      contentDialogVisibility.value = true;
      buttonName.value = "Edit";
    }

    function removeLearningPoint(index: any) {
      deleteLearningPointDialogVisibility.value = true;
      learningPointIndex.value = index;
    }

    async function onDeleteLearningPointConfirm() {
      details.course.learningPoints.splice(learningPointIndex.value, 1);
      await $store.dispatch("courses/addLearningPoints", {
        id: id,
        learningPoint: details.course.learningPoints,
      });
      deleteLearningPointDialogVisibility.value = false;
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
      userLoggedIn,
      onEnroll,
      enrollButtonText,
      deleteDialogVisibility,
      deleteTopicDialogVisibility,
      deleteLearningPointDialogVisibility,
      onDeleteSection,
      onDeleteConfirm,
      onEditTitle,
      isEditable,
      onDeleteTopic,
      onDeleteTopicConfirm,
      onEditTopic,
      Editabletopic,
      buttonName,
      removeLearningPoint,
      onDeleteLearningPointConfirm,
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

.topicName {
  color: purple;
  cursor: pointer;
}
</style>

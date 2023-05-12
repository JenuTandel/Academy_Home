<template>
  <section class="h-100 w-100 position-relative">
    <button
      type="button"
      class="btn-sidebar bg-dark px-3 py-2"
      v-if="isOpenButton"
      @click="isSidebarButton"
    >
      <span class="content-title text-white me-2">Course-content</span>
      <span class="icon-arrow-right text-white"></span>
    </button>
    <div class="row gx-0 h-100 justify-content-center">
      <!-- <p>Hellooooo</p> -->
      <div class="col-4" v-if="isSidebar">
        <aside class="sidebar h-100 border-end py-3 pe-2">
          <div
            class="d-flex justify-content-between align-items-center mx-3 mb-3"
          >
            <h4>Course Content</h4>
            <span class="icon-close" @click="onSidebarClose"></span>
          </div>
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
                      Section {{ index + 1 }}: {{ data[index].contentTitle }}
                    </p>
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
                      class="cursor-pointer"
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
          </div>
          <!-- end: accordian -->
        </aside>
      </div>
      <div class="col-8 p-2">
        <topic-preview
          :topic="topic"
          :contentTitle="topicContentTitle"
          :iframeHeight="500"
        ></topic-preview>

        <div class="m-2">
          <h4 class="mb-3">{{ details.course.courseDetails }}</h4>
          <p class="mb-3">Created By : {{ details.course.authorName }}</p>
          <p class="mb-3">
            Last updated on
            <span class="fw-semibold">{{ details.course.courseDate }}</span>
          </p>
          <p class="mb-3">
            Course Time Duration: {{ details.course.timeDuration }} Hrs
          </p>
          <div class="border rounded-2 p-3">
            <h4 class="mb-3">What you'll learn</h4>
            <div
              v-for="(i, index) in details.course.learningPoints"
              :key="index"
            >
              <p class="mb-2">
                <span class="icon icon-done me-3"></span>
                {{ i.value }}
              </p>
            </div>
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
import { reactive, ref, computed, watch, onMounted } from "vue";
import TopicPreview from "@/components/courses/TopicPreview.vue";

export default {
  components: { TopicPreview },
  setup() {
    const $route = useRoute();
    const $store = useStore();
    const id = $route.params.id;

    const details = reactive({} as any);
    const title = ref();
    const titleId = ref();
    const topicContentTitle = ref();
    const data = ref();
    data.value = [{ value: "" }];
    const topics = ref();
    const topic = ref();
    const isSidebar = ref(true);
    const isOpenButton = ref(false);

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
    // watch(
    //   topicData,
    //   () => {
    //     topics.value = topicData.value;
    //   },
    //   { immediate: true }
    // );
    onMounted(() => {
      watch(topicData, () => {
        topics.value = topicData.value;
        for (let i in topics.value) {
          if (data.value[0]?.id == topics.value[i].contentId) {
            topic.value = topics.value[i];
            break;
          }
        }
        console.log(data.value);
      });
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

    getDetails();
    async function getDetails() {
      await $store.dispatch("getUserById", $route.params.id);
      await $store.dispatch("courses/getCourseById", $route.params.id);
      await $store.dispatch("courses/getContentTitle", {
        id: id,
      });
      await $store.dispatch("courses/getTopics");
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
    }

    function onTopic(topicData: any, contentTitle: any) {
      topic.value = topicData;
      topicContentTitle.value = contentTitle;
    }

    function isSidebarButton() {
      isSidebar.value = true;
      isOpenButton.value = false;
    }

    function onSidebarClose() {
      isSidebar.value = false;
      isOpenButton.value = true;
    }

    return {
      details,
      getCall,
      onSaveTitle,
      title,
      addContent,
      data,
      titleId,
      topics,
      onTopic,
      topic,
      topicContentTitle,
      isOpenButton,
      isSidebar,
      isSidebarButton,
      onSidebarClose,
    };
  },
};
</script>

<style scoped lang="scss">
.sidebar {
  z-index: 10;
}
.btn-sidebar {
  z-index: 200;
  position: absolute;
  top: 50px;
  left: 0;

  &:hover {
    .content-title {
      display: inline-block;
    }
  }
}
.content-title {
  display: none;
}
</style>

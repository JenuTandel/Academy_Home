<template>
  <form @submit.prevent="onSubmit">
    <div v-for="(field, index) in learningPoint" :key="index">
      <input
        :id="'field-' + index"
        :name="'field-' + index"
        v-model="field.value"
        placeholder="What user will learn"
        class="form-control mb-3"
      />
      <button
        type="button"
        class="btn btn-success me-3 btn-rounded"
        @click="addLearningPoint()"
      >
        +
      </button>
      <button
        type="button"
        class="btn btn-danger"
        v-if="learningPoint.length > 1"
        @click="removeLearningPoint(index)"
      >
        -
      </button>
    </div>
    <button type="submit" class="btn btn-secondary mt-3">Submit</button>
  </form>
</template>

<script lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  setup(_: any, context: any) {
    const $route = useRoute();
    const $store = useStore();
    const id = ref();
    id.value = $route.params.id;
    const learningPoint = ref([{ value: "" }]);

    function addLearningPoint() {
      learningPoint.value.push({ value: "" });
    }
    function removeLearningPoint(deleteIndex: any) {
      learningPoint.value.splice(deleteIndex, 1);
    }
    function onSubmit() {
      $store.dispatch("courses/addLearningPoints", {
        id: id.value,
        learningPoint: learningPoint.value,
      });
      context.emit("close", true);
    }
    return { addLearningPoint, removeLearningPoint, learningPoint, onSubmit };
  },
};
</script>
<style scoped></style>

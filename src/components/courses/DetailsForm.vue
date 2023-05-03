<template>
  <form @submit="onSubmit">
    <h2>Add course details</h2>
    <div v-for="(field, index) in learningPoint" :key="index">
      <label :for="'field-' + index"></label>
      <input
        :id="'field-' + index"
        :name="'field-' + index"
        v-model="field.value"
        placeholder="What user will learn"
        class="form-control mb-3"
      />
      <button
        type="button"
        class="btn btn-secondary"
        @click="addlearningPoint()"
      >
        Add Learning point
      </button>
      <div class="mt-3 border-bottom border-primary"></div>
    </div>

    <div v-for="(field, index) in courseTitles" :key="index">
      <label :for="'field-' + index"></label>
      <input
        :id="'field-' + index"
        :name="'field-' + index"
        v-model="field.value"
        placeholder="contentTitle"
        class="form-control"
      />
      <div v-for="(field, index) in topicName" :key="index">
        <label :for="'field-' + index"></label>
        <input
          :id="'field-' + index"
          :name="'field-' + index"
          v-model="field.value"
          placeholder="Topic name"
          class="form-control"
        />
        <span class="text-success" @click="addTopicName()">+</span>
        <span class="text-danger" @click="removeTopicName()">-</span>
      </div>
      <button type="button" class="btn btn-secondary" @click="addContent()">
        AddContent
      </button>
      <div class="mt-3 border-primary border-bottom"></div>
    </div>
    <div v-for="(field, index) in references" :key="index">
      <label :for="'field-' + index"></label>
      <input
        :id="'field-' + index"
        :name="'field-' + index"
        v-model="field.value"
        placeholder="What user will learn"
        class="form-control mb-3"
      />
      <button type="button" class="btn btn-secondary" @click="addReference()">
        Add Reference
      </button>
    </div>
  </form>
</template>
<script lang="ts">
import { ref } from "vue";
export default {
  setup() {
    const learningPoint = ref([{ value: "" }]);
    const courseTitles = ref([{ value: "" }]);
    const topicName = ref([{ value: "" }]);
    const references = ref([{ value: "" }]);
    function onSubmit() {
      //log
    }
    function addContent() {
      //   courseTitles.value.push({ value: "" });
    }
    function addlearningPoint() {
      //   learningPoint.value.push({ value: "" });
    }
    function addTopicName() {
      topicName.value.push({ value: "" });
    }
    function removeTopicName() {
      //
    }
    function addReference() {
      //
    }
    return {
      onSubmit,
      addlearningPoint,
      learningPoint,
      addContent,
      courseTitles,
      topicName,
      addTopicName,
      removeTopicName,
      references,
      addReference,
    };
  },
};
</script>
<style scoped lang="scss"></style>

<template>
  <form @submit.prevent="onAdd">
    <h3 class="mb-3">Add content</h3>
    <div class="mb-3">
      <input
        type="text"
        class="form-control"
        id="topicname"
        placeholder="Topic name"
        v-model="topicname"
      />
    </div>
    <div class="mb-3">
      <label>Add video lecture</label>
      <input class="form-control" type="file" id="formFile" />
    </div>
    <div class="mb-3">
      <button type="submit" class="btn btn-secondary">Add</button>
    </div>
  </form>
</template>

<script lang="ts">
import { ref, computed } from "vue";
import { useStore } from "vuex";
export default {
  props: ["id"],
  setup(props: any, context: any) {
    const $store = useStore();
    const topicname = ref();
    const videofile = ref();
    const topic = ref();
    const id = computed(() => {
      return props.id;
    });

    async function onAdd() {
      topic.value = {
        topicname: topicname.value,
      };
      await $store.dispatch("courses/addTopic", {
        id: id.value,
        topic: topic.value,
      });
      const topics = $store.dispatch("courses/getTopics", id.value);
      context.emit("topics", topics);
      context.emit("close", true);
    }
    return { onAdd, topicname, videofile };
  },
};
</script>

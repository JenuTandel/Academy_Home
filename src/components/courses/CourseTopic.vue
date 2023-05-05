<template>
  <form @submit.prevent="onAdd">
    <h3 class="mb-3">Add content</h3>
    <div class="mb-3">
      <input
        type="text"
        class="form-control"
        id="topicname"
        placeholder="Topic name"
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
export default {
  setup(_: any, context: any) {
    function onAdd() {
      context.emit("close", true);
    }
    return { onAdd };
  },
};
</script>

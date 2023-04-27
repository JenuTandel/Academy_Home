<template>
  <div v-if="show" class="backdrop" @click="onClose"></div>
  <dialog open v-if="show">
    <header class="bg-danger" v-if="$slots.header">
      <slot name="header">
        <h2>{{ title }}</h2>
      </slot>
    </header>
    <section>
      <slot></slot>
    </section>
    <menu v-if="$slots.action">
      <slot name="action">
        <button class="btn btn-primary" @click="onClose">Close</button>
      </slot>
    </menu>
  </dialog>
</template>
<script lang="ts">
export default {
  props: ["show", "title"],
  emits: ["close"],
  setup(_: any, context: any) {
    function onClose() {
      context.emit("close");
    }
    return {
      onClose,
    };
  },
};
</script>
<style scoped lang="scss">
.backdrop {
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
}
dialog {
  position: fixed;
  top: 20%;
  width: 40%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: auto;
  overflow: hidden;
  background-color: white;
}

header {
  color: white;
  width: 100%;
  padding: 1rem;
}

header h2 {
  margin: 0;
}

section {
  padding: 1rem;
}

menu {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}
</style>

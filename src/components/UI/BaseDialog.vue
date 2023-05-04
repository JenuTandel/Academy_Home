<template>
  <div v-if="show" class="backdrop" @click="onClose"></div>
  <transition name="dialog">
    <dialog open v-if="show" :style="customHeight">
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
  </transition>
</template>
<script lang="ts">
import { reactive } from "vue";

export default {
  props: ["show", "title", "height"],
  emits: ["close"],
  setup(props: any, context: any) {
    const customHeight = reactive({
      height: `${props.height}%`,
      overflow: "auto",
    });
    function onClose() {
      context.emit("close");
    }

    return {
      onClose,
      customHeight,
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

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0.5;
  transform: scale(0.5);
}
.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}
.dialog-enter-active {
  transition: all 0.2s ease-out;
}
.dialog-leave-active {
  transition: all 0.2s ease-in;
}
</style>

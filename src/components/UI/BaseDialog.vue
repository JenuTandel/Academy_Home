<template>
  <div v-if="show" class="backdrop" @click="onClose"></div>
  <transition name="dialog">
    <dialog open v-if="show" :style="customHeight">
      <header class="bg-danger" v-if="$slots.header">
        <slot name="header">
          <h2>{{ title }}</h2>
        </slot>
      </header>
      <section class="dialog-section">
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

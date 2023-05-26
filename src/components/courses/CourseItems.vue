<template>
  <section class="course-items overflow-hidden">
    <div class="row gy-4">
      <div
        class="col-xl-3 col-lg-4 col-md-6 col-12"
        v-for="course in allCourses"
        :key="course.id"
      >
        <div
          class="card"
          @click="onCard(course.id, course.courseName)"
          @mouseenter="startMonitoring(course.id)"
          :id="course.id"
        >
          <!-- @mouseleave="stopMonitoring" -->
          <transition name="tooltip">
            <dialog
              open
              class="border translate-middle-y"
              :class="[
                setTooltipXPosition
                  ? 'tooltip-position-right'
                  : 'tooltip-position-left',
                setTooltipYPosition ? 'tooltip-position-top' : '',
                activeId == course.id ? 'd-block' : 'd-none',
              ]"
            >
              <!-- @mouseenter="stopMonitoring" -->
              <h4 class="mb-2">{{ course.courseName }}</h4>
              <p class="mb-2 text-success">{{ course.courseDate }}</p>
              <p class="mb-2 text-dark opacity-75">
                {{ course.timeDuration }} total hrs
              </p>
              <p class="mb-2">{{ course.courseDetails }}</p>
              <!-- <button type="button" class="btn btn-secondary text-white">
            Enroll Now
          </button> -->
              <div class="arrow-left" v-if="!setTooltipXPosition"></div>
              <div class="arrow-right" v-else></div>
            </dialog>
          </transition>

          <img
            class="card-img-top"
            :src="course.courseImage"
            alt="Card image cap"
          />
          <div class="card-body">
            <h5 class="card-title">{{ course.courseName }}</h5>
            <p class="card-text text-dark opacity-50">
              {{ course.authorName }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  props: ["allCourses"],
  setup() {
    const $store = useStore();
    const $router = useRouter();
    const setTooltipXPosition = ref(false);
    const setTooltipYPosition = ref(false);
    const activeId = ref("");

    async function onCard(id: any, title: any) {
      await $store.dispatch("getUserById", id);
      const d = await $store.getters["getEnrollText"];
      console.log(d);

      if (d == "Go to the Course") {
        $router.push(`/courses/${id}/${title}`);
      } else {
        $router.push(`/courses/details/${id}`);
      }
    }

    function startMonitoring(id: any) {
      console.log("enter");

      // setTimeout(() => {
      activeId.value = id;
      // }, 500);
      const col = document.getElementById(id);
      const colpos = col?.getBoundingClientRect();
      let divideNumber;
      if (window.matchMedia("(min-width:992px)").matches) {
        divideNumber = 1.75;
      } else {
        divideNumber = 2;
      }
      if (colpos!.left > window.innerWidth / divideNumber) {
        setTooltipXPosition.value = true;
        if (colpos!.top > window.innerHeight / 2) {
          setTooltipYPosition.value = true;
        } else {
          setTooltipYPosition.value = false;
        }
      } else {
        setTooltipXPosition.value = false;
        if (colpos!.top > window.innerHeight / 2) {
          setTooltipYPosition.value = true;
        } else {
          setTooltipYPosition.value = false;
        }
      }
    }
    // function stopMonitoring() {
    //   console.log("leave");

    //   activeId.value = "";
    // }
    return {
      onCard,
      startMonitoring,
      // stopMonitoring,
      setTooltipXPosition,
      setTooltipYPosition,
      activeId,
    };
  },
};
</script>

<style scoped lang="scss">
dialog {
  display: none;
  width: 250px;
  padding: 20px;
  background-color: white;
  &:hover {
    display: none;
  }
}
.tooltip-position-left {
  position: absolute;
  top: 60%;
  left: 90%;
  z-index: 100;
}
.tooltip-position-right {
  position: absolute;
  top: 60%;
  left: -70%;
  z-index: 100;

  @include media-breakpoint-down(lg) {
    left: -50%;
  }
}
.tooltip-position-top {
  position: absolute;
  top: 20%;
  z-index: 100;
}
.card {
  cursor: pointer;
  position: relative;
  // dialog {
  //   display: block;

  //   &:hover {
  //     display: none;
  //   }
  // }
  @include media-breakpoint-down(md) {
    dialog {
      display: none;
    }
  }
}
.arrow-left {
  width: 0;
  height: 0;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-right: 12px solid white;
  position: absolute;
  top: 45%;
  left: -3%;
}
.arrow-right {
  width: 0;
  height: 0;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-left: 12px solid white;
  position: absolute;
  top: 45%;
  right: -3%;
}
.tooltip-enter-from {
  opacity: 0;
}
.tooltip-enter-to {
  opacity: 1;
}

.tooltip-enter-active {
  transition: all 1s ease-out;
}
</style>

<template>
  <div class="row gy-4">
    <div class="col-3" v-for="course in allCourses" :key="course.id">
      <div class="card" @click="onCard(course.id, course.courseName)">
        <dialog open class="border translate-middle-y">
          <h4 class="mb-2">{{ course.courseName }}</h4>
          <p class="mb-2 text-success">{{ course.courseDate }}</p>
          <p class="mb-2 text-dark opacity-75">
            {{ course.timeDuration }} total hrs
          </p>
          <p class="mb-2">{{ course.courseDetails }}</p>
          <!-- <button type="button" class="btn btn-secondary text-white">
            Enroll Now
          </button> -->
          <div class="arrow-left"></div>
        </dialog>
        <img
          class="card-img-top"
          :src="course.courseImage"
          alt="Card image cap"
        />
        <div class="card-body">
          <h5 class="card-title">{{ course.courseName }}</h5>
          <p class="card-text text-dark opacity-50">{{ course.authorName }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  props: ["allCourses"],
  setup() {
    const $store = useStore();
    const $router = useRouter();

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
    return { onCard };
    // const courses = ref();
    // courses.value = inject("allCourses");
    // return { courses };
  },
};
</script>

<style scoped lang="scss">
dialog {
  display: none;
  width: 250px;
  padding: 20px;
  background-color: white;
  position: absolute;
  top: 60%;
  left: 90%;
  z-index: 100;
}
.card:hover {
  cursor: pointer;
  position: relative;
  dialog {
    display: block;
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
</style>

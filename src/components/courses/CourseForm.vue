<template>
  <div
    class="d-flex w-100 flex-column align-items-center justify-content-center"
  >
    <h3 class="mt-3">Course Form</h3>
    <Form
      class="w-100 rounded p-3"
      @submit="onSubmit"
      :validation-schema="schema"
      v-slot="{ errors }"
      :initial-values="formInit.a"
    >
      <div class="mb-3">
        <Field
          type="text"
          id="courseName"
          name="courseName"
          class="form-control"
          placeholder="Enter the Course Name"
        />
        <ErrorMessage
          name="courseName"
          :class="{ 'text-danger': errors.courseName }"
        />
      </div>
      <div class="mb-3">
        <Field
          as="textarea"
          rows="5"
          id="courseDetails"
          name="courseDetails"
          class="form-control"
          placeholder="Enter the Course Details"
        />
        <ErrorMessage
          name="courseDetails"
          :class="{ 'text-danger': errors.courseDetails }"
        />
      </div>
      <div class="mb-3">
        <Field
          type="text"
          id="timeDuration"
          name="timeDuration"
          class="form-control"
          placeholder="Time Duration in Hrs"
        />
        <ErrorMessage
          name="timeDuration"
          :class="{ 'text-danger': errors.timeDuration }"
        />
      </div>
      <div class="mb-3">
        <Field
          type="file"
          name="courseImage"
          id="courseImage"
          class="form-control mb-3"
          @change="handleFileUpload"
        />
        <ErrorMessage
          name="courseIamge"
          :class="{ 'text-danger': errors.courseImage }"
        />
      </div>
      <div class="w-100">
        <img :src="imageUrl" class="mb-2" />
      </div>
      <button type="submit" class="btn btn-success me-2">Submit</button>
      <button type="reset" class="btn btn-warning me-2">Reset</button>
      <button type="button" class="btn btn-secondary" @click="onCancel">
        Cancel
      </button>
    </Form>
  </div>
</template>
<script lang="ts">
import * as yup from "yup";
import { Form, Field, ErrorMessage, useForm } from "vee-validate";
import { useStore } from "vuex";
import { ref as refrence, reactive, onMounted } from "vue";
import { storage } from "./../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: ["patchCourse", "isEdit", "updateId"],
  setup(props: any, context: any) {
    const formInit = reactive({ a: {} });

    onMounted(() => {
      if (props.isEdit) {
        // formInit.a = props.patchCourse;
        formInit.a = {
          ...props.patchCourse,
          courseImage: props.patchCourse.courseImage?._value,
        };
        console.log(...props.patchCourse);
      } else {
        formInit.a = {
          courseName: "",
          courseDetails: "",
          courseImage: "",
          timeDuration: "",
        };
      }
    });

    const $store = useStore();
    const imageUrl = refrence("");
    const schema = yup.object({
      courseName: yup.string().required(),
      courseDetails: yup.string().required(),
      timeDuration: yup.string().required(),
      courseImage: yup.string(),
    });
    async function onSubmit(data: any) {
      if (props.updateId) {
        await $store.dispatch("courses/updateCourse", {
          id: props.updateId,
          courseName: data.courseName,
          courseDetails: data.courseDetails,
          timeDuration: data.timeDuration,
          courseImage: imageUrl,
        });
      } else {
        await $store.dispatch("courses/addCourse", {
          ...data,
          courseImage: imageUrl,
        });
      }
      context.emit("closeDialog", true);
      $store.dispatch("courses/getCourses");
    }
    function onCancel() {
      context.emit("closeDialog", true);
    }
    function handleFileUpload(event: any) {
      const file = event.target.files[0];
      const storageRef = ref(storage, file.name);
      uploadBytes(storageRef, file).then(() => {
        getDownloadURL(ref(storage, file.name)).then((url) => {
          imageUrl.value = url;
        });
      });
    }
    return {
      schema,
      onSubmit,
      onCancel,
      handleFileUpload,
      imageUrl,
      useForm,
      formInit,
    };
  },
};
</script>

<style scoped>
img {
  height: 100px;
  width: 100px;
}
</style>

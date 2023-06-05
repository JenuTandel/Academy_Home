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
      :initial-values="formInit.data"
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
          type="number"
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
          type="text"
          id="authorName"
          name="authorName"
          class="form-control"
          placeholder="Author Name"
        />
        <ErrorMessage
          name="authorName"
          :class="{ 'text-danger': errors.authorName }"
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
      <div class="d-flex w-100">
        <img :src="imageUrl" class="mb-2" />
        <p class="text-danger">{{ uploadingImage }}</p>
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
import months from "../../services/months";
import courseService from "@/pages/courses/services/courses.services";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: ["patchCourse", "isEdit", "updateId"],
  setup(props: any, context: any) {
    const formInit = reactive({ data: {} });
    const updateId = refrence(props.updateId);
    const isEditValue = refrence(props.isEdit);
    const uploadingImage = refrence("");

    onMounted(() => {
      if (isEditValue.value) {
        formInit.data = props.patchCourse;
        imageUrl.value = props.patchCourse.courseImage;
      } else {
        formInit.data = {
          courseName: "",
          courseDetails: "",
          courseImage: "",
          timeDuration: "",
          authorName: "",
        };
      }
    });

    const $store = useStore();
    const imageUrl = refrence("");
    const schema = yup.object({
      courseName: yup.string().required().trim(),
      courseDetails: yup.string().required().trim(),
      timeDuration: yup.string().required(),
      authorName: yup.string().required().trim(),
      courseImage: yup.string().required(),
    });

    //add course data
    async function onSubmit(data: any) {
      if (updateId.value) {
        if (imageUrl.value == "") {
          context.emit("closeDialog", false);
        } else {
          const course = {
            id: props.updateId,
            courseName: data.courseName,
            courseDetails: data.courseDetails,
            timeDuration: data.timeDuration,
            authorName: data.authorName,
            courseImage: { _value: imageUrl.value },
            courseDate: `${
              months[new Date().getMonth()]
            } ${new Date().getFullYear()}`,
          };

          await courseService.updateCourse(course).then((res) => {
            console.log(res.data);
          });
          context.emit("closeDialog", true);
          // await $store.dispatch("courses/updateCourse", {
          //   id: props.updateId,
          //   courseName: data.courseName,
          //   courseDetails: data.courseDetails,
          //   timeDuration: data.timeDuration,
          //   authorName: data.authorName,
          //   courseImage: { _value: imageUrl.value },
          //   courseDate: `${
          //     months[new Date().getMonth()]
          //   } ${new Date().getFullYear()}`,
          // });
        }
      } else {
        if (uploadingImage.value) {
          context.emit("closeDialog", false);
        } else {
          const course = {
            ...data,
            courseDate: `${
              months[new Date().getMonth()]
            } ${new Date().getFullYear()}`,
            courseImage: imageUrl,
          };
          await courseService.addCourse(course);
          context.emit("closeDialog", true);
        }
        // await $store.dispatch("courses/addCourse", {
        //   ...data,
        //   courseDate: `${
        //     months[new Date().getMonth()]
        //   } ${new Date().getFullYear()}`,
        //   courseImage: imageUrl,
        // });
      }
      // $store.dispatch("courses/getCourses");
      courseService.getCourses().then((res) => {
        $store.dispatch("courses/getCourses", res.data);
      });
    }

    //close the courseForm dialog
    function onCancel() {
      context.emit("closeDialog", true);
    }

    //image upload and get url
    function handleFileUpload(event: any) {
      console.log(event);

      const file = event.target.files[0];
      if (event) {
        if (!/\.(jpg|svg|jpeg|png|JPG|SVG|JPEG|PNG)$/.test(file.name)) {
          uploadingImage.value = "format wrong";
          imageUrl.value = "";
        } else if (file.size > 102400) {
          uploadingImage.value = "file size should be less than 100 KB";
          imageUrl.value = "";
        } else {
          uploadingImage.value = "uploading....";
          const storageRef = ref(storage, file.name);
          uploadBytes(storageRef, file).then(() => {
            getDownloadURL(ref(storage, file.name)).then((url) => {
              imageUrl.value = url;
              uploadingImage.value = "";
            });
          });
        }
      }
    }
    return {
      schema,
      onSubmit,
      onCancel,
      handleFileUpload,
      imageUrl,
      useForm,
      formInit,
      uploadingImage,
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

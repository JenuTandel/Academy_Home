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
      <input
        type="text"
        class="form-control"
        placeholder="Add video/textfile link"
        v-model="videolink"
      />
    </div>
    <div class="mb-3">
      <select name="fileType" class="form-select" v-model="fileType">
        <option value="">Select the fileType</option>
        <option value="videofile">Video file</option>
        <option value="textfile">Text file</option>
      </select>
    </div>
    <!-- <div class="mb-3">
      <label>Add video lecture</label>
      <input
        class="form-control"
        type="file"
        id="formFile"
        @change="handleFileUpload"
      />
    </div> -->
    <div class="mb-3">
      <button type="submit" class="btn btn-secondary">
        <span>{{ buttonName }}</span>
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import courseService from "@/pages/courses/services/courses.services";
import { ref as reference, computed } from "vue";
import { useStore } from "vuex";

// import { storage } from "./../../firebase";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
export default {
  props: ["id", "Editabletopic", "buttonName"],

  setup(props: any, context: any) {
    const $store = useStore();
    const topicname = reference();
    // const videofile = reference();
    const videolink = reference();
    const fileType = reference("");
    const topic = reference();
    const btnName = reference();
    const editData = computed(() => {
      return props.Editabletopic;
    });
    const contentId = computed(() => {
      return props.id;
    });
    if (props.buttonName == "Edit") {
      topicname.value = editData.value.topicname;
      videolink.value = editData.value.videoLink;
      fileType.value = editData.value.fileType;
    }

    //add topic
    async function onAdd() {
      topic.value = {
        topicname: topicname.value,
        // fileUrl: videofile.value,
        videolink: videolink.value,
        fileType: fileType.value,
      };

      if (props.buttonName != "Edit") {
        await courseService.addTopic(contentId.value, topic.value);
        // await $store.dispatch("courses/addTopic", {
        //   id: contentId.value,
        //   topic: topic.value,
        // });
      } else {
        await courseService.editTopic(
          contentId.value,
          editData.value.id,
          topic.value
        );
        // await $store.dispatch("courses/editTopic", {
        //   id: contentId.value,
        //   topicId: editData.value.id,
        //   topic: topic.value,
        // });
      }
      await courseService.getTopics().then((res) => {
        $store.dispatch("courses/getTopics", res);
        context.emit("topics", res.data);
      });
      // const topics = $store.dispatch("courses/getTopics", contentId.value);
      context.emit("close", true);
    }

    // function handleFileUpload(event: any) {
    //   if (event) {
    //     // uploadingImage.value = "uploading....";
    //   }
    //   const file = event.target.files[0];
    //   const storageRef = ref(storage, file.name);
    //   uploadBytes(storageRef, file).then(() => {
    //     getDownloadURL(ref(storage, file.name)).then((url) => {
    //       videofile.value = url;
    //     });
    //   });
    // }
    return { onAdd, topicname, videolink, fileType, btnName };
  },
};
</script>

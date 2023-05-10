import axios from "axios";
export default {
  async addCourse(context: any, payload: any) {
    const data = payload;
    context.commit("isLoading", true);
    await axios
      .post(
        "https://academy-home-default-rtdb.firebaseio.com/courses.json",
        data
      )
      .then(() => {
        context.commit("isLoading", false);
        context.rootState.authModule.toaster = { message: "" };
      })
      .catch((err) => {
        context.commit("isLoading", false);
        throw err;
      });
  },
  async getCourses(context: any) {
    context.commit("isLoading", true);
    await axios
      .get("https://academy-home-default-rtdb.firebaseio.com/courses.json")
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        const courses = [];
        for (const key in res) {
          const course = {
            id: key,
            courseName: res[key].courseName,
            courseDetails: res[key].courseDetails,
            timeDuration: res[key].timeDuration,
            authorName: res[key].authorName,
            courseImage: res[key].courseImage?._value,
            courseDate: res[key].courseDate,
          };
          courses.push(course);
        }
        context.commit("isLoading", false);
        context.commit("getCoursesData", courses);
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((err) => {
        context.commit("isLoading", false);
      });
  },
  async deleteCourse(_: any, payload: any) {
    const id = payload;
    await axios
      .delete(
        `https://academy-home-default-rtdb.firebaseio.com/courses/${id}.json`
      )
      .then((res) => {
        return res.data;
      });
  },
  async getCourseById(context: any, payload: any) {
    context.commit("isLoading", true);
    const id = payload;
    await axios
      .get(
        `https://academy-home-default-rtdb.firebaseio.com/courses/${id}.json`
      )
      .then((res) => {
        context.commit("courseData", {
          ...res.data,
          courseImage: res.data.courseImage._value,
        });
        context.commit("isLoading", false);
      })
      .catch(() => {
        context.commit("isLoading", false);
      });
  },
  async updateCourse(context: any, payload: any) {
    context.commit("isLoading", true);
    const id = payload.id;
    await axios
      .patch(
        `https://academy-home-default-rtdb.firebaseio.com/courses/${id}.json`,
        {
          courseName: payload.courseName,
          courseDetails: payload.courseDetails,
          timeDuration: payload.timeDuration,
          authorName: payload.authorName,
          courseImage: payload.courseImage,
          courseDate: payload.courseDate,
        }
      )
      .then((res) => {
        context.commit("courseData", res.data);
        context.commit("isLoading", false);
      })
      .catch(() => {
        context.commit("isLoading", false);
      });
  },

  async addLearningPoints(context: any, payload: any) {
    const id = payload.id;
    console.log(payload.learningPoint);
    await axios
      .patch(
        `https://academy-home-default-rtdb.firebaseio.com/courses/${id}.json`,
        { learningPoints: payload.learningPoint }
      )
      .then(() => {
        context.dispatch("getCourseById", id);
      });
  },

  async addContentTitle(context: any, payload: any) {
    const id = payload.id;
    console.log(payload.title);
    await axios
      .post(
        `https://academy-home-default-rtdb.firebaseio.com/courseDetails.json`,
        { courseId: id, contentTitle: payload.title }
      )
      .then(() => {
        // context.dispatch("getContentTitle", id);
      });
  },

  async getContentTitle(context: any, payload: any) {
    await axios
      .get(
        `https://academy-home-default-rtdb.firebaseio.com/courseDetails.json`
      )
      .then((res) => {
        const details = [];
        let data: any[] = [];
        for (const key in res.data) {
          const detail = {
            id: key,
            contentTitle: res.data[key].contentTitle,
            courseId: res.data[key].courseId,
          };
          details.push(detail);
          data = details.filter((res: any) => res.courseId == payload.id);
        }
        context.commit("getContentTitle", data);
      });
  },

  async addTopic(context: any, payload: any) {
    const id = payload.id;
    console.log(id);

    await axios
      .post(`https://academy-home-default-rtdb.firebaseio.com/Topics.json`, {
        contentId: id,
        topic: payload.topic,
      })
      .then((res) => {
        console.log(res);
      });
  },

  async getTopics(context: any, payload: any) {
    await axios
      .get(`https://academy-home-default-rtdb.firebaseio.com/Topics.json`)
      .then((res) => {
        const topics = [];
        // let data: any[] = [];
        for (const key in res.data) {
          const topic = {
            id: key,
            contentId: res.data[key].contentId,
            topicname: res.data[key].topic?.topicname,
            videoLink: res.data[key].topic?.videolink,
            fileType: res.data[key].topic?.fileType,
            // fileUrl: res.data[key].topic?.fileUrl,
          };
          topics.push(topic);
        }
        // data = topics.filter((res: any) => res.contentId == id);
        // context.commit("getContentTopics", data);
        context.commit("getContentTopics", topics);
      });
  },
};

import axios from "axios";
export default {
  async addCourse(_: any, payload: any) {
    const data = payload;

    await axios
      .post(
        "https://academy-home-default-rtdb.firebaseio.com/courses.json",
        data
      )
      .then(() => {
        return;
      })
      .catch((err) => {
        throw err;
      });
  },
  async getCourses(context: any) {
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
            courseImage: res[key].courseImage?._value,
          };
          courses.push(course);
        }
        context.commit("getCoursesData", courses);
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
    const id = payload;
    await axios
      .get(
        `https://academy-home-default-rtdb.firebaseio.com/courses/${id}.json`
      )
      .then((res) => {
        context.commit("courseData", res.data);
      });
  },
  async updateCourse(context: any, payload: any) {
    const id = payload.id;
    console.log(id);

    await axios
      .patch(
        `https://academy-home-default-rtdb.firebaseio.com/courses/${id}.json`,
        {
          courseName: payload.courseName,
          courseDetails: payload.courseDetails,
          timeDuration: payload.timeDuration,
          courseImage: payload.courseImage,
        }
      )
      .then((res) => {
        console.log(res);

        context.commit("courseData", res.data);
      });
  },
};

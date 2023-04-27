import axios from "axios";
export default {
  async addCourse(context: any, payload: any) {
    const data = payload;
    console.log(data);

    await axios
      .post(
        "https://academy-home-default-rtdb.firebaseio.com/courses.json",
        data
      )
      .then((res) => console.log(res))
      .catch((err) => {
        throw err;
      });
  },
};

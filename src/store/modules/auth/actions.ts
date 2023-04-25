import axios from "axios";

export default {
  // login() {
  //   axios
  //     .get("https://academy-home-default-rtdb.firebaseio.com/cities.json")
  //     .then((res) => console.log(res));
  // },
  registration(context: any, payload: any) {
    const data = payload;
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDxBDWp5tagLwUNX3kUOpPO2cCZh0VV00s",
        data
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        throw err;
      });
    context.commit("registration");
  },
};

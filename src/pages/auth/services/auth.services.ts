import http from "@/interceptor/http.interceptor";
import { EnrolledCourse, RegistrationData } from "../model/registration.model";
const baseUrl = process.env.VUE_APP_BASE_URL;
import store from "@/store";

class AuthService {
  //Registration service
  registration(data: RegistrationData) {
    const userId = store.getters["getUserId"];
    return http.put(`${baseUrl}registration/${userId}.json`, data);
  }

  //Signup with firebase authentication
  signup(data: RegistrationData) {
    return http
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDxBDWp5tagLwUNX3kUOpPO2cCZh0VV00s",
        { ...data, returnSecureToken: true }
      )
      .then((res) => {
        store.commit("userId", res.data.localId);
        store.commit("getToasterData", {
          message: "Registered Successfully",
          type: "success",
        });
      });
  }

  //login with firebase authentication
  login(data: RegistrationData) {
    return http.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDxBDWp5tagLwUNX3kUOpPO2cCZh0VV00s",
      { ...data, returnSecureToken: true }
    );
  }

  //get all registered users
  getUsers() {
    return http.get(`${baseUrl}registration.json`);
  }

  //remove user
  removeUser(id: string) {
    return http.delete(`${baseUrl}registration/${id}.json`);
  }

  //update usersData (enrolledcourses)
  updateUser(user: EnrolledCourse) {
    const userId = localStorage.getItem("userId");
    return http.post(
      `${baseUrl}registration/${userId}/enrolledCourses.json`,
      user
    );
  }

  //get user
  getUserById() {
    const userId = localStorage.getItem("userId");
    return http.get(`${baseUrl}registration/${userId}/enrolledCourses.json`);
  }
}

const authService = new AuthService();
export default authService;

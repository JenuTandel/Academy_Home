import axios from "axios";
const baseUrl = process.env.VUE_APP_BASE_URL;

class AuthService {
  //Registration service
  async registration(context: any, payload: any) {
    const data = payload;
    const userId = context.getters.getUserId;
    await axios
      .put(`${baseUrl}registration/${userId}.json`, data)
      .then(() => {
        return;
      })
      .catch((err) => {
        throw err;
      });
  }

  //Signup with firebase authentication
  async signup(context: any, payload: any) {
    const data = payload;
    await axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDxBDWp5tagLwUNX3kUOpPO2cCZh0VV00s",
        { ...data, returnSecureToken: true }
      )
      .then((res) => {
        context.commit("userId", res.data.localId);
        context.commit("getToasterData", {
          message: "Registered Successfully",
          type: "success",
        });
      })
      .catch((err) => {
        throw err;
      });
  }

  //login with firebase authentication
  async login(context: any, payload: any) {
    const data = payload;
    await axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDxBDWp5tagLwUNX3kUOpPO2cCZh0VV00s",
        { ...data, returnSecureToken: true }
      )
      .then((res) => {
        const expireIn = +res.data.expiresIn * 1000;
        const expirationDate = String(new Date().getTime() + expireIn);
        localStorage.setItem("token", res.data.idToken),
          localStorage.setItem("userId", res.data.localId),
          localStorage.setItem("tokenExpiration", expirationDate);
        if (localStorage.getItem("role") == "admin") {
          context.commit("isAdmin", true);
        }
        context.commit("isLogin", true);
        context.commit("getToasterData", {
          message: "successfully logged in",
          type: "success",
        });
      })
      .catch((err) => {
        context.commit("isLogin", false);
        throw err;
      });
  }

  //on page refresh
  tryLogin(context: any) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token && userId) {
      context.commit("setUser", {
        token: token,
        userId: userId,
      });
      if (localStorage.getItem("role") == "admin") {
        context.commit("isAdmin", true);
      }
      context.commit("isLogin", true);
    }
  }

  //logout
  logout(context: any) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("role");
    context.commit("isLogin", false);
    context.commit("isAdmin", false);
  }

  //get all registered users
  async getUsers(context: any) {
    context.rootState.courses.isLoading = true;
    await axios.get(`${baseUrl}registration.json`).then((res) => {
      const users = [];
      for (const key in res.data) {
        const user = {
          id: key,
          firstname: res.data[key].firstname,
          lastname: res.data[key].lastname,
          email: res.data[key].email,
          phoneno: res.data[key].phoneno,
          joiningDate: res.data[key].joiningDate,
          skills: res.data[key].skills,
        };
        users.push(user);
      }
      context.commit("getUsers", users);
      context.rootState.courses.isLoading = false;
    });
  }

  //remove user
  async removeUser(_: any, payload: any) {
    const id = payload;
    await axios.delete(`${baseUrl}registration/${id}.json`);
    await axios.delete(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDxBDWp5tagLwUNX3kUOpPO2cCZh0VV00s"
    );
  }

  //update usersData (enrolledcourses)
  async updateUser(context: any, payload: any) {
    const userId = localStorage.getItem("userId");
    await axios
      .post(`${baseUrl}registration/${userId}/enrolledCourses.json`, {
        enrollText: payload.enrolled,
        courseId: payload.id,
      })
      .then(() => {
        //
      });
    context.dispatch("getUserById", payload.id);
  }

  //get user
  async getUserById(context: any, payload: any) {
    const userId = localStorage.getItem("userId");
    const courseId = payload;
    let enrollText = "Enroll Now";

    await axios
      .get(`${baseUrl}registration/${userId}/enrolledCourses.json`)
      .then((res) => {
        for (const key in res.data) {
          if (res.data[key].courseId == courseId) {
            enrollText = res.data[key].enrollText;
          }
        }
        context.commit("enrollButtonData", enrollText);
      });
  }
}

const authService = new AuthService();
export default authService;

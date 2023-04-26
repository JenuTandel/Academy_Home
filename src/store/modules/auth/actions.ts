import axios from "axios";

export default {
  async registration(_: any, payload: any) {
    const data = payload;
    await axios
      .post(
        "https://academy-home-default-rtdb.firebaseio.com/registration.json",
        data
      )
      .then(() => {
        return;
      })
      .catch((err) => {
        throw err;
      });
  },
  async signup(_: any, payload: any) {
    const data = payload;
    await axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDxBDWp5tagLwUNX3kUOpPO2cCZh0VV00s",
        { ...data, returnSecureToken: true }
      )
      .then(() => {
        return;
      })
      .catch((err) => {
        throw err;
      });
  },
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
        context.commit("isLogin", true);
      })
      .catch((err) => {
        context.commit("isLogin", false);
        throw err;
      });
  },
  //on refresh
  tryLogin(context: any) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token && userId) {
      context.commit("setUser", {
        token: token,
        userId: userId,
      });
      context.commit("isLogin", true);
    }
  },
  logout(context: any) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenExpiration");
    context.commit("isLogin", false);
  },
};

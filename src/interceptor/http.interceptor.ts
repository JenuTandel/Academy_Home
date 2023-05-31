import axios from "axios";
import store from "../store/index";
import { Messages } from "./interceptor.model";
const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
});

http.interceptors.request.use((config: any) => {
  store.commit("isLoading", true);
  return config;
});

http.interceptors.response.use(
  (response: any) => {
    store.commit("isLoading", false);
    return response;
  },
  async (err) => {
    let errorMessage;
    store.commit("isLoading", false);
    // if (
    //   !err.response.config.url.endsWith(
    //     "key=AIzaSyDxBDWp5tagLwUNX3kUOpPO2cCZh0VV00s"
    //   )
    // ) {
    //   // do nothing
    //   alert(err.response.statusText);
    // }
    switch (err.response.status) {
      // case 400:
      //   errorMessage = Messages.MessageForInvalidInput;
      //   break;
      case 401:
        errorMessage = Messages.MessageForUnauthorizedUser;
        break;
      case 500:
        errorMessage = Messages.MessageForInternalServerError;
        break;
      default:
        errorMessage = "";
        break;
    }
    store.commit("networkError", errorMessage);
    return err.response;
    // if (
    //   err.response.config.url.endsWith(
    //     "key=AIzaSyDxBDWp5tagLwUNX3kUOpPO2cCZh0VV00s"
    //   )
    // ) {
    //   // do nothing
    // } else if (err.response.status !== 200) {
    //   store.commit("isLoading", false);
    //   alert(err.response.statusText);
    // }
  }
);

export default http;

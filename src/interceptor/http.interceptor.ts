import axios from "axios";
import store from "../store/index";
const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
});

http.interceptors.request.use((config: any) => {
  store.commit("isLoading", true);
  return config;
});

http.interceptors.response.use((response: any) => {
  console.log(response);
  store.commit("isLoading", false);
  if (response.status !== 200) {
    alert(response.statusText);
  }
  return response;
});

export default http;

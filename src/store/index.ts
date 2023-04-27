import { createStore } from "vuex";
import authModule from "./modules/auth";
import locationModule from "./modules/location";
import coursesModule from "./modules/courses";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { authModule, location: locationModule, courses: coursesModule },
});

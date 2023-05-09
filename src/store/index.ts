import { createStore } from "vuex";
import authModule from "./modules/auth";
import locationModule from "./modules/location";
import coursesModule from "./modules/courses";
import contactModule from "./modules/contact";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    authModule,
    location: locationModule,
    courses: coursesModule,
    contact: contactModule,
  },
});

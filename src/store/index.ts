import { createStore } from "vuex";
import authModule from "./modules/auth";
import locationModule from "./modules/location";
import coursesModule from "./modules/courses";
import contactModule from "./modules/contact";

export default createStore({
  state: {
    toaster: {},
    sidebarOpen: false,
    isLoading: false,
  },
  mutations: {
    isLoading(state: any, payload: any) {
      state.isLoading = payload;
    },
  },
  getters: {
    isLoading(state: any) {
      return state.isLoading;
    },
  },
  actions: {},
  modules: {
    authModule,
    location: locationModule,
    courses: coursesModule,
    contact: contactModule,
  },
});

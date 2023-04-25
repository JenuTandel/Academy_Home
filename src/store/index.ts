import { createStore } from "vuex";
import authModule from "./modules/auth";
import locationModule from "./modules/location";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { authModule, location: locationModule },
});

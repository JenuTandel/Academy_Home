import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
export default {
  namespaced: true,
  state() {
    return {
      courses: [],
      course: {},
      contentTitles: [],
      topics: [],
      isLoading: false,
    };
  },
  mutations,
  actions,
  getters,
};

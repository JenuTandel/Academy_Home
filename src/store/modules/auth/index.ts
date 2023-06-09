import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
export default {
  state() {
    return {
      isLogin: false,
      token: "",
      userId: "",
      isAdmin: false,
      users: [],
      toaster: {},
      enrollText: "",
      networkError: "",
    };
  },
  mutations,
  actions,
  getters,
};

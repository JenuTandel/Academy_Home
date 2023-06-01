export default {
  isLogin(state: any) {
    return state.isLogin;
  },
  isAdmin(state: any) {
    return state.isAdmin;
  },
  getUsers(state: any) {
    return state.users;
  },
  getToaster(state: any) {
    return state.toaster;
  },
  getUserId(state: any) {
    return state.userId;
  },
  getEnrollText(state: any) {
    return state.enrollText;
  },
  getNetworkError(state: any) {
    return state.networkError;
  },
};

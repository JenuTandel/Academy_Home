export default {
  isLogin(state: any, payload: any) {
    state.isLogin = payload;
  },
  setUser(state: any, payload: any) {
    state.token = payload.token;
    state.userId = payload.userId;
  },
  isAdmin(state: any, payload: any) {
    state.isAdmin = payload;
  },
  getUsers(state: any, payload: any) {
    state.users = payload;
  },
  getToasterData(state: any, payload: any) {
    state.toaster = payload;
  },
  userId(state: any, payload: any) {
    state.userId = payload;
  },
  enrollButtonData(state: any, payload: any) {
    state.enrollText = payload;
  },
};

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
};

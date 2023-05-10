export default {
  setContacts(state: any, payload: any) {
    console.log(payload);
    state.contacts = payload;
  },
};

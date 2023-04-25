export default {
  setCountry(state: any, payload: any) {
    state.countries = payload;
  },
  setState(state: any, payload: any) {
    state.states = payload;
  },
  setCity(state: any, payload: any) {
    state.cities = payload;
  },
};

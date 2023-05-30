// import axios from "axios";
// const baseUrl = process.env.VUE_APP_BASE_URL;
export default {
  // country(context: any) {
  //   axios.get(`${baseUrl}countries.json`).then((res) => {
  //     context.commit("setCountry", res.data);
  //   });
  // },
  state(context: any, payload: any) {
    const id = payload.countryId;
    const res = payload.res;

    // axios.get(`${baseUrl}states.json`).then((res) => {
    const states = res.data.filter((state: any) => state.countryId == id);
    context.commit("setState", states);
    // });
  },
  city(context: any, payload: any) {
    const id = payload.stateId;
    const res = payload.res;
    // axios
    //   .get(`${baseUrl}cities.json`)
    //   .then((res) => {
    //     return res.data;
    //   })
    //   .then((res) => {
    const cities = res.data.filter((data: any) => data.stateId == id);
    context.commit("setCity", cities);
    // });
  },
};

import axios from "axios";
const baseUrl = process.env.VUE_APP_BASE_URL;
export default {
  country(context: any) {
    axios.get(`${baseUrl}countries.json`).then((res) => {
      context.commit("setCountry", res.data);
    });
  },
  state(context: any, payload: any) {
    let states: any[];
    const id = payload;

    axios.get(`${baseUrl}states.json`).then((res) => {
      states = res.data.filter((state: any) => state.countryId == id);
      context.commit("setState", states);
    });
  },
  city(context: any, payload: any) {
    let cities: never[] = [];
    const id = payload;
    axios
      .get(`${baseUrl}cities.json`)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        cities = res.filter((data: any) => data.stateId == id);
        context.commit("setCity", cities);
      });
  },
};

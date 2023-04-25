import axios from "axios";
export default {
  country(context: any) {
    axios
      .get("https://academy-home-default-rtdb.firebaseio.com/countries.json")
      .then((res) => {
        context.commit("setCountry", res.data);
      });
  },
  state(context: any, payload: any) {
    let states: any[];
    const id = payload;

    axios
      .get("https://academy-home-default-rtdb.firebaseio.com/states.json")
      .then((res) => {
        states = res.data.filter((state: any) => state.countryId == id);
        context.commit("setState", states);
      });
  },
  city(context: any, payload: any) {
    let cities: never[] = [];
    const id = payload;
    axios
      .get("https://academy-home-default-rtdb.firebaseio.com/cities.json")
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        cities = res.filter((data: any) => data.stateId == id);
        context.commit("setCity", cities);
      });
  },
};

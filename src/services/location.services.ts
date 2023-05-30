import http from "@/interceptor/http.interceptor";
const baseUrl = process.env.VUE_APP_BASE_URL;

export class LocationService {
  getCountry() {
    return http.get(`${baseUrl}countries.json`);
  }
  getStates() {
    return http.get(`${baseUrl}states.json`);
  }
  getCities() {
    return http.get(`${baseUrl}cities.json`);
  }
}

const locationService = new LocationService();
export default locationService;

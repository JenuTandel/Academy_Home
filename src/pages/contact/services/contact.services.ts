import http from "@/interceptor/http.interceptor";
import { Contact } from "../models/contact.model";
const baseUrl = process.env.VUE_APP_BASE_URL;

class ContactService {
  addQuery(query: Contact) {
    return http.post(`${baseUrl}contacts.json`, query);
  }
  getQueries() {
    return http.get(`${baseUrl}contacts.json`);
  }
}

const contactServie = new ContactService();
export default contactServie;

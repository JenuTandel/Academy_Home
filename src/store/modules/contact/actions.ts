import axios from "axios";
export default {
  addQuery(context: any, payload: any) {
    axios
      .post(
        "https://academy-home-default-rtdb.firebaseio.com/contacts.json",
        payload
      )
      .then(() => {
        //
      });
  },
};

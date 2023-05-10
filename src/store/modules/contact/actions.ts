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
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getQueries(context: any) {
    axios
      .get("https://academy-home-default-rtdb.firebaseio.com/contacts.json")
      .then((res: any) => {
        const contacts = [];
        for (const key in res.data) {
          const contact = {
            id: key,
            name: res.data[key].name,
            email: res.data[key].email,
            message: res.data[key].message,
            date: res.data[key].date,
            time: res.data[key].time,
          };
          contacts.push(contact);
        }
        context.commit("setContacts", contacts);
      });
  },
};

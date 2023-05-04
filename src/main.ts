import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import BaseDialog from "./components/UI/BaseDialog.vue";

const app = createApp(App);
app.use(store);
app.use(router);
app.component("base-dialog", BaseDialog);
app.mount("#app");

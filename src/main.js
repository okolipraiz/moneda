import { createApp } from 'vue'
import App from './views/App.vue'
import "./assets/main.css";
import 'vue-sonner/style.css'
import router from './router'

const app = createApp(App);
app.use(router);
app.mount("#app");

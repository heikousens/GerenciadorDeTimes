import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router/router.js'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import './assets/estilos.css';

createApp(App).use(store).use(router).mount('#app')

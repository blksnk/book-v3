import { createApp } from 'vue';
import dotenv from 'dotenv';
import App from './App.vue';
import router from './router';
import store from './store';

dotenv.config();

createApp(App).use(store).use(router).mount('#app');

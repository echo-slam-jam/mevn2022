import { createApp } from 'vue'
import './style.css'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import './interceptors/axios'

createApp(App).use(router).mount('#app')

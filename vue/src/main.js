import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Navbar from './views/NavBar.vue'
import './css/styles.css'

createApp(App).use(router).component('NavBar', Navbar).mount('#app')

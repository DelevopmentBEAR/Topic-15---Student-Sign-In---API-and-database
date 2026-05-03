import { createApp } from 'vue'
// Importing Pinia for state management
import { createPinia } from 'pinia'

// Importing Bootstrap CSS and icons
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import './style.css'

import App from './App.vue'

// Orginal code without Pinia
//createApp(App).mount('#app')

// Create the Vue app and use Pinia for state management
const app = createApp(App)
const pinia = createPinia() // Store instance for Pinia

app.use(pinia)

app.mount('#app')
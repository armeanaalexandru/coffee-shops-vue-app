import './assets/style/main.scss'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import primevue from './plugins/primevue'
import App from './App.vue'

const app = createApp(App)

app.use(primevue)
app.mount('#app')

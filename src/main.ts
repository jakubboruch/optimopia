import '@/assets/main.scss'
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura';
import App from './App.vue'

const app = createApp(App)
app.use(PrimeVue, {
  // Default theme configuration
  theme: {
    ripple: true,
    preset: Aura
  }
})
app.mount('#app')

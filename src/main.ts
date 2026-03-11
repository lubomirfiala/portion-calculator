import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import { messages } from './i18n'
import './assets/main.scss'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages
})

const app = createApp(App)
app.use(pinia)
app.use(i18n)
app.mount('#app')

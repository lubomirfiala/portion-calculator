import '@mdi/font/css/materialdesignicons.min.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { createI18n } from 'vue-i18n';
import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';
import App from './App.vue';
import { messages } from './i18n';
import './assets/styles/app.scss';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages,
});

const app = createApp(App);
app.use(pinia);
app.use(i18n);
app.mount('#app');

if (Capacitor.isNativePlatform()) {
  SplashScreen.hide({ fadeOutDuration: 400 });
}

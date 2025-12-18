import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { VueQueryPlugin } from '@tanstack/vue-query';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';

import App from './App.vue';
import router from './router';
import i18n from './i18n';
import { queryClient } from './app/queryClient';
import ImmobilierPreset from './styles/theme';
import { useAuthStore } from './stores/auth.store';

import './styles/app.css';

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

// Hydrate auth store from localStorage before router
const authStore = useAuthStore();
authStore.hydrate();

app.use(router);
app.use(i18n);
app.use(VueQueryPlugin, { queryClient });
app.use(PrimeVue, {
  theme: {
    preset: ImmobilierPreset,
    options: {
      darkModeSelector: '.dark-mode',
    },
  },
});
app.use(ToastService);
app.use(ConfirmationService);

app.mount('#app');

import { defineStore } from 'pinia';
import { ref } from 'vue';
export const SUPPORTED_LANGUAGES = ['en', 'fr', 'de', 'it'];
export const useLanguageStore = defineStore('language', () => {
    const currentLocale = ref(localStorage.getItem('i18nextLng') || 'en');
    function setLocale(locale) {
        if (SUPPORTED_LANGUAGES.includes(locale)) {
            currentLocale.value = locale;
            localStorage.setItem('i18nextLng', locale);
        }
    }
    return {
        currentLocale,
        setLocale,
    };
});

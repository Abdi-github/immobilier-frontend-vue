import { defineStore } from 'pinia';
import { ref } from 'vue';

export const SUPPORTED_LANGUAGES = ['en', 'fr', 'de', 'it'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const useLanguageStore = defineStore('language', () => {
  const currentLocale = ref<SupportedLanguage>(
    (localStorage.getItem('i18nextLng') as SupportedLanguage) || 'en',
  );

  function setLocale(locale: SupportedLanguage) {
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

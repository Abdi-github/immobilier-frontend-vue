import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useLanguageStore } from '../language.store';

describe('useLanguageStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  it('defaults to "en"', () => {
    const store = useLanguageStore();
    expect(store.currentLocale).toBe('en');
  });

  it('sets locale and persists to localStorage', () => {
    const store = useLanguageStore();
    store.setLocale('fr');
    expect(store.currentLocale).toBe('fr');
    expect(localStorage.getItem('i18nextLng')).toBe('fr');
  });

  it('accepts all supported languages', () => {
    const store = useLanguageStore();
    for (const lang of ['en', 'fr', 'de', 'it'] as const) {
      store.setLocale(lang);
      expect(store.currentLocale).toBe(lang);
    }
  });

  it('ignores unsupported language', () => {
    const store = useLanguageStore();
    store.setLocale('en');
    // @ts-expect-error testing invalid input
    store.setLocale('es');
    expect(store.currentLocale).toBe('en');
  });
});

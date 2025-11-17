import { useI18n } from 'vue-i18n';

export function useLocalizedName() {
  const { locale } = useI18n();
  return (name: Record<string, string> | string | undefined | null): string => {
    if (!name) return '';
    if (typeof name === 'string') return name;
    return name[locale.value] || name.en || '';
  };
}

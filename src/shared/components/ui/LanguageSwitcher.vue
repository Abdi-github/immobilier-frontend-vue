<script setup lang="ts">
import { useLanguageStore, SUPPORTED_LANGUAGES } from '@/stores/language.store';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { Globe, Check } from 'lucide-vue-next';
import Popover from 'primevue/popover';
import { LANGUAGE_LABELS, LANGUAGE_FLAGS } from '@/shared/utils/constants';

const { locale } = useI18n();
const languageStore = useLanguageStore();
const router = useRouter();
const route = useRoute();
const popoverRef = ref();

const currentFlag = computed(() => LANGUAGE_FLAGS[locale.value] || '🇬🇧');

function togglePopover(event: Event) {
  popoverRef.value?.toggle(event);
}

function switchLanguage(lang: string) {
  if (!SUPPORTED_LANGUAGES.includes(lang as (typeof SUPPORTED_LANGUAGES)[number])) return;
  languageStore.setLocale(lang as (typeof SUPPORTED_LANGUAGES)[number]);
  locale.value = lang;

  const newPath = route.path.replace(/^\/[a-z]{2}/, `/${lang}`);
  router.replace(newPath);
  popoverRef.value?.hide();
}
</script>

<template>
  <div data-testid="locale-switcher">
    <button
      class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100"
      @click="togglePopover"
    >
      <Globe class="h-4 w-4" />
      <span class="hidden sm:inline">{{ currentFlag }} {{ locale.toUpperCase() }}</span>
      <span class="sm:hidden">{{ currentFlag }}</span>
    </button>

    <Popover ref="popoverRef" class="w-40">
      <div class="py-1">
        <button
          v-for="lang in SUPPORTED_LANGUAGES"
          :key="lang"
          class="flex w-full cursor-pointer items-center justify-between px-3 py-2 text-sm transition-colors hover:bg-gray-100"
          :class="locale === lang ? 'bg-gray-50 font-medium' : ''"
          @click="switchLanguage(lang)"
        >
          <span>{{ LANGUAGE_FLAGS[lang] }} {{ LANGUAGE_LABELS[lang] }}</span>
          <Check v-if="locale === lang" class="h-4 w-4 text-primary" />
        </button>
      </div>
    </Popover>
  </div>
</template>

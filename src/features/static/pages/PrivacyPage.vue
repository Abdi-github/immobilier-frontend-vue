<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import SEO from '@/shared/components/SEO.vue';

const { t } = useI18n();

const sections = [
  'overview', 'collection', 'usage', 'sharing',
  'cookies', 'rights', 'security', 'retention', 'contact',
];
</script>

<template>
  <div data-testid="privacy-page" class="mx-auto max-w-4xl px-4 py-12">
    <SEO :title="t('privacy.title')" />

    <h1 class="text-3xl font-bold tracking-tight mb-8">{{ t('privacy.title') }}</h1>

    <div class="space-y-8">
      <p class="text-gray-500">{{ t('privacy.lastUpdated') }}</p>

      <section v-for="s in sections" :key="s">
        <h2 class="text-xl font-semibold mb-2">{{ t(`privacy.sections.${s}.title`) }}</h2>
        <p class="text-gray-500 leading-relaxed">{{ t(`privacy.sections.${s}.text`) }}</p>
      </section>
    </div>
  </div>
</template>

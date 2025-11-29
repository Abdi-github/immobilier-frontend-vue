<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { Building2, Users, Globe, Shield } from 'lucide-vue-next';
import SEO from '@/shared/components/SEO.vue';

const { t } = useI18n();

const values = [
  { icon: Building2, key: 'quality' },
  { icon: Users, key: 'trust' },
  { icon: Globe, key: 'multilingual' },
  { icon: Shield, key: 'security' },
];

const stats = [
  { value: '26', key: 'cantons' },
  { value: '10K+', key: 'properties' },
  { value: '500+', key: 'agencies' },
  { value: '4', key: 'languages' },
];
</script>

<template>
  <div data-testid="about-page" class="mx-auto max-w-4xl px-4 py-12">
    <SEO :title="t('about.title')" />

    <!-- Hero -->
    <div class="text-center mb-12">
      <h1 class="text-3xl font-bold tracking-tight md:text-4xl">{{ t('about.title') }}</h1>
      <p class="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">{{ t('about.subtitle') }}</p>
    </div>

    <!-- Mission -->
    <div class="mb-12">
      <h2 class="text-2xl font-semibold mb-3">{{ t('about.mission.title') }}</h2>
      <p class="text-gray-500 leading-relaxed">{{ t('about.mission.text') }}</p>
    </div>

    <!-- Values -->
    <div class="mb-12">
      <h2 class="text-2xl font-semibold mb-6">{{ t('about.values.title') }}</h2>
      <div class="grid gap-6 md:grid-cols-2">
        <div
          v-for="v in values"
          :key="v.key"
          class="rounded-xl border bg-white p-6 flex gap-4"
        >
          <div class="shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <component :is="v.icon" class="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 class="font-semibold">{{ t(`about.values.${v.key}.title`) }}</h3>
            <p class="text-sm text-gray-500 mt-1">{{ t(`about.values.${v.key}.description`) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="rounded-xl bg-gray-100 p-8 text-center">
      <h2 class="text-2xl font-semibold mb-6">{{ t('about.stats.title') }}</h2>
      <div class="grid grid-cols-2 gap-6 md:grid-cols-4">
        <div v-for="s in stats" :key="s.key">
          <p class="text-3xl font-bold text-primary">{{ s.value }}</p>
          <p class="text-sm text-gray-500 mt-1">{{ t(`about.stats.${s.key}`) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

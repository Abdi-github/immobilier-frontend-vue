<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import { Bell, LineChart, FolderOpen, Heart, Clock } from 'lucide-vue-next';

defineProps<{
  title: string;
  subtitle: string;
}>();

const { t, locale } = useI18n();
const lang = computed(() => locale.value);

const features = computed(() => [
  {
    icon: Bell,
    title: t('auth.features.alerts.title', 'Alerts'),
    description: t('auth.features.alerts.description', 'Create alerts to be informed about new properties that match your criteria.'),
  },
  {
    icon: LineChart,
    title: t('auth.features.preEstimates.title', 'Pre-estimates'),
    description: t('auth.features.preEstimates.description', 'Your property pre-estimates are saved in your account and updated regularly.'),
  },
  {
    icon: FolderOpen,
    title: t('auth.features.files.title', 'Files'),
    description: t('auth.features.files.description', 'Save your property documents to show owners your seriousness as a tenant.'),
  },
  {
    icon: Heart,
    title: t('auth.features.favorites.title', 'Favorites'),
    description: t('auth.features.favorites.description', 'Save properties you like in your favorites and compare them easily.'),
  },
  {
    icon: Clock,
    title: t('auth.features.consultations.title', 'Latest consultations'),
    description: t('auth.features.consultations.description', 'Find your recently viewed properties with a single click.'),
  },
]);
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="border-b bg-white">
      <div class="container mx-auto px-4 py-4">
        <router-link :to="{ name: 'home', params: { lang } }" class="flex items-center">
          <span class="text-2xl font-bold text-primary">immobilier</span>
          <span class="text-2xl font-bold text-[#1a1a2e]">.ch</span>
        </router-link>
      </div>
    </header>

    <!-- Professional banner -->
    <div class="bg-[#1a1a2e] py-2 text-center text-sm text-white">
      <span>
        {{ t('auth.professional.banner', 'Are you a professional?') }}
        {{ ' ' }}
        <router-link
          :to="{ name: 'register', params: { lang }, query: { tab: 'professional' } }"
          class="underline hover:text-gray-200"
        >
          {{ t('auth.professional.dashboardAccess', 'Dashboard access') }}
        </router-link>
      </span>
    </div>

    <!-- Main content -->
    <main class="container mx-auto px-4 py-8 lg:py-12">
      <div class="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-2 lg:gap-16">
        <!-- Left column — Form -->
        <div class="rounded-lg bg-white p-6 shadow-sm lg:p-8">
          <div class="mb-8">
            <h1 class="mb-2 text-2xl font-bold text-gray-900">{{ title }}</h1>
            <p class="text-gray-600">{{ subtitle }}</p>
          </div>
          <slot />
        </div>

        <!-- Right column — Features -->
        <div class="hidden lg:block">
          <div class="space-y-6">
            <div v-for="(feature, index) in features" :key="index" class="flex gap-4 rounded-lg bg-white p-4 shadow-sm">
              <div class="shrink-0">
                <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <component :is="feature.icon" class="h-5 w-5 text-primary" />
                </div>
              </div>
              <div>
                <h3 class="mb-1 font-semibold text-gray-900">{{ feature.title }}</h3>
                <p class="text-sm text-gray-600">{{ feature.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

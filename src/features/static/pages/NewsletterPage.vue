<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { Mail, Bell, Building2, TrendingUp, CheckCircle } from 'lucide-vue-next';
import { useToast } from 'primevue/usetoast';
import InputText from 'primevue/inputtext';
import SEO from '@/shared/components/SEO.vue';

const { t } = useI18n();
const toast = useToast();

const email = ref('');
const isSubmitting = ref(false);
const isSubmitted = ref(false);
const emailError = ref('');

const features = [
  { icon: Building2, key: 'newListings' },
  { icon: TrendingUp, key: 'marketInsights' },
  { icon: Bell, key: 'priceAlerts' },
];

async function handleSubmit() {
  emailError.value = '';
  if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    emailError.value = t('newsletter.invalidEmail');
    return;
  }
  isSubmitting.value = true;
  await new Promise((resolve) => setTimeout(resolve, 800));
  isSubmitting.value = false;
  isSubmitted.value = true;
  toast.add({ severity: 'success', summary: t('newsletter.success'), life: 5000 });
}
</script>

<template>
  <div data-testid="newsletter-page" class="mx-auto max-w-4xl px-4 py-16">
    <SEO :title="t('newsletter.title')" />

    <!-- Header -->
    <div class="mb-12 text-center">
      <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <Mail class="h-8 w-8 text-primary" />
      </div>
      <h1 class="mb-4 text-3xl font-bold tracking-tight">{{ t('newsletter.heading') }}</h1>
      <p class="mx-auto max-w-2xl text-lg text-gray-500">{{ t('newsletter.subtitle') }}</p>
    </div>

    <!-- Subscription form -->
    <div class="mx-auto max-w-md mb-16">
      <!-- Success state -->
      <div v-if="isSubmitted" class="rounded-xl border bg-white p-8 text-center">
        <CheckCircle class="mx-auto h-12 w-12 text-green-500 mb-4" />
        <h3 class="text-lg font-semibold mb-2">{{ t('newsletter.successTitle') }}</h3>
        <p class="text-sm text-gray-500">{{ t('newsletter.successDescription') }}</p>
      </div>

      <!-- Form -->
      <form v-else class="rounded-xl border bg-white p-6 space-y-4" @submit.prevent="handleSubmit">
        <div class="space-y-2">
          <label class="text-sm font-medium">{{ t('newsletter.emailLabel') }}</label>
          <InputText
            v-model="email"
            type="email"
            :placeholder="t('newsletter.emailPlaceholder')"
            class="w-full"
            :invalid="!!emailError"
          />
          <p v-if="emailError" class="text-xs text-red-500">{{ emailError }}</p>
        </div>
        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50"
        >
          <Mail class="h-4 w-4" />
          {{ isSubmitting ? t('newsletter.subscribing') : t('newsletter.subscribe') }}
        </button>
      </form>
    </div>

    <!-- Features -->
    <div class="grid gap-6 md:grid-cols-3">
      <div
        v-for="f in features"
        :key="f.key"
        class="rounded-xl border bg-white p-6 text-center"
      >
        <div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <component :is="f.icon" class="h-6 w-6 text-primary" />
        </div>
        <h3 class="font-semibold mb-2">{{ t(`newsletter.features.${f.key}`) }}</h3>
        <p class="text-sm text-gray-500">{{ t(`newsletter.features.${f.key}Desc`) }}</p>
      </div>
    </div>
  </div>
</template>

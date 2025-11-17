<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { CheckCircle, Clock, Mail, ArrowRight } from 'lucide-vue-next';

const { t, locale } = useI18n();
const lang = computed(() => locale.value);
</script>

<template>
  <div data-testid="registration-pending-page" class="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
    <div class="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-lg">
      <!-- Success icon -->
      <div class="relative mx-auto mb-6 h-20 w-20">
        <div class="absolute inset-0 animate-pulse rounded-full bg-green-100" />
        <div class="relative flex h-full w-full items-center justify-center rounded-full bg-green-100">
          <CheckCircle class="h-10 w-10 text-green-600" />
        </div>
      </div>

      <h1 class="mb-2 text-2xl font-bold text-gray-900">
        {{ t('auth.pending.title') }}
      </h1>

      <p class="mb-6 text-gray-600">
        {{ t('auth.pending.subtitle') }}
      </p>

      <!-- Steps -->
      <div class="mb-6 rounded-lg bg-gray-50 p-4 text-left">
        <h3 class="mb-3 font-semibold text-gray-800">
          {{ t('auth.pending.whatHappensNext') }}
        </h3>
        <ul class="space-y-3">
          <li class="flex items-start gap-3">
            <div class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100">
              <Mail class="h-3.5 w-3.5 text-blue-600" />
            </div>
            <p class="text-sm text-gray-600">{{ t('auth.pending.step1') }}</p>
          </li>
          <li class="flex items-start gap-3">
            <div class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100">
              <Clock class="h-3.5 w-3.5 text-amber-600" />
            </div>
            <p class="text-sm text-gray-600">{{ t('auth.pending.step2') }}</p>
          </li>
          <li class="flex items-start gap-3">
            <div class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100">
              <CheckCircle class="h-3.5 w-3.5 text-green-600" />
            </div>
            <p class="text-sm text-gray-600">{{ t('auth.pending.step3') }}</p>
          </li>
        </ul>
      </div>

      <!-- Info box -->
      <div class="mb-6 rounded-lg border border-blue-100 bg-blue-50 p-4 text-left">
        <p class="text-sm text-blue-800">
          <strong>{{ t('auth.pending.questions') }}</strong>
          {{ ' ' }}
          {{ t('auth.pending.contact') }}
        </p>
      </div>

      <!-- Actions -->
      <div class="space-y-3">
        <router-link
          :to="`/${lang}`"
          class="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90"
        >
          {{ t('auth.pending.backToHome') }}
          <ArrowRight class="h-4 w-4" />
        </router-link>
        <router-link
          :to="`/${lang}/sign-in`"
          class="flex w-full items-center justify-center rounded-md border border-gray-300 px-4 py-2.5 text-sm font-medium hover:bg-gray-50"
        >
          {{ t('auth.pending.signIn') }}
        </router-link>
      </div>
    </div>

    <p class="mt-6 max-w-md text-center text-sm text-gray-500">
      {{ t('auth.pending.footerNote', 'Already a member and need help? Contact our support team for assistance.') }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import Button from 'primevue/button';
import { Search } from 'lucide-vue-next';

const { t, locale } = useI18n();
</script>

<template>
  <section class="bg-primary py-16 text-white">
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-3xl font-bold md:text-4xl">
        {{ t('cta.title', 'Ready to find your next home?') }}
      </h2>
      <p class="mt-4 text-lg text-white/80">
        {{ t('cta.subtitle', 'Start your search today and discover amazing properties') }}
      </p>
      <router-link :to="`/${locale}/properties`">
        <Button class="mt-8 gap-2 bg-white !text-primary hover:bg-white/90" size="large">
          <Search class="h-5 w-5" />
          {{ t('cta.button', 'Start searching') }}
        </Button>
      </router-link>
    </div>
  </section>
</template>

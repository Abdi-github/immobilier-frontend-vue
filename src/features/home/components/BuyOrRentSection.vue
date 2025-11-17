<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { Home, Key, Building2 } from 'lucide-vue-next';

const { t, locale } = useI18n();
</script>

<template>
  <section class="bg-[#1a1a2e] py-16">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="mb-8 text-center">
        <h2 class="text-2xl font-bold text-white md:text-3xl">
          {{ t('buyOrRent.title', 'Buy or rent ?') }}
        </h2>
        <p class="mt-2 text-white/70">
          {{ t('buyOrRent.subtitle', 'Whatever your requirements, you will certainly find what you are looking for on immobilier.ch.') }}
        </p>
      </div>

      <!-- Options grid -->
      <div class="mx-auto grid max-w-4xl gap-4 md:grid-cols-3">
        <!-- Buy -->
        <router-link
          :to="`/${locale}/properties?transaction_type=buy`"
          class="group flex items-center gap-4 rounded-lg bg-white/10 p-6 transition-all hover:bg-white/20"
        >
          <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white">
            <Home class="h-6 w-6" />
          </div>
          <span class="text-lg font-semibold text-white">
            {{ t('buyOrRent.wantToBuy', 'I want to buy') }}
          </span>
        </router-link>

        <!-- Rent -->
        <router-link
          :to="`/${locale}/properties?transaction_type=rent`"
          class="group flex items-center gap-4 rounded-lg bg-white/10 p-6 transition-all hover:bg-white/20"
        >
          <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white">
            <Key class="h-6 w-6" />
          </div>
          <span class="text-lg font-semibold text-white">
            {{ t('buyOrRent.wantToRent', 'I want to rent') }}
          </span>
        </router-link>

        <!-- Agency -->
        <router-link
          :to="`/${locale}/agencies`"
          class="group flex items-center gap-4 rounded-lg bg-white/10 p-6 transition-all hover:bg-white/20"
        >
          <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white">
            <Building2 class="h-6 w-6" />
          </div>
          <span class="text-lg font-semibold text-white">
            {{ t('buyOrRent.lookingForAgency', 'I am looking for a real estate agency') }}
          </span>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import SEO from '@/shared/components/SEO.vue';
import HeroSearch from '../components/HeroSearch.vue';
import CityListings from '../components/CityListings.vue';
import BuyOrRentSection from '../components/BuyOrRentSection.vue';
import FeaturedProperties from '../components/FeaturedProperties.vue';

const { t } = useI18n();
</script>

<template>
  <div data-testid="home-page" class="min-h-screen bg-white">
    <SEO
      :title="t('hero.title', 'Real Estate in Switzerland – Buy & Rent')"
      :description="t('hero.subtitle', 'Find apartments, houses & commercial properties for rent or sale across Switzerland.')"
    />

    <!-- Hero section with search -->
    <HeroSearch />

    <!-- Container for inner sections -->
    <div class="mx-auto max-w-7xl md:px-6 lg:px-8">
      <!-- City listings -->
      <CityListings />

      <!-- Buy or Rent section -->
      <BuyOrRentSection />

      <!-- Featured properties -->
      <FeaturedProperties />

      <!-- Info section -->
      <section class="bg-gray-50 py-12">
        <div class="container mx-auto px-4">
          <h2 class="mb-6 text-xl font-bold text-[#1a1a2e]">
            {{ t('info.title', 'We provide you with the keys to a successful real estate experience in Switzerland') }}
          </h2>
          <div class="prose prose-sm max-w-none text-gray-600">
            <p>
              {{ t('info.paragraph1', 'Buying a house, renting an apartment or investing in real estate can often be complicated. Whatever your real estate project in Switzerland – buying, renting, selling or investing – you can be sure to find all the answers to your needs on immobilier.ch.') }}
            </p>
            <p class="mt-4">
              {{ t('info.paragraph2', 'Your dream home is waiting for you! It will only take a few clicks to find it on immobilier.ch. Enter your criteria, launch the search and straightaway obtain the most relevant results.') }}
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

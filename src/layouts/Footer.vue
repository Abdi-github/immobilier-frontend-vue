<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';

const { t, locale } = useI18n();

const lang = computed(() => locale.value);
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer data-testid="footer" class="bg-[#1a1a2e] text-white">
    <div class="container mx-auto px-4 py-12">
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
        <!-- Logo and Social -->
        <div class="space-y-4 lg:col-span-2">
          <router-link :to="{ name: 'home', params: { lang } }" class="inline-block">
            <img src="/logo.svg" alt="immobilier.ch" class="h-8 brightness-0 invert" /ick links -->
          <div class="flex flex-wrap gap-4 text-sm">
            <router-link :to="{ name: 'about', params: { lang } }" class="hover:text-primary">
              {{ t('common.footer.whoAreWe') }}
            </router-link>
            <router-link :to="{ name: 'contact', params: { lang } }" class="hover:text-primary">
              {{ t('common.footer.getInTouch') }}
            </router-link>
            <router-link :to="{ name: 'newsletter', params: { lang } }" class="hover:text-primary">
              {{ t('common.footer.newsletter') }}
            </router-link>
          </div>

          <!-- Social Icons -->
          <div class="flex gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
              aria-label="Facebook"
            >
              <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
              aria-label="LinkedIn"
            >
              <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
              aria-label="YouTube"
            >
              <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
              aria-label="Instagram"
            >
              <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Our Listings -->
        <div class="space-y-3">
          <h4 class="font-semibold text-white/80">{{ t('common.footer.ourListings') }}</h4>
          <ul class="space-y-2 text-sm">
            <li>
              <router-link
                :to="{ name: 'properties', params: { lang }, query: { transaction_type: 'buy' } }"
                class="text-white/60 hover:text-white"
              >
                {{ t('common.footer.buy') }}
              </router-link>
            </li>
            <li>
              <router-link
                :to="{ name: 'properties', params: { lang }, query: { transaction_type: 'rent' } }"
                class="text-white/60 hover:text-white"
              >
                {{ t('common.footer.rent') }}
              </router-link>
            </li>
            <li class="pt-2 font-semibold text-white/80">{{ t('common.footer.agencies') }}</li>
            <li>
              <router-link :to="{ name: 'agencies', params: { lang } }" class="text-white/60 hover:text-white">
                {{ t('common.footer.directory') }}
              </router-link>
            </li>
            <li class="pt-2 font-semibold text-white/80">{{ t('common.footer.forProfessionals') }}</li>
            <li>
              <router-link
                :to="{ name: 'register', params: { lang }, query: { tab: 'professional' } }"
                class="text-white/60 hover:text-white"
              >
                {{ t('common.footer.listProperty') }}
              </router-link>
            </li>
            <li>
              <router-link
                :to="{ name: 'register', params: { lang }, query: { tab: 'professional' } }"
                class="text-white/60 hover:text-white"
              >
                {{ t('common.footer.registerAgency') }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- The Professionals -->
        <div class="space-y-3">
          <h4 class="font-semibold text-white/80">{{ t('common.footer.professionals') }}</h4>
          <ul class="space-y-2 text-sm">
            <li>
              <router-link :to="{ name: 'agencies', params: { lang }, query: { canton: 'fribourg' } }" class="text-white/60 hover:text-white">
                Fribourg
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'agencies', params: { lang }, query: { canton: 'geneva' } }" class="text-white/60 hover:text-white">
                Geneva
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'agencies', params: { lang }, query: { canton: 'neuchatel' } }" class="text-white/60 hover:text-white">
                Neuchâtel
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'agencies', params: { lang }, query: { canton: 'valais' } }" class="text-white/60 hover:text-white">
                Valais
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'agencies', params: { lang }, query: { canton: 'vaud' } }" class="text-white/60 hover:text-white">
                Vaud
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Useful Links -->
        <div class="space-y-3">
          <h4 class="font-semibold text-white/80">{{ t('common.footer.usefulLinks') }}</h4>
          <ul class="space-y-2 text-sm">
            <li>
              <a href="https://uspi.ch/" target="_blank" rel="noopener noreferrer" class="text-white/60 hover:text-white">
                USPI Switzerland
              </a>
            </li>
            <li>
              <a href="https://www.svit.ch/en" target="_blank" rel="noopener noreferrer" class="text-white/60 hover:text-white">
                SVIT Switzerland
              </a>
            </li>
            <li>
              <a href="https://www.fri.ch/" target="_blank" rel="noopener noreferrer" class="text-white/60 hover:text-white">
                FRI
              </a>
            </li>
            <li>
              <a href="https://www.bwo.admin.ch/" target="_blank" rel="noopener noreferrer" class="text-white/60 hover:text-white">
                Federal housing office
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row">
        <p>{{ t('common.footer.copyright', { year: currentYear }) }}</p>
        <div class="flex flex-wrap justify-center gap-4">
          <router-link :to="{ name: 'terms', params: { lang } }" class="hover:text-white">
            {{ t('common.footer.terms') }}
          </router-link>
          <router-link :to="{ name: 'privacy', params: { lang } }" class="hover:text-white">
            {{ t('common.footer.privacy') }}
          </router-link>
          <span class="hover:text-white">
            {{ t('common.footer.advertising') }}
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>

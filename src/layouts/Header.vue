<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import { Search, Heart, Bell, User, LogOut, Settings, LayoutDashboard, Menu, X } from 'lucide-vue-next';
import Popover from 'primevue/popover';
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import { useUiStore } from '@/stores/ui.store';
import LanguageSwitcher from '@/shared/components/ui/LanguageSwitcher.vue';

const { t, locale } = useI18n();
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const uiStore = useUiStore();

const userMenuRef = ref();

const lang = computed(() => locale.value);

const navItems = computed(() => [
  {
    key: 'residential',
    label: t('common.nav.residential'),
    to: { name: 'properties', params: { lang: lang.value }, query: { section: 'residential' } },
  },
  {
    key: 'commercial',
    label: t('common.nav.commercial'),
    to: { name: 'properties', params: { lang: lang.value }, query: { section: 'commercial' } },
  },
  {
    key: 'agencies',
    label: t('common.nav.agencies'),
    to: { name: 'agencies', params: { lang: lang.value } },
  },
]);

function isNavActive(key: string) {
  const path = route.path;
  const query = route.query;
  if (key === 'residential') return path.includes('properties') && query.section === 'residential';
  if (key === 'commercial') return path.includes('properties') && query.section === 'commercial';
  if (key === 'agencies') return path.includes('agencies');
  return false;
}

function toggleUserMenu(event: Event) {
  userMenuRef.value?.toggle(event);
}

async function handleLogout() {
  authStore.logout();
  userMenuRef.value?.hide();
  router.push({ name: 'home', params: { lang: lang.value } });
}

function navigateAndClose(routeName: string) {
  userMenuRef.value?.hide();
  uiStore.mobileMenuOpen = false;
  router.push({ name: routeName, params: { lang: lang.value } });
}

const userInitials = computed(() => {
  if (!authStore.currentUser) return '';
  return (authStore.currentUser.first_name?.[0] || '') + (authStore.currentUser.last_name?.[0] || '');
});
</script>

<template>
  <header data-testid="header" class="sticky top-0 z-50 w-full bg-white shadow-sm">
    <div class="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
      <!-- Logo -->
      <router-link :to="{ name: 'home', params: { lang } }" class="flex shrink-0 items-center">
        <svg width="160" height="32" viewBox="0 0 160 32" class="h-8">
          <text x="0" y="24" class="fill-[#1a1a2e] text-xl font-bold" style="font-family: system-ui, sans-serif">immobilier</text>
          <text x="95" y="24" class="fill-primary text-xl font-bold" style="font-family: system-ui, sans-serif">.ch</text>
        </svg>
      </router-link>

      <!-- Center Navigation -->
      <nav class="hidden items-center gap-1 lg:flex">
        <router-link
          v-for="item in navItems"
          :key="item.key"
          :to="item.to"
          class="px-4 py-2 text-sm font-medium transition-colors hover:text-primary"
          :class="isNavActive(item.key) ? 'text-primary' : 'text-gray-700'"
        >
          {{ item.label }}
        </router-link>
      </nav>

      <!-- Right side actions -->
      <div class="flex items-center gap-2">
        <LanguageSwitcher />

        <!-- Search -->
        <router-link
          :to="{ name: 'properties', params: { lang } }"
          class="hidden rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 md:flex"
          :aria-label="t('common.nav.properties')"
        >
          <Search class="h-5 w-5" />
        </router-link>

        <!-- Favorites -->
        <router-link
          :to="authStore.isAuthenticated
            ? { name: 'dashboard-favorites', params: { lang } }
            : { name: 'sign-in', params: { lang } }"
          class="hidden rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 md:flex"
          :aria-label="t('common.nav.favorites')"
        >
          <Heart class="h-5 w-5" />
        </router-link>

        <!-- Alerts -->
        <router-link
          :to="authStore.isAuthenticated
            ? { name: 'dashboard-alerts', params: { lang } }
            : { name: 'sign-in', params: { lang } }"
          class="hidden rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 md:flex"
          :aria-label="t('common.nav.alerts')"
        >
          <Bell class="h-5 w-5" />
        </router-link>

        <!-- User Menu Trigger -->
        <button class="rounded-full p-1 transition-colors hover:bg-gray-100" aria-haspopup="true" :aria-label="t('common.nav.profile')" @click="toggleUserMenu">
          <div
            v-if="authStore.isAuthenticated && authStore.currentUser"
            class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-white"
          >
            <img
              v-if="authStore.currentUser.avatar_url"
              :src="authStore.currentUser.avatar_url"
              :alt="authStore.currentUser.first_name"
              class="h-8 w-8 rounded-full object-cover"
            />
            <span v-else>{{ userInitials }}</span>
          </div>
          <User v-else class="h-5 w-5 text-gray-600" />
        </button>

        <Popover ref="userMenuRef" class="w-56">
          <template v-if="authStore.isAuthenticated && authStore.currentUser">
            <div class="border-b px-3 py-2">
              <p class="text-sm font-medium text-gray-900">
                {{ authStore.currentUser.first_name }} {{ authStore.currentUser.last_name }}
              </p>
              <p class="text-xs text-gray-500">{{ authStore.currentUser.email }}</p>
            </div>
            <div class="py-1">
              <button class="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="navigateAndClose('dashboard-profile')">
                <LayoutDashboard class="h-4 w-4" />
                {{ t('common.nav.dashboard') }}
              </button>
              <button class="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="navigateAndClose('dashboard-profile')">
                <User class="h-4 w-4" />
                {{ t('common.nav.profile') }}
              </button>
              <button class="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="navigateAndClose('dashboard-favorites')">
                <Heart class="h-4 w-4" />
                {{ t('common.nav.favorites') }}
              </button>
              <button class="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="navigateAndClose('dashboard-alerts')">
                <Bell class="h-4 w-4" />
                {{ t('common.nav.alerts') }}
              </button>
              <button class="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="navigateAndClose('dashboard-settings')">
                <Settings class="h-4 w-4" />
                {{ t('common.nav.settings') }}
              </button>
            </div>
            <div class="border-t py-1">
              <button class="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-gray-100" @click="handleLogout">
                <LogOut class="h-4 w-4" />
                {{ t('common.nav.logout') }}
              </button>
            </div>
          </template>
          <template v-else>
            <div class="py-1">
              <button class="flex w-full items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="navigateAndClose('sign-in')">
                {{ t('common.nav.login') }}
              </button>
              <button class="flex w-full items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="navigateAndClose('register')">
                {{ t('common.nav.register') }}
              </button>
            </div>
          </template>
        </Popover>

        <!-- Mobile menu button -->
        <button
          class="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 md:hidden"
          :aria-label="uiStore.mobileMenuOpen ? t('common.actions.close') : t('common.actions.openMenu')"
          aria-controls="mobile-menu"
          :aria-expanded="uiStore.mobileMenuOpen"
          @click="uiStore.toggleMobileMenu()"
        >
          <X v-if="uiStore.mobileMenuOpen" class="h-6 w-6" />
          <Menu v-else class="h-6 w-6" />
        </button>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <div
      class="overflow-hidden border-t bg-white transition-all duration-200 md:hidden"
      :class="uiStore.mobileMenuOpen ? 'max-h-[400px]' : 'max-h-0'"
    >
      <nav class="container mx-auto flex flex-col px-4 py-4">
        <router-link
          :to="{ name: 'properties', params: { lang }, query: { section: 'residential' } }"
          class="border-b border-gray-100 py-3 text-sm font-medium"
          @click="uiStore.mobileMenuOpen = false"
        >
          {{ t('common.nav.residential') }}
        </router-link>
        <router-link
          :to="{ name: 'properties', params: { lang }, query: { section: 'commercial' } }"
          class="border-b border-gray-100 py-3 text-sm font-medium"
          @click="uiStore.mobileMenuOpen = false"
        >
          {{ t('common.nav.commercial') }}
        </router-link>
        <router-link
          :to="{ name: 'agencies', params: { lang } }"
          class="border-b border-gray-100 py-3 text-sm font-medium"
          @click="uiStore.mobileMenuOpen = false"
        >
          {{ t('common.nav.agencies') }}
        </router-link>

        <template v-if="authStore.isAuthenticated">
          <router-link
            :to="{ name: 'dashboard-profile', params: { lang } }"
            class="flex items-center gap-2 border-b border-gray-100 py-3 text-sm font-medium"
            @click="uiStore.mobileMenuOpen = false"
          >
            <LayoutDashboard class="h-4 w-4" />
            {{ t('common.nav.dashboard') }}
          </router-link>
          <router-link
            :to="{ name: 'dashboard-favorites', params: { lang } }"
            class="flex items-center gap-2 border-b border-gray-100 py-3 text-sm font-medium"
            @click="uiStore.mobileMenuOpen = false"
          >
            <Heart class="h-4 w-4" />
            {{ t('common.nav.favorites') }}
          </router-link>
          <router-link
            :to="{ name: 'dashboard-alerts', params: { lang } }"
            class="flex items-center gap-2 py-3 text-sm font-medium"
            @click="uiStore.mobileMenuOpen = false"
          >
            <Bell class="h-4 w-4" />
            {{ t('common.nav.alerts') }}
          </router-link>
        </template>
        <template v-else>
          <router-link
            :to="{ name: 'sign-in', params: { lang } }"
            class="flex items-center gap-2 py-3 text-sm font-medium"
            @click="uiStore.mobileMenuOpen = false"
          >
            <User class="h-4 w-4" />
            {{ t('common.nav.login') }}
          </router-link>
        </template>
      </nav>
    </div>
  </header>
</template>

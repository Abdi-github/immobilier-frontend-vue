<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import {
  User,
  Heart,
  Bell,
  MessageSquare,
  Settings,
  Building2,
  Plus,
  ArrowLeft,
  Menu,
} from 'lucide-vue-next';
import { useAuthStore } from '@/stores/auth.store';
import { useUiStore } from '@/stores/ui.store';
import LanguageSwitcher from '@/shared/components/ui/LanguageSwitcher.vue';

const { t, locale } = useI18n();
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const uiStore = useUiStore();

const lang = computed(() => locale.value);

const isPropertyManager = computed(() => {
  const managerTypes = ['owner', 'agent', 'agency_admin', 'platform_admin', 'super_admin'];
  return authStore.currentUser && managerTypes.includes(authStore.currentUser.user_type);
});

const navItems = computed(() => {
  const items = [
    { key: 'profile', label: t('dashboard.nav.profile', 'Profile'), icon: User, routeName: 'dashboard-profile' },
    { key: 'favorites', label: t('dashboard.nav.favorites', 'Favorites'), icon: Heart, routeName: 'dashboard-favorites' },
    { key: 'alerts', label: t('dashboard.nav.alerts', 'Alerts'), icon: Bell, routeName: 'dashboard-alerts' },
    { key: 'inquiries', label: t('dashboard.nav.inquiries', 'Inquiries'), icon: MessageSquare, routeName: 'dashboard-inquiries' },
    { key: 'settings', label: t('dashboard.nav.settings', 'Settings'), icon: Settings, routeName: 'dashboard-settings' },
  ];

  if (isPropertyManager.value) {
    items.push(
      { key: 'my-properties', label: t('dashboard.nav.myProperties', 'My Properties'), icon: Building2, routeName: 'my-properties' },
      { key: 'create-property', label: t('dashboard.nav.addProperty', 'Add Property'), icon: Plus, routeName: 'create-property' },
    );
  }

  return items;
});

function isActive(routeName: string) {
  return route.name === routeName;
}

const userInitials = computed(() => {
  if (!authStore.currentUser) return '';
  return (authStore.currentUser.first_name?.[0] || '') + (authStore.currentUser.last_name?.[0] || '');
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Dashboard Header -->
    <header class="sticky top-0 z-40 border-b bg-white">
      <div class="container mx-auto flex h-14 items-center justify-between px-4">
        <div class="flex items-center gap-3">
          <!-- Mobile menu -->
          <button class="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden" @click="uiStore.toggleSidebar()">
            <Menu class="h-5 w-5" />
          </button>
          <router-link :to="{ name: 'home', params: { lang } }" class="flex items-center">
            <img src="/logo.svg" alt="immobilier.ch" class="h-8" />
          </router-link>
        </div>
        <div class="flex items-center gap-3">
          <LanguageSwitcher />
          <router-link
            :to="{ name: 'home', params: { lang } }"
            class="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
          >
            <ArrowLeft class="h-4 w-4" />
            <span class="hidden sm:inline">{{ t('dashboard.common.backToSite', 'Back to site') }}</span>
          </router-link>
        </div>
      </div>
    </header>

    <div class="container mx-auto flex gap-8 px-4 py-8">
      <!-- Sidebar -->
      <aside
        class="fixed inset-y-0 left-0 z-30 w-64 -translate-x-full transform border-r bg-white transition-transform lg:static lg:translate-x-0"
        :class="uiStore.sidebarOpen ? 'translate-x-0' : ''"
      >
        <div class="flex h-full flex-col p-6">
          <!-- User info -->
          <div class="mb-6 flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-medium text-white">
              <img
                v-if="authStore.currentUser?.avatar_url"
                :src="authStore.currentUser.avatar_url"
                :alt="authStore.currentUser.first_name"
                class="h-10 w-10 rounded-full object-cover"
              />
              <span v-else>{{ userInitials }}</span>
            </div>
            <div class="min-w-0">
              <p class="truncate text-sm font-medium text-gray-900">
                {{ authStore.currentUser?.first_name }} {{ authStore.currentUser?.last_name }}
              </p>
              <p class="truncate text-xs text-gray-500">{{ authStore.currentUser?.email }}</p>
            </div>
          </div>

          <!-- Navigation -->
          <nav class="flex-1 space-y-1">
            <button
              v-for="item in navItems"
              :key="item.key"
              class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
              :class="isActive(item.routeName)
                ? 'bg-primary/10 text-primary'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'"
              @click="router.push({ name: item.routeName, params: { lang } }); uiStore.sidebarOpen = false"
            >
              <component :is="item.icon" class="h-4 w-4" />
              {{ item.label }}
            </button>
          </nav>
        </div>
      </aside>

      <!-- Sidebar backdrop (mobile) -->
      <div
        v-if="uiStore.sidebarOpen"
        class="fixed inset-0 z-20 bg-black/50 lg:hidden"
        @click="uiStore.sidebarOpen = false"
      />

      <!-- Content -->
      <main class="min-w-0 flex-1">
        <div class="mx-auto max-w-4xl">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

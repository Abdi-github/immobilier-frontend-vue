<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { Lock, Bell, Globe, Loader2, Eye, EyeOff, AlertTriangle } from 'lucide-vue-next';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import ToggleSwitch from 'primevue/toggleswitch';
import ConfirmDialog from 'primevue/confirmdialog';
import Skeleton from 'primevue/skeleton';
import { useAuthStore } from '@/stores/auth.store';
import { useLanguageStore } from '@/stores/language.store';
import { useSettings, useUpdateSettings, useChangePassword, useDeactivateAccount } from '../composables/useSettings';
import type { SupportedLanguage } from '@/features/auth/types';
import SEO from '@/shared/components/SEO.vue';

const { t, locale } = useI18n();
const router = useRouter();
const toast = useToast();
const confirm = useConfirm();
const authStore = useAuthStore();
const languageStore = useLanguageStore();

const SUPPORTED_LANGUAGES: { value: SupportedLanguage; label: string; flag: string }[] = [
  { value: 'en', label: 'English', flag: '🇬🇧' },
  { value: 'fr', label: 'Français', flag: '🇫🇷' },
  { value: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { value: 'it', label: 'Italiano', flag: '🇮🇹' },
];

const { data: settings, isLoading: isLoadingSettings } = useSettings();
const updateSettingsMutation = useUpdateSettings();
const changePasswordMutation = useChangePassword();
const deactivateAccountMutation = useDeactivateAccount();

// Password form
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);
const passwordForm = ref({
  current_password: '',
  new_password: '',
  confirm_password: '',
});
const passwordErrors = ref<Record<string, string>>({});

function validatePassword() {
  const errors: Record<string, string> = {};
  if (!passwordForm.value.current_password) {
    errors.current_password = 'Current password is required';
  }
  if (!passwordForm.value.new_password || passwordForm.value.new_password.length < 8) {
    errors.new_password = 'Password must be at least 8 characters';
  } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passwordForm.value.new_password)) {
    errors.new_password = 'Password must contain uppercase, lowercase, and number';
  }
  if (passwordForm.value.new_password !== passwordForm.value.confirm_password) {
    errors.confirm_password = "Passwords don't match";
  }
  passwordErrors.value = errors;
  return Object.keys(errors).length === 0;
}

async function handlePasswordSubmit() {
  if (!validatePassword()) return;

  try {
    await changePasswordMutation.mutateAsync(passwordForm.value);
    toast.add({ severity: 'success', summary: t('settings.password.changeSuccess'), life: 5000 });
    passwordForm.value = { current_password: '', new_password: '', confirm_password: '' };
    passwordErrors.value = {};
  } catch (error) {
    const message = (error as { response?: { data?: { message?: string } } }).response?.data?.message;
    toast.add({ severity: 'error', summary: message || t('settings.password.changeError'), life: 5000 });
  }
}

const selectedLanguage = computed(
  () => authStore.currentUser?.preferred_language || locale.value,
);

async function handleLanguageChange(event: Event) {
  const newLang = (event.target as HTMLSelectElement).value as SupportedLanguage;
  try {
    await updateSettingsMutation.mutateAsync({ language: newLang });
    authStore.updateUser({ preferred_language: newLang });
    languageStore.setLocale(newLang);
    toast.add({ severity: 'success', summary: t('settings.language.updateSuccess'), life: 5000 });
  } catch {
    toast.add({ severity: 'error', summary: t('settings.language.updateError'), life: 5000 });
  }
}

async function handleNotificationChange(key: string, value: boolean) {
  if (!settings.value) return;
  try {
    await updateSettingsMutation.mutateAsync({
      notifications: {
        ...settings.value.notifications,
        [key]: value,
      },
    });
    toast.add({ severity: 'success', summary: t('settings.notifications.updateSuccess'), life: 5000 });
  } catch {
    toast.add({ severity: 'error', summary: t('settings.notifications.updateError'), life: 5000 });
  }
}

function confirmDeleteAccount() {
  confirm.require({
    header: t('settings.danger.deleteConfirmTitle'),
    message: t('settings.danger.deleteConfirmDescription'),
    acceptClass: '!bg-red-600 !border-red-600',
    acceptLabel: t('settings.danger.deleteConfirm'),
    rejectLabel: t('common.cancel'),
    accept: handleDeleteAccount,
  });
}

async function handleDeleteAccount() {
  try {
    await deactivateAccountMutation.mutateAsync();
    toast.add({ severity: 'success', summary: t('settings.danger.deleteSuccess', 'Account deactivated successfully'), life: 5000 });
    authStore.logout();
    router.push({ name: 'home', params: { lang: locale.value } });
  } catch (error) {
    const message = (error as { response?: { data?: { message?: string } } }).response?.data?.message;
    toast.add({ severity: 'error', summary: message || t('settings.danger.deleteError', 'Failed to deactivate account'), life: 5000 });
  }
}
</script>

<template>
  <div data-testid="account-settings-page" class="space-y-6">
    <SEO :title="t('settings.title')" />
    <ConfirmDialog />

    <!-- Page Header -->
    <div>
      <h1 class="text-2xl font-bold tracking-tight">{{ t('settings.title') }}</h1>
      <p class="text-gray-500">{{ t('settings.description') }}</p>
    </div>

    <!-- Language Settings -->
    <div class="rounded-xl border bg-white">
      <div class="border-b px-6 py-4">
        <h2 class="flex items-center gap-2 text-lg font-semibold">
          <Globe class="h-5 w-5" />
          {{ t('settings.language.title') }}
        </h2>
        <p class="text-sm text-gray-500">{{ t('settings.language.description') }}</p>
      </div>
      <div class="p-6">
        <div class="max-w-xs">
          <label class="text-sm font-medium text-gray-700">{{ t('settings.language.select') }}</label>
          <select
            :value="selectedLanguage"
            :disabled="updateSettingsMutation.isPending.value"
            class="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:ring-primary focus:outline-none"
            @change="handleLanguageChange"
          >
            <option v-for="lang in SUPPORTED_LANGUAGES" :key="lang.value" :value="lang.value">
              {{ lang.flag }} {{ lang.label }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Password Settings -->
    <div class="rounded-xl border bg-white">
      <div class="border-b px-6 py-4">
        <h2 class="flex items-center gap-2 text-lg font-semibold">
          <Lock class="h-5 w-5" />
          {{ t('settings.password.title') }}
        </h2>
        <p class="text-sm text-gray-500">{{ t('settings.password.description') }}</p>
      </div>
      <div class="p-6">
        <form class="max-w-md space-y-4" @submit.prevent="handlePasswordSubmit">
          <!-- Current Password -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">{{ t('settings.password.current') }}</label>
            <div class="relative">
              <input
                v-model="passwordForm.current_password"
                :type="showCurrentPassword ? 'text' : 'password'"
                :disabled="changePasswordMutation.isPending.value"
                class="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-sm focus:border-primary focus:ring-primary focus:outline-none"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                @click="showCurrentPassword = !showCurrentPassword"
              >
                <EyeOff v-if="showCurrentPassword" class="h-4 w-4" />
                <Eye v-else class="h-4 w-4" />
              </button>
            </div>
            <p v-if="passwordErrors.current_password" class="text-sm text-red-500">{{ passwordErrors.current_password }}</p>
          </div>

          <!-- New Password -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">{{ t('settings.password.new') }}</label>
            <div class="relative">
              <input
                v-model="passwordForm.new_password"
                :type="showNewPassword ? 'text' : 'password'"
                :disabled="changePasswordMutation.isPending.value"
                class="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-sm focus:border-primary focus:ring-primary focus:outline-none"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                @click="showNewPassword = !showNewPassword"
              >
                <EyeOff v-if="showNewPassword" class="h-4 w-4" />
                <Eye v-else class="h-4 w-4" />
              </button>
            </div>
            <p v-if="passwordErrors.new_password" class="text-sm text-red-500">{{ passwordErrors.new_password }}</p>
            <p class="text-xs text-gray-400">{{ t('settings.password.requirements') }}</p>
          </div>

          <!-- Confirm Password -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700">{{ t('settings.password.confirm') }}</label>
            <div class="relative">
              <input
                v-model="passwordForm.confirm_password"
                :type="showConfirmPassword ? 'text' : 'password'"
                :disabled="changePasswordMutation.isPending.value"
                class="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-sm focus:border-primary focus:ring-primary focus:outline-none"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                @click="showConfirmPassword = !showConfirmPassword"
              >
                <EyeOff v-if="showConfirmPassword" class="h-4 w-4" />
                <Eye v-else class="h-4 w-4" />
              </button>
            </div>
            <p v-if="passwordErrors.confirm_password" class="text-sm text-red-500">{{ passwordErrors.confirm_password }}</p>
          </div>

          <button
            type="submit"
            :disabled="changePasswordMutation.isPending.value"
            class="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50"
          >
            <Loader2 v-if="changePasswordMutation.isPending.value" class="h-4 w-4 animate-spin" />
            {{ t('settings.password.change') }}
          </button>
        </form>
      </div>
    </div>

    <!-- Notification Settings -->
    <div class="rounded-xl border bg-white">
      <div class="border-b px-6 py-4">
        <h2 class="flex items-center gap-2 text-lg font-semibold">
          <Bell class="h-5 w-5" />
          {{ t('settings.notifications.title') }}
        </h2>
        <p class="text-sm text-gray-500">{{ t('settings.notifications.description') }}</p>
      </div>
      <div class="p-6 space-y-6">
        <template v-if="isLoadingSettings">
          <div v-for="i in 4" :key="i" class="flex items-center justify-between">
            <div class="space-y-1">
              <Skeleton width="10rem" height="1rem" />
              <Skeleton width="16rem" height="0.75rem" />
            </div>
            <Skeleton width="2.75rem" height="1.5rem" border-radius="9999px" />
          </div>
        </template>
        <template v-else>
          <div class="space-y-4">
            <!-- New Properties -->
            <div class="flex items-center justify-between">
              <div class="space-y-0.5">
                <label class="text-sm font-medium text-gray-700">{{ t('settings.notifications.newProperties') }}</label>
                <p class="text-sm text-gray-500">{{ t('settings.notifications.newPropertiesDesc') }}</p>
              </div>
              <ToggleSwitch
                :model-value="settings?.notifications?.email_new_properties ?? false"
                :disabled="updateSettingsMutation.isPending.value"
                @update:model-value="(val: boolean) => handleNotificationChange('email_new_properties', val)"
              />
            </div>

            <hr />

            <!-- Price Changes -->
            <div class="flex items-center justify-between">
              <div class="space-y-0.5">
                <label class="text-sm font-medium text-gray-700">{{ t('settings.notifications.priceChanges') }}</label>
                <p class="text-sm text-gray-500">{{ t('settings.notifications.priceChangesDesc') }}</p>
              </div>
              <ToggleSwitch
                :model-value="settings?.notifications?.email_price_changes ?? false"
                :disabled="updateSettingsMutation.isPending.value"
                @update:model-value="(val: boolean) => handleNotificationChange('email_price_changes', val)"
              />
            </div>

            <hr />

            <!-- Favorites Updates -->
            <div class="flex items-center justify-between">
              <div class="space-y-0.5">
                <label class="text-sm font-medium text-gray-700">{{ t('settings.notifications.favoritesUpdates') }}</label>
                <p class="text-sm text-gray-500">{{ t('settings.notifications.favoritesUpdatesDesc') }}</p>
              </div>
              <ToggleSwitch
                :model-value="settings?.notifications?.email_favorites_updates ?? false"
                :disabled="updateSettingsMutation.isPending.value"
                @update:model-value="(val: boolean) => handleNotificationChange('email_favorites_updates', val)"
              />
            </div>

            <hr />

            <!-- Newsletter -->
            <div class="flex items-center justify-between">
              <div class="space-y-0.5">
                <label class="text-sm font-medium text-gray-700">{{ t('settings.notifications.newsletter') }}</label>
                <p class="text-sm text-gray-500">{{ t('settings.notifications.newsletterDesc') }}</p>
              </div>
              <ToggleSwitch
                :model-value="settings?.notifications?.email_newsletter ?? false"
                :disabled="updateSettingsMutation.isPending.value"
                @update:model-value="(val: boolean) => handleNotificationChange('email_newsletter', val)"
              />
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- Danger Zone -->
    <div class="rounded-xl border border-red-200 bg-white">
      <div class="border-b border-red-200 px-6 py-4">
        <h2 class="flex items-center gap-2 text-lg font-semibold text-red-600">
          <AlertTriangle class="h-5 w-5" />
          {{ t('settings.danger.title') }}
        </h2>
        <p class="text-sm text-gray-500">{{ t('settings.danger.description') }}</p>
      </div>
      <div class="p-6">
        <button
          class="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
          :disabled="deactivateAccountMutation.isPending.value"
          @click="confirmDeleteAccount"
        >
          {{ t('settings.danger.deleteAccount') }}
        </button>
      </div>
    </div>
  </div>
</template>

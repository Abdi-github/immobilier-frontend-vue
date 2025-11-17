<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { Eye, EyeOff, Loader2, CheckCircle, XCircle } from 'lucide-vue-next';
import AuthLayout from '../components/AuthLayout.vue';
import { useAuth } from '../composables/useAuth';

const route = useRoute();
const { t, locale } = useI18n();
const { resetPasswordMutation } = useAuth();

const lang = computed(() => locale.value);
const token = computed(() => (route.query.token as string) || '');

const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const success = ref(false);
const validationError = ref('');

async function handleSubmit() {
  validationError.value = '';

  if (password.value.length < 8) {
    validationError.value = t('auth.validation.passwordLength');
    return;
  }

  if (password.value !== confirmPassword.value) {
    validationError.value = t('auth.validation.passwordMismatch');
    return;
  }

  if (!token.value) {
    validationError.value = t('auth.resetPassword.invalidToken');
    return;
  }

  try {
    await resetPasswordMutation.mutateAsync({ token: token.value, password: password.value });
    success.value = true;
  } catch {
    // error available via mutation
  }
}

function getErrorMessage(): string | null {
  if (validationError.value) return validationError.value;
  const error = resetPasswordMutation.error.value;
  if (!error) return null;
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as { response?: { data?: { message?: string } } };
    return axiosError.response?.data?.message || t('auth.resetPassword.error');
  }
  return t('auth.errors.network');
}
</script>

<template>
  <div data-testid="reset-password-page">
    <!-- No token -->
    <AuthLayout
      v-if="!token"
      :title="t('auth.resetPassword.title')"
      :subtitle="t('auth.resetPassword.subtitle')"
    >
      <div class="py-8 text-center">
        <XCircle class="mx-auto mb-4 h-12 w-12 text-red-500" />
        <h3 class="mb-2 text-lg font-semibold">{{ t('auth.resetPassword.invalidToken') }}</h3>
        <p class="mb-6 text-sm text-gray-500">{{ t('auth.resetPassword.invalidTokenDescription') }}</p>
        <router-link
          :to="`/${lang}/sign-in`"
          class="inline-flex items-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90"
        >
          {{ t('auth.resetPassword.backToLogin') }}
        </router-link>
      </div>
    </AuthLayout>

    <!-- Success -->
    <AuthLayout
      v-else-if="success"
      :title="t('auth.resetPassword.title')"
      :subtitle="t('auth.resetPassword.subtitle')"
    >
      <div class="py-8 text-center">
        <CheckCircle class="mx-auto mb-4 h-12 w-12 text-green-500" />
        <h3 class="mb-2 text-lg font-semibold">{{ t('auth.resetPassword.successTitle') }}</h3>
        <p class="mb-6 text-sm text-gray-500">{{ t('auth.resetPassword.successMessage') }}</p>
        <router-link
          :to="`/${lang}/sign-in`"
          class="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90"
        >
          {{ t('auth.resetPassword.loginNow') }}
        </router-link>
      </div>
    </AuthLayout>

    <!-- Reset form -->
    <AuthLayout
      v-else
      :title="t('auth.resetPassword.title')"
      :subtitle="t('auth.resetPassword.subtitle')"
    >
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- New password -->
        <div class="space-y-2">
          <label for="new-password" class="text-sm font-medium">
            {{ t('auth.resetPassword.newPassword') }} *
          </label>
          <div class="relative">
            <input
              id="new-password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              :placeholder="t('auth.resetPassword.newPasswordPlaceholder')"
              required
              minlength="8"
              :disabled="resetPasswordMutation.isPending.value"
              class="h-11 w-full rounded-md border border-gray-300 px-3 pr-10 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
            />
            <button
              type="button"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              tabindex="-1"
              @click="showPassword = !showPassword"
            >
              <EyeOff v-if="showPassword" class="h-4 w-4" />
              <Eye v-else class="h-4 w-4" />
            </button>
          </div>
        </div>

        <!-- Confirm password -->
        <div class="space-y-2">
          <label for="confirm-new-password" class="text-sm font-medium">
            {{ t('auth.resetPassword.confirmPassword') }} *
          </label>
          <div class="relative">
            <input
              id="confirm-new-password"
              v-model="confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              :placeholder="t('auth.resetPassword.confirmPasswordPlaceholder')"
              required
              minlength="8"
              :disabled="resetPasswordMutation.isPending.value"
              class="h-11 w-full rounded-md border border-gray-300 px-3 pr-10 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
            />
            <button
              type="button"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              tabindex="-1"
              @click="showConfirmPassword = !showConfirmPassword"
            >
              <EyeOff v-if="showConfirmPassword" class="h-4 w-4" />
              <Eye v-else class="h-4 w-4" />
            </button>
          </div>
        </div>

        <p class="text-xs text-gray-500">{{ t('auth.resetPassword.requirements') }}</p>

        <!-- Error -->
        <p v-if="getErrorMessage()" class="text-sm text-red-600">{{ getErrorMessage() }}</p>

        <!-- Submit -->
        <button
          type="submit"
          class="flex h-11 w-full items-center justify-center rounded-md bg-primary text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50"
          :disabled="resetPasswordMutation.isPending.value"
        >
          <template v-if="resetPasswordMutation.isPending.value">
            <Loader2 class="mr-2 h-4 w-4 animate-spin" />
            {{ t('auth.resetPassword.resetting') }}
          </template>
          <template v-else>{{ t('auth.resetPassword.submit') }}</template>
        </button>

        <!-- Back to login -->
        <div class="text-center">
          <router-link :to="`/${lang}/sign-in`" class="text-sm text-primary hover:underline">
            {{ t('auth.resetPassword.backToLogin') }}
          </router-link>
        </div>
      </form>
    </AuthLayout>
  </div>
</template>

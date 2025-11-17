<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { Eye, EyeOff, Loader2 } from 'lucide-vue-next';
import AuthLayout from '../components/AuthLayout.vue';
import ForgotPasswordModal from '../components/ForgotPasswordModal.vue';
import { useAuth } from '../composables/useAuth';

const route = useRoute();
const router = useRouter();
const { t, locale } = useI18n();
const { loginMutation } = useAuth();

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const forgotPasswordOpen = ref(false);

const lang = computed(() => locale.value);
const from = computed(() => (route.query.redirect as string) || `/${lang.value}`);

async function handleSubmit() {
  if (!email.value.trim() || !password.value.trim()) return;
  try {
    await loginMutation.mutateAsync({ email: email.value, password: password.value });
    router.push(from.value);
  } catch {
    // error available via loginMutation.error
  }
}

function getErrorMessage(): string | null {
  const error = loginMutation.error.value;
  if (!error) return null;
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as { response?: { data?: { message?: string } } };
    return axiosError.response?.data?.message || t('auth.errors.login');
  }
  return t('auth.errors.network');
}
</script>

<template>
  <AuthLayout
    :title="t('auth.signIn.title')"
    :subtitle="t('auth.signIn.subtitle')"
  >
    <form data-testid="sign-in-page" @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Email -->
      <div class="space-y-2">
        <label for="login-email" class="text-sm font-medium">
          {{ t('auth.form.email') }} *
        </label>
        <input
          id="login-email"
          v-model="email"
          type="email"
          :placeholder="t('auth.form.emailPlaceholder')"
          required
          autocomplete="email"
          :disabled="loginMutation.isPending.value"
          data-testid="login-email"
          class="h-11 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
        />
      </div>

      <!-- Password -->
      <div class="space-y-2">
        <label for="login-password" class="text-sm font-medium">
          {{ t('auth.form.password') }} *
        </label>
        <div class="relative">
          <input
            id="login-password"
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            :placeholder="t('auth.form.passwordPlaceholder')"
            required
            autocomplete="current-password"
            :disabled="loginMutation.isPending.value"
            data-testid="login-password"
            class="h-11 w-full rounded-md border border-gray-300 px-3 pr-10 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
          />
          <button
            type="button"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            tabindex="-1"
            @click="showPassword = !showPassword"
          >
            <EyeOff v-if="showPassword" class="h-5 w-5" />
            <Eye v-else class="h-5 w-5" />
          </button>
        </div>
      </div>

      <!-- Error message -->
      <div v-if="loginMutation.isError.value" class="rounded-md border border-red-200 bg-red-50 p-3">
        <p class="text-sm text-red-600">{{ getErrorMessage() }}</p>
      </div>

      <!-- Submit -->
      <button
        type="submit"
        class="flex h-11 w-full items-center justify-center rounded-md bg-primary text-base font-semibold text-white hover:bg-primary/90 disabled:opacity-50"
        :disabled="loginMutation.isPending.value || !email.trim() || !password.trim()"
        data-testid="login-button"
      >
        <template v-if="loginMutation.isPending.value">
          <Loader2 class="mr-2 h-4 w-4 animate-spin" />
          {{ t('auth.signIn.loggingIn') }}
        </template>
        <template v-else>
          {{ t('auth.signIn.submit') }}
        </template>
      </button>

      <!-- Forgot password -->
      <div class="text-center">
        <button
          type="button"
          class="text-sm text-primary hover:underline"
          @click="forgotPasswordOpen = true"
        >
          {{ t('auth.signIn.forgotPassword') }}
        </button>
      </div>

      <!-- Divider -->
      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <span class="w-full border-t" />
        </div>
        <div class="relative flex justify-center text-xs uppercase">
          <span class="bg-white px-2 text-gray-500">{{ t('auth.signIn.or') }}</span>
        </div>
      </div>

      <!-- Register link -->
      <div class="text-center">
        <p class="mb-2 text-sm text-gray-600">
          {{ t('auth.signIn.noAccount') }}
        </p>
        <router-link
          :to="`/${lang}/register`"
          class="text-sm font-semibold text-primary hover:underline"
        >
          {{ t('auth.signIn.createAccount') }}
        </router-link>
      </div>
    </form>

    <ForgotPasswordModal v-model:visible="forgotPasswordOpen" />
  </AuthLayout>
</template>

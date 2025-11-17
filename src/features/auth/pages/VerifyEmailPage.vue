<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { CheckCircle, XCircle, Loader2, Mail } from 'lucide-vue-next';
import AuthLayout from '../components/AuthLayout.vue';
import { useAuth } from '../composables/useAuth';

const route = useRoute();
const { t, locale } = useI18n();
const { verifyEmailMutation, resendVerificationMutation } = useAuth();

const lang = computed(() => locale.value);
const token = computed(() => (route.query.token as string) || '');

type VerifyStatus = 'verifying' | 'success' | 'error' | 'no-token';
const verifyStatus = ref<VerifyStatus>(token.value ? 'verifying' : 'no-token');

const resendEmail = ref('');
const resendSuccess = ref(false);

onMounted(async () => {
  if (!token.value) return;
  try {
    await verifyEmailMutation.mutateAsync({ token: token.value });
    verifyStatus.value = 'success';
  } catch {
    verifyStatus.value = 'error';
  }
});

async function handleResend() {
  if (!resendEmail.value.trim()) return;
  try {
    await resendVerificationMutation.mutateAsync({ email: resendEmail.value });
    resendSuccess.value = true;
  } catch {
    // error available via mutation
  }
}

function getVerifyErrorMessage(): string {
  const error = verifyEmailMutation.error.value;
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as { response?: { data?: { message?: string } } };
    return axiosError.response?.data?.message || t('auth.verifyEmail.errorGeneric');
  }
  return t('auth.verifyEmail.errorGeneric');
}

function getResendErrorMessage(): string | null {
  const error = resendVerificationMutation.error.value;
  if (!error) return null;
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as { response?: { data?: { message?: string } } };
    return axiosError.response?.data?.message || t('auth.verifyEmail.resendError');
  }
  return t('auth.errors.network');
}
</script>

<template>
  <div data-testid="verify-email-page">
    <!-- Verifying -->
    <AuthLayout
      v-if="verifyStatus === 'verifying'"
      :title="t('auth.verifyEmail.title')"
      :subtitle="t('auth.verifyEmail.subtitle')"
    >
      <div class="py-12 text-center">
        <Loader2 class="mx-auto mb-4 h-12 w-12 animate-spin text-primary" />
        <h3 class="mb-2 text-lg font-semibold">{{ t('auth.verifyEmail.verifying') }}</h3>
        <p class="text-sm text-gray-500">{{ t('auth.verifyEmail.pleaseWait') }}</p>
      </div>
    </AuthLayout>

    <!-- Success -->
    <AuthLayout
      v-else-if="verifyStatus === 'success'"
      :title="t('auth.verifyEmail.title')"
      :subtitle="t('auth.verifyEmail.subtitle')"
    >
      <div class="py-8 text-center">
        <CheckCircle class="mx-auto mb-4 h-12 w-12 text-green-500" />
        <h3 class="mb-2 text-lg font-semibold">{{ t('auth.verifyEmail.successTitle') }}</h3>
        <p class="mb-6 text-sm text-gray-500">{{ t('auth.verifyEmail.successMessage') }}</p>
        <router-link
          :to="`/${lang}/sign-in`"
          class="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90"
        >
          {{ t('auth.verifyEmail.loginNow') }}
        </router-link>
      </div>
    </AuthLayout>

    <!-- Error -->
    <AuthLayout
      v-else-if="verifyStatus === 'error'"
      :title="t('auth.verifyEmail.title')"
      :subtitle="t('auth.verifyEmail.subtitle')"
    >
      <div class="py-8 text-center">
        <XCircle class="mx-auto mb-4 h-12 w-12 text-red-500" />
        <h3 class="mb-2 text-lg font-semibold">{{ t('auth.verifyEmail.errorTitle') }}</h3>
        <p class="mb-6 text-sm text-gray-500">{{ getVerifyErrorMessage() }}</p>

        <!-- Resend form -->
        <div class="mt-6 border-t pt-6">
          <h4 class="mb-4 text-sm font-medium">{{ t('auth.verifyEmail.resendTitle') }}</h4>

          <div v-if="resendSuccess" class="flex flex-col items-center">
            <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <Mail class="h-5 w-5 text-green-600" />
            </div>
            <p class="text-sm text-green-600">{{ t('auth.verifyEmail.resendSuccess') }}</p>
          </div>

          <form v-else @submit.prevent="handleResend" class="space-y-3">
            <input
              v-model="resendEmail"
              type="email"
              :placeholder="t('auth.form.emailPlaceholder')"
              required
              :disabled="resendVerificationMutation.isPending.value"
              class="h-11 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
            />
            <p v-if="resendVerificationMutation.isError.value" class="text-sm text-red-600">{{ getResendErrorMessage() }}</p>
            <button
              type="submit"
              class="flex w-full items-center justify-center rounded-md border border-gray-300 px-4 py-2.5 text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
              :disabled="resendVerificationMutation.isPending.value"
            >
              <template v-if="resendVerificationMutation.isPending.value">
                <Loader2 class="mr-2 h-4 w-4 animate-spin" />
                {{ t('auth.common.sending') }}
              </template>
              <template v-else>{{ t('auth.verifyEmail.resendButton') }}</template>
            </button>
          </form>
        </div>

        <div class="mt-6">
          <router-link :to="`/${lang}/sign-in`" class="text-sm text-primary hover:underline">
            {{ t('auth.verifyEmail.backToLogin') }}
          </router-link>
        </div>
      </div>
    </AuthLayout>

    <!-- No token -->
    <AuthLayout
      v-else
      :title="t('auth.verifyEmail.title')"
      :subtitle="t('auth.verifyEmail.subtitle')"
    >
      <div class="py-6">
        <div class="mb-6 text-center">
          <Mail class="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <h3 class="mb-2 text-lg font-semibold">{{ t('auth.verifyEmail.checkInbox') }}</h3>
          <p class="text-sm text-gray-500">{{ t('auth.verifyEmail.checkInboxDescription') }}</p>
        </div>

        <div class="border-t pt-6">
          <h4 class="mb-4 text-center text-sm font-medium">{{ t('auth.verifyEmail.didntReceive') }}</h4>

          <div v-if="resendSuccess" class="text-center">
            <div class="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <Mail class="h-5 w-5 text-green-600" />
            </div>
            <p class="text-sm text-green-600">{{ t('auth.verifyEmail.resendSuccess') }}</p>
          </div>

          <form v-else @submit.prevent="handleResend" class="space-y-3">
            <div class="space-y-2">
              <label for="resend-email" class="text-sm font-medium">{{ t('auth.form.email') }}</label>
              <input
                id="resend-email"
                v-model="resendEmail"
                type="email"
                :placeholder="t('auth.form.emailPlaceholder')"
                required
                :disabled="resendVerificationMutation.isPending.value"
                class="h-11 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
              />
            </div>
            <p v-if="resendVerificationMutation.isError.value" class="text-sm text-red-600">{{ getResendErrorMessage() }}</p>
            <button
              type="submit"
              class="flex w-full items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50"
              :disabled="resendVerificationMutation.isPending.value || !resendEmail.trim()"
            >
              <template v-if="resendVerificationMutation.isPending.value">
                <Loader2 class="mr-2 h-4 w-4 animate-spin" />
                {{ t('auth.common.sending') }}
              </template>
              <template v-else>{{ t('auth.verifyEmail.resendButton') }}</template>
            </button>
          </form>
        </div>

        <div class="mt-6 text-center">
          <router-link :to="`/${lang}/sign-in`" class="text-sm text-primary hover:underline">
            {{ t('auth.verifyEmail.backToLogin') }}
          </router-link>
        </div>
      </div>
    </AuthLayout>
  </div>
</template>

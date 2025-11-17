<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { Loader2, Mail } from 'lucide-vue-next';
import Dialog from 'primevue/dialog';
import { useAuth } from '../composables/useAuth';

const props = defineProps<{
  visible: boolean;
}>();

const emit = defineEmits<{
  'update:visible': [value: boolean];
}>();

const { t } = useI18n();
const { forgotPasswordMutation } = useAuth();

const email = ref('');
const success = ref(false);

async function handleSubmit() {
  if (!email.value.trim()) return;
  try {
    await forgotPasswordMutation.mutateAsync({ email: email.value });
    success.value = true;
  } catch {
    // error available via forgotPasswordMutation.error
  }
}

function handleClose() {
  email.value = '';
  success.value = false;
  forgotPasswordMutation.reset();
  emit('update:visible', false);
}

function getErrorMessage(): string | null {
  const error = forgotPasswordMutation.error.value;
  if (!error) return null;
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as { response?: { data?: { message?: string } } };
    return axiosError.response?.data?.message || t('auth.errors.forgotPassword');
  }
  return t('auth.errors.network');
}
</script>

<template>
  <Dialog
    :visible="props.visible"
    modal
    :header="t('auth.forgotPassword.title')"
    :style="{ width: '425px' }"
    :closable="true"
    @update:visible="handleClose"
    data-testid="forgot-password-modal"
  >
    <!-- Success state -->
    <div v-if="success" class="py-6">
      <div class="flex flex-col items-center text-center">
        <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <Mail class="h-6 w-6 text-green-600" />
        </div>
        <h3 class="mb-2 font-semibold text-gray-900">
          {{ t('auth.forgotPassword.successTitle') }}
        </h3>
        <p class="text-sm text-gray-600">
          {{ t('auth.forgotPassword.successMessage') }}
        </p>
      </div>
      <div class="mt-6 flex justify-end">
        <button
          type="button"
          class="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90"
          @click="handleClose"
        >
          {{ t('auth.common.close') }}
        </button>
      </div>
    </div>

    <!-- Form -->
    <template v-else>
      <p class="mb-4 text-sm text-gray-600">
        {{ t('auth.forgotPassword.description') }}
      </p>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="space-y-2">
          <label for="forgot-email" class="text-sm font-medium">
            {{ t('auth.form.email') }} *
          </label>
          <input
            id="forgot-email"
            v-model="email"
            type="email"
            :placeholder="t('auth.form.emailPlaceholder')"
            required
            autofocus
            :disabled="forgotPasswordMutation.isPending.value"
            class="h-11 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
          />
        </div>

        <p v-if="forgotPasswordMutation.isError.value" class="text-sm text-red-600">
          {{ getErrorMessage() }}
        </p>

        <div class="flex justify-end gap-2">
          <button
            type="button"
            class="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
            :disabled="forgotPasswordMutation.isPending.value"
            @click="handleClose"
          >
            {{ t('auth.common.cancel') }}
          </button>
          <button
            type="submit"
            class="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50"
            :disabled="forgotPasswordMutation.isPending.value || !email.trim()"
          >
            <span v-if="forgotPasswordMutation.isPending.value" class="flex items-center gap-2">
              <Loader2 class="h-4 w-4 animate-spin" />
              {{ t('auth.common.sending') }}
            </span>
            <span v-else>{{ t('auth.forgotPassword.submit') }}</span>
          </button>
        </div>
      </form>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { Eye, EyeOff, Loader2, Building2, User, Info } from 'lucide-vue-next';
import AuthLayout from '../components/AuthLayout.vue';
import { useAuth } from '../composables/useAuth';
import type { UserType } from '../types';

const route = useRoute();
const router = useRouter();
const { t, locale } = useI18n();
const { registerMutation } = useAuth();

const lang = computed(() => locale.value);

type AccountType = 'individual' | 'professional';
const accountType = ref<AccountType>(
  (route.query.tab as AccountType) === 'professional' ? 'professional' : 'individual',
);

const form = reactive({
  email: '',
  confirmEmail: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  // Professional fields
  agencyName: '',
  agencyPhone: '',
  agencyEmail: '',
  agencyAddress: '',
  professionalType: 'agent' as 'owner' | 'agent' | 'agency_admin',
});

const showPassword = ref(false);
const showConfirmPassword = ref(false);
const acceptTerms = ref(false);
const newsletter = ref(true);
const validationErrors = ref<Record<string, string>>({});

function clearError(field: string) {
  if (validationErrors.value[field]) {
    const next = { ...validationErrors.value };
    delete next[field];
    validationErrors.value = next;
  }
}

function validateForm(): boolean {
  const errors: Record<string, string> = {};

  if (!form.firstName.trim()) errors.firstName = t('auth.validation.firstNameRequired');
  if (!form.lastName.trim()) errors.lastName = t('auth.validation.lastNameRequired');

  if (!form.email.trim()) {
    errors.email = t('auth.validation.emailRequired');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = t('auth.validation.emailInvalid');
  }

  if (form.email !== form.confirmEmail) {
    errors.confirmEmail = t('auth.validation.emailMismatch');
  }

  if (!form.password) {
    errors.password = t('auth.validation.passwordRequired');
  } else if (form.password.length < 8) {
    errors.password = t('auth.validation.passwordLength');
  }

  if (form.password !== form.confirmPassword) {
    errors.confirmPassword = t('auth.validation.passwordMismatch');
  }

  if (!acceptTerms.value) {
    errors.terms = t('auth.validation.termsRequired');
  }

  if (accountType.value === 'professional') {
    if (!form.agencyName.trim()) errors.agencyName = t('auth.validation.agencyNameRequired');
    if (form.agencyEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.agencyEmail)) {
      errors.agencyEmail = t('auth.validation.emailInvalid');
    }
  }

  validationErrors.value = errors;
  return Object.keys(errors).length === 0;
}

async function handleSubmit() {
  if (!validateForm()) return;

  const userType: UserType =
    accountType.value === 'individual' ? 'end_user' : form.professionalType;

  try {
    await registerMutation.mutateAsync({
      email: form.email,
      password: form.password,
      first_name: form.firstName,
      last_name: form.lastName,
      user_type: userType,
      preferred_language: lang.value as 'en' | 'fr' | 'de' | 'it',
      ...(accountType.value === 'professional' && {
        agency_name: form.agencyName,
        agency_phone: form.agencyPhone,
        agency_email: form.agencyEmail,
        agency_address: form.agencyAddress,
      }),
    });

    if (accountType.value === 'professional') {
      router.push(`/${lang.value}/registration-pending`);
    } else {
      router.push(`/${lang.value}`);
    }
  } catch {
    // error available via registerMutation.error
  }
}

function getErrorMessage(): string | null {
  const error = registerMutation.error.value;
  if (!error) return null;
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as { response?: { data?: { message?: string } } };
    return axiosError.response?.data?.message || t('auth.errors.register');
  }
  return t('auth.errors.network');
}

function inputClass(field: string): string {
  const base = 'h-11 w-full rounded-md border px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50';
  return validationErrors.value[field] ? `${base} border-red-500` : `${base} border-gray-300`;
}
</script>

<template>
  <AuthLayout
    :title="t('auth.register.title')"
    :subtitle="t('auth.register.subtitle')"
  >
    <div data-testid="register-page">
      <!-- Account type tabs -->
      <div class="mb-6 grid grid-cols-2 gap-1 rounded-lg bg-gray-100 p-1">
        <button
          type="button"
          class="flex items-center justify-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-colors"
          :class="accountType === 'individual'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'"
          @click="accountType = 'individual'"
        >
          <User class="h-4 w-4" />
          {{ t('auth.register.individual') }}
        </button>
        <button
          type="button"
          class="flex items-center justify-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-colors"
          :class="accountType === 'professional'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'"
          @click="accountType = 'professional'"
        >
          <Building2 class="h-4 w-4" />
          {{ t('auth.register.professional') }}
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-5">
        <!-- Individual tab -->
        <template v-if="accountType === 'individual'">
          <!-- Name fields -->
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <label for="firstName" class="text-sm font-medium">{{ t('auth.form.firstName') }} *</label>
              <input
                id="firstName"
                v-model="form.firstName"
                type="text"
                :placeholder="t('auth.form.firstNamePlaceholder')"
                required
                :disabled="registerMutation.isPending.value"
                :class="inputClass('firstName')"
                @input="clearError('firstName')"
              />
              <p v-if="validationErrors.firstName" class="text-xs text-red-600">{{ validationErrors.firstName }}</p>
            </div>
            <div class="space-y-2">
              <label for="lastName" class="text-sm font-medium">{{ t('auth.form.lastName') }} *</label>
              <input
                id="lastName"
                v-model="form.lastName"
                type="text"
                :placeholder="t('auth.form.lastNamePlaceholder')"
                required
                :disabled="registerMutation.isPending.value"
                :class="inputClass('lastName')"
                @input="clearError('lastName')"
              />
              <p v-if="validationErrors.lastName" class="text-xs text-red-600">{{ validationErrors.lastName }}</p>
            </div>
          </div>

          <!-- Email -->
          <div class="space-y-2">
            <label for="email-individual" class="text-sm font-medium">{{ t('auth.form.email') }} *</label>
            <input
              id="email-individual"
              v-model="form.email"
              type="email"
              :placeholder="t('auth.form.emailPlaceholder')"
              required
              autocomplete="email"
              :disabled="registerMutation.isPending.value"
              :class="inputClass('email')"
              @input="clearError('email')"
            />
            <p v-if="validationErrors.email" class="text-xs text-red-600">{{ validationErrors.email }}</p>
          </div>

          <!-- Confirm email -->
          <div class="space-y-2">
            <label for="confirmEmail-individual" class="text-sm font-medium">{{ t('auth.form.confirmEmail') }} *</label>
            <input
              id="confirmEmail-individual"
              v-model="form.confirmEmail"
              type="email"
              :placeholder="t('auth.form.confirmEmailPlaceholder')"
              required
              autocomplete="email"
              :disabled="registerMutation.isPending.value"
              :class="inputClass('confirmEmail')"
              @input="clearError('confirmEmail')"
            />
            <p v-if="validationErrors.confirmEmail" class="text-xs text-red-600">{{ validationErrors.confirmEmail }}</p>
          </div>

          <!-- Password -->
          <div class="space-y-2">
            <label for="password-individual" class="text-sm font-medium">{{ t('auth.form.password') }} *</label>
            <div class="relative">
              <input
                id="password-individual"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                :placeholder="t('auth.form.passwordPlaceholder')"
                required
                autocomplete="new-password"
                :disabled="registerMutation.isPending.value"
                :class="inputClass('password') + ' pr-10'"
                @input="clearError('password')"
              />
              <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700" tabindex="-1" @click="showPassword = !showPassword">
                <EyeOff v-if="showPassword" class="h-5 w-5" /> <Eye v-else class="h-5 w-5" />
              </button>
            </div>
            <p v-if="validationErrors.password" class="text-xs text-red-600">{{ validationErrors.password }}</p>
          </div>

          <!-- Confirm password -->
          <div class="space-y-2">
            <label for="confirmPassword-individual" class="text-sm font-medium">{{ t('auth.form.confirmPassword') }} *</label>
            <div class="relative">
              <input
                id="confirmPassword-individual"
                v-model="form.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                :placeholder="t('auth.form.confirmPasswordPlaceholder')"
                required
                autocomplete="new-password"
                :disabled="registerMutation.isPending.value"
                :class="inputClass('confirmPassword') + ' pr-10'"
                @input="clearError('confirmPassword')"
              />
              <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700" tabindex="-1" @click="showConfirmPassword = !showConfirmPassword">
                <EyeOff v-if="showConfirmPassword" class="h-5 w-5" /> <Eye v-else class="h-5 w-5" />
              </button>
            </div>
            <p v-if="validationErrors.confirmPassword" class="text-xs text-red-600">{{ validationErrors.confirmPassword }}</p>
          </div>
        </template>

        <!-- Professional tab -->
        <template v-else>
          <!-- Professional type selection -->
          <div class="space-y-3">
            <label class="text-sm font-medium">{{ t('auth.form.professionalType') }} *</label>
            <div class="grid grid-cols-3 gap-3">
              <button
                v-for="type in (['owner', 'agent', 'agency_admin'] as const)"
                :key="type"
                type="button"
                class="flex h-auto flex-col items-center gap-1 rounded-md border px-3 py-3 text-xs font-medium transition-colors"
                :class="form.professionalType === type
                  ? 'border-primary bg-primary text-white'
                  : 'border-gray-300 hover:border-gray-400'"
                @click="form.professionalType = type"
              >
                <User v-if="type === 'owner'" class="h-5 w-5" />
                <Building2 v-else class="h-5 w-5" />
                {{ t(`auth.form.${type === 'agency_admin' ? 'agencyAdmin' : type}`) }}
              </button>
            </div>
          </div>

          <!-- Company info -->
          <div class="space-y-4 rounded-lg bg-gray-50 p-4">
            <h3 class="flex items-center gap-2 text-sm font-medium">
              <Building2 class="h-4 w-4" />
              {{ t('auth.form.companyInfo') }}
            </h3>

            <div class="space-y-2">
              <label for="agencyName" class="text-sm font-medium">{{ t('auth.form.agencyName') }} *</label>
              <input
                id="agencyName"
                v-model="form.agencyName"
                type="text"
                :placeholder="t('auth.form.agencyNamePlaceholder')"
                required
                :disabled="registerMutation.isPending.value"
                :class="inputClass('agencyName')"
                @input="clearError('agencyName')"
              />
              <p v-if="validationErrors.agencyName" class="text-xs text-red-600">{{ validationErrors.agencyName }}</p>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <label for="agencyPhone" class="text-sm font-medium">{{ t('auth.form.agencyPhone') }}</label>
                <input
                  id="agencyPhone"
                  v-model="form.agencyPhone"
                  type="tel"
                  :placeholder="t('auth.form.agencyPhonePlaceholder')"
                  :disabled="registerMutation.isPending.value"
                  class="h-11 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                />
              </div>
              <div class="space-y-2">
                <label for="agencyEmail" class="text-sm font-medium">{{ t('auth.form.agencyEmail') }}</label>
                <input
                  id="agencyEmail"
                  v-model="form.agencyEmail"
                  type="email"
                  :placeholder="t('auth.form.agencyEmailPlaceholder')"
                  :disabled="registerMutation.isPending.value"
                  :class="inputClass('agencyEmail')"
                  @input="clearError('agencyEmail')"
                />
                <p v-if="validationErrors.agencyEmail" class="text-xs text-red-600">{{ validationErrors.agencyEmail }}</p>
              </div>
            </div>

            <div class="space-y-2">
              <label for="agencyAddress" class="text-sm font-medium">{{ t('auth.form.agencyAddress') }}</label>
              <input
                id="agencyAddress"
                v-model="form.agencyAddress"
                type="text"
                :placeholder="t('auth.form.agencyAddressPlaceholder')"
                :disabled="registerMutation.isPending.value"
                class="h-11 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
              />
            </div>
          </div>

          <!-- Personal info -->
          <div class="space-y-4">
            <h3 class="flex items-center gap-2 text-sm font-medium">
              <User class="h-4 w-4" />
              {{ t('auth.form.personalInfo') }}
            </h3>

            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <label for="firstName-pro" class="text-sm font-medium">{{ t('auth.form.firstName') }} *</label>
                <input id="firstName-pro" v-model="form.firstName" type="text" :placeholder="t('auth.form.firstNamePlaceholder')" required :disabled="registerMutation.isPending.value" :class="inputClass('firstName')" @input="clearError('firstName')" />
                <p v-if="validationErrors.firstName" class="text-xs text-red-600">{{ validationErrors.firstName }}</p>
              </div>
              <div class="space-y-2">
                <label for="lastName-pro" class="text-sm font-medium">{{ t('auth.form.lastName') }} *</label>
                <input id="lastName-pro" v-model="form.lastName" type="text" :placeholder="t('auth.form.lastNamePlaceholder')" required :disabled="registerMutation.isPending.value" :class="inputClass('lastName')" @input="clearError('lastName')" />
                <p v-if="validationErrors.lastName" class="text-xs text-red-600">{{ validationErrors.lastName }}</p>
              </div>
            </div>

            <div class="space-y-2">
              <label for="email-pro" class="text-sm font-medium">{{ t('auth.form.email') }} *</label>
              <input id="email-pro" v-model="form.email" type="email" :placeholder="t('auth.form.emailPlaceholder')" required autocomplete="email" :disabled="registerMutation.isPending.value" :class="inputClass('email')" @input="clearError('email')" />
              <p v-if="validationErrors.email" class="text-xs text-red-600">{{ validationErrors.email }}</p>
            </div>

            <div class="space-y-2">
              <label for="confirmEmail-pro" class="text-sm font-medium">{{ t('auth.form.confirmEmail') }} *</label>
              <input id="confirmEmail-pro" v-model="form.confirmEmail" type="email" :placeholder="t('auth.form.confirmEmailPlaceholder')" required autocomplete="email" :disabled="registerMutation.isPending.value" :class="inputClass('confirmEmail')" @input="clearError('confirmEmail')" />
              <p v-if="validationErrors.confirmEmail" class="text-xs text-red-600">{{ validationErrors.confirmEmail }}</p>
            </div>

            <div class="space-y-2">
              <label for="password-pro" class="text-sm font-medium">{{ t('auth.form.password') }} *</label>
              <div class="relative">
                <input id="password-pro" v-model="form.password" :type="showPassword ? 'text' : 'password'" :placeholder="t('auth.form.passwordPlaceholder')" required autocomplete="new-password" :disabled="registerMutation.isPending.value" :class="inputClass('password') + ' pr-10'" @input="clearError('password')" />
                <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700" tabindex="-1" @click="showPassword = !showPassword">
                  <EyeOff v-if="showPassword" class="h-5 w-5" /> <Eye v-else class="h-5 w-5" />
                </button>
              </div>
              <p v-if="validationErrors.password" class="text-xs text-red-600">{{ validationErrors.password }}</p>
            </div>

            <div class="space-y-2">
              <label for="confirmPassword-pro" class="text-sm font-medium">{{ t('auth.form.confirmPassword') }} *</label>
              <div class="relative">
                <input id="confirmPassword-pro" v-model="form.confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" :placeholder="t('auth.form.confirmPasswordPlaceholder')" required autocomplete="new-password" :disabled="registerMutation.isPending.value" :class="inputClass('confirmPassword') + ' pr-10'" @input="clearError('confirmPassword')" />
                <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700" tabindex="-1" @click="showConfirmPassword = !showConfirmPassword">
                  <EyeOff v-if="showConfirmPassword" class="h-5 w-5" /> <Eye v-else class="h-5 w-5" />
                </button>
              </div>
              <p v-if="validationErrors.confirmPassword" class="text-xs text-red-600">{{ validationErrors.confirmPassword }}</p>
            </div>
          </div>

          <!-- Professional notice -->
          <div class="flex items-start gap-3 rounded-lg border border-blue-100 bg-blue-50 p-4">
            <Info class="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
            <div class="text-sm text-blue-800">
              <p class="mb-1 font-medium">{{ t('auth.register.professionalNotice') }}</p>
              <p class="text-blue-700">{{ t('auth.register.professionalNoticeText') }}</p>
            </div>
          </div>
        </template>

        <!-- Common fields -->
        <div class="space-y-4 pt-2">
          <!-- Newsletter -->
          <div class="flex items-start space-x-3">
            <input
              id="newsletter"
              v-model="newsletter"
              type="checkbox"
              :disabled="registerMutation.isPending.value"
              class="mt-0.5 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label for="newsletter" class="cursor-pointer text-sm leading-5 text-gray-700">
              {{ t('auth.register.newsletter') }}
            </label>
          </div>

          <!-- Terms -->
          <div class="flex items-start space-x-3">
            <input
              id="terms"
              v-model="acceptTerms"
              type="checkbox"
              :disabled="registerMutation.isPending.value"
              class="mt-0.5 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              :class="validationErrors.terms ? 'border-red-500' : ''"
              @change="clearError('terms')"
            />
            <label for="terms" class="cursor-pointer text-sm leading-5 text-gray-700">
              {{ t('auth.register.terms') }}
              <router-link :to="`/${lang}/terms`" class="text-primary hover:underline" target="_blank">
                {{ t('auth.register.termsLink') }}
              </router-link>
              {{ t('auth.register.termsAnd') }}
              <router-link :to="`/${lang}/privacy`" class="text-primary hover:underline" target="_blank">
                {{ t('auth.register.privacyLink') }}
              </router-link> *
            </label>
          </div>
          <p v-if="validationErrors.terms" class="ml-7 text-xs text-red-600">{{ validationErrors.terms }}</p>
        </div>

        <!-- Error message -->
        <div v-if="registerMutation.isError.value" class="rounded-md border border-red-200 bg-red-50 p-3">
          <p class="text-sm text-red-600">{{ getErrorMessage() }}</p>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          class="flex h-11 w-full items-center justify-center rounded-md bg-primary text-base font-semibold text-white hover:bg-primary/90 disabled:opacity-50"
          :disabled="registerMutation.isPending.value"
          data-testid="register-button"
        >
          <template v-if="registerMutation.isPending.value">
            <Loader2 class="mr-2 h-4 w-4 animate-spin" />
            {{ t('auth.register.creating') }}
          </template>
          <template v-else>
            {{ accountType === 'individual' ? t('auth.register.submit') : t('auth.register.submitProfessional') }}
          </template>
        </button>

        <!-- Divider -->
        <div class="relative">
          <div class="absolute inset-0 flex items-center"><span class="w-full border-t" /></div>
          <div class="relative flex justify-center text-xs uppercase">
            <span class="bg-white px-2 text-gray-500">{{ t('auth.register.or') }}</span>
          </div>
        </div>

        <!-- Login link -->
        <div class="text-center">
          <p class="mb-2 text-sm text-gray-600">{{ t('auth.register.hasAccount') }}</p>
          <router-link :to="`/${lang}/sign-in`" class="text-sm font-semibold text-primary hover:underline">
            {{ t('auth.register.login') }}
          </router-link>
        </div>
      </form>
    </div>
  </AuthLayout>
</template>

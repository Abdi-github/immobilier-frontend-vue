<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Send, Phone, Mail, Building2 } from 'lucide-vue-next';
import { useMutation } from '@tanstack/vue-query';
import { useToast } from 'primevue/usetoast';
import { useAuthStore } from '@/stores/auth.store';
import { leadsApi } from '../api/leads.api';
import type { Property } from '../types';

const props = defineProps<{
  property: Property;
}>();

const { t } = useI18n();
const toast = useToast();
const authStore = useAuthStore();

const firstName = ref(authStore.currentUser?.first_name || '');
const lastName = ref(authStore.currentUser?.last_name || '');
const email = ref(authStore.currentUser?.email || '');
const phone = ref('');
const message = ref(t('properties.contact.defaultMessage', { title: props.property.title }));

const errors = ref<Record<string, string>>({});

function validate(): boolean {
  const errs: Record<string, string> = {};
  if (!firstName.value || firstName.value.trim().length < 2) {
    errs.firstName = 'First name must be at least 2 characters';
  }
  if (!lastName.value || lastName.value.trim().length < 2) {
    errs.lastName = 'Last name must be at least 2 characters';
  }
  if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errs.email = 'Invalid email address';
  }
  if (!message.value || message.value.trim().length < 10) {
    errs.message = 'Message must be at least 10 characters';
  }
  errors.value = errs;
  return Object.keys(errs).length === 0;
}

const publicLeadMutation = useMutation({
  mutationFn: leadsApi.createPublicLead,
  onSuccess: () => {
    toast.add({ severity: 'success', summary: t('properties.contact.success'), life: 5000 });
    resetForm();
  },
  onError: () => {
    toast.add({ severity: 'error', summary: t('properties.contact.error'), life: 5000 });
  },
});

const authLeadMutation = useMutation({
  mutationFn: leadsApi.createAuthenticatedLead,
  onSuccess: () => {
    toast.add({ severity: 'success', summary: t('properties.contact.success'), life: 5000 });
    resetForm();
  },
  onError: () => {
    toast.add({ severity: 'error', summary: t('properties.contact.error'), life: 5000 });
  },
});

const isSubmitting = computed(
  () => publicLeadMutation.isPending.value || authLeadMutation.isPending.value,
);

function resetForm() {
  firstName.value = '';
  lastName.value = '';
  email.value = '';
  phone.value = '';
  message.value = '';
  errors.value = {};
}

function onSubmit() {
  if (!validate()) return;

  const payload = {
    property_id: props.property.id,
    contact_name: `${firstName.value} ${lastName.value}`.trim(),
    contact_email: email.value,
    contact_phone: phone.value || undefined,
    inquiry_type: 'general_inquiry' as const,
    message: message.value,
    preferred_contact_method: 'email' as const,
  };

  if (authStore.isAuthenticated) {
    authLeadMutation.mutate(payload);
  } else {
    publicLeadMutation.mutate(payload);
  }
}
</script>

<template>
  <div class="rounded-xl border bg-white p-6 shadow-sm">
    <h3 class="flex items-center gap-2 text-lg font-semibold">
      <Mail class="h-5 w-5" />
      {{ t('properties.contact.title') }}
    </h3>

    <div class="mt-6 space-y-6">
      <!-- Agency info -->
      <div
        v-if="property.agency"
        class="flex items-start gap-4 rounded-lg bg-gray-50 p-4"
      >
        <img
          v-if="property.agency.logo_url"
          :src="property.agency.logo_url"
          :alt="property.agency.name"
          class="h-12 w-12 rounded-lg object-contain"
        />
        <div
          v-else
          class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"
        >
          <Building2 class="h-6 w-6 text-primary" />
        </div>
        <div>
          <p class="font-semibold">{{ property.agency.name }}</p>
          <p class="text-sm text-gray-500">{{ t('properties.contact.listedBy') }}</p>
        </div>
      </div>

      <!-- Contact form -->
      <form class="space-y-4" @submit.prevent="onSubmit">
        <div class="grid gap-4 sm:grid-cols-2">
          <div class="space-y-2">
            <label for="firstName" class="text-sm font-medium">
              {{ t('common.form.firstName') }} *
            </label>
            <input
              id="firstName"
              v-model="firstName"
              type="text"
              :placeholder="t('common.form.firstNamePlaceholder')"
              class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <p v-if="errors.firstName" class="text-sm text-red-500">{{ errors.firstName }}</p>
          </div>

          <div class="space-y-2">
            <label for="lastName" class="text-sm font-medium">
              {{ t('common.form.lastName') }} *
            </label>
            <input
              id="lastName"
              v-model="lastName"
              type="text"
              :placeholder="t('common.form.lastNamePlaceholder')"
              class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <p v-if="errors.lastName" class="text-sm text-red-500">{{ errors.lastName }}</p>
          </div>
        </div>

        <div class="space-y-2">
          <label for="email" class="text-sm font-medium">
            {{ t('common.form.email') }} *
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            :placeholder="t('common.form.emailPlaceholder')"
            class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <p v-if="errors.email" class="text-sm text-red-500">{{ errors.email }}</p>
        </div>

        <div class="space-y-2">
          <label for="phone" class="text-sm font-medium">
            {{ t('common.form.phone') }}
          </label>
          <input
            id="phone"
            v-model="phone"
            type="tel"
            :placeholder="t('common.form.phonePlaceholder')"
            class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div class="space-y-2">
          <label for="message" class="text-sm font-medium">
            {{ t('common.form.message') }} *
          </label>
          <textarea
            id="message"
            v-model="message"
            rows="4"
            :placeholder="t('common.form.messagePlaceholder')"
            class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <p v-if="errors.message" class="text-sm text-red-500">{{ errors.message }}</p>
        </div>

        <button
          type="submit"
          :disabled="isSubmitting"
          class="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          <Send class="h-4 w-4" />
          {{ isSubmitting ? t('common.actions.sending') : t('common.actions.send') }}
        </button>
      </form>

      <!-- Quick contact -->
      <div class="flex gap-2">
        <button
          class="flex flex-1 items-center justify-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-50"
        >
          <Phone class="h-4 w-4" />
          {{ t('properties.contact.call') }}
        </button>
        <button
          class="flex flex-1 items-center justify-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-50"
        >
          <Mail class="h-4 w-4" />
          {{ t('common.form.email') }}
        </button>
      </div>
    </div>
  </div>
</template>

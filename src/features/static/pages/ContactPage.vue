<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle } from 'lucide-vue-next';
import { useToast } from 'primevue/usetoast';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Select from 'primevue/select';
import SEO from '@/shared/components/SEO.vue';

const { t } = useI18n();
const toast = useToast();

const isSubmitting = ref(false);
const submitted = ref(false);

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const subject = ref('');
const message = ref('');

const subjects = [
  { label: 'General Inquiry', value: 'general' },
  { label: 'Property Listing', value: 'listing' },
  { label: 'Account Issue', value: 'account' },
  { label: 'Agency Partnership', value: 'agency' },
  { label: 'Feedback', value: 'feedback' },
  { label: 'Other', value: 'other' },
];

const contactInfo = [
  { icon: Mail, label: t('contact.info.email'), value: 'support@immobilier.ch', href: 'mailto:support@immobilier.ch' },
  { icon: Phone, label: t('contact.info.phone'), value: '+41 21 123 45 67', href: 'tel:+41211234567' },
  { icon: MapPin, label: t('contact.info.address'), value: 'Rue du Marché 1, 1204 Genève, Switzerland', href: '' },
];

async function handleSubmit() {
  if (!firstName.value || !lastName.value || !email.value || !subject.value || !message.value) return;
  isSubmitting.value = true;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  isSubmitting.value = false;
  submitted.value = true;
  toast.add({ severity: 'success', summary: t('contact.successToast'), life: 5000 });
}

function resetForm() {
  submitted.value = false;
  firstName.value = '';
  lastName.value = '';
  email.value = '';
  subject.value = '';
  message.value = '';
}
</script>

<template>
  <div data-testid="contact-page" class="mx-auto max-w-5xl px-4 py-12">
    <SEO :title="t('contact.title')" />

    <div class="text-center mb-12">
      <h1 class="text-3xl font-bold tracking-tight md:text-4xl">{{ t('contact.title') }}</h1>
      <p class="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">{{ t('contact.subtitle') }}</p>
    </div>

    <div class="grid gap-8 lg:grid-cols-3">
      <!-- Contact info -->
      <div class="space-y-4">
        <h2 class="text-xl font-semibold">{{ t('contact.info.title') }}</h2>
        <p class="text-sm text-gray-500">{{ t('contact.info.description') }}</p>
        <div class="space-y-4 pt-4">
          <div v-for="item in contactInfo" :key="item.label" class="flex items-start gap-3">
            <div class="shrink-0 h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <component :is="item.icon" class="h-4 w-4 text-primary" />
            </div>
            <div>
              <p class="text-sm font-medium">{{ item.label }}</p>
              <a v-if="item.href" :href="item.href" class="text-sm text-primary hover:underline">{{ item.value }}</a>
              <p v-else class="text-sm text-gray-500">{{ item.value }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Form -->
      <div class="lg:col-span-2 rounded-xl border bg-white p-6">
        <!-- Success state -->
        <div v-if="submitted" class="text-center py-12">
          <CheckCircle class="mx-auto h-12 w-12 text-green-500 mb-4" />
          <h3 class="text-lg font-semibold mb-2">{{ t('contact.success.title') }}</h3>
          <p class="text-sm text-gray-500 mb-6">{{ t('contact.success.description') }}</p>
          <button
            class="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
            @click="resetForm"
          >
            {{ t('contact.success.sendAnother') }}
          </button>
        </div>

        <!-- Form -->
        <form v-else class="space-y-4" @submit.prevent="handleSubmit">
          <div class="grid gap-4 sm:grid-cols-2">
            <div class="space-y-2">
              <label class="text-sm font-medium">{{ t('contact.form.firstName') }} *</label>
              <InputText v-model="firstName" required class="w-full" />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium">{{ t('contact.form.lastName') }} *</label>
              <InputText v-model="lastName" required class="w-full" />
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium">{{ t('contact.form.email') }} *</label>
            <InputText v-model="email" type="email" required class="w-full" />
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium">{{ t('contact.form.subject') }} *</label>
            <Select
              v-model="subject"
              :options="subjects"
              option-label="label"
              option-value="value"
              :placeholder="t('contact.form.selectSubject')"
              class="w-full"
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium">{{ t('contact.form.message') }} *</label>
            <Textarea v-model="message" required :rows="5" class="w-full" />
          </div>

          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50"
          >
            <Loader2 v-if="isSubmitting" class="h-4 w-4 animate-spin" />
            <Send v-else class="h-4 w-4" />
            {{ isSubmitting ? t('contact.form.sending') : t('contact.form.submit') }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

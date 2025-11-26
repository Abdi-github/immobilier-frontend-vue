<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { ArrowLeft, ArrowRight, Save, Send, Loader2, X } from 'lucide-vue-next';
import { useToast } from 'primevue/usetoast';
import SEO from '@/shared/components/SEO.vue';
import PropertyForm from '../components/PropertyForm.vue';
import PropertyFormSteps from '../components/PropertyFormSteps.vue';
import { usePropertyForm } from '../composables/usePropertyForm';
import { useCreateProperty } from '../composables/useMyProperties';
import { useUploadMultipleImages } from '../composables/usePropertyImages';
import { propertyManagementApi } from '../api/property-management.api';

const { t, locale } = useI18n();
const router = useRouter();
const toast = useToast();

const form = usePropertyForm();
const { state, validateStep, nextStep, prevStep, goToStep, isFirstStep, isLastStep } = form;

const createMutation = useCreateProperty();
const uploadMutation = useUploadMultipleImages();

const isLoading = computed(() => createMutation.isPending.value || uploadMutation.isPending.value || state.isSubmitting);

function handleNext() {
  if (validateStep(state.currentStep)) {
    nextStep();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function handlePrev() {
  prevStep();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function handleSubmit() {
  if (!validateStep(state.currentStep)) return;

  state.isSubmitting = true;

  try {
    // 1. Create property
    const property = await createMutation.mutateAsync({
      source_language: state.source_language,
      category_id: state.category_id,
      transaction_type: state.transaction_type,
      price: Number(state.price),
      additional_costs: state.additional_costs ? Number(state.additional_costs) : undefined,
      canton_id: state.canton_id,
      city_id: state.city_id,
      address: state.address,
      postal_code: state.postal_code || undefined,
      rooms: state.rooms ? Number(state.rooms) : undefined,
      surface: state.surface ? Number(state.surface) : undefined,
      amenities: state.amenities.length > 0 ? state.amenities : undefined,
      title: state.title,
      description: state.description,
    });

    toast.add({ severity: 'success', summary: t('form.success.created'), life: 5000 });

    // 2. Create translation
    try {
      await propertyManagementApi.createTranslation({
        property_id: property.id,
        language: state.source_language,
        title: state.title,
        description: state.description,
        source: 'original',
      });
    } catch {
      // Translation failed, but property was created — non-blocking
    }

    // 3. Upload images
    if (state.imageFiles.length > 0) {
      const formData = new FormData();
      state.imageFiles.forEach((file) => formData.append('images', file));
      await uploadMutation.mutateAsync({ propertyId: property.id, formData });
    }

    router.push({ name: 'my-properties', params: { lang: locale.value } });
  } catch (error) {
    const message = (error as { response?: { data?: { message?: string } } }).response?.data?.message;
    toast.add({ severity: 'error', summary: message || t('form.error.createFailed'), life: 5000 });
  } finally {
    state.isSubmitting = false;
  }
}

async function handleSaveDraft() {
  if (!state.category_id || !state.price) {
    toast.add({ severity: 'error', summary: 'Please fill in at least the category and price.', life: 5000 });
    return;
  }

  state.isSubmitting = true;

  try {
    await createMutation.mutateAsync({
      source_language: state.source_language,
      category_id: state.category_id,
      transaction_type: state.transaction_type,
      price: Number(state.price),
      additional_costs: state.additional_costs ? Number(state.additional_costs) : undefined,
      canton_id: state.canton_id || undefined,
      city_id: state.city_id || undefined,
      address: state.address || 'Draft - Address pending',
      postal_code: state.postal_code || undefined,
      rooms: state.rooms ? Number(state.rooms) : undefined,
      surface: state.surface ? Number(state.surface) : undefined,
      amenities: state.amenities.length > 0 ? state.amenities : undefined,
      title: state.title || 'Draft Property',
      description: state.description || 'Description pending...',
    });

    toast.add({ severity: 'success', summary: t('form.success.draftSaved'), life: 5000 });
    router.push({ name: 'my-properties', params: { lang: locale.value } });
  } catch (error) {
    const message = (error as { response?: { data?: { message?: string } } }).response?.data?.message;
    toast.add({ severity: 'error', summary: message || t('form.error.createFailed'), life: 5000 });
  } finally {
    state.isSubmitting = false;
  }
}
</script>

<script lang="ts">
import { computed } from 'vue';
</script>

<template>
  <div data-testid="create-property-page" class="min-h-screen bg-gray-50">
    <SEO :title="t('form.createTitle')" />

    <!-- Header -->
    <header class="bg-white border-b sticky top-0 z-10">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center gap-4">
            <router-link
              :to="{ name: 'my-properties', params: { lang: locale } }"
              class="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft class="h-5 w-5" />
              <span class="hidden sm:inline">{{ t('form.actions.cancel') }}</span>
            </router-link>
            <div class="h-6 w-px bg-gray-200" />
            <h1 class="text-lg font-semibold text-gray-900">{{ t('form.createTitle') }}</h1>
          </div>
          <router-link
            :to="{ name: 'my-properties', params: { lang: locale } }"
            class="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X class="h-5 w-5" />
          </router-link>
        </div>
      </div>
    </header>

    <!-- Main -->
    <main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Stepper sidebar -->
        <aside class="lg:col-span-1">
          <div class="lg:sticky lg:top-24">
            <PropertyFormSteps
              :current-step="state.currentStep"
              :on-go-to-step="goToStep"
            />
          </div>
        </aside>

        <!-- Form content -->
        <div class="lg:col-span-3">
          <div class="bg-white rounded-xl shadow-sm border p-6 sm:p-8">
            <PropertyForm :form="form" />

            <!-- Navigation -->
            <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 mt-6 border-t">
              <div>
                <button
                  v-if="!isFirstStep"
                  type="button"
                  :disabled="isLoading"
                  class="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
                  @click="handlePrev"
                >
                  <ArrowLeft class="h-4 w-4" />
                  {{ t('form.actions.previous') }}
                </button>
              </div>

              <div class="flex items-center gap-2">
                <!-- Save Draft (steps 1-5) -->
                <button
                  v-if="!isLastStep"
                  type="button"
                  :disabled="isLoading"
                  class="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
                  @click="handleSaveDraft"
                >
                  <Loader2 v-if="isLoading" class="h-4 w-4 animate-spin" />
                  <Save v-else class="h-4 w-4" />
                  {{ t('form.actions.saveDraft') }}
                </button>

                <!-- Next / Submit -->
                <button
                  v-if="isLastStep"
                  type="button"
                  :disabled="isLoading"
                  class="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50 min-w-[150px] justify-center"
                  @click="handleSubmit"
                >
                  <Loader2 v-if="isLoading" class="h-4 w-4 animate-spin" />
                  <Send v-else class="h-4 w-4" />
                  {{ isLoading ? t('form.actions.submitting') : t('form.actions.submit') }}
                </button>
                <button
                  v-else
                  type="button"
                  :disabled="isLoading"
                  class="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50"
                  @click="handleNext"
                >
                  {{ t('form.actions.next') }}
                  <ArrowRight class="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

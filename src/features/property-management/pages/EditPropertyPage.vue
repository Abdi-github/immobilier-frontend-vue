<script setup lang="ts">
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeft, ArrowRight, Save, Loader2, X } from 'lucide-vue-next';
import { useToast } from 'primevue/usetoast';
import Skeleton from 'primevue/skeleton';
import SEO from '@/shared/components/SEO.vue';
import PropertyForm from '../components/PropertyForm.vue';
import PropertyFormSteps from '../components/PropertyFormSteps.vue';
import { usePropertyForm } from '../composables/usePropertyForm';
import { useMyProperty, useUpdateProperty } from '../composables/useMyProperties';
import { useUploadMultipleImages } from '../composables/usePropertyImages';
import type { ManagedProperty } from '../types';

const { t, locale } = useI18n();
const route = useRoute();
const router = useRouter();
const toast = useToast();

const propertyId = computed(() => route.params.id as string);
const { data: property, isLoading: isFetching, isError } = useMyProperty(propertyId);

const form = usePropertyForm();
const { state, validateStep, nextStep, prevStep, goToStep, isFirstStep, isLastStep } = form;

const updateMutation = useUpdateProperty();
const uploadMutation = useUploadMultipleImages();

const isLoading = computed(() => updateMutation.isPending.value || uploadMutation.isPending.value || state.isSubmitting);

// Populate form when property data loads
const populated = ref(false);
watch(property, (p) => {
  if (p && !populated.value) {
    populated.value = true;
    mapPropertyToForm(p);
  }
});

function mapPropertyToForm(p: ManagedProperty) {
  state.source_language = p.source_language || 'en';
  state.category_id = p.category_id || '';
  state.transaction_type = p.transaction_type || 'rent';
  state.price = p.price ? String(p.price) : '';
  state.additional_costs = p.additional_costs ? String(p.additional_costs) : '';
  state.canton_id = p.canton_id || '';
  state.city_id = p.city_id || '';
  state.address = p.address || '';
  state.postal_code = p.postal_code || '';
  state.rooms = p.rooms ? String(p.rooms) : '';
  state.surface = p.surface ? String(p.surface) : '';
  state.title = p.title || p.translation?.title || '';
  state.description = p.description || p.translation?.description || '';
  state.amenities = p.amenities || [];
}

const existingImages = computed(() =>
  property.value?.images?.map((img) => ({
    id: img.id,
    url: img.thumbnail_url || img.url,
    is_primary: img.is_primary,
  })) ?? [],
);

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

async function handleSave() {
  state.isSubmitting = true;

  try {
    await updateMutation.mutateAsync({
      id: propertyId.value,
      data: {
        source_language: state.source_language,
        category_id: state.category_id,
        transaction_type: state.transaction_type,
        price: Number(state.price),
        additional_costs: state.additional_costs ? Number(state.additional_costs) : undefined,
        canton_id: state.canton_id || undefined,
        city_id: state.city_id || undefined,
        address: state.address,
        postal_code: state.postal_code || undefined,
        rooms: state.rooms ? Number(state.rooms) : undefined,
        surface: state.surface ? Number(state.surface) : undefined,
        amenities: state.amenities.length > 0 ? state.amenities : undefined,
      },
    });

    // Upload new images
    if (state.imageFiles.length > 0) {
      const formData = new FormData();
      state.imageFiles.forEach((file) => formData.append('images', file));
      await uploadMutation.mutateAsync({ propertyId: propertyId.value, formData });
      state.imageFiles = [];
      state.imagePreviews = [];
    }

    toast.add({ severity: 'success', summary: t('form.success.updated'), life: 5000 });
    router.push({ name: 'my-properties', params: { lang: locale.value } });
  } catch (error) {
    const message = (error as { response?: { data?: { message?: string } } }).response?.data?.message;
    toast.add({ severity: 'error', summary: message || t('form.error.updateFailed'), life: 5000 });
  } finally {
    state.isSubmitting = false;
  }
}
</script>

<script lang="ts">
import { ref } from 'vue';
</script>

<template>
  <div data-testid="edit-property-page" class="min-h-screen bg-gray-50">
    <SEO :title="t('form.editTitle')" />

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
            <h1 class="text-lg font-semibold text-gray-900">{{ t('form.editTitle') }}</h1>
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

    <!-- Loading -->
    <main v-if="isFetching" class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div class="lg:col-span-1">
          <Skeleton height="300px" class="rounded-xl" />
        </div>
        <div class="lg:col-span-3">
          <Skeleton height="500px" class="rounded-xl" />
        </div>
      </div>
    </main>

    <!-- Error -->
    <main
      v-else-if="isError || !property"
      class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div class="bg-white rounded-xl shadow-sm border p-8 text-center">
        <p class="text-gray-500 mb-4">{{ t('form.error.notFound') }}</p>
        <router-link
          :to="{ name: 'my-properties', params: { lang: locale } }"
          class="text-primary hover:underline"
        >
          {{ t('form.actions.backToProperties') }}
        </router-link>
      </div>
    </main>

    <!-- Form -->
    <main v-else class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            <PropertyForm :form="form" :existing-images="existingImages" />

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
                <!-- Save Changes (available on every step) -->
                <button
                  type="button"
                  :disabled="isLoading"
                  class="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50 min-w-[150px] justify-center"
                  @click="handleSave"
                >
                  <Loader2 v-if="isLoading" class="h-4 w-4 animate-spin" />
                  <Save v-else class="h-4 w-4" />
                  {{ isLoading ? t('form.actions.saving') : t('form.actions.saveChanges') }}
                </button>

                <!-- Next step button -->
                <button
                  v-if="!isLastStep"
                  type="button"
                  :disabled="isLoading"
                  class="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
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

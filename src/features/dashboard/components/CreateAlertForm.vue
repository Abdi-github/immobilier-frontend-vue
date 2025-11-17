<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Loader2 } from 'lucide-vue-next';
import { useCantons } from '@/features/locations/composables/useCantons';
import { useCategories } from '@/features/locations/composables/useCategories';
import { useLocalizedName } from '@/shared/composables/useLocalizedName';
import { useCreateAlert, useUpdateAlert } from '../composables/useAlerts';
import type { PropertyAlert, CreateAlertRequest } from '../types';
import type { Category, Canton } from '@/features/locations/types';

const props = defineProps<{
  alert?: PropertyAlert;
}>();

const emit = defineEmits<{
  success: [];
  cancel: [];
}>();

const { t } = useI18n();
const getLocalizedName = useLocalizedName();

const isEditing = computed(() => !!props.alert);

const { data: cantonsData } = useCantons();
const { data: categoriesData } = useCategories();

const cantonList = computed(() => ((cantonsData.value as any)?.data ?? cantonsData.value ?? []) as Canton[]);
const categoryList = computed(() => ((categoriesData.value as any)?.data ?? categoriesData.value ?? []) as Category[]);

const createAlertMutation = useCreateAlert();
const updateAlertMutation = useUpdateAlert();
const isLoading = computed(
  () => createAlertMutation.isPending.value || updateAlertMutation.isPending.value,
);

const form = ref({
  name: props.alert?.name || '',
  frequency: props.alert?.frequency || 'daily' as 'instant' | 'daily' | 'weekly',
  transaction_type: props.alert?.criteria.transaction_type || '',
  category_id: props.alert?.criteria.category_id || '',
  canton_id: props.alert?.criteria.canton_id || '',
  price_min: props.alert?.criteria.price_min ?? '',
  price_max: props.alert?.criteria.price_max ?? '',
  rooms_min: props.alert?.criteria.rooms_min ?? '',
  rooms_max: props.alert?.criteria.rooms_max ?? '',
  surface_min: props.alert?.criteria.surface_min ?? '',
  surface_max: props.alert?.criteria.surface_max ?? '',
});

const nameError = ref('');

async function handleSubmit() {
  nameError.value = '';
  if (!form.value.name || form.value.name.length < 3) {
    nameError.value = t('alerts.form.nameError', 'Name must be at least 3 characters');
    return;
  }

  const criteria: CreateAlertRequest['criteria'] = {};
  if (form.value.transaction_type) {
    criteria.transaction_type = form.value.transaction_type as 'rent' | 'buy';
  }
  if (form.value.category_id) criteria.category_id = form.value.category_id;
  if (form.value.canton_id) criteria.canton_id = form.value.canton_id;
  if (form.value.price_min !== '' && form.value.price_min !== undefined)
    criteria.price_min = Number(form.value.price_min);
  if (form.value.price_max !== '' && form.value.price_max !== undefined)
    criteria.price_max = Number(form.value.price_max);
  if (form.value.rooms_min !== '' && form.value.rooms_min !== undefined)
    criteria.rooms_min = Number(form.value.rooms_min);
  if (form.value.rooms_max !== '' && form.value.rooms_max !== undefined)
    criteria.rooms_max = Number(form.value.rooms_max);
  if (form.value.surface_min !== '' && form.value.surface_min !== undefined)
    criteria.surface_min = Number(form.value.surface_min);
  if (form.value.surface_max !== '' && form.value.surface_max !== undefined)
    criteria.surface_max = Number(form.value.surface_max);

  try {
    if (isEditing.value && props.alert) {
      await updateAlertMutation.mutateAsync({
        id: props.alert.id,
        data: {
          name: form.value.name,
          frequency: form.value.frequency,
          criteria,
        },
      });
    } else {
      await createAlertMutation.mutateAsync({
        name: form.value.name,
        frequency: form.value.frequency,
        criteria,
      });
    }
    emit('success');
  } catch {
    // Error handled by parent
  }
}
</script>

<template>
  <form class="space-y-6" @submit.prevent="handleSubmit">
    <!-- Alert Name -->
    <div class="space-y-2">
      <label class="text-sm font-medium text-gray-700">{{ t('alerts.form.name') }}</label>
      <input
        v-model="form.name"
        type="text"
        :placeholder="t('alerts.form.namePlaceholder')"
        :disabled="isLoading"
        class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:ring-primary focus:outline-none"
      />
      <p v-if="nameError" class="text-sm text-red-500">{{ nameError }}</p>
    </div>

    <!-- Frequency -->
    <div class="space-y-2">
      <label class="text-sm font-medium text-gray-700">{{ t('alerts.form.frequency') }}</label>
      <select
        v-model="form.frequency"
        :disabled="isLoading"
        class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:ring-primary focus:outline-none"
      >
        <option value="instant">{{ t('alerts.frequency.instant') }}</option>
        <option value="daily">{{ t('alerts.frequency.daily') }}</option>
        <option value="weekly">{{ t('alerts.frequency.weekly') }}</option>
      </select>
    </div>

    <div class="border-t pt-4">
      <h4 class="mb-4 font-medium">{{ t('alerts.form.filters') }}</h4>

      <!-- Transaction Type + Category -->
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700">{{ t('alerts.form.transactionType') }}</label>
          <select
            v-model="form.transaction_type"
            :disabled="isLoading"
            class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:ring-primary focus:outline-none"
          >
            <option value="">{{ t('alerts.form.anyTransaction') }}</option>
            <option value="rent">{{ t('common.transaction.rent') }}</option>
            <option value="buy">{{ t('common.transaction.buy') }}</option>
          </select>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700">{{ t('alerts.form.category') }}</label>
          <select
            v-model="form.category_id"
            :disabled="isLoading"
            class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:ring-primary focus:outline-none"
          >
            <option value="">{{ t('alerts.form.anyCategory') }}</option>
            <option v-for="cat in categoryList" :key="cat.id" :value="cat.id">
              {{ getLocalizedName(cat.name) }}
            </option>
          </select>
        </div>
      </div>

      <!-- Location -->
      <div class="mt-4 space-y-2">
        <label class="text-sm font-medium text-gray-700">{{ t('alerts.form.location') }}</label>
        <select
          v-model="form.canton_id"
          :disabled="isLoading"
          class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:ring-primary focus:outline-none"
        >
          <option value="">{{ t('alerts.form.anyLocation') }}</option>
          <option v-for="canton in cantonList" :key="canton.id" :value="canton.id">
            {{ getLocalizedName(canton.name) }} ({{ canton.code }})
          </option>
        </select>
      </div>

      <!-- Price Range -->
      <div class="mt-4 grid gap-4 sm:grid-cols-2">
        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700">{{ t('alerts.form.priceMin') }}</label>
          <input
            v-model.number="form.price_min"
            type="number"
            placeholder="0"
            :disabled="isLoading"
            class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:ring-primary focus:outline-none"
          />
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700">{{ t('alerts.form.priceMax') }}</label>
          <input
            v-model.number="form.price_max"
            type="number"
            :placeholder="t('alerts.form.noLimit')"
            :disabled="isLoading"
            class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:ring-primary focus:outline-none"
          />
        </div>
      </div>

      <!-- Rooms Range -->
      <div class="mt-4 grid gap-4 sm:grid-cols-2">
        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700">{{ t('alerts.form.roomsMin') }}</label>
          <input
            v-model.number="form.rooms_min"
            type="number"
            placeholder="0"
            :disabled="isLoading"
            class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:ring-primary focus:outline-none"
          />
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700">{{ t('alerts.form.roomsMax') }}</label>
          <input
            v-model.number="form.rooms_max"
            type="number"
            :placeholder="t('alerts.form.noLimit')"
            :disabled="isLoading"
            class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:ring-primary focus:outline-none"
          />
        </div>
      </div>

      <!-- Surface Range -->
      <div class="mt-4 grid gap-4 sm:grid-cols-2">
        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700">{{ t('alerts.form.surfaceMin') }}</label>
          <input
            v-model.number="form.surface_min"
            type="number"
            placeholder="0"
            :disabled="isLoading"
            class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:ring-primary focus:outline-none"
          />
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700">{{ t('alerts.form.surfaceMax') }}</label>
          <input
            v-model.number="form.surface_max"
            type="number"
            :placeholder="t('alerts.form.noLimit')"
            :disabled="isLoading"
            class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:ring-primary focus:outline-none"
          />
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex justify-end gap-3 border-t pt-4">
      <button
        type="button"
        class="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        :disabled="isLoading"
        @click="emit('cancel')"
      >
        {{ t('common.cancel') }}
      </button>
      <button
        type="submit"
        class="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50"
        :disabled="isLoading"
      >
        <Loader2 v-if="isLoading" class="h-4 w-4 animate-spin" />
        {{ isEditing ? t('alerts.form.update') : t('alerts.form.create') }}
      </button>
    </div>
  </form>
</template>

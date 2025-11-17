<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  Bell,
  Plus,
  Trash2,
  Edit2,
  Loader2,
  MapPin,
  Home,
  DollarSign,
  BedDouble,
  Maximize,
} from 'lucide-vue-next';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import Dialog from 'primevue/dialog';
import ToggleSwitch from 'primevue/toggleswitch';
import Skeleton from 'primevue/skeleton';
import ConfirmDialog from 'primevue/confirmdialog';
import { useAlerts, useDeleteAlert, useToggleAlert } from '../composables/useAlerts';
import { formatPrice } from '@/shared/utils/formatters';
import CreateAlertForm from '../components/CreateAlertForm.vue';
import type { PropertyAlert } from '../types';
import SEO from '@/shared/components/SEO.vue';

const { t } = useI18n();
const toast = useToast();
const confirm = useConfirm();

const createDialogOpen = ref(false);
const editingAlert = ref<PropertyAlert | null>(null);

const { data: alerts, isLoading } = useAlerts();
const deleteAlertMutation = useDeleteAlert();
const toggleAlertMutation = useToggleAlert();

function confirmDelete(id: string) {
  confirm.require({
    header: t('alerts.deleteConfirmTitle'),
    message: t('alerts.deleteConfirmDescription'),
    acceptClass: '!bg-red-600 !border-red-600',
    acceptLabel: t('common.delete'),
    rejectLabel: t('common.cancel'),
    accept: () => handleDelete(id),
  });
}

async function handleDelete(id: string) {
  try {
    await deleteAlertMutation.mutateAsync(id);
    toast.add({ severity: 'success', summary: t('alerts.deleteSuccess'), life: 5000 });
  } catch {
    toast.add({ severity: 'error', summary: t('alerts.deleteError'), life: 5000 });
  }
}

async function handleToggle(id: string, is_active: boolean) {
  try {
    await toggleAlertMutation.mutateAsync({ id, is_active });
    toast.add({
      severity: 'success',
      summary: is_active ? t('alerts.activateSuccess') : t('alerts.pauseSuccess'),
      life: 5000,
    });
  } catch {
    toast.add({ severity: 'error', summary: t('alerts.toggleError'), life: 5000 });
  }
}

function handleCreateSuccess() {
  createDialogOpen.value = false;
  toast.add({ severity: 'success', summary: t('alerts.createSuccess'), life: 5000 });
}

function handleEditSuccess() {
  editingAlert.value = null;
  toast.add({ severity: 'success', summary: t('alerts.updateSuccess'), life: 5000 });
}

function getFrequencyLabel(freq: string) {
  const labels: Record<string, string> = {
    instant: t('alerts.frequency.instant'),
    daily: t('alerts.frequency.daily'),
    weekly: t('alerts.frequency.weekly'),
  };
  return labels[freq] || freq;
}

function getFilterBadges(alert: PropertyAlert) {
  const badges: { icon: typeof Home; label: string }[] = [];
  const filters = alert.criteria;

  if (filters.transaction_type) {
    badges.push({ icon: Home, label: t(`common.transaction.${filters.transaction_type}`) });
  }
  if (filters.canton_id || filters.city_id) {
    badges.push({
      icon: MapPin,
      label: filters.city_id
        ? t('alerts.filters.citySet', 'City selected')
        : t('alerts.filters.cantonSet', 'Canton selected'),
    });
  }
  if (filters.price_min || filters.price_max) {
    const label =
      filters.price_min && filters.price_max
        ? `${formatPrice(filters.price_min)} - ${formatPrice(filters.price_max)}`
        : filters.price_min
          ? `${t('alerts.filters.from', 'From')} ${formatPrice(filters.price_min)}`
          : `${t('alerts.filters.to', 'To')} ${formatPrice(filters.price_max!)}`;
    badges.push({ icon: DollarSign, label });
  }
  if (filters.rooms_min || filters.rooms_max) {
    const label =
      filters.rooms_min && filters.rooms_max
        ? `${filters.rooms_min}-${filters.rooms_max} ${t('alerts.filters.rooms', 'rooms')}`
        : filters.rooms_min
          ? `${filters.rooms_min}+ ${t('alerts.filters.rooms', 'rooms')}`
          : `${t('alerts.filters.to', 'To')} ${filters.rooms_max} ${t('alerts.filters.rooms', 'rooms')}`;
    badges.push({ icon: BedDouble, label });
  }
  if (filters.surface_min || filters.surface_max) {
    const label =
      filters.surface_min && filters.surface_max
        ? `${filters.surface_min}-${filters.surface_max} m²`
        : filters.surface_min
          ? `${filters.surface_min}+ m²`
          : `${t('alerts.filters.to', 'To')} ${filters.surface_max} m²`;
    badges.push({ icon: Maximize, label });
  }
  return badges;
}
</script>

<template>
  <div data-testid="alerts-page" class="space-y-6">
    <SEO :title="t('alerts.title')" />
    <ConfirmDialog />

    <!-- Page Header -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">{{ t('alerts.title') }}</h1>
        <p class="text-gray-500">{{ t('alerts.description') }}</p>
      </div>
      <button
        class="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
        @click="createDialogOpen = true"
      >
        <Plus class="h-4 w-4" />
        {{ t('alerts.createNew') }}
      </button>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="space-y-4">
      <div v-for="i in 3" :key="i" class="rounded-xl border bg-white p-6">
        <div class="flex items-start gap-4">
          <div class="flex-1 space-y-3">
            <div class="flex items-center gap-2">
              <Skeleton width="10rem" height="1.25rem" />
              <Skeleton width="4rem" height="1.25rem" />
            </div>
            <Skeleton width="8rem" height="1rem" />
            <div class="flex gap-2">
              <Skeleton width="5rem" height="1.5rem" />
              <Skeleton width="6rem" height="1.5rem" />
              <Skeleton width="7rem" height="1.5rem" />
            </div>
            <Skeleton width="12rem" height="0.75rem" />
          </div>
          <div class="flex gap-2">
            <Skeleton width="2rem" height="2rem" />
            <Skeleton width="2rem" height="2rem" />
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="!alerts || alerts.length === 0" class="rounded-xl border bg-white py-16 text-center">
      <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
        <Bell class="h-8 w-8 text-gray-400" />
      </div>
      <h3 class="text-xl font-semibold">{{ t('alerts.empty.title') }}</h3>
      <p class="mx-auto mt-2 max-w-sm text-sm text-gray-500">{{ t('alerts.empty.description') }}</p>
      <button
        class="mt-6 flex items-center gap-2 mx-auto rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
        @click="createDialogOpen = true"
      >
        <Plus class="h-4 w-4" />
        {{ t('alerts.empty.createFirst') }}
      </button>
    </div>

    <!-- Alert Cards -->
    <div v-else class="space-y-4">
      <div
        v-for="alert in alerts"
        :key="alert.id"
        class="rounded-xl border bg-white p-4 sm:p-6"
        :class="!alert.is_active ? 'opacity-60' : ''"
      >
        <div class="flex flex-col gap-4 sm:flex-row sm:items-start">
          <!-- Info -->
          <div class="flex-1 space-y-3">
            <div class="flex items-start justify-between gap-4">
              <div>
                <div class="flex items-center gap-2">
                  <h3 class="font-semibold">{{ alert.name }}</h3>
                  <span
                    v-if="!alert.is_active"
                    class="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600"
                  >
                    {{ t('alerts.paused') }}
                  </span>
                </div>
                <p class="text-sm text-gray-500">
                  {{ getFrequencyLabel(alert.frequency) }}
                  <template v-if="alert.match_count !== undefined">
                    &bull; {{ t('alerts.matchCount', { count: alert.match_count }) }}
                  </template>
                </p>
              </div>

              <!-- Active toggle -->
              <div class="flex items-center gap-2">
                <span class="text-sm text-gray-500">
                  {{ alert.is_active ? t('alerts.active') : t('alerts.paused') }}
                </span>
                <ToggleSwitch
                  :model-value="alert.is_active"
                  :disabled="toggleAlertMutation.isPending.value"
                  @update:model-value="(val: boolean) => handleToggle(alert.id, val)"
                />
              </div>
            </div>

            <!-- Filter badges -->
            <div v-if="getFilterBadges(alert).length > 0" class="flex flex-wrap gap-2">
              <span
                v-for="(badge, index) in getFilterBadges(alert)"
                :key="index"
                class="flex items-center gap-1 rounded-full border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-600"
              >
                <component :is="badge.icon" class="h-3 w-3" />
                {{ badge.label }}
              </span>
            </div>

            <!-- Dates -->
            <div class="flex flex-wrap gap-4 text-xs text-gray-400">
              <span>{{ t('alerts.createdAt', { date: new Date(alert.created_at).toLocaleDateString() }) }}</span>
              <span v-if="alert.last_sent_at">
                {{ t('alerts.lastSent', { date: new Date(alert.last_sent_at).toLocaleDateString() }) }}
              </span>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-2 sm:flex-col">
            <button
              class="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
              @click="editingAlert = alert"
            >
              <Edit2 class="h-4 w-4" />
              <span class="sm:hidden">{{ t('common.edit') }}</span>
            </button>
            <button
              class="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
              :disabled="deleteAlertMutation.isPending.value"
              @click="confirmDelete(alert.id)"
            >
              <Loader2 v-if="deleteAlertMutation.isPending.value" class="h-4 w-4 animate-spin" />
              <Trash2 v-else class="h-4 w-4" />
              <span class="sm:hidden">{{ t('common.delete') }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Dialog -->
    <Dialog
      v-model:visible="createDialogOpen"
      :header="t('alerts.createTitle')"
      modal
      class="w-full max-w-lg"
    >
      <p class="mb-4 text-sm text-gray-500">{{ t('alerts.createDescription') }}</p>
      <CreateAlertForm
        @success="handleCreateSuccess"
        @cancel="createDialogOpen = false"
      />
    </Dialog>

    <!-- Edit Dialog -->
    <Dialog
      :visible="!!editingAlert"
      :header="t('alerts.editTitle')"
      modal
      class="w-full max-w-lg"
      @update:visible="(val: boolean) => { if (!val) editingAlert = null }"
    >
      <CreateAlertForm
        v-if="editingAlert"
        :alert="editingAlert"
        @success="handleEditSuccess"
        @cancel="editingAlert = null"
      />
    </Dialog>
  </div>
</template>

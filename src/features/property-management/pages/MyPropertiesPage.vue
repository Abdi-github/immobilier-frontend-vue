<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import {
  Plus,
  Search,
  FileText,
  Clock,
  CheckCircle,
  Globe,
  XCircle,
  Archive,
  MoreVertical,
  Image as ImageIcon,
  MapPin,
  BedDouble,
  Maximize2,
} from 'lucide-vue-next';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import Paginator from 'primevue/paginator';
import ConfirmDialog from 'primevue/confirmdialog';
import Menu from 'primevue/menu';
import Skeleton from 'primevue/skeleton';
import SEO from '@/shared/components/SEO.vue';
import { useLocalizedName } from '@/shared/composables/useLocalizedName';
import { formatPrice } from '@/shared/utils/formatters';
import {
  useMyProperties,
  usePropertyStats,
  useDeleteProperty,
  useSubmitForApproval,
  useArchiveProperty,
} from '../composables/useMyProperties';
import type { PropertyStatus, ManagedProperty } from '../types';

const { t, locale } = useI18n();
const router = useRouter();
const toast = useToast();
const confirm = useConfirm();
const getLocalizedName = useLocalizedName();

// Filters and pagination
const statusFilter = ref<string>('');
const searchQuery = ref('');
const sortBy = ref('created_at');
const sortOrder = ref<'asc' | 'desc'>('desc');
const page = ref(1);
const limit = ref(10);

const params = computed(() => ({
  page: page.value,
  limit: limit.value,
  status: statusFilter.value || undefined,
  sort: sortBy.value,
  order: sortOrder.value,
  search: searchQuery.value || undefined,
}));

const { data: propertiesData, isLoading, isError } = useMyProperties(params);
const { data: stats } = usePropertyStats();
const deleteMutation = useDeleteProperty();
const submitMutation = useSubmitForApproval();
const archiveMutation = useArchiveProperty();

const properties = computed(() => propertiesData.value?.data ?? []);
const pagination = computed(() => (propertiesData.value as any)?.pagination ?? (propertiesData.value as any)?.meta);

watch(statusFilter, () => { page.value = 1; });
watch(searchQuery, () => { page.value = 1; });

// Stats cards config
const statCards = computed(() => [
  { key: '', label: t('myProperties.stats.total'), count: stats.value?.total ?? 0, icon: FileText, color: 'text-gray-600 bg-gray-100' },
  { key: 'DRAFT', label: t('myProperties.stats.draft'), count: stats.value?.draft ?? 0, icon: FileText, color: 'text-gray-500 bg-gray-50' },
  { key: 'PENDING_APPROVAL', label: t('myProperties.stats.pending'), count: stats.value?.pending ?? 0, icon: Clock, color: 'text-amber-600 bg-amber-50' },
  { key: 'APPROVED', label: t('myProperties.stats.approved'), count: stats.value?.approved ?? 0, icon: CheckCircle, color: 'text-blue-600 bg-blue-50' },
  { key: 'PUBLISHED', label: t('myProperties.stats.published'), count: stats.value?.published ?? 0, icon: Globe, color: 'text-green-600 bg-green-50' },
  { key: 'REJECTED', label: t('myProperties.stats.rejected'), count: stats.value?.rejected ?? 0, icon: XCircle, color: 'text-red-600 bg-red-50' },
  { key: 'ARCHIVED', label: t('myProperties.stats.archived'), count: stats.value?.archived ?? 0, icon: Archive, color: 'text-gray-400 bg-gray-50' },
]);

function getStatusBadge(status: PropertyStatus) {
  const map: Record<PropertyStatus, { class: string; label: string }> = {
    DRAFT: { class: 'bg-gray-100 text-gray-700', label: t('myProperties.status.draft') },
    PENDING_APPROVAL: { class: 'bg-amber-100 text-amber-700', label: t('myProperties.status.pending') },
    APPROVED: { class: 'bg-blue-100 text-blue-700', label: t('myProperties.status.approved') },
    PUBLISHED: { class: 'bg-green-100 text-green-700', label: t('myProperties.status.published') },
    REJECTED: { class: 'bg-red-100 text-red-700', label: t('myProperties.status.rejected') },
    ARCHIVED: { class: 'bg-gray-100 text-gray-500', label: t('myProperties.status.archived') },
  };
  return map[status] || map.DRAFT;
}

function getPropertyTitle(p: ManagedProperty) {
  return p.title || t('myProperties.untitled');
}

function getPropertyImage(p: ManagedProperty) {
  const primary = p.images?.find((img) => img.is_primary);
  return primary?.thumbnail_url || primary?.url || p.images?.[0]?.thumbnail_url || p.images?.[0]?.url || '';
}

// Action menu
const menuRef = ref<InstanceType<typeof Menu>>();
const activeProperty = ref<ManagedProperty | null>(null);

function getMenuItems(p: ManagedProperty) {
  const items: { label: string; icon: string; command: () => void; class?: string }[] = [];

  if (['PUBLISHED', 'APPROVED'].includes(p.status)) {
    items.push({
      label: t('myProperties.actions.view'),
      icon: 'pi pi-eye',
      command: () => router.push({ name: 'property-detail', params: { lang: locale.value, id: p.id } }),
    });
  }

  if (p.status !== 'ARCHIVED') {
    items.push({
      label: t('myProperties.actions.edit'),
      icon: 'pi pi-pencil',
      command: () => router.push({ name: 'edit-property', params: { lang: locale.value, id: p.id } }),
    });
  }

  if (['DRAFT', 'REJECTED'].includes(p.status)) {
    items.push({
      label: t('myProperties.actions.submit'),
      icon: 'pi pi-send',
      command: () => handleSubmit(p),
    });
  }

  if (!['ARCHIVED', 'DRAFT'].includes(p.status)) {
    items.push({
      label: t('myProperties.actions.archive'),
      icon: 'pi pi-inbox',
      command: () => handleArchive(p),
    });
  }

  if (['DRAFT', 'REJECTED', 'ARCHIVED'].includes(p.status)) {
    items.push({
      label: t('myProperties.actions.delete'),
      icon: 'pi pi-trash',
      command: () => handleDelete(p),
      class: 'text-red-600',
    });
  }

  return items;
}

function toggleMenu(event: Event, property: ManagedProperty) {
  activeProperty.value = property;
  menuRef.value?.toggle(event);
}

async function handleSubmit(p: ManagedProperty) {
  try {
    await submitMutation.mutateAsync(p.id);
    toast.add({ severity: 'success', summary: t('myProperties.submitSuccess'), life: 5000 });
  } catch {
    toast.add({ severity: 'error', summary: t('myProperties.submitError'), life: 5000 });
  }
}

function handleArchive(p: ManagedProperty) {
  confirm.require({
    header: t('myProperties.actions.archive'),
    message: t('myProperties.archiveConfirm', 'Are you sure you want to archive this property?'),
    acceptClass: '!bg-amber-600 !border-amber-600',
    accept: async () => {
      try {
        await archiveMutation.mutateAsync(p.id);
        toast.add({ severity: 'success', summary: t('myProperties.archiveSuccess'), life: 5000 });
      } catch {
        toast.add({ severity: 'error', summary: t('myProperties.archiveError'), life: 5000 });
      }
    },
  });
}

function handleDelete(p: ManagedProperty) {
  confirm.require({
    header: t('common.delete'),
    message: t('myProperties.deleteConfirm', 'Are you sure you want to delete this property? This action cannot be undone.'),
    acceptClass: '!bg-red-600 !border-red-600',
    accept: async () => {
      try {
        await deleteMutation.mutateAsync(p.id);
        toast.add({ severity: 'success', summary: t('myProperties.deleteSuccess'), life: 5000 });
      } catch {
        toast.add({ severity: 'error', summary: t('myProperties.deleteError'), life: 5000 });
      }
    },
  });
}

function onPageChange(event: { page: number }) {
  page.value = event.page + 1;
}
</script>

<template>
  <div data-testid="my-properties-page" class="space-y-6">
    <SEO :title="t('myProperties.title')" />
    <ConfirmDialog />
    <Menu ref="menuRef" :model="activeProperty ? getMenuItems(activeProperty) : []" :popup="true" />

    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">{{ t('myProperties.title') }}</h1>
        <p class="text-sm text-gray-500">{{ t('myProperties.subtitle') }}</p>
      </div>
      <router-link
        :to="{ name: 'create-property', params: { lang: locale } }"
        class="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
      >
        <Plus class="h-4 w-4" />
        {{ t('myProperties.createNew') }}
      </router-link>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
      <button
        v-for="stat in statCards"
        :key="stat.key"
        class="rounded-lg border p-3 text-left transition-colors hover:border-primary/50"
        :class="statusFilter === stat.key ? 'border-primary bg-primary/5' : 'border-gray-200 bg-white'"
        @click="statusFilter = stat.key"
      >
        <div class="flex items-center gap-2">
          <div class="rounded-md p-1" :class="stat.color">
            <component :is="stat.icon" class="h-4 w-4" />
          </div>
          <span class="text-xl font-bold">{{ stat.count }}</span>
        </div>
        <p class="mt-1 text-xs text-gray-500 truncate">{{ stat.label }}</p>
      </button>
    </div>

    <!-- Search and Sort -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      <div class="relative flex-1 w-full">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="t('myProperties.searchPlaceholder')"
          class="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-primary focus:ring-primary focus:outline-none"
        />
      </div>
      <select
        v-model="sortBy"
        class="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
      >
        <option value="created_at">{{ t('myProperties.sortBy') }}: Newest</option>
        <option value="price">{{ t('myProperties.sortBy') }}: Price</option>
        <option value="updated_at">{{ t('myProperties.sortBy') }}: Updated</option>
      </select>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="space-y-4">
      <div v-for="i in 3" :key="i" class="rounded-xl border bg-white p-4">
        <div class="flex gap-4">
          <Skeleton width="8rem" height="6rem" border-radius="0.5rem" class="shrink-0" />
          <div class="flex-1 space-y-3">
            <Skeleton width="66%" height="1.25rem" />
            <Skeleton width="33%" height="1rem" />
            <Skeleton width="50%" height="1rem" />
          </div>
        </div>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="isError" class="rounded-xl border bg-white p-8 text-center">
      <p class="text-lg font-semibold">{{ t('myProperties.errorTitle') }}</p>
      <p class="mt-1 text-sm text-gray-500">{{ t('myProperties.errorDescription') }}</p>
    </div>

    <!-- Empty -->
    <div v-else-if="properties.length === 0" class="rounded-xl border bg-white p-12 text-center">
      <FileText class="mx-auto h-12 w-12 text-gray-300" />
      <h3 class="mt-4 text-lg font-semibold">{{ t('myProperties.emptyTitle') }}</h3>
      <p class="mt-1 text-sm text-gray-500">{{ t('myProperties.emptyDescription') }}</p>
      <router-link
        :to="{ name: 'create-property', params: { lang: locale } }"
        class="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
      >
        <Plus class="h-4 w-4" />
        {{ t('myProperties.createFirst') }}
      </router-link>
    </div>

    <!-- Property List -->
    <div v-else class="space-y-3">
      <div
        v-for="property in properties"
        :key="property.id"
        class="rounded-xl border bg-white p-4 transition-shadow hover:shadow-md"
      >
        <div class="flex flex-col sm:flex-row gap-4">
          <!-- Image -->
          <div class="relative h-32 w-full sm:w-44 shrink-0 overflow-hidden rounded-lg bg-gray-100">
            <img
              v-if="getPropertyImage(property)"
              :src="getPropertyImage(property)"
              :alt="getPropertyTitle(property)"
              class="h-full w-full object-cover"
            />
            <div v-else class="flex h-full items-center justify-center">
              <ImageIcon class="h-8 w-8 text-gray-300" />
            </div>
            <!-- Image count -->
            <div v-if="property.images?.length" class="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-0.5 text-xs text-white">
              <ImageIcon class="inline h-3 w-3 mr-1" />{{ property.images.length }}
            </div>
            <!-- Transaction badge -->
            <div
              class="absolute top-2 left-2 rounded px-2 py-0.5 text-xs font-medium text-white"
              :class="property.transaction_type === 'rent' ? 'bg-blue-600' : 'bg-green-600'"
            >
              {{ property.transaction_type === 'rent' ? t('myProperties.rent') : t('myProperties.sale') }}
            </div>
          </div>

          <!-- Content -->
          <div class="flex flex-1 flex-col justify-between">
            <div>
              <div class="flex items-start justify-between gap-2">
                <div>
                  <h3 class="font-semibold text-gray-900 line-clamp-1">{{ getPropertyTitle(property) }}</h3>
                  <div v-if="property.category" class="mt-0.5">
                    <span class="text-xs text-gray-500 bg-gray-100 rounded px-2 py-0.5">
                      {{ getLocalizedName(property.category.name) }}
                    </span>
                  </div>
                </div>
                <span
                  class="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium"
                  :class="getStatusBadge(property.status).class"
                >
                  {{ getStatusBadge(property.status).label }}
                </span>
              </div>

              <!-- Meta -->
              <div class="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
                <span v-if="property.canton || property.city" class="flex items-center gap-1">
                  <MapPin class="h-3.5 w-3.5" />
                  <template v-if="property.city">{{ getLocalizedName(property.city.name) }}</template>
                  <template v-if="property.canton">, {{ property.canton.code }}</template>
                </span>
                <span v-if="property.rooms" class="flex items-center gap-1">
                  <BedDouble class="h-3.5 w-3.5" />
                  {{ property.rooms }} {{ property.rooms === 1 ? 'room' : 'rooms' }}
                </span>
                <span v-if="property.surface" class="flex items-center gap-1">
                  <Maximize2 class="h-3.5 w-3.5" />
                  {{ property.surface }} m²
                </span>
              </div>
            </div>

            <!-- Price + Actions -->
            <div class="mt-3 flex items-center justify-between">
              <p class="text-lg font-bold text-primary">
                {{ formatPrice(property.price) }}
                <span v-if="property.transaction_type === 'rent'" class="text-sm font-normal text-gray-500">/{{ t('common.month') }}</span>
              </p>
              <button
                class="rounded-lg border border-gray-200 p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                @click="toggleMenu($event, property)"
              >
                <MoreVertical class="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="pagination && pagination.total_pages > 1" class="flex justify-center pt-4">
        <Paginator
          :rows="limit"
          :total-records="pagination.total"
          :first="(page - 1) * limit"
          @page="onPageChange"
        />
      </div>
      <div v-if="pagination" class="text-center text-sm text-gray-500">
        {{ t('myProperties.showing', {
          from: ((page - 1) * limit) + 1,
          to: Math.min(page * limit, pagination.total),
          total: pagination.total,
        }) }}
      </div>
    </div>
  </div>
</template>

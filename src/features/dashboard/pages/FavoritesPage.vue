<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import {
  Heart,
  MapPin,
  BedDouble,
  Maximize,
  Trash2,
  ExternalLink,
  Search,
  Loader2,
} from 'lucide-vue-next';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import Skeleton from 'primevue/skeleton';
import ConfirmDialog from 'primevue/confirmdialog';
import Paginator from 'primevue/paginator';
import { useFavorites, useRemoveFavorite } from '../composables/useFavorites';
import { formatPrice } from '@/shared/utils/formatters';
import SEO from '@/shared/components/SEO.vue';

const { t, locale } = useI18n();
const router = useRouter();
const toast = useToast();
const confirm = useConfirm();

const page = ref(1);
const params = computed(() => ({ page: page.value, limit: 12 }));
const { data: favoritesData, isLoading } = useFavorites(params);
const removeFavoriteMutation = useRemoveFavorite();

const favorites = computed(() => favoritesData.value?.data ?? []);
const pagination = computed(() => favoritesData.value?.pagination);

function confirmRemove(propertyId: string) {
  confirm.require({
    header: t('favorites.removeConfirmTitle'),
    message: t('favorites.removeConfirmDescription'),
    acceptClass: '!bg-red-600 !border-red-600',
    acceptLabel: t('favorites.removeConfirm'),
    rejectLabel: t('common.cancel'),
    accept: () => handleRemove(propertyId),
  });
}

async function handleRemove(propertyId: string) {
  try {
    await removeFavoriteMutation.mutateAsync(propertyId);
    toast.add({ severity: 'success', summary: t('favorites.removeSuccess'), life: 5000 });
  } catch {
    toast.add({ severity: 'error', summary: t('favorites.removeError'), life: 5000 });
  }
}

function onPageChange(event: { page: number }) {
  page.value = event.page + 1;
}

function navigateToProperty(id: string) {
  router.push({ name: 'property-detail', params: { lang: locale.value, id } });
}
</script>

<template>
  <div data-testid="favorites-page" class="space-y-6">
    <SEO :title="t('favorites.title')" />
    <ConfirmDialog />

    <!-- Page Header -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">{{ t('favorites.title') }}</h1>
        <p class="text-gray-500">
          {{ pagination?.total
            ? t('favorites.count', { count: pagination.total })
            : t('favorites.description') }}
        </p>
      </div>
      <router-link :to="{ name: 'properties', params: { lang: locale } }">
        <button class="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          <Search class="h-4 w-4" />
          {{ t('favorites.browseMore') }}
        </button>
      </router-link>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="i in 6" :key="i" class="overflow-hidden rounded-xl border bg-white">
        <Skeleton width="100%" height="12rem" />
        <div class="space-y-3 p-4">
          <Skeleton width="6rem" height="1.5rem" />
          <Skeleton width="100%" height="1.25rem" />
          <Skeleton width="8rem" height="1rem" />
          <div class="flex gap-4">
            <Skeleton width="3rem" height="1rem" />
            <Skeleton width="3rem" height="1rem" />
          </div>
          <Skeleton width="100%" height="2rem" />
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="favorites.length === 0" class="rounded-xl border bg-white py-16 text-center">
      <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
        <Heart class="h-8 w-8 text-gray-400" />
      </div>
      <h3 class="text-xl font-semibold">{{ t('favorites.empty.title') }}</h3>
      <p class="mx-auto mt-2 max-w-sm text-sm text-gray-500">{{ t('favorites.empty.description') }}</p>
      <router-link :to="{ name: 'properties', params: { lang: locale } }" class="mt-6 inline-block">
        <button class="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
          <Search class="h-4 w-4" />
          {{ t('favorites.empty.browseProperties') }}
        </button>
      </router-link>
    </div>

    <!-- Favorites Grid -->
    <template v-else>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="favorite in favorites"
          :key="favorite.id"
          class="group overflow-hidden rounded-xl border bg-white"
          :class="favorite.property?.status !== 'PUBLISHED' ? 'opacity-70' : ''"
        >
          <!-- Image -->
          <div class="relative aspect-[4/3] overflow-hidden bg-gray-100">
            <button class="block h-full w-full" @click="navigateToProperty(favorite.property?.id || '')">
              <img
                :src="favorite.property?.primary_image_url || '/images/property-placeholder.jpg'"
                :alt="favorite.property?.title"
                class="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            </button>

            <!-- Transaction badge -->
            <span
              class="absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-medium"
              :class="favorite.property?.transaction_type === 'rent'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-green-100 text-green-700'"
            >
              {{ t(`common.transaction.${favorite.property?.transaction_type}`) }}
            </span>

            <!-- Unavailable badge -->
            <span
              v-if="favorite.property?.status !== 'PUBLISHED'"
              class="absolute right-3 top-3 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700"
            >
              {{ t('favorites.propertyUnavailable', 'Unavailable') }}
            </span>

            <!-- Remove button -->
            <button
              class="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-500 hover:bg-white hover:text-red-600"
              :disabled="removeFavoriteMutation.isPending.value"
              @click="confirmRemove(favorite.property?.id || '')"
            >
              <Loader2 v-if="removeFavoriteMutation.isPending.value" class="h-4 w-4 animate-spin" />
              <Trash2 v-else class="h-4 w-4" />
            </button>
          </div>

          <!-- Content -->
          <div class="p-4">
            <!-- Price -->
            <div class="text-lg font-bold text-primary">
              {{ formatPrice(favorite.property?.price, favorite.property?.currency) }}
              <span v-if="favorite.property?.transaction_type === 'rent'" class="text-sm font-normal text-gray-500">
                / {{ t('common.month') }}
              </span>
            </div>

            <!-- Title -->
            <button class="mt-1 text-left font-semibold hover:text-primary line-clamp-1" @click="navigateToProperty(favorite.property?.id || '')">
              {{ favorite.property?.title }}
            </button>

            <!-- Location -->
            <div class="mt-1 flex items-center gap-1 text-sm text-gray-500">
              <MapPin class="h-4 w-4 shrink-0" />
              <span class="truncate">
                {{ favorite.property?.city?.name }}
                <template v-if="favorite.property?.canton?.code">, {{ favorite.property.canton.code }}</template>
              </span>
            </div>

            <!-- Features -->
            <div class="mt-3 flex items-center gap-4 text-sm text-gray-500">
              <div v-if="favorite.property?.rooms" class="flex items-center gap-1">
                <BedDouble class="h-4 w-4" />
                <span>{{ favorite.property.rooms }}</span>
              </div>
              <div v-if="favorite.property?.surface" class="flex items-center gap-1">
                <Maximize class="h-4 w-4" />
                <span>{{ favorite.property.surface }} m²</span>
              </div>
            </div>

            <!-- View button -->
            <div class="mt-4">
              <button
                class="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                @click="navigateToProperty(favorite.property?.id || '')"
              >
                <ExternalLink class="h-4 w-4" />
                {{ t('favorites.viewProperty') }}
              </button>
            </div>

            <!-- Saved date -->
            <p class="mt-3 text-xs text-gray-400">
              {{ t('favorites.savedOn', { date: new Date(favorite.created_at).toLocaleDateString() }) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <Paginator
        v-if="pagination && pagination.totalPages > 1"
        :rows="12"
        :total-records="pagination.total"
        :first="(page - 1) * 12"
        @page="onPageChange"
      />
    </template>
  </div>
</template>

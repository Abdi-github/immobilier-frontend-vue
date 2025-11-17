<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import {
  MessageSquare,
  ExternalLink,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Inbox,
} from 'lucide-vue-next';
import Skeleton from 'primevue/skeleton';
import { useInquiries } from '../composables/useInquiries';
import SEO from '@/shared/components/SEO.vue';

const { t, locale } = useI18n();
const router = useRouter();

const page = ref(1);
const params = computed(() => ({ page: page.value, limit: 10 }));
const { data, isLoading, isError } = useInquiries(params);

const inquiries = computed(() => data.value?.data ?? []);
const pagination = computed(() => data.value?.pagination);

const STATUS_CONFIG: Record<string, { icon: typeof Clock; color: string; label: string }> = {
  new: { icon: AlertCircle, color: 'bg-blue-100 text-blue-700', label: 'New' },
  contacted: { icon: Clock, color: 'bg-yellow-100 text-yellow-700', label: 'Contacted' },
  viewing_scheduled: { icon: Clock, color: 'bg-purple-100 text-purple-700', label: 'Viewing Scheduled' },
  in_negotiation: { icon: Clock, color: 'bg-orange-100 text-orange-700', label: 'In Negotiation' },
  closed_won: { icon: CheckCircle2, color: 'bg-green-100 text-green-700', label: 'Closed (Won)' },
  closed_lost: { icon: AlertCircle, color: 'bg-gray-100 text-gray-600', label: 'Closed (Lost)' },
  spam: { icon: AlertCircle, color: 'bg-red-100 text-red-700', label: 'Spam' },
};

const DEFAULT_STATUS = { icon: AlertCircle, color: 'bg-blue-100 text-blue-700', label: 'New' };

function getStatusConfig(status: string) {
  return STATUS_CONFIG[status.toLowerCase()] ?? DEFAULT_STATUS;
}

function formatDate(dateStr: string) {
  const lang = locale.value;
  const localeMap: Record<string, string> = { fr: 'fr-CH', de: 'de-CH', it: 'it-CH' };
  return new Date(dateStr).toLocaleDateString(localeMap[lang] || 'en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function navigateToProperty(id: string) {
  router.push({ name: 'property-detail', params: { lang: locale.value, id } });
}
</script>

<template>
  <div data-testid="inquiries-page" class="space-y-6">
    <SEO :title="t('inquiries.title', 'My Inquiries')" />

    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold tracking-tight">{{ t('inquiries.title', 'My Inquiries') }}</h1>
      <p class="mt-1 text-sm text-gray-500">{{ t('inquiries.description', 'Track all the property inquiries you have sent') }}</p>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="space-y-4">
      <div v-for="i in 3" :key="i" class="rounded-xl border bg-white p-4">
        <div class="flex gap-4">
          <Skeleton width="7rem" height="5rem" border-radius="0.5rem" />
          <div class="flex-1 space-y-2">
            <Skeleton width="12rem" height="1.25rem" />
            <Skeleton width="8rem" height="1rem" />
            <Skeleton width="16rem" height="1rem" />
          </div>
        </div>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="isError" class="rounded-xl border bg-white p-8 text-center">
      <AlertCircle class="mx-auto h-10 w-10 text-red-500 mb-3" />
      <p class="text-red-600">{{ t('common.loadError', 'Failed to load data') }}</p>
      <button
        class="mt-4 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        @click="() => { page = 1 }"
      >
        {{ t('common.retry', 'Retry') }}
      </button>
    </div>

    <!-- Empty -->
    <div v-else-if="inquiries.length === 0" class="rounded-xl border bg-white p-12 text-center">
      <Inbox class="mx-auto h-12 w-12 text-gray-400 mb-4" />
      <h3 class="text-lg font-semibold mb-2">{{ t('inquiries.empty.title', 'No inquiries yet') }}</h3>
      <p class="mx-auto mb-6 max-w-md text-sm text-gray-500">
        {{ t('inquiries.empty.description', 'When you contact a property owner or agency, your inquiries will appear here.') }}
      </p>
      <router-link :to="{ name: 'properties', params: { lang: locale } }">
        <button class="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
          {{ t('inquiries.empty.browseCta', 'Browse Properties') }}
        </button>
      </router-link>
    </div>

    <!-- Inquiries List -->
    <div v-else class="space-y-3">
      <div
        v-for="inquiry in inquiries"
        :key="inquiry.id"
        class="rounded-xl border bg-white p-4 transition-shadow hover:shadow-md"
      >
        <div class="flex flex-col gap-4 sm:flex-row">
          <!-- Property thumbnail -->
          <button
            v-if="inquiry.property?.images?.[0]"
            class="shrink-0"
            @click="navigateToProperty(inquiry.property!.id)"
          >
            <img
              :src="inquiry.property.images[0].url"
              :alt="inquiry.property.title"
              class="h-20 w-28 rounded-lg object-cover"
            />
          </button>

          <!-- Content -->
          <div class="min-w-0 flex-1">
            <div class="flex items-start justify-between gap-2">
              <div>
                <button
                  v-if="inquiry.property"
                  class="font-semibold hover:text-primary line-clamp-1 text-left"
                  @click="navigateToProperty(inquiry.property.id)"
                >
                  {{ inquiry.property.title }}
                </button>
                <span v-else class="font-semibold text-gray-400">
                  {{ t('inquiries.propertyUnavailable', 'Property no longer available') }}
                </span>
                <p class="mt-0.5 text-xs text-gray-400">
                  {{ t('inquiries.sentOn', 'Sent on') }} {{ formatDate(inquiry.created_at) }}
                </p>
              </div>
              <!-- Status badge -->
              <span
                class="flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium whitespace-nowrap"
                :class="getStatusConfig(inquiry.status).color"
              >
                <component :is="getStatusConfig(inquiry.status).icon" class="h-3 w-3" />
                {{ t(`inquiries.status.${inquiry.status}`, getStatusConfig(inquiry.status).label) }}
              </span>
            </div>

            <!-- Inquiry type -->
            <div class="mt-2 flex items-center gap-2">
              <span class="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                {{ t(`inquiries.type.${inquiry.inquiry_type}`, inquiry.inquiry_type) }}
              </span>
            </div>

            <!-- Message preview -->
            <p class="mt-2 text-sm text-gray-500 line-clamp-2">{{ inquiry.message }}</p>

            <!-- Actions -->
            <div class="mt-3 flex items-center gap-3">
              <button
                v-if="inquiry.property"
                class="flex items-center gap-1 rounded px-2 py-1 text-xs text-gray-600 hover:bg-gray-100"
                @click="navigateToProperty(inquiry.property.id)"
              >
                <ExternalLink class="h-3 w-3" />
                {{ t('inquiries.viewProperty', 'View Property') }}
              </button>
              <span v-if="inquiry.first_response_at" class="flex items-center gap-1 text-xs text-green-600">
                <MessageSquare class="h-3 w-3" />
                {{ t('inquiries.responded', 'Responded') }} {{ formatDate(inquiry.first_response_at) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="pagination && pagination.totalPages > 1" class="flex items-center justify-center gap-2">
      <button
        class="rounded-lg border border-gray-300 p-2 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        :disabled="page <= 1"
        @click="page--"
      >
        <ChevronLeft class="h-4 w-4" />
      </button>
      <span class="text-sm text-gray-500">
        {{ t('common.pageOf', { current: page, total: pagination.totalPages }) }}
      </span>
      <button
        class="rounded-lg border border-gray-300 p-2 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        :disabled="page >= pagination.totalPages"
        @click="page++"
      >
        <ChevronRight class="h-4 w-4" />
      </button>
    </div>
  </div>
</template>

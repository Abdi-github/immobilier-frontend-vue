<script setup lang="ts">
import { computed, toRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useQuery } from '@tanstack/vue-query';
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  CheckCircle,
  ChevronRight,
  ExternalLink,
} from 'lucide-vue-next';
import Skeleton from 'primevue/skeleton';
import SEO from '@/shared/components/SEO.vue';
import { useLocalizedName } from '@/shared/composables/useLocalizedName';
import { useAgency } from '../composables/useAgency';
import { propertiesApi } from '@/features/properties/api/properties.api';
import PropertyCardGrid from '@/features/properties/components/PropertyCardGrid.vue';

const route = useRoute();
const router = useRouter();
const { t, locale } = useI18n();
const getLocalizedName = useLocalizedName();

const agencyId = toRef(() => (route.params.id as string) || '');
const { data: agencyData, isLoading, isError } = useAgency(agencyId);
const agency = computed(() => agencyData.value?.data);

// Fetch agency properties
const { data: propertiesData, isLoading: propertiesLoading } = useQuery({
  queryKey: ['properties', 'agency', agencyId],
  queryFn: () => propertiesApi.getPropertiesByAgency(agencyId.value, { limit: 6 }).then((res) => res.data),
  enabled: computed(() => !!agencyId.value),
  staleTime: 5 * 60 * 1000,
});

const properties = computed(() => propertiesData.value?.data || []);

const cityName = computed(() => {
  if (!agency.value?.city) return '';
  return getLocalizedName(agency.value.city.name);
});

const isVerified = computed(() => agency.value?.is_verified || agency.value?.verified);

const websiteUrl = computed(() => {
  if (!agency.value?.website) return '';
  return agency.value.website.startsWith('http')
    ? agency.value.website
    : `https://${agency.value.website}`;
});

const memberSince = computed(() => {
  if (!agency.value?.created_at) return '';
  return new Date(agency.value.created_at).toLocaleDateString(locale.value, {
    year: 'numeric',
    month: 'long',
  });
});
</script>

<template>
  <div data-testid="agency-detail-page">
    <!-- Loading -->
    <div v-if="isLoading" class="mx-auto max-w-6xl px-4 py-8">
      <Skeleton width="16rem" height="2rem" class="mb-4" />
      <div class="grid gap-8 lg:grid-cols-3">
        <div class="space-y-6 lg:col-span-2">
          <Skeleton width="100%" height="12rem" border-radius="0.75rem" />
          <Skeleton width="100%" height="16rem" border-radius="0.75rem" />
        </div>
        <Skeleton width="100%" height="16rem" border-radius="0.75rem" />
      </div>
    </div>

    <!-- Error / Not found -->
    <div
      v-else-if="isError || !agency"
      class="flex flex-col items-center justify-center py-24"
    >
      <Building2 class="mb-4 h-16 w-16 text-gray-300" />
      <h2 class="mb-2 text-xl font-bold">{{ t('agencies.detail.notFound') }}</h2>
      <p class="mb-6 text-gray-500">{{ t('agencies.detail.notFoundDescription') }}</p>
      <button
        class="rounded-md bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-primary/90"
        @click="router.push(`/${locale}/agencies`)"
      >
        {{ t('agencies.detail.backToList') }}
      </button>
    </div>

    <!-- Main content -->
    <template v-else>
      <SEO
        :title="agency.name"
        :description="`${agency.name} — Real estate agency in ${cityName}, Switzerland. ${agency.total_properties} properties available.`"
      />

      <div class="mx-auto max-w-6xl px-4 py-8">
        <!-- Breadcrumb -->
        <nav class="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <router-link :to="`/${locale}`" class="hover:text-primary">
            {{ t('common.nav.home') }}
          </router-link>
          <ChevronRight class="h-4 w-4" />
          <router-link :to="`/${locale}/agencies`" class="hover:text-primary">
            {{ t('agencies.detail.title') }}
          </router-link>
          <ChevronRight class="h-4 w-4" />
          <span class="text-gray-900">{{ agency.name }}</span>
        </nav>

        <div class="grid gap-8 lg:grid-cols-3">
          <!-- Main content -->
          <div class="space-y-6 lg:col-span-2">
            <!-- Agency header -->
            <div class="rounded-xl border bg-white p-6 shadow-sm">
              <div class="flex items-start gap-6">
                <div
                  class="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg border bg-gray-50"
                >
                  <img
                    v-if="agency.logo"
                    :src="agency.logo"
                    :alt="agency.name"
                    class="h-full w-full rounded-lg object-contain p-2"
                  />
                  <Building2 v-else class="h-12 w-12 text-gray-400" />
                </div>
                <div class="flex-1">
                  <div class="flex items-center gap-3">
                    <h1 class="text-2xl font-bold">{{ agency.name }}</h1>
                    <span
                      v-if="isVerified"
                      class="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700"
                    >
                      <CheckCircle class="h-3 w-3" />
                      {{ t('agencies.detail.verified') }}
                    </span>
                  </div>

                  <div class="mt-2 flex items-center gap-1 text-gray-500">
                    <MapPin class="h-4 w-4" />
                    <span>
                      {{ agency.address }}, {{ agency.postal_code }} {{ cityName }}
                      <template v-if="agency.canton"> ({{ agency.canton.code }})</template>
                    </span>
                  </div>

                  <p
                    v-if="agency.total_properties > 0"
                    class="mt-2 text-sm text-gray-500"
                  >
                    <span class="font-semibold text-gray-900">{{ agency.total_properties }}</span>
                    {{ t('agencies.detail.activeListings') }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Properties -->
            <div class="rounded-xl border bg-white shadow-sm">
              <div class="flex items-center justify-between border-b px-6 py-4">
                <h2 class="text-lg font-semibold">{{ t('agencies.detail.listings') }}</h2>
                <router-link
                  v-if="agency.total_properties > 6"
                  :to="`/${locale}/properties?agency_id=${agency.id}`"
                  class="text-sm font-medium text-primary hover:underline"
                >
                  {{ t('common.actions.viewDetails') }} →
                </router-link>
              </div>
              <div class="p-6">
                <!-- Loading -->
                <div
                  v-if="propertiesLoading"
                  class="grid gap-4 sm:grid-cols-2"
                >
                  <Skeleton
                    v-for="i in 4"
                    :key="i"
                    width="100%"
                    height="18rem"
                    border-radius="0.5rem"
                  />
                </div>

                <!-- Properties grid -->
                <div v-else-if="properties.length > 0" class="grid gap-4 sm:grid-cols-2">
                  <PropertyCardGrid
                    v-for="property in properties"
                    :key="property.id"
                    :property="property"
                  />
                </div>

                <!-- No listings -->
                <p v-else class="py-8 text-center text-gray-500">
                  {{ t('agencies.detail.noListings') }}
                </p>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Contact Information -->
            <div class="rounded-xl border bg-white shadow-sm">
              <div class="border-b px-6 py-4">
                <h3 class="text-lg font-semibold">{{ t('agencies.detail.contactInfo') }}</h3>
              </div>
              <div class="space-y-4 p-6">
                <div v-if="agency.contact_person">
                  <p class="text-sm text-gray-500">{{ t('agencies.detail.contactPerson') }}</p>
                  <p class="font-medium">{{ agency.contact_person }}</p>
                </div>

                <hr />

                <a
                  v-if="agency.phone"
                  :href="`tel:${agency.phone}`"
                  class="flex items-center gap-3 rounded-lg p-2 hover:bg-gray-50"
                >
                  <Phone class="h-5 w-5 text-primary" />
                  <span>{{ agency.phone }}</span>
                </a>

                <a
                  v-if="agency.email"
                  :href="`mailto:${agency.email}`"
                  class="flex items-center gap-3 rounded-lg p-2 hover:bg-gray-50"
                >
                  <Mail class="h-5 w-5 text-primary" />
                  <span class="truncate">{{ agency.email }}</span>
                </a>

                <a
                  v-if="agency.website"
                  :href="websiteUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-3 rounded-lg p-2 hover:bg-gray-50"
                >
                  <Globe class="h-5 w-5 text-primary" />
                  <span class="truncate">{{ agency.website }}</span>
                  <ExternalLink class="ml-auto h-4 w-4 text-gray-400" />
                </a>

                <hr />

                <a
                  :href="agency.email ? `mailto:${agency.email}` : '#'"
                  class="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary/90"
                >
                  <Mail class="h-4 w-4" />
                  {{ t('agencies.detail.sendMessage') }}
                </a>

                <a
                  v-if="agency.phone"
                  :href="`tel:${agency.phone}`"
                  class="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-gray-50"
                >
                  <Phone class="h-4 w-4" />
                  {{ t('agencies.detail.callNow') }}
                </a>
              </div>
            </div>

            <!-- Quick info -->
            <div class="rounded-xl border bg-white p-6 shadow-sm">
              <dl class="space-y-3 text-sm">
                <div v-if="agency.canton" class="flex justify-between">
                  <dt class="text-gray-500">{{ t('agencies.detail.canton') }}</dt>
                  <dd class="font-medium">{{ agency.canton.code }}</dd>
                </div>
                <div v-if="cityName" class="flex justify-between">
                  <dt class="text-gray-500">{{ t('agencies.detail.city') }}</dt>
                  <dd class="font-medium">{{ cityName }}</dd>
                </div>
                <div v-if="agency.postal_code" class="flex justify-between">
                  <dt class="text-gray-500">{{ t('agencies.detail.postalCode') }}</dt>
                  <dd class="font-medium">{{ agency.postal_code }}</dd>
                </div>
                <div v-if="memberSince" class="flex justify-between">
                  <dt class="text-gray-500">{{ t('agencies.detail.memberSince') }}</dt>
                  <dd class="font-medium">{{ memberSince }}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

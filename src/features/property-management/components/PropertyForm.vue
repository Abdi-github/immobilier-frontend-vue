<script setup lang="ts">
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useCategories } from '@/features/locations/composables/useCategories';
import { useCantons } from '@/features/locations/composables/useCantons';
import { useCities } from '@/features/locations/composables/useCities';
import { useAmenities } from '@/features/locations/composables/useAmenities';
import { useLocalizedName } from '@/shared/composables/useLocalizedName';
import { formatPrice } from '@/shared/utils/formatters';
import {
  Upload,
  X,
  Star,
  Check,
} from 'lucide-vue-next';
import type { PropertyFormReturn } from '../composables/usePropertyForm';
import type { TransactionType } from '../types';
import type { SupportedLanguage } from '@/features/auth/types';
import type { Amenity, Category, Canton, City } from '@/features/locations/types';
import { ref } from 'vue';

const props = defineProps<{
  form: PropertyFormReturn;
  existingImages?: { id: string; url: string; is_primary: boolean }[];
}>();

const { t } = useI18n();
const getLocalizedName = useLocalizedName();

const { state, errors, setField, toggleAmenity, addImages, removeImage } = props.form;

// Data sources
const { data: categoriesData } = useCategories();
const { data: cantonsData } = useCantons();
const cantonIdRef = computed(() => state.canton_id);
const { data: citiesData } = useCities(cantonIdRef);
const { data: amenitiesData } = useAmenities();

// Typed data accessors
const categories = computed(() => (categoriesData.value ?? []) as Category[]);
const cantons = computed(() => (cantonsData.value ?? []) as Canton[]);
const cities = computed(() => (citiesData.value ?? []) as City[]);
const amenities = computed(() => (amenitiesData.value ?? []) as Amenity[]);

// Reset city when canton changes
watch(() => state.canton_id, (newVal, oldVal) => {
  if (oldVal && newVal !== oldVal) {
    setField('city_id', '');
    setField('postal_code', '');
  }
});

// Auto-fill postal code from city
watch(() => state.city_id, (cityId) => {
  if (cityId && cities.value.length) {
    const city = cities.value.find((c) => c.id === cityId);
    if (city?.postal_code) {
      setField('postal_code', city.postal_code);
    }
  }
});

// Group categories by section
const groupedCategories = computed(() => {
  const groups: Record<string, Category[]> = {};
  for (const cat of categories.value) {
    const section = cat.section || 'residential';
    if (!groups[section]) groups[section] = [];
    groups[section].push(cat);
  }
  return groups;
});

// Group amenities by group
const groupedAmenities = computed(() => {
  const groups: Record<string, Amenity[]> = {};
  for (const amenity of amenities.value) {
    const group = amenity.group || 'general';
    if (!groups[group]) groups[group] = [];
    groups[group].push(amenity);
  }
  return groups;
});

const LANGUAGES: { value: SupportedLanguage; label: string; flag: string }[] = [
  { value: 'en', label: 'English', flag: '🇬🇧' },
  { value: 'fr', label: 'Français', flag: '🇫🇷' },
  { value: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { value: 'it', label: 'Italiano', flag: '🇮🇹' },
];

// Image handling
const dragOver = ref(false);
const MAX_IMAGES = 20;
const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

function handleFileDrop(event: DragEvent) {
  dragOver.value = false;
  const files = Array.from(event.dataTransfer?.files ?? []);
  processFiles(files);
}

function handleFileInput(event: Event) {
  const input = event.target as HTMLInputElement;
  const files = Array.from(input.files ?? []);
  processFiles(files);
  input.value = '';
}

function processFiles(files: File[]) {
  const valid = files.filter((f) => {
    if (!ALLOWED_TYPES.includes(f.type)) return false;
    if (f.size > MAX_SIZE) return false;
    return true;
  });
  if (valid.length > 0) {
    addImages(valid);
  }
}

// Review helpers
function getCategoryName(): string {
  const cat = categories.value.find((c) => c.id === state.category_id);
  return cat ? getLocalizedName(cat.name) : '-';
}

function getCantonName(): string {
  const canton = cantons.value.find((c) => c.id === state.canton_id);
  return canton ? getLocalizedName(canton.name) : '-';
}

function getCityName(): string {
  const city = cities.value.find((c) => c.id === state.city_id);
  return city ? getLocalizedName(city.name) : '-';
}

function getSelectedAmenityNames(): string[] {
  return state.amenities
    .map((id) => {
      const a = amenities.value.find((am) => am.id === id);
      return a ? getLocalizedName(a.name) : '';
    })
    .filter(Boolean);
}
</script>

<template>
  <div>
    <!-- Step 1: Basic Information -->
    <div v-if="state.currentStep === 1" class="space-y-6">
      <div>
        <h2 class="text-xl font-semibold">{{ t('form.basicInfo.title') }}</h2>
        <p class="text-sm text-gray-500">{{ t('form.basicInfo.description') }}</p>
      </div>

      <!-- Source Language -->
      <div class="space-y-2">
        <label class="text-sm font-medium text-gray-700">{{ t('form.basicInfo.sourceLanguage') }}</label>
        <select
          :value="state.source_language"
          class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
          @change="setField('source_language', ($event.target as HTMLSelectElement).value as SupportedLanguage)"
        >
          <option v-for="lang in LANGUAGES" :key="lang.value" :value="lang.value">
            {{ lang.flag }} {{ lang.label }}
          </option>
        </select>
      </div>

      <!-- Transaction Type -->
      <div class="space-y-2">
        <label class="text-sm font-medium text-gray-700">{{ t('form.basicInfo.transactionType') }}</label>
        <div class="flex gap-3">
          <button
            type="button"
            class="flex-1 rounded-lg border-2 px-4 py-3 text-sm font-medium transition-colors"
            :class="state.transaction_type === 'rent' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 hover:border-gray-300'"
            @click="setField('transaction_type', 'rent' as TransactionType)"
          >
            {{ t('form.basicInfo.rent') }}
          </button>
          <button
            type="button"
            class="flex-1 rounded-lg border-2 px-4 py-3 text-sm font-medium transition-colors"
            :class="state.transaction_type === 'buy' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 hover:border-gray-300'"
            @click="setField('transaction_type', 'buy' as TransactionType)"
          >
            {{ t('form.basicInfo.buy') }}
          </button>
        </div>
        <p v-if="errors.transaction_type" class="text-sm text-red-500">{{ errors.transaction_type }}</p>
      </div>

      <!-- Category -->
      <div class="space-y-2">
        <label class="text-sm font-medium text-gray-700">{{ t('form.basicInfo.category') }}</label>
        <div v-for="(cats, section) in groupedCategories" :key="section" class="space-y-2">
          <p class="text-xs font-semibold uppercase text-gray-400">{{ section }}</p>
          <div class="grid grid-cols-2 gap-2">
            <button
              v-for="cat in cats"
              :key="cat.id"
              type="button"
              class="rounded-lg border-2 px-3 py-2 text-sm text-left transition-colors"
              :class="state.category_id === cat.id ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 hover:border-gray-300'"
              @click="setField('category_id', cat.id)"
            >
              {{ getLocalizedName(cat.name) }}
            </button>
          </div>
        </div>
        <p v-if="errors.category_id" class="text-sm text-red-500">{{ errors.category_id }}</p>
      </div>

      <!-- Price -->
      <div class="space-y-2">
        <label class="text-sm font-medium text-gray-700">
          {{ t('form.details.price') }}
          <span class="text-xs text-gray-400 ml-1">
            ({{ state.transaction_type === 'rent' ? t('form.details.priceHintRent') : t('form.details.priceHintBuy') }})
          </span>
        </label>
        <div class="relative">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">CHF</span>
          <input
            :value="state.price"
            type="number"
            min="0"
            :placeholder="t('form.details.pricePlaceholder')"
            class="w-full rounded-lg border border-gray-300 py-2 pl-12 pr-4 text-sm focus:border-primary focus:outline-none"
            @input="setField('price', ($event.target as HTMLInputElement).value)"
          />
        </div>
        <p v-if="errors.price" class="text-sm text-red-500">{{ errors.price }}</p>
      </div>

      <!-- Additional Costs -->
      <div v-if="state.transaction_type === 'rent'" class="space-y-2">
        <label class="text-sm font-medium text-gray-700">{{ t('form.details.additionalCosts') }}</label>
        <div class="relative">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">CHF</span>
          <input
            :value="state.additional_costs"
            type="number"
            min="0"
            class="w-full rounded-lg border border-gray-300 py-2 pl-12 pr-4 text-sm focus:border-primary focus:outline-none"
            @input="setField('additional_costs', ($event.target as HTMLInputElement).value)"
          />
        </div>
      </div>
    </div>

    <!-- Step 2: Location -->
    <div v-else-if="state.currentStep === 2" class="space-y-6">
      <div>
        <h2 class="text-xl font-semibold">{{ t('form.location.title') }}</h2>
        <p class="text-sm text-gray-500">{{ t('form.location.description') }}</p>
      </div>

      <!-- Canton -->
      <div class="space-y-2">
        <label class="text-sm font-medium text-gray-700">{{ t('form.location.canton') }}</label>
        <select
          :value="state.canton_id"
          class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
          @change="setField('canton_id', ($event.target as HTMLSelectElement).value)"
        >
          <option value="">{{ t('form.location.cantonPlaceholder') }}</option>
          <option
            v-for="canton in cantons"
            :key="canton.id"
            :value="canton.id"
          >
            {{ getLocalizedName(canton.name) }}
            ({{ canton.code }})
          </option>
        </select>
        <p v-if="errors.canton_id" class="text-sm text-red-500">{{ errors.canton_id }}</p>
      </div>

      <!-- City -->
      <div class="space-y-2">
        <label class="text-sm font-medium text-gray-700">{{ t('form.location.city') }}</label>
        <select
          :value="state.city_id"
          :disabled="!state.canton_id"
          class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none disabled:bg-gray-100 disabled:opacity-50"
          @change="setField('city_id', ($event.target as HTMLSelectElement).value)"
        >
          <option value="">
            {{ state.canton_id ? t('form.location.cityPlaceholder') : t('form.location.selectCantonFirst') }}
          </option>
          <option
            v-for="city in cities"
            :key="city.id"
            :value="city.id"
          >
            {{ getLocalizedName(city.name) }}
          </option>
        </select>
        <p v-if="errors.city_id" class="text-sm text-red-500">{{ errors.city_id }}</p>
      </div>

      <!-- Address -->
      <div class="space-y-2">
        <label class="text-sm font-medium text-gray-700">{{ t('form.location.address') }}</label>
        <textarea
          :value="state.address"
          :placeholder="t('form.location.addressPlaceholder')"
          rows="2"
          class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
          @input="setField('address', ($event.target as HTMLTextAreaElement).value)"
        />
        <p v-if="errors.address" class="text-sm text-red-500">{{ errors.address }}</p>
      </div>

      <!-- Postal Code -->
      <div class="space-y-2">
        <label class="text-sm font-medium text-gray-700">{{ t('form.location.postalCode') }}</label>
        <input
          :value="state.postal_code"
          type="text"
          :placeholder="t('form.location.postalCodePlaceholder')"
          class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
          @input="setField('postal_code', ($event.target as HTMLInputElement).value)"
        />
      </div>
    </div>

    <!-- Step 3: Details -->
    <div v-else-if="state.currentStep === 3" class="space-y-6">
      <div>
        <h2 class="text-xl font-semibold">{{ t('form.details.title') }}</h2>
        <p class="text-sm text-gray-500">{{ t('form.details.description') }}</p>
      </div>

      <!-- Title -->
      <div class="space-y-2">
        <label class="text-sm font-medium text-gray-700">{{ t('form.basicInfo.propertyTitle') }}</label>
        <input
          :value="state.title"
          type="text"
          maxlength="150"
          :placeholder="t('form.basicInfo.propertyTitlePlaceholder')"
          class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
          @input="setField('title', ($event.target as HTMLInputElement).value)"
        />
        <div class="flex justify-between text-xs text-gray-400">
          <p v-if="errors.title" class="text-red-500">{{ errors.title }}</p>
          <span class="ml-auto" :class="state.title.length >= 5 ? 'text-green-500' : 'text-gray-400'">
            {{ state.title.length }}/150
          </span>
        </div>
      </div>

      <!-- Description -->
      <div class="space-y-2">
        <label class="text-sm font-medium text-gray-700">{{ t('form.basicInfo.propertyDescription') }}</label>
        <textarea
          :value="state.description"
          :placeholder="t('form.basicInfo.propertyDescriptionPlaceholder')"
          rows="6"
          class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
          @input="setField('description', ($event.target as HTMLTextAreaElement).value)"
        />
        <div class="flex justify-between text-xs">
          <p v-if="errors.description" class="text-red-500">{{ errors.description }}</p>
          <span
            class="ml-auto"
            :class="state.description.length >= 500 ? 'text-green-500' : state.description.length >= 20 ? 'text-amber-500' : 'text-red-500'"
          >
            {{ state.description.length }} characters
          </span>
        </div>
      </div>

      <!-- Rooms -->
      <div class="space-y-2">
        <label class="text-sm font-medium text-gray-700">{{ t('form.details.rooms') }}</label>
        <input
          :value="state.rooms"
          type="number"
          step="0.5"
          min="0"
          :placeholder="t('form.details.roomsPlaceholder')"
          class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
          @input="setField('rooms', ($event.target as HTMLInputElement).value)"
        />
      </div>

      <!-- Surface -->
      <div class="space-y-2">
        <label class="text-sm font-medium text-gray-700">{{ t('form.details.surface') }}</label>
        <div class="relative">
          <input
            :value="state.surface"
            type="number"
            min="0"
            :placeholder="t('form.details.surfacePlaceholder')"
            class="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-sm focus:border-primary focus:outline-none"
            @input="setField('surface', ($event.target as HTMLInputElement).value)"
          />
          <span class="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">m²</span>
        </div>
      </div>
    </div>

    <!-- Step 4: Amenities -->
    <div v-else-if="state.currentStep === 4" class="space-y-6">
      <div>
        <h2 class="text-xl font-semibold">{{ t('form.amenities.title') }}</h2>
        <p class="text-sm text-gray-500">{{ t('form.amenities.description') }}</p>
        <p v-if="state.amenities.length > 0" class="mt-1 text-sm text-primary font-medium">
          {{ t('form.amenities.selectedCount', { count: state.amenities.length }) }}
        </p>
      </div>

      <div v-for="(amenities, group) in groupedAmenities" :key="group" class="space-y-2">
        <h3 class="text-sm font-semibold uppercase text-gray-400">{{ group }}</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <button
            v-for="amenity in amenities"
            :key="amenity.id"
            type="button"
            class="flex items-center gap-2 rounded-lg border-2 px-3 py-2 text-sm text-left transition-colors"
            :class="state.amenities.includes(amenity.id)
              ? 'border-primary bg-primary/5 text-primary'
              : 'border-gray-200 hover:border-gray-300'"
            @click="toggleAmenity(amenity.id)"
          >
            <Check
              v-if="state.amenities.includes(amenity.id)"
              class="h-4 w-4 shrink-0"
            />
            <span class="truncate">{{ getLocalizedName(amenity.name) }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Step 5: Images -->
    <div v-else-if="state.currentStep === 5" class="space-y-6">
      <div>
        <h2 class="text-xl font-semibold">{{ t('form.photos.title') }}</h2>
        <p class="text-sm text-gray-500">{{ t('form.photos.description') }}</p>
      </div>

      <!-- Existing images (edit mode) -->
      <div v-if="existingImages && existingImages.length > 0" class="space-y-2">
        <p class="text-sm font-medium text-gray-700">Existing Images</p>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div
            v-for="img in existingImages"
            :key="img.id"
            class="relative aspect-[4/3] overflow-hidden rounded-lg border bg-gray-100"
          >
            <img :src="img.url" class="h-full w-full object-cover" />
            <div v-if="img.is_primary" class="absolute top-1 left-1 rounded bg-amber-500 p-1">
              <Star class="h-3 w-3 text-white" />
            </div>
          </div>
        </div>
      </div>

      <!-- Drop zone -->
      <div
        class="rounded-xl border-2 border-dashed p-8 text-center transition-colors cursor-pointer"
        :class="dragOver ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-gray-400'"
        @dragover.prevent="dragOver = true"
        @dragleave="dragOver = false"
        @drop.prevent="handleFileDrop"
        @click="($refs.fileInput as HTMLInputElement)?.click()"
      >
        <input
          ref="fileInput"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          class="hidden"
          @change="handleFileInput"
        />
        <Upload class="mx-auto h-10 w-10 text-gray-400" />
        <p class="mt-3 text-sm font-medium text-gray-700">{{ t('form.photos.dropzone') }}</p>
        <p class="mt-1 text-xs text-gray-400">JPEG, PNG, WebP • Max 5MB • Up to {{ MAX_IMAGES }} images</p>
      </div>

      <p v-if="errors.images" class="text-sm text-red-500">{{ errors.images }}</p>

      <!-- Image previews -->
      <div v-if="state.imagePreviews.length > 0" class="space-y-2">
        <p class="text-sm text-gray-500">
          {{ t('form.photos.imageCount', { count: state.imageFiles.length, max: MAX_IMAGES }) }}
        </p>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div
            v-for="(preview, idx) in state.imagePreviews"
            :key="idx"
            class="group relative aspect-[4/3] overflow-hidden rounded-lg border bg-gray-100"
          >
            <img :src="preview" class="h-full w-full object-cover" />
            <!-- Primary badge -->
            <div v-if="idx === 0" class="absolute top-1 left-1 rounded bg-amber-500 p-1">
              <Star class="h-3 w-3 text-white" />
            </div>
            <!-- Index -->
            <div class="absolute bottom-1 left-1 rounded bg-black/60 px-1.5 py-0.5 text-xs text-white">
              {{ idx + 1 }}
            </div>
            <!-- Remove button -->
            <button
              type="button"
              class="absolute top-1 right-1 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
              @click="removeImage(idx)"
            >
              <X class="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 6: Review -->
    <div v-else-if="state.currentStep === 6" class="space-y-6">
      <div>
        <h2 class="text-xl font-semibold">{{ t('form.review.title') }}</h2>
        <p class="text-sm text-gray-500">{{ t('form.review.description') }}</p>
      </div>

      <!-- Basic Info -->
      <div class="rounded-lg border p-4 space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="font-semibold">{{ t('form.steps.basicInfo') }}</h3>
          <button
            type="button"
            class="text-sm text-primary hover:underline"
            @click="form.goToStep(1)"
          >
            {{ t('common.edit') }}
          </button>
        </div>
        <div class="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span class="text-gray-500">{{ t('form.basicInfo.transactionType') }}:</span>
            <span class="ml-1 font-medium">{{ state.transaction_type === 'rent' ? t('form.basicInfo.rent') : t('form.basicInfo.buy') }}</span>
          </div>
          <div>
            <span class="text-gray-500">{{ t('form.basicInfo.category') }}:</span>
            <span class="ml-1 font-medium">{{ getCategoryName() }}</span>
          </div>
          <div>
            <span class="text-gray-500">{{ t('form.details.price') }}:</span>
            <span class="ml-1 font-medium">{{ formatPrice(Number(state.price)) }}</span>
          </div>
          <div v-if="state.additional_costs">
            <span class="text-gray-500">{{ t('form.details.additionalCosts') }}:</span>
            <span class="ml-1 font-medium">CHF {{ state.additional_costs }}</span>
          </div>
        </div>
      </div>

      <!-- Location -->
      <div class="rounded-lg border p-4 space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="font-semibold">{{ t('form.steps.location') }}</h3>
          <button type="button" class="text-sm text-primary hover:underline" @click="form.goToStep(2)">
            {{ t('common.edit') }}
          </button>
        </div>
        <div class="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span class="text-gray-500">{{ t('form.location.canton') }}:</span>
            <span class="ml-1 font-medium">{{ getCantonName() }}</span>
          </div>
          <div>
            <span class="text-gray-500">{{ t('form.location.city') }}:</span>
            <span class="ml-1 font-medium">{{ getCityName() }}</span>
          </div>
          <div class="col-span-2">
            <span class="text-gray-500">{{ t('form.location.address') }}:</span>
            <span class="ml-1 font-medium">{{ state.address || '-' }}</span>
          </div>
          <div v-if="state.postal_code">
            <span class="text-gray-500">{{ t('form.location.postalCode') }}:</span>
            <span class="ml-1 font-medium">{{ state.postal_code }}</span>
          </div>
        </div>
      </div>

      <!-- Details -->
      <div class="rounded-lg border p-4 space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="font-semibold">{{ t('form.steps.details') }}</h3>
          <button type="button" class="text-sm text-primary hover:underline" @click="form.goToStep(3)">
            {{ t('common.edit') }}
          </button>
        </div>
        <div class="text-sm space-y-2">
          <div>
            <span class="text-gray-500">{{ t('form.basicInfo.propertyTitle') }}:</span>
            <span class="ml-1 font-medium">{{ state.title }}</span>
          </div>
          <div>
            <span class="text-gray-500">{{ t('form.basicInfo.propertyDescription') }}:</span>
            <p class="mt-1 text-gray-700 line-clamp-3">{{ state.description }}</p>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div v-if="state.rooms">
              <span class="text-gray-500">{{ t('form.details.rooms') }}:</span>
              <span class="ml-1 font-medium">{{ state.rooms }}</span>
            </div>
            <div v-if="state.surface">
              <span class="text-gray-500">{{ t('form.details.surface') }}:</span>
              <span class="ml-1 font-medium">{{ state.surface }} m²</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Amenities -->
      <div class="rounded-lg border p-4 space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="font-semibold">{{ t('form.steps.amenities') }}</h3>
          <button type="button" class="text-sm text-primary hover:underline" @click="form.goToStep(4)">
            {{ t('common.edit') }}
          </button>
        </div>
        <div v-if="state.amenities.length > 0" class="flex flex-wrap gap-2">
          <span
            v-for="name in getSelectedAmenityNames()"
            :key="name"
            class="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700"
          >
            {{ name }}
          </span>
        </div>
        <p v-else class="text-sm text-gray-400">No amenities selected</p>
      </div>

      <!-- Photos -->
      <div class="rounded-lg border p-4 space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="font-semibold">{{ t('form.steps.photos') }}</h3>
          <button type="button" class="text-sm text-primary hover:underline" @click="form.goToStep(5)">
            {{ t('common.edit') }}
          </button>
        </div>
        <div v-if="state.imagePreviews.length > 0" class="grid grid-cols-4 gap-2">
          <div v-for="(preview, idx) in state.imagePreviews.slice(0, 8)" :key="idx" class="aspect-[4/3] overflow-hidden rounded-lg">
            <img :src="preview" class="h-full w-full object-cover" />
          </div>
        </div>
        <div v-else-if="existingImages && existingImages.length > 0" class="grid grid-cols-4 gap-2">
          <div v-for="img in existingImages.slice(0, 8)" :key="img.id" class="aspect-[4/3] overflow-hidden rounded-lg">
            <img :src="img.url" class="h-full w-full object-cover" />
          </div>
        </div>
        <p v-else class="text-sm text-gray-400">No photos uploaded</p>
      </div>
    </div>
  </div>
</template>

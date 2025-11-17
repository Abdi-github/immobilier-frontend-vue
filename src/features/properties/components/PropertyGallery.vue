<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { ChevronLeft, ChevronRight, X, ZoomIn, ImageIcon } from 'lucide-vue-next';
import type { PropertyImage } from '../types';

const props = defineProps<{
  images: PropertyImage[];
  title: string;
}>();

const currentIndex = ref(0);
const isLightboxOpen = ref(false);
const lightboxRef = ref<HTMLDivElement | null>(null);

const sortedImages = computed(() =>
  [...props.images].sort((a, b) => {
    if (a.is_primary && !b.is_primary) return -1;
    if (!a.is_primary && b.is_primary) return 1;
    return a.order - b.order;
  }),
);

const currentImage = computed(() => sortedImages.value[currentIndex.value]);

function goToPrevious() {
  currentIndex.value =
    currentIndex.value === 0 ? sortedImages.value.length - 1 : currentIndex.value - 1;
}

function goToNext() {
  currentIndex.value =
    currentIndex.value === sortedImages.value.length - 1 ? 0 : currentIndex.value + 1;
}

function openLightbox() {
  isLightboxOpen.value = true;
}

function closeLightbox() {
  isLightboxOpen.value = false;
}

function handleKeyDown(e: KeyboardEvent) {
  if (!isLightboxOpen.value) return;
  if (e.key === 'ArrowLeft') goToPrevious();
  if (e.key === 'ArrowRight') goToNext();
  if (e.key === 'Escape') closeLightbox();
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown);
});
</script>

<template>
  <!-- No images fallback -->
  <div
    v-if="!sortedImages.length"
    class="flex aspect-video items-center justify-center rounded-xl bg-gray-100"
  >
    <ImageIcon class="h-16 w-16 text-gray-400" />
  </div>

  <template v-else>
    <!-- Main gallery -->
    <div class="space-y-4">
      <!-- Main image -->
      <div class="group relative overflow-hidden rounded-xl bg-gray-100">
        <img
          v-if="currentImage"
          :src="currentImage.url"
          :alt="currentImage.alt_text || `${title} - Image ${currentIndex + 1}`"
          class="aspect-video w-full cursor-pointer object-cover transition-transform duration-300 group-hover:scale-105"
          @click="openLightbox"
        />

        <!-- Navigation arrows -->
        <template v-if="sortedImages.length > 1">
          <button
            aria-label="Previous image"
            class="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 backdrop-blur-sm transition-colors hover:bg-white"
            @click="goToPrevious"
          >
            <ChevronLeft class="h-6 w-6" />
          </button>
          <button
            aria-label="Next image"
            class="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 backdrop-blur-sm transition-colors hover:bg-white"
            @click="goToNext"
          >
            <ChevronRight class="h-6 w-6" />
          </button>
        </template>

        <!-- Zoom button -->
        <button
          aria-label="Zoom image"
          class="absolute right-4 top-4 rounded-full bg-white/80 p-2 backdrop-blur-sm transition-colors hover:bg-white"
          @click="openLightbox"
        >
          <ZoomIn class="h-5 w-5" />
        </button>

        <!-- Image counter -->
        <div class="absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-1 text-sm text-white">
          {{ currentIndex + 1 }} / {{ sortedImages.length }}
        </div>
      </div>

      <!-- Thumbnails -->
      <div v-if="sortedImages.length > 1" class="flex gap-2 overflow-x-auto pb-2" role="tablist">
        <button
          v-for="(image, index) in sortedImages"
          :key="image.id"
          role="tab"
          :aria-selected="index === currentIndex"
          :aria-label="`View image ${index + 1}`"
          class="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg transition-all"
          :class="
            index === currentIndex
              ? 'ring-2 ring-primary ring-offset-2'
              : 'opacity-70 hover:opacity-100'
          "
          @click="currentIndex = index"
        >
          <img
            :src="image.url"
            :alt="image.alt_text || `Thumbnail ${index + 1}`"
            class="h-full w-full object-cover"
          />
        </button>
      </div>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <div
        v-if="isLightboxOpen"
        ref="lightboxRef"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
        @click.self="closeLightbox"
      >
        <!-- Close button -->
        <button
          aria-label="Close gallery"
          class="absolute right-4 top-4 rounded-full p-2 text-white transition-colors hover:bg-white/20"
          @click="closeLightbox"
        >
          <X class="h-6 w-6" />
        </button>

        <!-- Navigation -->
        <template v-if="sortedImages.length > 1">
          <button
            aria-label="Previous image"
            class="absolute left-4 top-1/2 -translate-y-1/2 rounded-full p-2 text-white transition-colors hover:bg-white/20"
            @click.stop="goToPrevious"
          >
            <ChevronLeft class="h-8 w-8" />
          </button>
          <button
            aria-label="Next image"
            class="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-2 text-white transition-colors hover:bg-white/20"
            @click.stop="goToNext"
          >
            <ChevronRight class="h-8 w-8" />
          </button>
        </template>

        <!-- Image -->
        <img
          v-if="currentImage"
          :src="currentImage.url"
          :alt="currentImage.alt_text || `${title} - Image ${currentIndex + 1}`"
          class="max-h-[90vh] max-w-[90vw] object-contain"
          @click.stop
        />

        <!-- Counter -->
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-2 text-white">
          {{ currentIndex + 1 }} / {{ sortedImages.length }}
        </div>
      </div>
    </Teleport>
  </template>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { MapPin } from 'lucide-vue-next';
import L from 'leaflet';

// Fix Leaflet default icon issue with bundlers
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const props = defineProps<{
  lat?: number;
  lng?: number;
  address?: string;
}>();

const { t } = useI18n();
const mapContainer = ref<HTMLDivElement | null>(null);
let mapInstance: L.Map | null = null;

function initMap() {
  if (!mapContainer.value || !props.lat || !props.lng) return;

  if (mapInstance) {
    mapInstance.setView([props.lat, props.lng], 14);
    return;
  }

  mapInstance = L.map(mapContainer.value).setView([props.lat, props.lng], 14);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
  }).addTo(mapInstance);

  const marker = L.marker([props.lat, props.lng]).addTo(mapInstance);
  if (props.address) {
    marker.bindPopup(`<strong>${props.address}</strong>`);
  }
}

onMounted(() => {
  initMap();
});

onUnmounted(() => {
  if (mapInstance) {
    mapInstance.remove();
    mapInstance = null;
  }
});

watch(
  () => [props.lat, props.lng],
  () => {
    if (mapInstance) {
      mapInstance.remove();
      mapInstance = null;
    }
    initMap();
  },
);
</script>

<template>
  <!-- No location fallback -->
  <div v-if="!lat || !lng" class="flex h-48 items-center justify-center rounded-lg bg-gray-50">
    <div class="flex flex-col items-center gap-2 text-gray-400">
      <MapPin class="h-8 w-8" />
      <p class="text-sm">{{ t('properties.map.noLocation') }}</p>
    </div>
  </div>

  <!-- Map -->
  <div v-else ref="mapContainer" class="h-64 w-full rounded-lg" />
</template>

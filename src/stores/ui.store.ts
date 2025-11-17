import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUiStore = defineStore('ui', () => {
  const sidebarOpen = ref(false);
  const mobileMenuOpen = ref(false);
  const viewMode = ref<'grid' | 'list'>('grid');
  const isLoading = ref(false);

  function toggleSidebar() {
    sidebarOpen.value = !sidebarOpen.value;
  }

  function toggleMobileMenu() {
    mobileMenuOpen.value = !mobileMenuOpen.value;
  }

  function setViewMode(mode: 'grid' | 'list') {
    viewMode.value = mode;
  }

  function setLoading(loading: boolean) {
    isLoading.value = loading;
  }

  return {
    sidebarOpen,
    mobileMenuOpen,
    viewMode,
    isLoading,
    toggleSidebar,
    toggleMobileMenu,
    setViewMode,
    setLoading,
  };
});

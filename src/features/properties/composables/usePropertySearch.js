import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
export function usePropertySearch() {
    const route = useRoute();
    const router = useRouter();
    // ── Read URL params ──────────────────────────────────
    const transactionType = computed(() => route.query.transaction_type || 'rent');
    const selectedCategoryIds = computed(() => route.query.category_id
        ? String(route.query.category_id).split(',').filter(Boolean)
        : []);
    const cantonIds = computed(() => route.query.canton_id
        ? String(route.query.canton_id).split(',').filter(Boolean)
        : []);
    const cityIds = computed(() => route.query.city_id
        ? String(route.query.city_id).split(',').filter(Boolean)
        : []);
    const priceMin = computed(() => route.query.price_min ? parseInt(String(route.query.price_min), 10) : undefined);
    const priceMax = computed(() => route.query.price_max ? parseInt(String(route.query.price_max), 10) : undefined);
    const roomsMin = computed(() => route.query.rooms_min ? parseFloat(String(route.query.rooms_min)) : undefined);
    const roomsMax = computed(() => route.query.rooms_max ? parseFloat(String(route.query.rooms_max)) : undefined);
    const surfaceMin = computed(() => route.query.surface_min ? parseInt(String(route.query.surface_min), 10) : undefined);
    const surfaceMax = computed(() => route.query.surface_max ? parseInt(String(route.query.surface_max), 10) : undefined);
    const sortBy = computed(() => String(route.query.sort_by || 'published_at'));
    const sortOrder = computed(() => route.query.sort_order || 'desc');
    const currentSort = computed(() => `${sortBy.value}-${sortOrder.value}`);
    const currentPage = computed(() => route.query.page ? parseInt(String(route.query.page), 10) : 1);
    // ── Query params for API call ────────────────────────
    const queryParams = computed(() => ({
        page: currentPage.value,
        limit: 21,
        transaction_type: transactionType.value,
        category_id: route.query.category_id ? String(route.query.category_id) : undefined,
        canton_id: route.query.canton_id ? String(route.query.canton_id) : undefined,
        city_id: route.query.city_id ? String(route.query.city_id) : undefined,
        price_min: priceMin.value,
        price_max: priceMax.value,
        rooms_min: roomsMin.value,
        rooms_max: roomsMax.value,
        surface_min: surfaceMin.value,
        surface_max: surfaceMax.value,
        sort_by: sortBy.value,
        sort_order: sortOrder.value,
        q: route.query.q ? String(route.query.q) : undefined,
        status: 'PUBLISHED',
    }));
    // ── Helpers ──────────────────────────────────────────
    function updateQuery(updates, resetPage = true) {
        const newQuery = { ...route.query, ...updates };
        if (resetPage)
            newQuery.page = '1';
        // Remove undefined/empty values
        for (const key of Object.keys(newQuery)) {
            if (newQuery[key] === undefined || newQuery[key] === '') {
                delete newQuery[key];
            }
        }
        router.push({ query: newQuery });
    }
    // ── Filter handlers ─────────────────────────────────
    function handleTransactionChange(type) {
        // Clear price when switching rent↔buy since ranges differ
        updateQuery({
            transaction_type: type,
            price_min: undefined,
            price_max: undefined,
        });
    }
    function handleCategoryChange(ids) {
        updateQuery({
            category_id: ids.length ? ids.join(',') : undefined,
        });
    }
    function handleLocationsChange(locations) {
        const cantons = locations.filter((l) => l.type === 'canton').map((l) => l.id);
        const cities = locations.filter((l) => l.type === 'city').map((l) => l.id);
        updateQuery({
            canton_id: cantons.length ? cantons.join(',') : undefined,
            city_id: cities.length ? cities.join(',') : undefined,
        });
    }
    function handlePriceMinChange(value) {
        updateQuery({ price_min: value?.toString() });
    }
    function handlePriceMaxChange(value) {
        updateQuery({ price_max: value?.toString() });
    }
    function handleRoomsMinChange(value) {
        updateQuery({ rooms_min: value?.toString() });
    }
    function handleRoomsMaxChange(value) {
        updateQuery({ rooms_max: value?.toString() });
    }
    function handleSurfaceMinChange(value) {
        updateQuery({ surface_min: value?.toString() });
    }
    function handleSurfaceMaxChange(value) {
        updateQuery({ surface_max: value?.toString() });
    }
    function handleSortChange(value) {
        const [sort_by, sort_order] = value.split('-');
        updateQuery({ sort_by, sort_order });
    }
    function handlePageChange(page) {
        updateQuery({ page: page.toString() }, false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // ── Pagination helpers ──────────────────────────────
    function getPageNumbers(totalPages) {
        const current = currentPage.value;
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        const pages = [1];
        if (current > 3)
            pages.push('...');
        const start = Math.max(2, current - 1);
        const end = Math.min(totalPages - 1, current + 1);
        for (let i = start; i <= end; i++)
            pages.push(i);
        if (current < totalPages - 2)
            pages.push('...');
        pages.push(totalPages);
        return pages;
    }
    return {
        // State
        transactionType,
        selectedCategoryIds,
        cantonIds,
        cityIds,
        priceMin,
        priceMax,
        roomsMin,
        roomsMax,
        surfaceMin,
        surfaceMax,
        currentSort,
        currentPage,
        queryParams,
        // Handlers
        handleTransactionChange,
        handleCategoryChange,
        handleLocationsChange,
        handlePriceMinChange,
        handlePriceMaxChange,
        handleRoomsMinChange,
        handleRoomsMaxChange,
        handleSurfaceMinChange,
        handleSurfaceMaxChange,
        handleSortChange,
        handlePageChange,
        getPageNumbers,
    };
}

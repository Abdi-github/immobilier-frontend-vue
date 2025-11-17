import { computed, toRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { Bell, List, MapPin, Search, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import Select from 'primevue/select';
import Skeleton from 'primevue/skeleton';
import SEO from '@/shared/components/SEO.vue';
import PropertyCardGrid from '../components/PropertyCardGrid.vue';
import PropertyTypeFilter from '../components/PropertyTypeFilter.vue';
import LocationFilter from '../components/LocationFilter.vue';
import MinMaxFilter from '../components/MinMaxFilter.vue';
import { usePropertySearch } from '../composables/usePropertySearch';
import { useProperties } from '../composables/useProperties';
import { useCategories } from '@/features/locations/composables/useCategories';
import { useCantons } from '@/features/locations/composables/useCantons';
import { useCities } from '@/features/locations/composables/useCities';
import { useLocalizedName } from '@/shared/composables/useLocalizedName';
import { PRICE_OPTIONS_RENT, PRICE_OPTIONS_BUY, ROOMS_OPTIONS, SURFACE_OPTIONS, formatSwissPrice, formatRoomsLabel, formatSurfaceLabel, } from '../constants/filterPresets';
const { t, locale } = useI18n();
const getLocalizedName = useLocalizedName();
const { transactionType, selectedCategoryIds, cantonIds, cityIds, priceMin, priceMax, roomsMin, roomsMax, surfaceMin, surfaceMax, currentSort, queryParams, handleTransactionChange, handleCategoryChange, handleLocationsChange, handlePriceMinChange, handlePriceMaxChange, handleRoomsMinChange, handleRoomsMaxChange, handleSurfaceMinChange, handleSurfaceMaxChange, handleSortChange, handlePageChange, getPageNumbers, } = usePropertySearch();
// Data queries
const { data, isLoading, isError, isFetching } = useProperties(toRef(queryParams));
const { data: categoriesData } = useCategories();
const { data: cantonsData } = useCantons();
const { data: citiesData } = useCities();
const categories = computed(() => categoriesData.value?.data ?? []);
const cantons = computed(() => cantonsData.value?.data ?? []);
const cities = computed(() => citiesData.value?.data ?? []);
const properties = computed(() => data.value?.data ?? []);
const pagination = computed(() => {
    const p = data.value?.pagination;
    if (!p)
        return undefined;
    return {
        ...p,
        hasPrevPage: p.page > 1,
        hasNextPage: p.page < p.totalPages,
    };
});
// Reconstruct selected locations from URL IDs
const selectedLocations = computed(() => {
    const locations = [];
    for (const cantonId of cantonIds.value) {
        const canton = cantons.value.find((c) => String(c.id) === cantonId);
        if (canton) {
            locations.push({
                id: String(canton.id),
                name: getLocalizedName(canton.name),
                type: 'canton',
                cantonCode: canton.code,
            });
        }
    }
    for (const cityId of cityIds.value) {
        const city = cities.value.find((c) => String(c.id) === cityId);
        if (city) {
            const canton = cantons.value.find((c) => String(c.id) === String(city.canton_id));
            locations.push({
                id: String(city.id),
                name: getLocalizedName(city.name),
                type: 'city',
                postalCode: city.postal_code,
                cantonCode: canton?.code,
            });
        }
    }
    return locations;
});
// Sort options for Select dropdown
const sortOptions = [
    { value: 'is_top-desc', label: t('properties.sort.topOffers', 'TOP offers') },
    { value: 'published_at-desc', label: t('properties.sort.newest', 'Newest listed') },
    { value: 'published_at-asc', label: t('properties.sort.oldest', 'Oldest listed') },
    { value: 'price-asc', label: t('properties.sort.priceAsc', 'Price (ascending)') },
    { value: 'price-desc', label: t('properties.sort.priceDesc', 'Price (descending)') },
];
// Pagination helpers
const paginationStart = computed(() => pagination.value ? (pagination.value.page - 1) * pagination.value.limit + 1 : 0);
const paginationEnd = computed(() => pagination.value
    ? Math.min(pagination.value.page * pagination.value.limit, pagination.value.total)
    : 0);
const pageNumbers = computed(() => pagination.value ? getPageNumbers(pagination.value.totalPages) : []);
const priceOptions = computed(() => transactionType.value === 'rent' ? PRICE_OPTIONS_RENT : PRICE_OPTIONS_BUY);
const priceLabel = computed(() => transactionType.value === 'rent'
    ? t('properties.filters.rentAmount', 'Rent amount')
    : t('properties.filters.price', 'Price'));
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    'data-testid': "properties-page",
    ...{ class: "min-h-screen bg-gray-50" },
});
/** @type {[typeof SEO, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(SEO, new SEO({
    title: (__VLS_ctx.t('properties.seo.title', 'Properties for Rent & Sale in Switzerland')),
    description: (__VLS_ctx.t('properties.seo.description', 'Browse apartments, houses and commercial properties available for rent and sale across Switzerland.')),
}));
const __VLS_1 = __VLS_0({
    title: (__VLS_ctx.t('properties.seo.title', 'Properties for Rent & Sale in Switzerland')),
    description: (__VLS_ctx.t('properties.seo.description', 'Browse apartments, houses and commercial properties available for rent and sale across Switzerland.')),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "border-b bg-white" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mx-auto max-w-7xl px-4 py-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex flex-wrap items-center gap-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex overflow-hidden rounded-full border border-gray-300" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.handleTransactionChange('rent');
        } },
    ...{ class: "px-6 py-2 text-sm font-medium transition-colors" },
    ...{ class: (__VLS_ctx.transactionType === 'rent' ? 'bg-[#1a1a2e] text-white' : 'bg-white text-gray-700 hover:bg-gray-50') },
});
(__VLS_ctx.t('properties.filters.rent', 'Rent'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.handleTransactionChange('buy');
        } },
    ...{ class: "px-6 py-2 text-sm font-medium transition-colors" },
    ...{ class: (__VLS_ctx.transactionType === 'buy' ? 'bg-[#1a1a2e] text-white' : 'bg-white text-gray-700 hover:bg-gray-50') },
});
(__VLS_ctx.t('properties.filters.buy', 'Buy'));
/** @type {[typeof PropertyTypeFilter, ]} */ ;
// @ts-ignore
const __VLS_3 = __VLS_asFunctionalComponent(PropertyTypeFilter, new PropertyTypeFilter({
    ...{ 'onChange': {} },
    categories: (__VLS_ctx.categories),
    selectedIds: (__VLS_ctx.selectedCategoryIds),
}));
const __VLS_4 = __VLS_3({
    ...{ 'onChange': {} },
    categories: (__VLS_ctx.categories),
    selectedIds: (__VLS_ctx.selectedCategoryIds),
}, ...__VLS_functionalComponentArgsRest(__VLS_3));
let __VLS_6;
let __VLS_7;
let __VLS_8;
const __VLS_9 = {
    onChange: (__VLS_ctx.handleCategoryChange)
};
var __VLS_5;
/** @type {[typeof LocationFilter, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(LocationFilter, new LocationFilter({
    ...{ 'onChange': {} },
    selectedLocations: (__VLS_ctx.selectedLocations),
}));
const __VLS_11 = __VLS_10({
    ...{ 'onChange': {} },
    selectedLocations: (__VLS_ctx.selectedLocations),
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
let __VLS_13;
let __VLS_14;
let __VLS_15;
const __VLS_16 = {
    onChange: (__VLS_ctx.handleLocationsChange)
};
var __VLS_12;
/** @type {[typeof MinMaxFilter, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(MinMaxFilter, new MinMaxFilter({
    ...{ 'onUpdate:minValue': {} },
    ...{ 'onUpdate:maxValue': {} },
    label: (__VLS_ctx.priceLabel),
    minValue: (__VLS_ctx.priceMin),
    maxValue: (__VLS_ctx.priceMax),
    options: (__VLS_ctx.priceOptions),
    formatValue: (__VLS_ctx.formatSwissPrice),
}));
const __VLS_18 = __VLS_17({
    ...{ 'onUpdate:minValue': {} },
    ...{ 'onUpdate:maxValue': {} },
    label: (__VLS_ctx.priceLabel),
    minValue: (__VLS_ctx.priceMin),
    maxValue: (__VLS_ctx.priceMax),
    options: (__VLS_ctx.priceOptions),
    formatValue: (__VLS_ctx.formatSwissPrice),
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
let __VLS_20;
let __VLS_21;
let __VLS_22;
const __VLS_23 = {
    'onUpdate:minValue': (__VLS_ctx.handlePriceMinChange)
};
const __VLS_24 = {
    'onUpdate:maxValue': (__VLS_ctx.handlePriceMaxChange)
};
var __VLS_19;
/** @type {[typeof MinMaxFilter, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(MinMaxFilter, new MinMaxFilter({
    ...{ 'onUpdate:minValue': {} },
    ...{ 'onUpdate:maxValue': {} },
    label: (__VLS_ctx.t('properties.filters.rooms', 'Rooms')),
    minValue: (__VLS_ctx.roomsMin),
    maxValue: (__VLS_ctx.roomsMax),
    options: (__VLS_ctx.ROOMS_OPTIONS),
    formatValue: (__VLS_ctx.formatRoomsLabel),
}));
const __VLS_26 = __VLS_25({
    ...{ 'onUpdate:minValue': {} },
    ...{ 'onUpdate:maxValue': {} },
    label: (__VLS_ctx.t('properties.filters.rooms', 'Rooms')),
    minValue: (__VLS_ctx.roomsMin),
    maxValue: (__VLS_ctx.roomsMax),
    options: (__VLS_ctx.ROOMS_OPTIONS),
    formatValue: (__VLS_ctx.formatRoomsLabel),
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
let __VLS_28;
let __VLS_29;
let __VLS_30;
const __VLS_31 = {
    'onUpdate:minValue': (__VLS_ctx.handleRoomsMinChange)
};
const __VLS_32 = {
    'onUpdate:maxValue': (__VLS_ctx.handleRoomsMaxChange)
};
var __VLS_27;
/** @type {[typeof MinMaxFilter, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(MinMaxFilter, new MinMaxFilter({
    ...{ 'onUpdate:minValue': {} },
    ...{ 'onUpdate:maxValue': {} },
    label: (__VLS_ctx.t('properties.filters.surface', 'Surface')),
    minValue: (__VLS_ctx.surfaceMin),
    maxValue: (__VLS_ctx.surfaceMax),
    options: (__VLS_ctx.SURFACE_OPTIONS),
    formatValue: (__VLS_ctx.formatSurfaceLabel),
}));
const __VLS_34 = __VLS_33({
    ...{ 'onUpdate:minValue': {} },
    ...{ 'onUpdate:maxValue': {} },
    label: (__VLS_ctx.t('properties.filters.surface', 'Surface')),
    minValue: (__VLS_ctx.surfaceMin),
    maxValue: (__VLS_ctx.surfaceMax),
    options: (__VLS_ctx.SURFACE_OPTIONS),
    formatValue: (__VLS_ctx.formatSurfaceLabel),
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
let __VLS_36;
let __VLS_37;
let __VLS_38;
const __VLS_39 = {
    'onUpdate:minValue': (__VLS_ctx.handleSurfaceMinChange)
};
const __VLS_40 = {
    'onUpdate:maxValue': (__VLS_ctx.handleSurfaceMaxChange)
};
var __VLS_35;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div)({
    ...{ class: "flex-1" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ class: "rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white" },
});
(__VLS_ctx.t('properties.list.createAlert', 'Create your e-mail alert'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "border-b bg-white" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mx-auto flex max-w-7xl items-center justify-between px-4 py-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "text-sm text-gray-600" },
});
if (__VLS_ctx.pagination) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.paginationStart);
    (__VLS_ctx.paginationEnd);
    (__VLS_ctx.pagination.total?.toLocaleString('de-CH'));
}
else {
    const __VLS_41 = {}.Skeleton;
    /** @type {[typeof __VLS_components.Skeleton, ]} */ ;
    // @ts-ignore
    const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({
        width: "8rem",
        height: "1rem",
    }));
    const __VLS_43 = __VLS_42({
        width: "8rem",
        height: "1rem",
    }, ...__VLS_functionalComponentArgsRest(__VLS_42));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex items-center gap-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex items-center gap-2" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ class: "flex items-center gap-1 text-sm font-medium text-primary" },
});
const __VLS_45 = {}.List;
/** @type {[typeof __VLS_components.List, ]} */ ;
// @ts-ignore
const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
    ...{ class: "h-4 w-4" },
}));
const __VLS_47 = __VLS_46({
    ...{ class: "h-4 w-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_46));
(__VLS_ctx.t('properties.list.listView', 'List'));
const __VLS_49 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
// @ts-ignore
const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({
    to: (`/${__VLS_ctx.locale}/properties/map`),
    ...{ class: "flex items-center gap-1 text-sm text-gray-500 hover:text-primary" },
}));
const __VLS_51 = __VLS_50({
    to: (`/${__VLS_ctx.locale}/properties/map`),
    ...{ class: "flex items-center gap-1 text-sm text-gray-500 hover:text-primary" },
}, ...__VLS_functionalComponentArgsRest(__VLS_50));
__VLS_52.slots.default;
const __VLS_53 = {}.MapPin;
/** @type {[typeof __VLS_components.MapPin, ]} */ ;
// @ts-ignore
const __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53({
    ...{ class: "h-4 w-4" },
}));
const __VLS_55 = __VLS_54({
    ...{ class: "h-4 w-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_54));
(__VLS_ctx.t('properties.list.map', 'Map'));
var __VLS_52;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex items-center gap-2" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "text-sm text-gray-600" },
});
(__VLS_ctx.t('properties.list.sort', 'Sort'));
const __VLS_57 = {}.Select;
/** @type {[typeof __VLS_components.Select, ]} */ ;
// @ts-ignore
const __VLS_58 = __VLS_asFunctionalComponent(__VLS_57, new __VLS_57({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.currentSort),
    options: (__VLS_ctx.sortOptions),
    optionLabel: "label",
    optionValue: "value",
    ...{ class: "w-44 border-0 text-sm font-medium text-primary shadow-none" },
}));
const __VLS_59 = __VLS_58({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (__VLS_ctx.currentSort),
    options: (__VLS_ctx.sortOptions),
    optionLabel: "label",
    optionValue: "value",
    ...{ class: "w-44 border-0 text-sm font-medium text-primary shadow-none" },
}, ...__VLS_functionalComponentArgsRest(__VLS_58));
let __VLS_61;
let __VLS_62;
let __VLS_63;
const __VLS_64 = {
    'onUpdate:modelValue': (__VLS_ctx.handleSortChange)
};
var __VLS_60;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mx-auto max-w-7xl px-4 py-6" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    ...{ class: "mb-4 text-sm text-gray-600" },
});
(__VLS_ctx.transactionType === 'rent'
    ? __VLS_ctx.t('properties.list.rentIn', 'Rent in Switzerland')
    : __VLS_ctx.t('properties.list.buyIn', 'Buy in Switzerland'));
if (__VLS_ctx.isLoading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3" },
    });
    for (const [i] of __VLS_getVForSourceType((9))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            key: (i),
            ...{ class: "overflow-hidden rounded-lg bg-white shadow-sm" },
        });
        const __VLS_65 = {}.Skeleton;
        /** @type {[typeof __VLS_components.Skeleton, ]} */ ;
        // @ts-ignore
        const __VLS_66 = __VLS_asFunctionalComponent(__VLS_65, new __VLS_65({
            width: "100%",
            height: "0",
            ...{ class: "!aspect-[4/3]" },
        }));
        const __VLS_67 = __VLS_66({
            width: "100%",
            height: "0",
            ...{ class: "!aspect-[4/3]" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_66));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "space-y-3 p-4" },
        });
        const __VLS_69 = {}.Skeleton;
        /** @type {[typeof __VLS_components.Skeleton, ]} */ ;
        // @ts-ignore
        const __VLS_70 = __VLS_asFunctionalComponent(__VLS_69, new __VLS_69({
            width: "8rem",
            height: "1.5rem",
        }));
        const __VLS_71 = __VLS_70({
            width: "8rem",
            height: "1.5rem",
        }, ...__VLS_functionalComponentArgsRest(__VLS_70));
        const __VLS_73 = {}.Skeleton;
        /** @type {[typeof __VLS_components.Skeleton, ]} */ ;
        // @ts-ignore
        const __VLS_74 = __VLS_asFunctionalComponent(__VLS_73, new __VLS_73({
            width: "12rem",
            height: "1rem",
        }));
        const __VLS_75 = __VLS_74({
            width: "12rem",
            height: "1rem",
        }, ...__VLS_functionalComponentArgsRest(__VLS_74));
        const __VLS_77 = {}.Skeleton;
        /** @type {[typeof __VLS_components.Skeleton, ]} */ ;
        // @ts-ignore
        const __VLS_78 = __VLS_asFunctionalComponent(__VLS_77, new __VLS_77({
            width: "10rem",
            height: "1rem",
        }));
        const __VLS_79 = __VLS_78({
            width: "10rem",
            height: "1rem",
        }, ...__VLS_functionalComponentArgsRest(__VLS_78));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "flex gap-4 pt-2" },
        });
        const __VLS_81 = {}.Skeleton;
        /** @type {[typeof __VLS_components.Skeleton, ]} */ ;
        // @ts-ignore
        const __VLS_82 = __VLS_asFunctionalComponent(__VLS_81, new __VLS_81({
            width: "4rem",
            height: "1rem",
        }));
        const __VLS_83 = __VLS_82({
            width: "4rem",
            height: "1rem",
        }, ...__VLS_functionalComponentArgsRest(__VLS_82));
        const __VLS_85 = {}.Skeleton;
        /** @type {[typeof __VLS_components.Skeleton, ]} */ ;
        // @ts-ignore
        const __VLS_86 = __VLS_asFunctionalComponent(__VLS_85, new __VLS_85({
            width: "4rem",
            height: "1rem",
        }));
        const __VLS_87 = __VLS_86({
            width: "4rem",
            height: "1rem",
        }, ...__VLS_functionalComponentArgsRest(__VLS_86));
    }
}
else if (__VLS_ctx.isError) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "rounded-lg border border-red-200 bg-red-50 p-8 text-center" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "text-red-600" },
    });
    (__VLS_ctx.t('common.errors.loadFailed', 'Failed to load properties'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!!(__VLS_ctx.isLoading))
                    return;
                if (!(__VLS_ctx.isError))
                    return;
                __VLS_ctx.$router.go(0);
            } },
        ...{ class: "mt-4 rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50" },
    });
    (__VLS_ctx.t('common.actions.retry', 'Retry'));
}
else if (__VLS_ctx.properties.length > 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3" },
        ...{ class: (__VLS_ctx.isFetching && 'opacity-60') },
    });
    for (const [property] of __VLS_getVForSourceType((__VLS_ctx.properties))) {
        /** @type {[typeof PropertyCardGrid, ]} */ ;
        // @ts-ignore
        const __VLS_89 = __VLS_asFunctionalComponent(PropertyCardGrid, new PropertyCardGrid({
            key: (property.id),
            property: (property),
        }));
        const __VLS_90 = __VLS_89({
            key: (property.id),
            property: (property),
        }, ...__VLS_functionalComponentArgsRest(__VLS_89));
    }
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "rounded-lg bg-white p-12 text-center shadow-sm" },
    });
    const __VLS_92 = {}.Search;
    /** @type {[typeof __VLS_components.Search, ]} */ ;
    // @ts-ignore
    const __VLS_93 = __VLS_asFunctionalComponent(__VLS_92, new __VLS_92({
        ...{ class: "mx-auto h-12 w-12 text-gray-400" },
    }));
    const __VLS_94 = __VLS_93({
        ...{ class: "mx-auto h-12 w-12 text-gray-400" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_93));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "mt-4 text-lg font-semibold text-gray-900" },
    });
    (__VLS_ctx.t('properties.list.noResults', 'No properties found'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "mt-2 text-gray-600" },
    });
    (__VLS_ctx.t('properties.list.noResultsHint', 'Try adjusting your search criteria'));
}
if (!__VLS_ctx.isLoading && __VLS_ctx.properties.length > 0 && __VLS_ctx.pagination && __VLS_ctx.pagination.page === 1) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "my-6 flex items-center justify-between rounded-lg bg-[#1a1a2e] p-4 text-white" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "flex items-center gap-3" },
    });
    const __VLS_96 = {}.Bell;
    /** @type {[typeof __VLS_components.Bell, ]} */ ;
    // @ts-ignore
    const __VLS_97 = __VLS_asFunctionalComponent(__VLS_96, new __VLS_96({
        ...{ class: "h-5 w-5" },
    }));
    const __VLS_98 = __VLS_97({
        ...{ class: "h-5 w-5" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_97));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "text-sm" },
    });
    (__VLS_ctx.t('properties.list.alertBanner.subtitle', 'Receive new properties by email'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ class: "rounded-md bg-white px-4 py-1.5 text-sm font-medium text-[#1a1a2e] hover:bg-gray-100" },
    });
    (__VLS_ctx.t('properties.list.alertBanner.cta', 'Create your e-mail alert'));
}
if (__VLS_ctx.pagination && __VLS_ctx.pagination.totalPages > 1) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mt-8 flex flex-col items-center gap-4" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "flex items-center gap-1" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.pagination && __VLS_ctx.pagination.totalPages > 1))
                    return;
                __VLS_ctx.handlePageChange(__VLS_ctx.pagination.page - 1);
            } },
        disabled: (!__VLS_ctx.pagination.hasPrevPage),
        ...{ class: "rounded-md p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-40" },
    });
    const __VLS_100 = {}.ChevronLeft;
    /** @type {[typeof __VLS_components.ChevronLeft, ]} */ ;
    // @ts-ignore
    const __VLS_101 = __VLS_asFunctionalComponent(__VLS_100, new __VLS_100({
        ...{ class: "h-4 w-4" },
    }));
    const __VLS_102 = __VLS_101({
        ...{ class: "h-4 w-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_101));
    for (const [pageNum, idx] of __VLS_getVForSourceType((__VLS_ctx.pageNumbers))) {
        (idx);
        if (pageNum === '...') {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "px-2 text-gray-400" },
            });
        }
        else {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!(__VLS_ctx.pagination && __VLS_ctx.pagination.totalPages > 1))
                            return;
                        if (!!(pageNum === '...'))
                            return;
                        __VLS_ctx.handlePageChange(pageNum);
                    } },
                ...{ class: "min-w-8 rounded-md px-3 py-1.5 text-sm" },
                ...{ class: (__VLS_ctx.pagination.page === pageNum
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100') },
            });
            (pageNum);
        }
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.pagination && __VLS_ctx.pagination.totalPages > 1))
                    return;
                __VLS_ctx.handlePageChange(__VLS_ctx.pagination.page + 1);
            } },
        disabled: (!__VLS_ctx.pagination.hasNextPage),
        ...{ class: "flex items-center gap-1 rounded-md p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-40" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "text-sm" },
    });
    (__VLS_ctx.t('common.pagination.next', 'Next'));
    const __VLS_104 = {}.ChevronRight;
    /** @type {[typeof __VLS_components.ChevronRight, ]} */ ;
    // @ts-ignore
    const __VLS_105 = __VLS_asFunctionalComponent(__VLS_104, new __VLS_104({
        ...{ class: "h-4 w-4" },
    }));
    const __VLS_106 = __VLS_105({
        ...{ class: "h-4 w-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_105));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "text-sm text-gray-500" },
    });
    (__VLS_ctx.pagination.page);
    (__VLS_ctx.pagination.totalPages);
}
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-7xl']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-7xl']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['w-44']} */ ;
/** @type {__VLS_StyleScopedClasses['border-0']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-none']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-7xl']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-6']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-3']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['!aspect-[4/3]']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-red-200']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-red-50']} */ ;
/** @type {__VLS_StyleScopedClasses['p-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-600']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-3']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-12']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['h-12']} */ ;
/** @type {__VLS_StyleScopedClasses['w-12']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['my-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-[#1a1a2e]']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#1a1a2e]']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-8']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:opacity-40']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-8']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:opacity-40']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Bell: Bell,
            List: List,
            MapPin: MapPin,
            Search: Search,
            ChevronLeft: ChevronLeft,
            ChevronRight: ChevronRight,
            Select: Select,
            Skeleton: Skeleton,
            SEO: SEO,
            PropertyCardGrid: PropertyCardGrid,
            PropertyTypeFilter: PropertyTypeFilter,
            LocationFilter: LocationFilter,
            MinMaxFilter: MinMaxFilter,
            ROOMS_OPTIONS: ROOMS_OPTIONS,
            SURFACE_OPTIONS: SURFACE_OPTIONS,
            formatSwissPrice: formatSwissPrice,
            formatRoomsLabel: formatRoomsLabel,
            formatSurfaceLabel: formatSurfaceLabel,
            t: t,
            locale: locale,
            transactionType: transactionType,
            selectedCategoryIds: selectedCategoryIds,
            priceMin: priceMin,
            priceMax: priceMax,
            roomsMin: roomsMin,
            roomsMax: roomsMax,
            surfaceMin: surfaceMin,
            surfaceMax: surfaceMax,
            currentSort: currentSort,
            handleTransactionChange: handleTransactionChange,
            handleCategoryChange: handleCategoryChange,
            handleLocationsChange: handleLocationsChange,
            handlePriceMinChange: handlePriceMinChange,
            handlePriceMaxChange: handlePriceMaxChange,
            handleRoomsMinChange: handleRoomsMinChange,
            handleRoomsMaxChange: handleRoomsMaxChange,
            handleSurfaceMinChange: handleSurfaceMinChange,
            handleSurfaceMaxChange: handleSurfaceMaxChange,
            handleSortChange: handleSortChange,
            handlePageChange: handlePageChange,
            isLoading: isLoading,
            isError: isError,
            isFetching: isFetching,
            categories: categories,
            properties: properties,
            pagination: pagination,
            selectedLocations: selectedLocations,
            sortOptions: sortOptions,
            paginationStart: paginationStart,
            paginationEnd: paginationEnd,
            pageNumbers: pageNumbers,
            priceOptions: priceOptions,
            priceLabel: priceLabel,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */

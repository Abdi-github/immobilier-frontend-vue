import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { Search, Building2, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import SEO from '@/shared/components/SEO.vue';
import { useLocalizedName } from '@/shared/composables/useLocalizedName';
import { useCantons } from '@/features/locations/composables/useCantons';
import { useCities } from '@/features/locations/composables/useCities';
import { useAgencies } from '../composables/useAgencies';
import Skeleton from 'primevue/skeleton';
import AgencyCard from '../components/AgencyCard.vue';
import AgencySearchInput from '../components/AgencySearchInput.vue';
const route = useRoute();
const router = useRouter();
const { t, locale } = useI18n();
const getLocalizedName = useLocalizedName();
const LIMIT = 20;
// Read URL params
const cantonId = computed(() => route.query.canton_id || '');
const cityId = computed(() => route.query.city_id || '');
const searchParam = computed(() => route.query.search || '');
const currentPage = computed(() => parseInt(route.query.page || '1', 10));
// Local state for agency name input
const agencyNameSearch = ref(searchParam.value);
watch(searchParam, (val) => {
    agencyNameSearch.value = val;
});
const hasSearchCriteria = computed(() => !!(cantonId.value || cityId.value || searchParam.value));
// Query params — only query when search criteria present
const queryParams = computed(() => {
    if (!hasSearchCriteria.value)
        return undefined;
    return {
        page: currentPage.value,
        limit: LIMIT,
        search: searchParam.value || undefined,
        canton_id: cantonId.value || undefined,
        city_id: cityId.value || undefined,
    };
});
const { data: agenciesData, isLoading, isFetching } = useAgencies(queryParams);
const { data: cantonsData } = useCantons();
const { data: citiesData } = useCities();
const agencies = computed(() => agenciesData.value?.data || []);
const pagination = computed(() => agenciesData.value?.meta);
const totalPages = computed(() => pagination.value?.totalPages || 1);
// Location info for display
const locationInfo = computed(() => {
    const cantons = cantonsData.value?.data || [];
    const cities = citiesData.value?.data || [];
    if (cityId.value) {
        const city = cities.find((c) => c.id === cityId.value);
        if (city) {
            const canton = cantons.find((c) => c.id === city.canton_id);
            return {
                type: 'city',
                name: getLocalizedName(city.name),
                cantonName: canton ? getLocalizedName(canton.name) : '',
            };
        }
    }
    if (cantonId.value) {
        const canton = cantons.find((c) => c.id === cantonId.value);
        if (canton) {
            return {
                type: 'canton',
                name: getLocalizedName(canton.name),
            };
        }
    }
    return null;
});
function updateQuery(params) {
    router.push({ query: { ...params } });
}
function handleLocationSelect(result) {
    const params = { page: '1' };
    if (result.type === 'canton') {
        params.canton_id = result.id;
    }
    else {
        params.city_id = result.id;
    }
    if (agencyNameSearch.value) {
        params.search = agencyNameSearch.value;
    }
    updateQuery(params);
}
function handleAgencySearch() {
    const params = { page: '1' };
    if (cantonId.value)
        params.canton_id = cantonId.value;
    if (cityId.value)
        params.city_id = cityId.value;
    if (agencyNameSearch.value)
        params.search = agencyNameSearch.value;
    updateQuery(params);
}
function handlePageChange(page) {
    const params = { page: page.toString() };
    if (cantonId.value)
        params.canton_id = cantonId.value;
    if (cityId.value)
        params.city_id = cityId.value;
    if (searchParam.value)
        params.search = searchParam.value;
    updateQuery(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
function handleClearSearch() {
    agencyNameSearch.value = '';
    router.push({ query: {} });
}
// Pagination page numbers
const pageNumbers = computed(() => {
    const total = totalPages.value;
    const current = currentPage.value;
    const pages = [];
    const count = Math.min(total, 5);
    for (let i = 0; i < count; i++) {
        let page;
        if (total <= 5) {
            page = i + 1;
        }
        else if (current <= 3) {
            page = i + 1;
        }
        else if (current >= total - 2) {
            page = total - 4 + i;
        }
        else {
            page = current - 2 + i;
        }
        pages.push(page);
    }
    return pages;
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    'data-testid': "agencies-page",
    ...{ class: "min-h-screen bg-gray-50" },
});
/** @type {[typeof SEO, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(SEO, new SEO({
    title: (__VLS_ctx.t('agencies.seo.title')),
    description: (__VLS_ctx.t('agencies.seo.description')),
}));
const __VLS_1 = __VLS_0({
    title: (__VLS_ctx.t('agencies.seo.title')),
    description: (__VLS_ctx.t('agencies.seo.description')),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "relative bg-cover bg-center" },
    ...{ style: ({
            backgroundImage: 'linear-gradient(rgba(26, 26, 46, 0.7), rgba(26, 26, 46, 0.8)), url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80)',
            minHeight: __VLS_ctx.hasSearchCriteria ? '200px' : '400px',
        }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mx-auto max-w-4xl px-4 py-12" },
});
if (!__VLS_ctx.hasSearchCriteria) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
        ...{ class: "mb-8 text-center text-3xl font-bold text-white md:text-4xl" },
    });
    (__VLS_ctx.t('agencies.hero.title'));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex flex-col gap-3 md:flex-row md:gap-4" },
});
/** @type {[typeof AgencySearchInput, ]} */ ;
// @ts-ignore
const __VLS_3 = __VLS_asFunctionalComponent(AgencySearchInput, new AgencySearchInput({
    ...{ 'onSelect': {} },
}));
const __VLS_4 = __VLS_3({
    ...{ 'onSelect': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_3));
let __VLS_6;
let __VLS_7;
let __VLS_8;
const __VLS_9 = {
    onSelect: (__VLS_ctx.handleLocationSelect)
};
var __VLS_5;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "relative flex-1" },
});
const __VLS_10 = {}.Building2;
/** @type {[typeof __VLS_components.Building2, ]} */ ;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
    ...{ class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" },
}));
const __VLS_12 = __VLS_11({
    ...{ class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" },
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ onKeydown: (__VLS_ctx.handleAgencySearch) },
    value: (__VLS_ctx.agencyNameSearch),
    type: "text",
    placeholder: (__VLS_ctx.t('agencies.search.agencyNamePlaceholder')),
    ...{ class: "h-12 w-full rounded-md border border-gray-300 bg-white pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.handleAgencySearch) },
    disabled: (__VLS_ctx.isFetching),
    ...{ class: "flex h-12 items-center justify-center rounded-md bg-primary px-6 text-white transition-colors hover:bg-primary/90 disabled:opacity-50" },
});
const __VLS_14 = {}.Search;
/** @type {[typeof __VLS_components.Search, ]} */ ;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({
    ...{ class: "h-5 w-5" },
}));
const __VLS_16 = __VLS_15({
    ...{ class: "h-5 w-5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
if (!__VLS_ctx.hasSearchCriteria) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "mt-4 text-center text-sm text-white/80" },
    });
    (__VLS_ctx.t('agencies.search.hint'));
}
if (__VLS_ctx.hasSearchCriteria) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mx-auto max-w-5xl px-4 py-8" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({
        ...{ class: "mb-6 flex items-center gap-2 text-sm text-gray-500" },
    });
    const __VLS_18 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
        to: (`/${__VLS_ctx.locale}`),
        ...{ class: "hover:text-primary" },
    }));
    const __VLS_20 = __VLS_19({
        to: (`/${__VLS_ctx.locale}`),
        ...{ class: "hover:text-primary" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    __VLS_21.slots.default;
    (__VLS_ctx.t('common.nav.home'));
    var __VLS_21;
    const __VLS_22 = {}.ChevronRight;
    /** @type {[typeof __VLS_components.ChevronRight, ]} */ ;
    // @ts-ignore
    const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({
        ...{ class: "h-4 w-4" },
    }));
    const __VLS_24 = __VLS_23({
        ...{ class: "h-4 w-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_23));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.handleClearSearch) },
        ...{ class: "hover:text-primary" },
    });
    (__VLS_ctx.t('agencies.detail.title'));
    if (__VLS_ctx.locationInfo) {
        const __VLS_26 = {}.ChevronRight;
        /** @type {[typeof __VLS_components.ChevronRight, ]} */ ;
        // @ts-ignore
        const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
            ...{ class: "h-4 w-4" },
        }));
        const __VLS_28 = __VLS_27({
            ...{ class: "h-4 w-4" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_27));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "text-gray-900" },
        });
        (__VLS_ctx.locationInfo.name);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mb-6" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        ...{ class: "text-xl font-semibold text-gray-900" },
    });
    if (__VLS_ctx.locationInfo?.type === 'canton') {
        (__VLS_ctx.t('agencies.results.titleCanton', { name: __VLS_ctx.locationInfo.name }));
    }
    else if (__VLS_ctx.locationInfo?.type === 'city') {
        (__VLS_ctx.t('agencies.results.titleCity', { name: __VLS_ctx.locationInfo.name }));
    }
    else if (__VLS_ctx.searchParam) {
        (__VLS_ctx.t('agencies.results.titleSearch', { search: __VLS_ctx.searchParam }));
    }
    else {
        (__VLS_ctx.t('agencies.results.titleAll'));
    }
    if (__VLS_ctx.pagination) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "mt-2 text-sm text-gray-600" },
        });
        (__VLS_ctx.t('agencies.results.showing', {
            from: (__VLS_ctx.currentPage - 1) * __VLS_ctx.LIMIT + 1,
            to: Math.min(__VLS_ctx.currentPage * __VLS_ctx.LIMIT, __VLS_ctx.pagination.total),
            total: __VLS_ctx.pagination.total,
        }));
    }
    if (__VLS_ctx.isLoading) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "space-y-4" },
        });
        for (const [i] of __VLS_getVForSourceType((5))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                key: (i),
                ...{ class: "flex gap-4 rounded-lg border bg-white p-4" },
            });
            const __VLS_30 = {}.Skeleton;
            /** @type {[typeof __VLS_components.Skeleton, ]} */ ;
            // @ts-ignore
            const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
                width: "5rem",
                height: "5rem",
                borderRadius: "0.375rem",
            }));
            const __VLS_32 = __VLS_31({
                width: "5rem",
                height: "5rem",
                borderRadius: "0.375rem",
            }, ...__VLS_functionalComponentArgsRest(__VLS_31));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "flex-1 space-y-2" },
            });
            const __VLS_34 = {}.Skeleton;
            /** @type {[typeof __VLS_components.Skeleton, ]} */ ;
            // @ts-ignore
            const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({
                width: "12rem",
                height: "1.25rem",
            }));
            const __VLS_36 = __VLS_35({
                width: "12rem",
                height: "1.25rem",
            }, ...__VLS_functionalComponentArgsRest(__VLS_35));
            const __VLS_38 = {}.Skeleton;
            /** @type {[typeof __VLS_components.Skeleton, ]} */ ;
            // @ts-ignore
            const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({
                width: "16rem",
                height: "1rem",
            }));
            const __VLS_40 = __VLS_39({
                width: "16rem",
                height: "1rem",
            }, ...__VLS_functionalComponentArgsRest(__VLS_39));
            const __VLS_42 = {}.Skeleton;
            /** @type {[typeof __VLS_components.Skeleton, ]} */ ;
            // @ts-ignore
            const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({
                width: "8rem",
                height: "1rem",
            }));
            const __VLS_44 = __VLS_43({
                width: "8rem",
                height: "1rem",
            }, ...__VLS_functionalComponentArgsRest(__VLS_43));
        }
    }
    else if (__VLS_ctx.agencies.length === 0) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "rounded-lg border bg-white p-8 text-center" },
        });
        const __VLS_46 = {}.Building2;
        /** @type {[typeof __VLS_components.Building2, ]} */ ;
        // @ts-ignore
        const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({
            ...{ class: "mx-auto h-12 w-12 text-gray-300" },
        }));
        const __VLS_48 = __VLS_47({
            ...{ class: "mx-auto h-12 w-12 text-gray-300" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_47));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
            ...{ class: "mt-4 text-lg font-medium text-gray-900" },
        });
        (__VLS_ctx.t('agencies.results.noResults'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "mt-2 text-sm text-gray-500" },
        });
        (__VLS_ctx.t('agencies.results.noResultsHint'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.handleClearSearch) },
            ...{ class: "mt-4 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50" },
        });
        (__VLS_ctx.t('agencies.results.clearSearch'));
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "space-y-4" },
        });
        for (const [agency] of __VLS_getVForSourceType((__VLS_ctx.agencies))) {
            /** @type {[typeof AgencyCard, ]} */ ;
            // @ts-ignore
            const __VLS_50 = __VLS_asFunctionalComponent(AgencyCard, new AgencyCard({
                key: (agency.id),
                agency: (agency),
            }));
            const __VLS_51 = __VLS_50({
                key: (agency.id),
                agency: (agency),
            }, ...__VLS_functionalComponentArgsRest(__VLS_50));
        }
    }
    if (__VLS_ctx.totalPages > 1) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "mt-8 flex items-center justify-center gap-2" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.hasSearchCriteria))
                        return;
                    if (!(__VLS_ctx.totalPages > 1))
                        return;
                    __VLS_ctx.handlePageChange(__VLS_ctx.currentPage - 1);
                } },
            disabled: (__VLS_ctx.currentPage === 1 || __VLS_ctx.isFetching),
            ...{ class: "flex items-center gap-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-gray-50 disabled:opacity-50" },
        });
        const __VLS_53 = {}.ChevronLeft;
        /** @type {[typeof __VLS_components.ChevronLeft, ]} */ ;
        // @ts-ignore
        const __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53({
            ...{ class: "h-4 w-4" },
        }));
        const __VLS_55 = __VLS_54({
            ...{ class: "h-4 w-4" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_54));
        (__VLS_ctx.t('common.pagination.previous'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "flex items-center gap-1" },
        });
        for (const [page] of __VLS_getVForSourceType((__VLS_ctx.pageNumbers))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!(__VLS_ctx.hasSearchCriteria))
                            return;
                        if (!(__VLS_ctx.totalPages > 1))
                            return;
                        __VLS_ctx.handlePageChange(page);
                    } },
                key: (page),
                disabled: (__VLS_ctx.isFetching),
                ...{ class: "min-w-10 rounded-md px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-50" },
                ...{ class: (page === __VLS_ctx.currentPage
                        ? 'bg-primary text-white'
                        : 'border border-gray-300 hover:bg-gray-50') },
            });
            (page);
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.hasSearchCriteria))
                        return;
                    if (!(__VLS_ctx.totalPages > 1))
                        return;
                    __VLS_ctx.handlePageChange(__VLS_ctx.currentPage + 1);
                } },
            disabled: (__VLS_ctx.currentPage === __VLS_ctx.totalPages || __VLS_ctx.isFetching),
            ...{ class: "flex items-center gap-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-gray-50 disabled:opacity-50" },
        });
        (__VLS_ctx.t('common.pagination.next'));
        const __VLS_57 = {}.ChevronRight;
        /** @type {[typeof __VLS_components.ChevronRight, ]} */ ;
        // @ts-ignore
        const __VLS_58 = __VLS_asFunctionalComponent(__VLS_57, new __VLS_57({
            ...{ class: "h-4 w-4" },
        }));
        const __VLS_59 = __VLS_58({
            ...{ class: "h-4 w-4" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_58));
    }
}
if (!__VLS_ctx.hasSearchCriteria) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mx-auto max-w-5xl px-4 py-12" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "text-center" },
    });
    const __VLS_61 = {}.Building2;
    /** @type {[typeof __VLS_components.Building2, ]} */ ;
    // @ts-ignore
    const __VLS_62 = __VLS_asFunctionalComponent(__VLS_61, new __VLS_61({
        ...{ class: "mx-auto h-16 w-16 text-gray-300" },
    }));
    const __VLS_63 = __VLS_62({
        ...{ class: "mx-auto h-16 w-16 text-gray-300" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_62));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        ...{ class: "mt-6 text-2xl font-semibold text-gray-900" },
    });
    (__VLS_ctx.t('agencies.landing.title'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "mx-auto mt-4 max-w-lg text-gray-600" },
    });
    (__VLS_ctx.t('agencies.landing.description'));
}
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-12']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['md:text-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['md:flex-row']} */ ;
/** @type {__VLS_StyleScopedClasses['md:gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['left-3']} */ ;
/** @type {__VLS_StyleScopedClasses['top-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-y-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['pointer-events-none']} */ ;
/** @type {__VLS_StyleScopedClasses['h-12']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['pl-10']} */ ;
/** @type {__VLS_StyleScopedClasses['pr-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-1']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-12']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-primary/90']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:opacity-50']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white/80']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-5xl']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-8']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['h-12']} */ ;
/** @type {__VLS_StyleScopedClasses['w-12']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-8']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:opacity-50']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-10']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:opacity-50']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:opacity-50']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-5xl']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-12']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['h-16']} */ ;
/** @type {__VLS_StyleScopedClasses['w-16']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Search: Search,
            Building2: Building2,
            ChevronLeft: ChevronLeft,
            ChevronRight: ChevronRight,
            SEO: SEO,
            Skeleton: Skeleton,
            AgencyCard: AgencyCard,
            AgencySearchInput: AgencySearchInput,
            t: t,
            locale: locale,
            LIMIT: LIMIT,
            searchParam: searchParam,
            currentPage: currentPage,
            agencyNameSearch: agencyNameSearch,
            hasSearchCriteria: hasSearchCriteria,
            isLoading: isLoading,
            isFetching: isFetching,
            agencies: agencies,
            pagination: pagination,
            totalPages: totalPages,
            locationInfo: locationInfo,
            handleLocationSelect: handleLocationSelect,
            handleAgencySearch: handleAgencySearch,
            handlePageChange: handlePageChange,
            handleClearSearch: handleClearSearch,
            pageNumbers: pageNumbers,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */

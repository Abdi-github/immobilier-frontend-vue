import { useI18n } from 'vue-i18n';
import { ArrowRight } from 'lucide-vue-next';
import Skeleton from 'primevue/skeleton';
import PropertyCard from '@/features/properties/components/PropertyCard.vue';
import { useFeaturedProperties } from '@/features/properties/composables/useProperties';
const { t, locale } = useI18n();
const { data, isLoading, isError } = useFeaturedProperties(6);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
if (!__VLS_ctx.isError) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
        ...{ class: "bg-white py-12" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "container mx-auto px-4" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        ...{ class: "text-2xl font-bold text-[#1a1a2e]" },
    });
    (__VLS_ctx.t('featured.title', 'Latest properties'));
    const __VLS_0 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        to: (`/${__VLS_ctx.locale}/properties`),
        ...{ class: "flex items-center gap-1 text-sm font-medium text-primary hover:underline" },
    }));
    const __VLS_2 = __VLS_1({
        to: (`/${__VLS_ctx.locale}/properties`),
        ...{ class: "flex items-center gap-1 text-sm font-medium text-primary hover:underline" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_3.slots.default;
    (__VLS_ctx.t('featured.viewAll', 'View all properties'));
    const __VLS_4 = {}.ArrowRight;
    /** @type {[typeof __VLS_components.ArrowRight, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
        ...{ class: "h-4 w-4" },
    }));
    const __VLS_6 = __VLS_5({
        ...{ class: "h-4 w-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    var __VLS_3;
    if (__VLS_ctx.isLoading) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3" },
        });
        for (const [i] of __VLS_getVForSourceType((6))) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                key: (i),
                ...{ class: "overflow-hidden rounded-lg border border-gray-200 bg-white" },
            });
            const __VLS_8 = {}.Skeleton;
            /** @type {[typeof __VLS_components.Skeleton, ]} */ ;
            // @ts-ignore
            const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
                ...{ class: "!h-48 w-full" },
            }));
            const __VLS_10 = __VLS_9({
                ...{ class: "!h-48 w-full" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_9));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "space-y-3 p-4" },
            });
            const __VLS_12 = {}.Skeleton;
            /** @type {[typeof __VLS_components.Skeleton, ]} */ ;
            // @ts-ignore
            const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
                ...{ class: "!h-6 !w-1/3" },
            }));
            const __VLS_14 = __VLS_13({
                ...{ class: "!h-6 !w-1/3" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_13));
            const __VLS_16 = {}.Skeleton;
            /** @type {[typeof __VLS_components.Skeleton, ]} */ ;
            // @ts-ignore
            const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
                ...{ class: "!h-5 !w-2/3" },
            }));
            const __VLS_18 = __VLS_17({
                ...{ class: "!h-5 !w-2/3" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_17));
            const __VLS_20 = {}.Skeleton;
            /** @type {[typeof __VLS_components.Skeleton, ]} */ ;
            // @ts-ignore
            const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
                ...{ class: "!h-4 !w-1/2" },
            }));
            const __VLS_22 = __VLS_21({
                ...{ class: "!h-4 !w-1/2" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_21));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "flex gap-4 pt-2" },
            });
            const __VLS_24 = {}.Skeleton;
            /** @type {[typeof __VLS_components.Skeleton, ]} */ ;
            // @ts-ignore
            const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
                ...{ class: "!h-4 !w-16" },
            }));
            const __VLS_26 = __VLS_25({
                ...{ class: "!h-4 !w-16" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_25));
            const __VLS_28 = {}.Skeleton;
            /** @type {[typeof __VLS_components.Skeleton, ]} */ ;
            // @ts-ignore
            const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
                ...{ class: "!h-4 !w-16" },
            }));
            const __VLS_30 = __VLS_29({
                ...{ class: "!h-4 !w-16" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_29));
        }
    }
    else if (__VLS_ctx.data?.data?.length) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3" },
        });
        for (const [property] of __VLS_getVForSourceType((__VLS_ctx.data.data))) {
            /** @type {[typeof PropertyCard, ]} */ ;
            // @ts-ignore
            const __VLS_32 = __VLS_asFunctionalComponent(PropertyCard, new PropertyCard({
                key: (property.id),
                property: (property),
            }));
            const __VLS_33 = __VLS_32({
                key: (property.id),
                property: (property),
            }, ...__VLS_functionalComponentArgsRest(__VLS_32));
        }
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "rounded-lg border border-gray-200 bg-white p-12 text-center" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "text-gray-600" },
        });
        (__VLS_ctx.t('featured.noProperties', 'No properties available at the moment.'));
    }
}
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['py-12']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-8']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-start']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['md:flex-row']} */ ;
/** @type {__VLS_StyleScopedClasses['md:items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#1a1a2e]']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:underline']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-3']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-200']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['!h-48']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['!h-6']} */ ;
/** @type {__VLS_StyleScopedClasses['!w-1/3']} */ ;
/** @type {__VLS_StyleScopedClasses['!h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['!w-2/3']} */ ;
/** @type {__VLS_StyleScopedClasses['!h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['!w-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['!h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['!w-16']} */ ;
/** @type {__VLS_StyleScopedClasses['!h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['!w-16']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-3']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-200']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-12']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ArrowRight: ArrowRight,
            Skeleton: Skeleton,
            PropertyCard: PropertyCard,
            t: t,
            locale: locale,
            data: data,
            isLoading: isLoading,
            isError: isError,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */

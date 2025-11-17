import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { MapPin } from 'lucide-vue-next';
import Skeleton from 'primevue/skeleton';
import Tag from 'primevue/tag';
import { useCantons } from '@/features/locations/composables/useCantons';
import { useLocalizedName } from '@/shared/composables/useLocalizedName';
const { t, locale } = useI18n();
const getLocalizedName = useLocalizedName();
const { data, isLoading } = useCantons();
const popularCantonCodes = ['ZH', 'GE', 'VD', 'BS', 'BE', 'TI'];
const cantonImages = {
    ZH: 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=400&h=300&fit=crop',
    GE: 'https://images.unsplash.com/photo-1573108724029-4c46571d6490?w=400&h=300&fit=crop',
    VD: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=400&h=300&fit=crop',
    BS: 'https://images.unsplash.com/photo-1549294413-26f195200c16?w=400&h=300&fit=crop',
    BE: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=400&h=300&fit=crop',
    TI: 'https://images.unsplash.com/photo-1583764028506-0d34d2c42a1c?w=400&h=300&fit=crop',
};
const popularCantons = computed(() => data.value?.data?.filter((c) => popularCantonCodes.includes(c.code)) || []);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "bg-gray-50 py-16 md:py-20" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "container mx-auto px-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mb-10 text-center" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    ...{ class: "text-3xl font-bold text-[#1a1a2e]" },
});
(__VLS_ctx.t('locations.title'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "mt-2 text-gray-600" },
});
(__VLS_ctx.t('locations.subtitle'));
if (__VLS_ctx.isLoading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3" },
    });
    for (const [i] of __VLS_getVForSourceType((6))) {
        const __VLS_0 = {}.Skeleton;
        /** @type {[typeof __VLS_components.Skeleton, ]} */ ;
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
            key: (i),
            ...{ class: "!aspect-[4/3] rounded-xl" },
        }));
        const __VLS_2 = __VLS_1({
            key: (i),
            ...{ class: "!aspect-[4/3] rounded-xl" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    }
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3" },
    });
    for (const [canton] of __VLS_getVForSourceType((__VLS_ctx.popularCantons))) {
        const __VLS_4 = {}.RouterLink;
        /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
        // @ts-ignore
        const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
            key: (canton.id),
            to: (`/${__VLS_ctx.locale}/properties?canton_id=${canton.id}`),
            ...{ class: "group overflow-hidden rounded-xl shadow-sm transition-all hover:shadow-lg" },
        }));
        const __VLS_6 = __VLS_5({
            key: (canton.id),
            to: (`/${__VLS_ctx.locale}/properties?canton_id=${canton.id}`),
            ...{ class: "group overflow-hidden rounded-xl shadow-sm transition-all hover:shadow-lg" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_5));
        __VLS_7.slots.default;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "relative aspect-[4/3]" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
            src: (__VLS_ctx.cantonImages[canton.code] || __VLS_ctx.cantonImages.ZH),
            alt: (__VLS_ctx.getLocalizedName(canton.name)),
            ...{ class: "h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" },
            loading: "lazy",
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div)({
            ...{ class: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "absolute inset-x-0 bottom-0 p-4 text-white" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "flex items-center gap-2" },
        });
        const __VLS_8 = {}.MapPin;
        /** @type {[typeof __VLS_components.MapPin, ]} */ ;
        // @ts-ignore
        const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
            ...{ class: "h-5 w-5" },
        }));
        const __VLS_10 = __VLS_9({
            ...{ class: "h-5 w-5" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_9));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
            ...{ class: "text-xl font-bold" },
        });
        (__VLS_ctx.getLocalizedName(canton.name));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "mt-2 flex items-center gap-2" },
        });
        const __VLS_12 = {}.Tag;
        /** @type {[typeof __VLS_components.Tag, ]} */ ;
        // @ts-ignore
        const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
            value: (canton.code),
            severity: "secondary",
            ...{ class: "bg-white/20 text-white" },
        }));
        const __VLS_14 = __VLS_13({
            value: (canton.code),
            severity: "secondary",
            ...{ class: "bg-white/20 text-white" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_13));
        if (canton.propertyCount !== undefined) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "text-sm text-white/80" },
            });
            (canton.propertyCount);
        }
        var __VLS_7;
    }
}
/** @type {__VLS_StyleScopedClasses['bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['py-16']} */ ;
/** @type {__VLS_StyleScopedClasses['md:py-20']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-10']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#1a1a2e]']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-3']} */ ;
/** @type {__VLS_StyleScopedClasses['!aspect-[4/3]']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-3']} */ ;
/** @type {__VLS_StyleScopedClasses['group']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['aspect-[4/3]']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['group-hover:scale-105']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-t']} */ ;
/** @type {__VLS_StyleScopedClasses['from-black/70']} */ ;
/** @type {__VLS_StyleScopedClasses['via-black/20']} */ ;
/** @type {__VLS_StyleScopedClasses['to-transparent']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-x-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bottom-0']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white/20']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white/80']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            MapPin: MapPin,
            Skeleton: Skeleton,
            Tag: Tag,
            t: t,
            locale: locale,
            getLocalizedName: getLocalizedName,
            isLoading: isLoading,
            cantonImages: cantonImages,
            popularCantons: popularCantons,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */

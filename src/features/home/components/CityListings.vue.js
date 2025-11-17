import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { ChevronDown } from 'lucide-vue-next';
import Button from 'primevue/button';
import Skeleton from 'primevue/skeleton';
import { usePopularCities } from '@/features/locations/composables/useCities';
import { useLocalizedName } from '@/shared/composables/useLocalizedName';
const { t, locale } = useI18n();
const getLocalizedName = useLocalizedName();
const showAll = ref(false);
const { data: citiesData, isLoading } = usePopularCities();
const cities = computed(() => citiesData.value?.data || []);
const displayCities = computed(() => (showAll.value ? cities.value : cities.value.slice(0, 6)));
const placeholderImage = 'https://res.cloudinary.com/dzyyygr1x/image/upload/v1770906733/Gen%C3%A8ve_t33k2z.jpg';
function getCityName(city) {
    return getLocalizedName(city.name);
}
function getCantonName(city) {
    return getLocalizedName(city.canton_name);
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
if (__VLS_ctx.isLoading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
        ...{ class: "bg-white py-12" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "container mx-auto px-4" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mb-8 text-center" },
    });
    const __VLS_0 = {}.Skeleton;
    /** @type {[typeof __VLS_components.Skeleton, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        ...{ class: "mx-auto !h-8 !w-64" },
    }));
    const __VLS_2 = __VLS_1({
        ...{ class: "mx-auto !h-8 !w-64" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    const __VLS_4 = {}.Skeleton;
    /** @type {[typeof __VLS_components.Skeleton, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
        ...{ class: "mx-auto mt-2 !h-4 !w-96" },
    }));
    const __VLS_6 = __VLS_5({
        ...{ class: "mx-auto mt-2 !h-4 !w-96" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "grid gap-4 md:grid-cols-2 lg:grid-cols-3" },
    });
    for (const [i] of __VLS_getVForSourceType((6))) {
        const __VLS_8 = {}.Skeleton;
        /** @type {[typeof __VLS_components.Skeleton, ]} */ ;
        // @ts-ignore
        const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
            key: (i),
            ...{ class: "!h-48 rounded-lg" },
        }));
        const __VLS_10 = __VLS_9({
            key: (i),
            ...{ class: "!h-48 rounded-lg" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    }
}
else if (__VLS_ctx.cities.length) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
        ...{ class: "bg-white py-12" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "container mx-auto px-4" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mb-8 text-center" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
        ...{ class: "text-2xl font-bold text-[#1a1a2e] md:text-3xl" },
    });
    (__VLS_ctx.t('cityListings.title', 'Discover properties by city'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "mt-2 text-gray-600" },
    });
    (__VLS_ctx.t('cityListings.subtitle', "Browse real estate in Switzerland's most popular cities"));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "flex flex-col gap-4" },
    });
    for (const [_, rowIdx] of __VLS_getVForSourceType((Array.from({ length: Math.ceil(__VLS_ctx.displayCities.length / 2) })))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            key: (rowIdx),
            ...{ class: "grid grid-cols-1 gap-4 md:grid-cols-3" },
        });
        if (__VLS_ctx.displayCities[rowIdx * 2]) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "group relative min-h-[200px] overflow-hidden rounded-xl" },
                ...{ class: (rowIdx % 2 === 0 ? 'md:col-span-1' : 'md:col-span-2') },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "absolute inset-0" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
                src: (__VLS_ctx.displayCities[rowIdx * 2].image_url || __VLS_ctx.placeholderImage),
                alt: (__VLS_ctx.getCityName(__VLS_ctx.displayCities[rowIdx * 2])),
                ...{ class: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" },
                loading: "lazy",
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div)({
                ...{ class: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "relative flex h-full flex-col justify-end p-5" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
                ...{ class: "text-xl font-bold text-white md:text-2xl" },
            });
            (__VLS_ctx.getCityName(__VLS_ctx.displayCities[rowIdx * 2]));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "text-sm text-white/80" },
            });
            (__VLS_ctx.getCantonName(__VLS_ctx.displayCities[rowIdx * 2]));
            (__VLS_ctx.displayCities[rowIdx * 2].canton_code);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "mt-3 flex flex-wrap gap-3" },
            });
            if (__VLS_ctx.displayCities[rowIdx * 2].rent_count > 0) {
                const __VLS_12 = {}.RouterLink;
                /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
                // @ts-ignore
                const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
                    to: (`/${__VLS_ctx.locale}/properties?transaction_type=rent&city_name=${encodeURIComponent(__VLS_ctx.getCityName(__VLS_ctx.displayCities[rowIdx * 2]))}`),
                    ...{ class: "inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30" },
                }));
                const __VLS_14 = __VLS_13({
                    to: (`/${__VLS_ctx.locale}/properties?transaction_type=rent&city_name=${encodeURIComponent(__VLS_ctx.getCityName(__VLS_ctx.displayCities[rowIdx * 2]))}`),
                    ...{ class: "inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30" },
                }, ...__VLS_functionalComponentArgsRest(__VLS_13));
                __VLS_15.slots.default;
                (__VLS_ctx.displayCities[rowIdx * 2].rent_count);
                (__VLS_ctx.t('cityListings.toRent', 'to rent'));
                var __VLS_15;
            }
            if (__VLS_ctx.displayCities[rowIdx * 2].buy_count > 0) {
                const __VLS_16 = {}.RouterLink;
                /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
                // @ts-ignore
                const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
                    to: (`/${__VLS_ctx.locale}/properties?transaction_type=buy&city_name=${encodeURIComponent(__VLS_ctx.getCityName(__VLS_ctx.displayCities[rowIdx * 2]))}`),
                    ...{ class: "inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30" },
                }));
                const __VLS_18 = __VLS_17({
                    to: (`/${__VLS_ctx.locale}/properties?transaction_type=buy&city_name=${encodeURIComponent(__VLS_ctx.getCityName(__VLS_ctx.displayCities[rowIdx * 2]))}`),
                    ...{ class: "inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30" },
                }, ...__VLS_functionalComponentArgsRest(__VLS_17));
                __VLS_19.slots.default;
                (__VLS_ctx.displayCities[rowIdx * 2].buy_count);
                (__VLS_ctx.t('cityListings.toBuy', 'to buy'));
                var __VLS_19;
            }
        }
        if (__VLS_ctx.displayCities[rowIdx * 2 + 1]) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "group relative min-h-[200px] overflow-hidden rounded-xl" },
                ...{ class: (rowIdx % 2 === 0 ? 'md:col-span-2' : 'md:col-span-1') },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "absolute inset-0" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
                src: (__VLS_ctx.displayCities[rowIdx * 2 + 1].image_url || __VLS_ctx.placeholderImage),
                alt: (__VLS_ctx.getCityName(__VLS_ctx.displayCities[rowIdx * 2 + 1])),
                ...{ class: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" },
                loading: "lazy",
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div)({
                ...{ class: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "relative flex h-full flex-col justify-end p-5" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
                ...{ class: "text-xl font-bold text-white md:text-2xl" },
            });
            (__VLS_ctx.getCityName(__VLS_ctx.displayCities[rowIdx * 2 + 1]));
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "text-sm text-white/80" },
            });
            (__VLS_ctx.getCantonName(__VLS_ctx.displayCities[rowIdx * 2 + 1]));
            (__VLS_ctx.displayCities[rowIdx * 2 + 1].canton_code);
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "mt-3 flex flex-wrap gap-3" },
            });
            if (__VLS_ctx.displayCities[rowIdx * 2 + 1].rent_count > 0) {
                const __VLS_20 = {}.RouterLink;
                /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
                // @ts-ignore
                const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
                    to: (`/${__VLS_ctx.locale}/properties?transaction_type=rent&city_name=${encodeURIComponent(__VLS_ctx.getCityName(__VLS_ctx.displayCities[rowIdx * 2 + 1]))}`),
                    ...{ class: "inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30" },
                }));
                const __VLS_22 = __VLS_21({
                    to: (`/${__VLS_ctx.locale}/properties?transaction_type=rent&city_name=${encodeURIComponent(__VLS_ctx.getCityName(__VLS_ctx.displayCities[rowIdx * 2 + 1]))}`),
                    ...{ class: "inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30" },
                }, ...__VLS_functionalComponentArgsRest(__VLS_21));
                __VLS_23.slots.default;
                (__VLS_ctx.displayCities[rowIdx * 2 + 1].rent_count);
                (__VLS_ctx.t('cityListings.toRent', 'to rent'));
                var __VLS_23;
            }
            if (__VLS_ctx.displayCities[rowIdx * 2 + 1].buy_count > 0) {
                const __VLS_24 = {}.RouterLink;
                /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
                // @ts-ignore
                const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
                    to: (`/${__VLS_ctx.locale}/properties?transaction_type=buy&city_name=${encodeURIComponent(__VLS_ctx.getCityName(__VLS_ctx.displayCities[rowIdx * 2 + 1]))}`),
                    ...{ class: "inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30" },
                }));
                const __VLS_26 = __VLS_25({
                    to: (`/${__VLS_ctx.locale}/properties?transaction_type=buy&city_name=${encodeURIComponent(__VLS_ctx.getCityName(__VLS_ctx.displayCities[rowIdx * 2 + 1]))}`),
                    ...{ class: "inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30" },
                }, ...__VLS_functionalComponentArgsRest(__VLS_25));
                __VLS_27.slots.default;
                (__VLS_ctx.displayCities[rowIdx * 2 + 1].buy_count);
                (__VLS_ctx.t('cityListings.toBuy', 'to buy'));
                var __VLS_27;
            }
        }
    }
    if (!__VLS_ctx.showAll && __VLS_ctx.cities.length > 6) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "mt-8 text-center" },
        });
        const __VLS_28 = {}.Button;
        /** @type {[typeof __VLS_components.Button, typeof __VLS_components.Button, ]} */ ;
        // @ts-ignore
        const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
            ...{ 'onClick': {} },
            severity: "secondary",
            outlined: true,
            ...{ class: "gap-2" },
        }));
        const __VLS_30 = __VLS_29({
            ...{ 'onClick': {} },
            severity: "secondary",
            outlined: true,
            ...{ class: "gap-2" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_29));
        let __VLS_32;
        let __VLS_33;
        let __VLS_34;
        const __VLS_35 = {
            onClick: (...[$event]) => {
                if (!!(__VLS_ctx.isLoading))
                    return;
                if (!(__VLS_ctx.cities.length))
                    return;
                if (!(!__VLS_ctx.showAll && __VLS_ctx.cities.length > 6))
                    return;
                __VLS_ctx.showAll = true;
            }
        };
        __VLS_31.slots.default;
        (__VLS_ctx.t('cityListings.seeMore', 'See other cities'));
        const __VLS_36 = {}.ChevronDown;
        /** @type {[typeof __VLS_components.ChevronDown, ]} */ ;
        // @ts-ignore
        const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
            ...{ class: "h-4 w-4" },
        }));
        const __VLS_38 = __VLS_37({
            ...{ class: "h-4 w-4" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_37));
        var __VLS_31;
    }
}
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['py-12']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['!h-8']} */ ;
/** @type {__VLS_StyleScopedClasses['!w-64']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['!h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['!w-96']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-3']} */ ;
/** @type {__VLS_StyleScopedClasses['!h-48']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['py-12']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#1a1a2e]']} */ ;
/** @type {__VLS_StyleScopedClasses['md:text-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-3']} */ ;
/** @type {__VLS_StyleScopedClasses['group']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-[200px]']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-500']} */ ;
/** @type {__VLS_StyleScopedClasses['group-hover:scale-110']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-t']} */ ;
/** @type {__VLS_StyleScopedClasses['from-black/80']} */ ;
/** @type {__VLS_StyleScopedClasses['via-black/40']} */ ;
/** @type {__VLS_StyleScopedClasses['to-black/10']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['p-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['md:text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white/80']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white/20']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-white/30']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white/20']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-white/30']} */ ;
/** @type {__VLS_StyleScopedClasses['group']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-[200px]']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-500']} */ ;
/** @type {__VLS_StyleScopedClasses['group-hover:scale-110']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-t']} */ ;
/** @type {__VLS_StyleScopedClasses['from-black/80']} */ ;
/** @type {__VLS_StyleScopedClasses['via-black/40']} */ ;
/** @type {__VLS_StyleScopedClasses['to-black/10']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['p-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['md:text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white/80']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white/20']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-white/30']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white/20']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-white/30']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ChevronDown: ChevronDown,
            Button: Button,
            Skeleton: Skeleton,
            t: t,
            locale: locale,
            showAll: showAll,
            isLoading: isLoading,
            cities: cities,
            displayCities: displayCities,
            placeholderImage: placeholderImage,
            getCityName: getCityName,
            getCantonName: getCantonName,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */

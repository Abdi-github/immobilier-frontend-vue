import { useI18n } from 'vue-i18n';
import SEO from '@/shared/components/SEO.vue';
import HeroSearch from '../components/HeroSearch.vue';
import CityListings from '../components/CityListings.vue';
import BuyOrRentSection from '../components/BuyOrRentSection.vue';
import FeaturedProperties from '../components/FeaturedProperties.vue';
const { t } = useI18n();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    'data-testid': "home-page",
    ...{ class: "min-h-screen bg-white" },
});
/** @type {[typeof SEO, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(SEO, new SEO({
    title: (__VLS_ctx.t('hero.title', 'Real Estate in Switzerland – Buy & Rent')),
    description: (__VLS_ctx.t('hero.subtitle', 'Find apartments, houses & commercial properties for rent or sale across Switzerland.')),
}));
const __VLS_1 = __VLS_0({
    title: (__VLS_ctx.t('hero.title', 'Real Estate in Switzerland – Buy & Rent')),
    description: (__VLS_ctx.t('hero.subtitle', 'Find apartments, houses & commercial properties for rent or sale across Switzerland.')),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
/** @type {[typeof HeroSearch, ]} */ ;
// @ts-ignore
const __VLS_3 = __VLS_asFunctionalComponent(HeroSearch, new HeroSearch({}));
const __VLS_4 = __VLS_3({}, ...__VLS_functionalComponentArgsRest(__VLS_3));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mx-auto max-w-7xl md:px-6 lg:px-8" },
});
/** @type {[typeof CityListings, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(CityListings, new CityListings({}));
const __VLS_7 = __VLS_6({}, ...__VLS_functionalComponentArgsRest(__VLS_6));
/** @type {[typeof BuyOrRentSection, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(BuyOrRentSection, new BuyOrRentSection({}));
const __VLS_10 = __VLS_9({}, ...__VLS_functionalComponentArgsRest(__VLS_9));
/** @type {[typeof FeaturedProperties, ]} */ ;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent(FeaturedProperties, new FeaturedProperties({}));
const __VLS_13 = __VLS_12({}, ...__VLS_functionalComponentArgsRest(__VLS_12));
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "bg-gray-50 py-12" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "container mx-auto px-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
    ...{ class: "mb-6 text-xl font-bold text-[#1a1a2e]" },
});
(__VLS_ctx.t('info.title', 'We provide you with the keys to a successful real estate experience in Switzerland'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "prose prose-sm max-w-none text-gray-600" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
(__VLS_ctx.t('info.paragraph1', 'Buying a house, renting an apartment or investing in real estate can often be complicated. Whatever your real estate project in Switzerland – buying, renting, selling or investing – you can be sure to find all the answers to your needs on immobilier.ch.'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "mt-4" },
});
(__VLS_ctx.t('info.paragraph2', 'Your dream home is waiting for you! It will only take a few clicks to find it on immobilier.ch. Enter your criteria, launch the search and straightaway obtain the most relevant results.'));
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-7xl']} */ ;
/** @type {__VLS_StyleScopedClasses['md:px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:px-8']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['py-12']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-[#1a1a2e]']} */ ;
/** @type {__VLS_StyleScopedClasses['prose']} */ ;
/** @type {__VLS_StyleScopedClasses['prose-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-none']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            SEO: SEO,
            HeroSearch: HeroSearch,
            CityListings: CityListings,
            BuyOrRentSection: BuyOrRentSection,
            FeaturedProperties: FeaturedProperties,
            t: t,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */

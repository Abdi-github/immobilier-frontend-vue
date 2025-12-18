import { useLanguageStore, SUPPORTED_LANGUAGES } from '@/stores/language.store';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { Globe, Check } from 'lucide-vue-next';
import Popover from 'primevue/popover';
import { LANGUAGE_LABELS, LANGUAGE_FLAGS } from '@/shared/utils/constants';
const { locale } = useI18n();
const languageStore = useLanguageStore();
const router = useRouter();
const route = useRoute();
const popoverRef = ref();
const currentFlag = computed(() => LANGUAGE_FLAGS[locale.value] || '🇬🇧');
function togglePopover(event) {
    popoverRef.value?.toggle(event);
}
function switchLanguage(lang) {
    if (!SUPPORTED_LANGUAGES.includes(lang))
        return;
    languageStore.setLocale(lang);
    locale.value = lang;
    const newPath = route.path.replace(/^\/[a-z]{2}/, `/${lang}`);
    router.replace(newPath);
    popoverRef.value?.hide();
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    'data-testid': "locale-switcher",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.togglePopover) },
    ...{ class: "flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100" },
});
const __VLS_0 = {}.Globe;
/** @type {[typeof __VLS_components.Globe, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "h-4 w-4" },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "h-4 w-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "hidden sm:inline" },
});
(__VLS_ctx.currentFlag);
(__VLS_ctx.locale.toUpperCase());
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "sm:hidden" },
});
(__VLS_ctx.currentFlag);
const __VLS_4 = {}.Popover;
/** @type {[typeof __VLS_components.Popover, typeof __VLS_components.Popover, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    ref: "popoverRef",
    ...{ class: "w-40" },
}));
const __VLS_6 = __VLS_5({
    ref: "popoverRef",
    ...{ class: "w-40" },
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
/** @type {typeof __VLS_ctx.popoverRef} */ ;
var __VLS_8 = {};
__VLS_7.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "py-1" },
});
for (const [lang] of __VLS_getVForSourceType((__VLS_ctx.SUPPORTED_LANGUAGES))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.switchLanguage(lang);
            } },
        key: (lang),
        ...{ class: "flex w-full cursor-pointer items-center justify-between px-3 py-2 text-sm transition-colors hover:bg-gray-100" },
        ...{ class: (__VLS_ctx.locale === lang ? 'bg-gray-50 font-medium' : '') },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.LANGUAGE_FLAGS[lang]);
    (__VLS_ctx.LANGUAGE_LABELS[lang]);
    if (__VLS_ctx.locale === lang) {
        const __VLS_10 = {}.Check;
        /** @type {[typeof __VLS_components.Check, ]} */ ;
        // @ts-ignore
        const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
            ...{ class: "h-4 w-4 text-primary" },
        }));
        const __VLS_12 = __VLS_11({
            ...{ class: "h-4 w-4 text-primary" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_11));
    }
}
var __VLS_7;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:inline']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['w-40']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
// @ts-ignore
var __VLS_9 = __VLS_8;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            SUPPORTED_LANGUAGES: SUPPORTED_LANGUAGES,
            Globe: Globe,
            Check: Check,
            Popover: Popover,
            LANGUAGE_LABELS: LANGUAGE_LABELS,
            LANGUAGE_FLAGS: LANGUAGE_FLAGS,
            locale: locale,
            popoverRef: popoverRef,
            currentFlag: currentFlag,
            togglePopover: togglePopover,
            switchLanguage: switchLanguage,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */

import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { MapPin, Building2 } from 'lucide-vue-next';
import { useCantons } from '@/features/locations/composables/useCantons';
import { useCities } from '@/features/locations/composables/useCities';
import { useLocalizedName } from '@/shared/composables/useLocalizedName';
const emit = defineEmits();
const { t } = useI18n();
const getLocalizedName = useLocalizedName();
const query = ref('');
const isOpen = ref(false);
const inputRef = ref(null);
const dropdownRef = ref(null);
const { data: cantonsData } = useCantons();
const { data: citiesData } = useCities();
const filteredResults = computed(() => {
    if (!query.value.trim() || query.value.length < 2)
        return [];
    const searchTerm = query.value.toLowerCase();
    const results = [];
    const cantons = cantonsData.value?.data || [];
    const cities = citiesData.value?.data || [];
    // Search cantons
    for (const canton of cantons) {
        const name = getLocalizedName(canton.name);
        if (name.toLowerCase().includes(searchTerm)) {
            results.push({
                id: canton.id,
                name,
                type: 'canton',
                cantonCode: canton.code,
            });
        }
    }
    // Search cities
    for (const city of cities) {
        const name = getLocalizedName(city.name);
        if (name.toLowerCase().includes(searchTerm)) {
            const canton = cantons.find((c) => c.id === city.canton_id);
            results.push({
                id: city.id,
                name,
                type: 'city',
                cantonCode: canton?.code,
                cantonName: canton ? getLocalizedName(canton.name) : undefined,
            });
        }
    }
    // Sort: exact matches first, then cantons, then cities
    return results
        .sort((a, b) => {
        const aExact = a.name.toLowerCase() === searchTerm;
        const bExact = b.name.toLowerCase() === searchTerm;
        if (aExact && !bExact)
            return -1;
        if (!aExact && bExact)
            return 1;
        if (a.type === 'canton' && b.type === 'city')
            return -1;
        if (a.type === 'city' && b.type === 'canton')
            return 1;
        return a.name.localeCompare(b.name);
    })
        .slice(0, 10);
});
function handleSelect(result) {
    query.value = '';
    isOpen.value = false;
    emit('select', result);
}
function handleClickOutside(event) {
    const target = event.target;
    if (dropdownRef.value &&
        !dropdownRef.value.contains(target) &&
        inputRef.value &&
        !inputRef.value.contains(target)) {
        isOpen.value = false;
    }
}
onMounted(() => {
    document.addEventListener('mousedown', handleClickOutside);
});
onUnmounted(() => {
    document.removeEventListener('mousedown', handleClickOutside);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "relative flex-1" },
});
const __VLS_0 = {}.MapPin;
/** @type {[typeof __VLS_components.MapPin, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ onFocus: (...[$event]) => {
            __VLS_ctx.isOpen = true;
        } },
    ...{ onInput: (...[$event]) => {
            __VLS_ctx.isOpen = true;
        } },
    ref: "inputRef",
    value: (__VLS_ctx.query),
    type: "text",
    placeholder: (__VLS_ctx.t('agencies.search.locationPlaceholder')),
    ...{ class: "h-12 w-full rounded-md border border-gray-300 bg-white pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" },
});
/** @type {typeof __VLS_ctx.inputRef} */ ;
if (__VLS_ctx.isOpen && __VLS_ctx.filteredResults.length > 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ref: "dropdownRef",
        ...{ class: "absolute left-0 right-0 top-full z-50 mt-1 max-h-72 overflow-y-auto rounded-md border bg-white shadow-lg" },
    });
    /** @type {typeof __VLS_ctx.dropdownRef} */ ;
    for (const [result] of __VLS_getVForSourceType((__VLS_ctx.filteredResults))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.isOpen && __VLS_ctx.filteredResults.length > 0))
                        return;
                    __VLS_ctx.handleSelect(result);
                } },
            key: (`${result.type}-${result.id}`),
            ...{ class: "flex w-full items-center justify-between px-4 py-3 text-left hover:bg-gray-50" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "flex items-center gap-3" },
        });
        if (result.type === 'canton') {
            const __VLS_4 = {}.MapPin;
            /** @type {[typeof __VLS_components.MapPin, ]} */ ;
            // @ts-ignore
            const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
                ...{ class: "h-4 w-4 text-blue-500" },
            }));
            const __VLS_6 = __VLS_5({
                ...{ class: "h-4 w-4 text-blue-500" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_5));
        }
        else {
            const __VLS_8 = {}.Building2;
            /** @type {[typeof __VLS_components.Building2, ]} */ ;
            // @ts-ignore
            const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
                ...{ class: "h-4 w-4 text-gray-400" },
            }));
            const __VLS_10 = __VLS_9({
                ...{ class: "h-4 w-4 text-gray-400" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_9));
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "font-medium" },
        });
        (result.name);
        if (result.type === 'city' && result.cantonName) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "ml-2 text-sm text-gray-500" },
            });
            (result.cantonName);
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "rounded px-2 py-0.5 text-xs" },
            ...{ class: (result.type === 'canton'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600') },
        });
        (result.type === 'canton' ? __VLS_ctx.t('agencies.search.canton', 'Canton') : __VLS_ctx.t('agencies.search.city', 'City'));
    }
}
if (__VLS_ctx.isOpen && __VLS_ctx.query.length >= 2 && __VLS_ctx.filteredResults.length === 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ref: "dropdownRef",
        ...{ class: "absolute left-0 right-0 top-full z-50 mt-1 rounded-md border bg-white p-4 text-center text-sm text-gray-500 shadow-lg" },
    });
    /** @type {typeof __VLS_ctx.dropdownRef} */ ;
    (__VLS_ctx.t('agencies.search.noResults', 'No locations found'));
}
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
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['left-0']} */ ;
/** @type {__VLS_StyleScopedClasses['right-0']} */ ;
/** @type {__VLS_StyleScopedClasses['top-full']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['max-h-72']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-blue-500']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-0.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['left-0']} */ ;
/** @type {__VLS_StyleScopedClasses['right-0']} */ ;
/** @type {__VLS_StyleScopedClasses['top-full']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            MapPin: MapPin,
            Building2: Building2,
            t: t,
            query: query,
            isOpen: isOpen,
            inputRef: inputRef,
            dropdownRef: dropdownRef,
            filteredResults: filteredResults,
            handleSelect: handleSelect,
        };
    },
    __typeEmits: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
});
; /* PartiallyEnd: #4569/main.vue */

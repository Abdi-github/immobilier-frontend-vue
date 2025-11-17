import { ref, watch } from 'vue';
import { ChevronDown, X } from 'lucide-vue-next';
const props = withDefaults(defineProps(), { unit: '' });
const emit = defineEmits();
const isOpen = ref(false);
const localMin = ref(props.minValue?.toString() ?? '');
const localMax = ref(props.maxValue?.toString() ?? '');
const dropdownRef = ref();
// Sync from props
watch(() => props.minValue, (v) => (localMin.value = v?.toString() ?? ''));
watch(() => props.maxValue, (v) => (localMax.value = v?.toString() ?? ''));
function applyValues() {
    const min = localMin.value ? parseInt(localMin.value, 10) : undefined;
    const max = localMax.value ? parseInt(localMax.value, 10) : undefined;
    if (min !== props.minValue)
        emit('update:minValue', min);
    if (max !== props.maxValue)
        emit('update:maxValue', max);
}
function handleOptionClick(value, target) {
    if (target === 'min') {
        localMin.value = value.toString();
        emit('update:minValue', value);
    }
    else {
        localMax.value = value.toString();
        emit('update:maxValue', value);
    }
}
const hasValue = computed(() => props.minValue !== undefined || props.maxValue !== undefined);
const displayLabel = computed(() => {
    if (props.minValue && props.maxValue) {
        const minStr = props.formatValue ? props.formatValue(props.minValue) : String(props.minValue);
        const maxStr = props.formatValue ? props.formatValue(props.maxValue) : String(props.maxValue);
        return `${minStr} - ${maxStr}`;
    }
    if (props.minValue) {
        const minStr = props.formatValue ? props.formatValue(props.minValue) : String(props.minValue);
        return `${minStr}+`;
    }
    if (props.maxValue) {
        const maxStr = props.formatValue ? props.formatValue(props.maxValue) : String(props.maxValue);
        return `≤ ${maxStr}`;
    }
    return props.label;
});
function handleClear(e) {
    e.stopPropagation();
    localMin.value = '';
    localMax.value = '';
    emit('update:minValue', undefined);
    emit('update:maxValue', undefined);
}
function onInputKey(e) {
    if (e.key === 'Enter')
        applyValues();
}
function onlyDigits(e) {
    const input = e.target;
    input.value = input.value.replace(/\D/g, '');
    if (input.dataset.field === 'min')
        localMin.value = input.value;
    else
        localMax.value = input.value;
}
// Close on outside click
function onClickOutside(e) {
    if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
        isOpen.value = false;
        applyValues();
    }
}
import { computed, onMounted, onBeforeUnmount } from 'vue';
onMounted(() => document.addEventListener('mousedown', onClickOutside));
onBeforeUnmount(() => document.removeEventListener('mousedown', onClickOutside));
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({ unit: '' });
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ref: "dropdownRef",
    ...{ class: "relative" },
});
/** @type {typeof __VLS_ctx.dropdownRef} */ ;
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.isOpen = !__VLS_ctx.isOpen;
        } },
    type: "button",
    role: "combobox",
    'aria-expanded': (__VLS_ctx.isOpen),
    ...{ class: "flex min-w-32 items-center justify-between gap-1 rounded-md border px-3 py-2 text-sm font-normal transition-colors" },
    ...{ class: (__VLS_ctx.hasValue ? 'border-primary text-primary' : 'border-gray-300 text-gray-700') },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "truncate" },
});
(__VLS_ctx.displayLabel);
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "ml-2 flex items-center gap-1" },
});
if (__VLS_ctx.hasValue) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ onClick: (__VLS_ctx.handleClear) },
        ...{ onKeydown: (__VLS_ctx.handleClear) },
        role: "button",
        tabindex: "0",
        ...{ class: "rounded-sm p-0.5 hover:bg-gray-200" },
    });
    const __VLS_0 = {}.X;
    /** @type {[typeof __VLS_components.X, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        ...{ class: "h-3.5 w-3.5 shrink-0 opacity-70 hover:opacity-100" },
    }));
    const __VLS_2 = __VLS_1({
        ...{ class: "h-3.5 w-3.5 shrink-0 opacity-70 hover:opacity-100" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
}
const __VLS_4 = {}.ChevronDown;
/** @type {[typeof __VLS_components.ChevronDown, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    ...{ class: "h-4 w-4 shrink-0 opacity-50 transition-transform" },
    ...{ class: (__VLS_ctx.isOpen && 'rotate-180') },
}));
const __VLS_6 = __VLS_5({
    ...{ class: "h-4 w-4 shrink-0 opacity-50 transition-transform" },
    ...{ class: (__VLS_ctx.isOpen && 'rotate-180') },
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
if (__VLS_ctx.isOpen) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "absolute left-0 top-full z-50 mt-1 w-64 rounded-md border bg-white shadow-lg" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "flex gap-2 border-b p-3" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        ...{ onInput: (__VLS_ctx.onlyDigits) },
        ...{ onBlur: (__VLS_ctx.applyValues) },
        ...{ onKeydown: (__VLS_ctx.onInputKey) },
        value: (__VLS_ctx.localMin),
        'data-field': "min",
        placeholder: "Min",
        ...{ class: "h-9 w-full rounded-md border border-gray-300 px-2 text-sm focus:border-primary focus:outline-none" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        ...{ onInput: (__VLS_ctx.onlyDigits) },
        ...{ onBlur: (__VLS_ctx.applyValues) },
        ...{ onKeydown: (__VLS_ctx.onInputKey) },
        value: (__VLS_ctx.localMax),
        'data-field': "max",
        placeholder: "Max",
        ...{ class: "h-9 w-full rounded-md border border-gray-300 px-2 text-sm focus:border-primary focus:outline-none" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "grid max-h-48 grid-cols-2 gap-0 overflow-auto" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "border-r" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "bg-gray-50 px-2 py-1 text-xs font-medium text-gray-500" },
    });
    for (const [option] of __VLS_getVForSourceType((__VLS_ctx.options))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.isOpen))
                        return;
                    __VLS_ctx.handleOptionClick(option.value, 'min');
                } },
            key: (`min-${option.value}`),
            ...{ class: "w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50" },
            ...{ class: (__VLS_ctx.minValue === option.value && 'bg-primary/10 font-medium text-primary') },
        });
        (option.label);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "bg-gray-50 px-2 py-1 text-xs font-medium text-gray-500" },
    });
    for (const [option] of __VLS_getVForSourceType((__VLS_ctx.options))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.isOpen))
                        return;
                    __VLS_ctx.handleOptionClick(option.value, 'max');
                } },
            key: (`max-${option.value}`),
            ...{ class: "w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50" },
            ...{ class: (__VLS_ctx.maxValue === option.value && 'bg-primary/10 font-medium text-primary') },
        });
        (option.label);
    }
}
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['min-w-32']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['truncate']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['p-0.5']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-200']} */ ;
/** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-70']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:opacity-100']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-50']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['left-0']} */ ;
/** @type {__VLS_StyleScopedClasses['top-full']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['w-64']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['h-9']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['h-9']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['max-h-48']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-0']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['border-r']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-50']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ChevronDown: ChevronDown,
            X: X,
            isOpen: isOpen,
            localMin: localMin,
            localMax: localMax,
            dropdownRef: dropdownRef,
            applyValues: applyValues,
            handleOptionClick: handleOptionClick,
            hasValue: hasValue,
            displayLabel: displayLabel,
            handleClear: handleClear,
            onInputKey: onInputKey,
            onlyDigits: onlyDigits,
        };
    },
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
; /* PartiallyEnd: #4569/main.vue */

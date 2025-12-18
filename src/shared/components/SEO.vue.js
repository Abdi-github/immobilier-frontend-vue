import { useHead } from '@unhead/vue';
import { computed } from 'vue';
const props = withDefaults(defineProps(), {
    title: 'Immobilier.ch',
    description: 'Find your dream property in Switzerland',
});
const fullTitle = computed(() => props.title === 'Immobilier.ch' ? props.title : `${props.title} | Immobilier.ch`);
useHead({
    title: fullTitle,
    meta: [
        { name: 'description', content: () => props.description },
        { property: 'og:title', content: fullTitle },
        { property: 'og:description', content: () => props.description },
        ...(props.image ? [{ property: 'og:image', content: props.image }] : []),
        ...(props.url ? [{ property: 'og:url', content: props.url }] : []),
    ],
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_withDefaultsArg = (function (t) { return t; })({
    title: 'Immobilier.ch',
    description: 'Find your dream property in Switzerland',
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
var __VLS_0 = {};
// @ts-ignore
var __VLS_1 = __VLS_0;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
    props: {},
});
const __VLS_component = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
    props: {},
});
export default {};
; /* PartiallyEnd: #4569/main.vue */

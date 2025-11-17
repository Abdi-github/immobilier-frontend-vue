import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { Eye, EyeOff, Loader2 } from 'lucide-vue-next';
import AuthLayout from '../components/AuthLayout.vue';
import ForgotPasswordModal from '../components/ForgotPasswordModal.vue';
import { useAuth } from '../composables/useAuth';
const route = useRoute();
const router = useRouter();
const { t, locale } = useI18n();
const { loginMutation } = useAuth();
const email = ref('');
const password = ref('');
const showPassword = ref(false);
const forgotPasswordOpen = ref(false);
const lang = computed(() => locale.value);
const from = computed(() => route.query.redirect || `/${lang.value}`);
async function handleSubmit() {
    if (!email.value.trim() || !password.value.trim())
        return;
    try {
        await loginMutation.mutateAsync({ email: email.value, password: password.value });
        router.push(from.value);
    }
    catch {
        // error available via loginMutation.error
    }
}
function getErrorMessage() {
    const error = loginMutation.error.value;
    if (!error)
        return null;
    if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error;
        return axiosError.response?.data?.message || t('auth.errors.login');
    }
    return t('auth.errors.network');
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {[typeof AuthLayout, typeof AuthLayout, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(AuthLayout, new AuthLayout({
    title: (__VLS_ctx.t('auth.signIn.title')),
    subtitle: (__VLS_ctx.t('auth.signIn.subtitle')),
}));
const __VLS_1 = __VLS_0({
    title: (__VLS_ctx.t('auth.signIn.title')),
    subtitle: (__VLS_ctx.t('auth.signIn.subtitle')),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
var __VLS_3 = {};
__VLS_2.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
    ...{ onSubmit: (__VLS_ctx.handleSubmit) },
    'data-testid': "sign-in-page",
    ...{ class: "space-y-6" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "space-y-2" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    for: "login-email",
    ...{ class: "text-sm font-medium" },
});
(__VLS_ctx.t('auth.form.email'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    id: "login-email",
    type: "email",
    placeholder: (__VLS_ctx.t('auth.form.emailPlaceholder')),
    required: true,
    autocomplete: "email",
    disabled: (__VLS_ctx.loginMutation.isPending.value),
    'data-testid': "login-email",
    ...{ class: "h-11 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50" },
});
(__VLS_ctx.email);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "space-y-2" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    for: "login-password",
    ...{ class: "text-sm font-medium" },
});
(__VLS_ctx.t('auth.form.password'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "relative" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    id: "login-password",
    type: (__VLS_ctx.showPassword ? 'text' : 'password'),
    placeholder: (__VLS_ctx.t('auth.form.passwordPlaceholder')),
    required: true,
    autocomplete: "current-password",
    disabled: (__VLS_ctx.loginMutation.isPending.value),
    'data-testid': "login-password",
    ...{ class: "h-11 w-full rounded-md border border-gray-300 px-3 pr-10 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50" },
});
(__VLS_ctx.password);
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.showPassword = !__VLS_ctx.showPassword;
        } },
    type: "button",
    ...{ class: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700" },
    tabindex: "-1",
});
if (__VLS_ctx.showPassword) {
    const __VLS_4 = {}.EyeOff;
    /** @type {[typeof __VLS_components.EyeOff, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
        ...{ class: "h-5 w-5" },
    }));
    const __VLS_6 = __VLS_5({
        ...{ class: "h-5 w-5" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
}
else {
    const __VLS_8 = {}.Eye;
    /** @type {[typeof __VLS_components.Eye, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
        ...{ class: "h-5 w-5" },
    }));
    const __VLS_10 = __VLS_9({
        ...{ class: "h-5 w-5" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
}
if (__VLS_ctx.loginMutation.isError.value) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "rounded-md border border-red-200 bg-red-50 p-3" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "text-sm text-red-600" },
    });
    (__VLS_ctx.getErrorMessage());
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    type: "submit",
    ...{ class: "flex h-11 w-full items-center justify-center rounded-md bg-primary text-base font-semibold text-white hover:bg-primary/90 disabled:opacity-50" },
    disabled: (__VLS_ctx.loginMutation.isPending.value || !__VLS_ctx.email.trim() || !__VLS_ctx.password.trim()),
    'data-testid': "login-button",
});
if (__VLS_ctx.loginMutation.isPending.value) {
    const __VLS_12 = {}.Loader2;
    /** @type {[typeof __VLS_components.Loader2, ]} */ ;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
        ...{ class: "mr-2 h-4 w-4 animate-spin" },
    }));
    const __VLS_14 = __VLS_13({
        ...{ class: "mr-2 h-4 w-4 animate-spin" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    (__VLS_ctx.t('auth.signIn.loggingIn'));
}
else {
    (__VLS_ctx.t('auth.signIn.submit'));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "text-center" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.forgotPasswordOpen = true;
        } },
    type: "button",
    ...{ class: "text-sm text-primary hover:underline" },
});
(__VLS_ctx.t('auth.signIn.forgotPassword'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "relative" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "absolute inset-0 flex items-center" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span)({
    ...{ class: "w-full border-t" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "relative flex justify-center text-xs uppercase" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "bg-white px-2 text-gray-500" },
});
(__VLS_ctx.t('auth.signIn.or'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "text-center" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "mb-2 text-sm text-gray-600" },
});
(__VLS_ctx.t('auth.signIn.noAccount'));
const __VLS_16 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    to: (`/${__VLS_ctx.lang}/register`),
    ...{ class: "text-sm font-semibold text-primary hover:underline" },
}));
const __VLS_18 = __VLS_17({
    to: (`/${__VLS_ctx.lang}/register`),
    ...{ class: "text-sm font-semibold text-primary hover:underline" },
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
__VLS_19.slots.default;
(__VLS_ctx.t('auth.signIn.createAccount'));
var __VLS_19;
/** @type {[typeof ForgotPasswordModal, ]} */ ;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent(ForgotPasswordModal, new ForgotPasswordModal({
    visible: (__VLS_ctx.forgotPasswordOpen),
}));
const __VLS_21 = __VLS_20({
    visible: (__VLS_ctx.forgotPasswordOpen),
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
var __VLS_2;
/** @type {__VLS_StyleScopedClasses['space-y-6']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['h-11']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-1']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:opacity-50']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['h-11']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['pr-10']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-1']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:opacity-50']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['right-3']} */ ;
/** @type {__VLS_StyleScopedClasses['top-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-y-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-red-200']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-red-50']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-600']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-11']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-primary/90']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:opacity-50']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-spin']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:underline']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['inset-0']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:underline']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Eye: Eye,
            EyeOff: EyeOff,
            Loader2: Loader2,
            AuthLayout: AuthLayout,
            ForgotPasswordModal: ForgotPasswordModal,
            t: t,
            loginMutation: loginMutation,
            email: email,
            password: password,
            showPassword: showPassword,
            forgotPasswordOpen: forgotPasswordOpen,
            lang: lang,
            handleSubmit: handleSubmit,
            getErrorMessage: getErrorMessage,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */

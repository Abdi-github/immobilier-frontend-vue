import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { Eye, EyeOff, Loader2, CheckCircle, XCircle } from 'lucide-vue-next';
import AuthLayout from '../components/AuthLayout.vue';
import { useAuth } from '../composables/useAuth';
const route = useRoute();
const { t, locale } = useI18n();
const { resetPasswordMutation } = useAuth();
const lang = computed(() => locale.value);
const token = computed(() => route.query.token || '');
const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const success = ref(false);
const validationError = ref('');
async function handleSubmit() {
    validationError.value = '';
    if (password.value.length < 8) {
        validationError.value = t('auth.validation.passwordLength');
        return;
    }
    if (password.value !== confirmPassword.value) {
        validationError.value = t('auth.validation.passwordMismatch');
        return;
    }
    if (!token.value) {
        validationError.value = t('auth.resetPassword.invalidToken');
        return;
    }
    try {
        await resetPasswordMutation.mutateAsync({ token: token.value, password: password.value });
        success.value = true;
    }
    catch {
        // error available via mutation
    }
}
function getErrorMessage() {
    if (validationError.value)
        return validationError.value;
    const error = resetPasswordMutation.error.value;
    if (!error)
        return null;
    if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error;
        return axiosError.response?.data?.message || t('auth.resetPassword.error');
    }
    return t('auth.errors.network');
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    'data-testid': "reset-password-page",
});
if (!__VLS_ctx.token) {
    /** @type {[typeof AuthLayout, typeof AuthLayout, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(AuthLayout, new AuthLayout({
        title: (__VLS_ctx.t('auth.resetPassword.title')),
        subtitle: (__VLS_ctx.t('auth.resetPassword.subtitle')),
    }));
    const __VLS_1 = __VLS_0({
        title: (__VLS_ctx.t('auth.resetPassword.title')),
        subtitle: (__VLS_ctx.t('auth.resetPassword.subtitle')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    __VLS_2.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "py-8 text-center" },
    });
    const __VLS_3 = {}.XCircle;
    /** @type {[typeof __VLS_components.XCircle, ]} */ ;
    // @ts-ignore
    const __VLS_4 = __VLS_asFunctionalComponent(__VLS_3, new __VLS_3({
        ...{ class: "mx-auto mb-4 h-12 w-12 text-red-500" },
    }));
    const __VLS_5 = __VLS_4({
        ...{ class: "mx-auto mb-4 h-12 w-12 text-red-500" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_4));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "mb-2 text-lg font-semibold" },
    });
    (__VLS_ctx.t('auth.resetPassword.invalidToken'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "mb-6 text-sm text-gray-500" },
    });
    (__VLS_ctx.t('auth.resetPassword.invalidTokenDescription'));
    const __VLS_7 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({
        to: (`/${__VLS_ctx.lang}/sign-in`),
        ...{ class: "inline-flex items-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90" },
    }));
    const __VLS_9 = __VLS_8({
        to: (`/${__VLS_ctx.lang}/sign-in`),
        ...{ class: "inline-flex items-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    __VLS_10.slots.default;
    (__VLS_ctx.t('auth.resetPassword.backToLogin'));
    var __VLS_10;
    var __VLS_2;
}
else if (__VLS_ctx.success) {
    /** @type {[typeof AuthLayout, typeof AuthLayout, ]} */ ;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent(AuthLayout, new AuthLayout({
        title: (__VLS_ctx.t('auth.resetPassword.title')),
        subtitle: (__VLS_ctx.t('auth.resetPassword.subtitle')),
    }));
    const __VLS_12 = __VLS_11({
        title: (__VLS_ctx.t('auth.resetPassword.title')),
        subtitle: (__VLS_ctx.t('auth.resetPassword.subtitle')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_11));
    __VLS_13.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "py-8 text-center" },
    });
    const __VLS_14 = {}.CheckCircle;
    /** @type {[typeof __VLS_components.CheckCircle, ]} */ ;
    // @ts-ignore
    const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({
        ...{ class: "mx-auto mb-4 h-12 w-12 text-green-500" },
    }));
    const __VLS_16 = __VLS_15({
        ...{ class: "mx-auto mb-4 h-12 w-12 text-green-500" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_15));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "mb-2 text-lg font-semibold" },
    });
    (__VLS_ctx.t('auth.resetPassword.successTitle'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "mb-6 text-sm text-gray-500" },
    });
    (__VLS_ctx.t('auth.resetPassword.successMessage'));
    const __VLS_18 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
        to: (`/${__VLS_ctx.lang}/sign-in`),
        ...{ class: "inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90" },
    }));
    const __VLS_20 = __VLS_19({
        to: (`/${__VLS_ctx.lang}/sign-in`),
        ...{ class: "inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    __VLS_21.slots.default;
    (__VLS_ctx.t('auth.resetPassword.loginNow'));
    var __VLS_21;
    var __VLS_13;
}
else {
    /** @type {[typeof AuthLayout, typeof AuthLayout, ]} */ ;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent(AuthLayout, new AuthLayout({
        title: (__VLS_ctx.t('auth.resetPassword.title')),
        subtitle: (__VLS_ctx.t('auth.resetPassword.subtitle')),
    }));
    const __VLS_23 = __VLS_22({
        title: (__VLS_ctx.t('auth.resetPassword.title')),
        subtitle: (__VLS_ctx.t('auth.resetPassword.subtitle')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_22));
    __VLS_24.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
        ...{ onSubmit: (__VLS_ctx.handleSubmit) },
        ...{ class: "space-y-6" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "space-y-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "new-password",
        ...{ class: "text-sm font-medium" },
    });
    (__VLS_ctx.t('auth.resetPassword.newPassword'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "relative" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        id: "new-password",
        type: (__VLS_ctx.showPassword ? 'text' : 'password'),
        placeholder: (__VLS_ctx.t('auth.resetPassword.newPasswordPlaceholder')),
        required: true,
        minlength: "8",
        disabled: (__VLS_ctx.resetPasswordMutation.isPending.value),
        ...{ class: "h-11 w-full rounded-md border border-gray-300 px-3 pr-10 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50" },
    });
    (__VLS_ctx.password);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!!(!__VLS_ctx.token))
                    return;
                if (!!(__VLS_ctx.success))
                    return;
                __VLS_ctx.showPassword = !__VLS_ctx.showPassword;
            } },
        type: "button",
        ...{ class: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" },
        tabindex: "-1",
    });
    if (__VLS_ctx.showPassword) {
        const __VLS_25 = {}.EyeOff;
        /** @type {[typeof __VLS_components.EyeOff, ]} */ ;
        // @ts-ignore
        const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
            ...{ class: "h-4 w-4" },
        }));
        const __VLS_27 = __VLS_26({
            ...{ class: "h-4 w-4" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_26));
    }
    else {
        const __VLS_29 = {}.Eye;
        /** @type {[typeof __VLS_components.Eye, ]} */ ;
        // @ts-ignore
        const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
            ...{ class: "h-4 w-4" },
        }));
        const __VLS_31 = __VLS_30({
            ...{ class: "h-4 w-4" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_30));
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "space-y-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "confirm-new-password",
        ...{ class: "text-sm font-medium" },
    });
    (__VLS_ctx.t('auth.resetPassword.confirmPassword'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "relative" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        id: "confirm-new-password",
        type: (__VLS_ctx.showConfirmPassword ? 'text' : 'password'),
        placeholder: (__VLS_ctx.t('auth.resetPassword.confirmPasswordPlaceholder')),
        required: true,
        minlength: "8",
        disabled: (__VLS_ctx.resetPasswordMutation.isPending.value),
        ...{ class: "h-11 w-full rounded-md border border-gray-300 px-3 pr-10 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50" },
    });
    (__VLS_ctx.confirmPassword);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!!(!__VLS_ctx.token))
                    return;
                if (!!(__VLS_ctx.success))
                    return;
                __VLS_ctx.showConfirmPassword = !__VLS_ctx.showConfirmPassword;
            } },
        type: "button",
        ...{ class: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" },
        tabindex: "-1",
    });
    if (__VLS_ctx.showConfirmPassword) {
        const __VLS_33 = {}.EyeOff;
        /** @type {[typeof __VLS_components.EyeOff, ]} */ ;
        // @ts-ignore
        const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
            ...{ class: "h-4 w-4" },
        }));
        const __VLS_35 = __VLS_34({
            ...{ class: "h-4 w-4" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_34));
    }
    else {
        const __VLS_37 = {}.Eye;
        /** @type {[typeof __VLS_components.Eye, ]} */ ;
        // @ts-ignore
        const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
            ...{ class: "h-4 w-4" },
        }));
        const __VLS_39 = __VLS_38({
            ...{ class: "h-4 w-4" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_38));
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "text-xs text-gray-500" },
    });
    (__VLS_ctx.t('auth.resetPassword.requirements'));
    if (__VLS_ctx.getErrorMessage()) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "text-sm text-red-600" },
        });
        (__VLS_ctx.getErrorMessage());
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        type: "submit",
        ...{ class: "flex h-11 w-full items-center justify-center rounded-md bg-primary text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50" },
        disabled: (__VLS_ctx.resetPasswordMutation.isPending.value),
    });
    if (__VLS_ctx.resetPasswordMutation.isPending.value) {
        const __VLS_41 = {}.Loader2;
        /** @type {[typeof __VLS_components.Loader2, ]} */ ;
        // @ts-ignore
        const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({
            ...{ class: "mr-2 h-4 w-4 animate-spin" },
        }));
        const __VLS_43 = __VLS_42({
            ...{ class: "mr-2 h-4 w-4 animate-spin" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_42));
        (__VLS_ctx.t('auth.resetPassword.resetting'));
    }
    else {
        (__VLS_ctx.t('auth.resetPassword.submit'));
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "text-center" },
    });
    const __VLS_45 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
        to: (`/${__VLS_ctx.lang}/sign-in`),
        ...{ class: "text-sm text-primary hover:underline" },
    }));
    const __VLS_47 = __VLS_46({
        to: (`/${__VLS_ctx.lang}/sign-in`),
        ...{ class: "text-sm text-primary hover:underline" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_46));
    __VLS_48.slots.default;
    (__VLS_ctx.t('auth.resetPassword.backToLogin'));
    var __VLS_48;
    var __VLS_24;
}
/** @type {__VLS_StyleScopedClasses['py-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-12']} */ ;
/** @type {__VLS_StyleScopedClasses['w-12']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-500']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-primary/90']} */ ;
/** @type {__VLS_StyleScopedClasses['py-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-12']} */ ;
/** @type {__VLS_StyleScopedClasses['w-12']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-500']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-primary/90']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-6']} */ ;
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
/** @type {__VLS_StyleScopedClasses['text-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
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
/** @type {__VLS_StyleScopedClasses['text-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-600']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-11']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
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
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Eye: Eye,
            EyeOff: EyeOff,
            Loader2: Loader2,
            CheckCircle: CheckCircle,
            XCircle: XCircle,
            AuthLayout: AuthLayout,
            t: t,
            resetPasswordMutation: resetPasswordMutation,
            lang: lang,
            token: token,
            password: password,
            confirmPassword: confirmPassword,
            showPassword: showPassword,
            showConfirmPassword: showConfirmPassword,
            success: success,
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

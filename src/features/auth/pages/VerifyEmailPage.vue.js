import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { CheckCircle, XCircle, Loader2, Mail } from 'lucide-vue-next';
import AuthLayout from '../components/AuthLayout.vue';
import { useAuth } from '../composables/useAuth';
const route = useRoute();
const { t, locale } = useI18n();
const { verifyEmailMutation, resendVerificationMutation } = useAuth();
const lang = computed(() => locale.value);
const token = computed(() => route.query.token || '');
const verifyStatus = ref(token.value ? 'verifying' : 'no-token');
const resendEmail = ref('');
const resendSuccess = ref(false);
onMounted(async () => {
    if (!token.value)
        return;
    try {
        await verifyEmailMutation.mutateAsync({ token: token.value });
        verifyStatus.value = 'success';
    }
    catch {
        verifyStatus.value = 'error';
    }
});
async function handleResend() {
    if (!resendEmail.value.trim())
        return;
    try {
        await resendVerificationMutation.mutateAsync({ email: resendEmail.value });
        resendSuccess.value = true;
    }
    catch {
        // error available via mutation
    }
}
function getVerifyErrorMessage() {
    const error = verifyEmailMutation.error.value;
    if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error;
        return axiosError.response?.data?.message || t('auth.verifyEmail.errorGeneric');
    }
    return t('auth.verifyEmail.errorGeneric');
}
function getResendErrorMessage() {
    const error = resendVerificationMutation.error.value;
    if (!error)
        return null;
    if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error;
        return axiosError.response?.data?.message || t('auth.verifyEmail.resendError');
    }
    return t('auth.errors.network');
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    'data-testid': "verify-email-page",
});
if (__VLS_ctx.verifyStatus === 'verifying') {
    /** @type {[typeof AuthLayout, typeof AuthLayout, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(AuthLayout, new AuthLayout({
        title: (__VLS_ctx.t('auth.verifyEmail.title')),
        subtitle: (__VLS_ctx.t('auth.verifyEmail.subtitle')),
    }));
    const __VLS_1 = __VLS_0({
        title: (__VLS_ctx.t('auth.verifyEmail.title')),
        subtitle: (__VLS_ctx.t('auth.verifyEmail.subtitle')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    __VLS_2.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "py-12 text-center" },
    });
    const __VLS_3 = {}.Loader2;
    /** @type {[typeof __VLS_components.Loader2, ]} */ ;
    // @ts-ignore
    const __VLS_4 = __VLS_asFunctionalComponent(__VLS_3, new __VLS_3({
        ...{ class: "mx-auto mb-4 h-12 w-12 animate-spin text-primary" },
    }));
    const __VLS_5 = __VLS_4({
        ...{ class: "mx-auto mb-4 h-12 w-12 animate-spin text-primary" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_4));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "mb-2 text-lg font-semibold" },
    });
    (__VLS_ctx.t('auth.verifyEmail.verifying'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "text-sm text-gray-500" },
    });
    (__VLS_ctx.t('auth.verifyEmail.pleaseWait'));
    var __VLS_2;
}
else if (__VLS_ctx.verifyStatus === 'success') {
    /** @type {[typeof AuthLayout, typeof AuthLayout, ]} */ ;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(AuthLayout, new AuthLayout({
        title: (__VLS_ctx.t('auth.verifyEmail.title')),
        subtitle: (__VLS_ctx.t('auth.verifyEmail.subtitle')),
    }));
    const __VLS_8 = __VLS_7({
        title: (__VLS_ctx.t('auth.verifyEmail.title')),
        subtitle: (__VLS_ctx.t('auth.verifyEmail.subtitle')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    __VLS_9.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "py-8 text-center" },
    });
    const __VLS_10 = {}.CheckCircle;
    /** @type {[typeof __VLS_components.CheckCircle, ]} */ ;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
        ...{ class: "mx-auto mb-4 h-12 w-12 text-green-500" },
    }));
    const __VLS_12 = __VLS_11({
        ...{ class: "mx-auto mb-4 h-12 w-12 text-green-500" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_11));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "mb-2 text-lg font-semibold" },
    });
    (__VLS_ctx.t('auth.verifyEmail.successTitle'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "mb-6 text-sm text-gray-500" },
    });
    (__VLS_ctx.t('auth.verifyEmail.successMessage'));
    const __VLS_14 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({
        to: (`/${__VLS_ctx.lang}/sign-in`),
        ...{ class: "inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90" },
    }));
    const __VLS_16 = __VLS_15({
        to: (`/${__VLS_ctx.lang}/sign-in`),
        ...{ class: "inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_15));
    __VLS_17.slots.default;
    (__VLS_ctx.t('auth.verifyEmail.loginNow'));
    var __VLS_17;
    var __VLS_9;
}
else if (__VLS_ctx.verifyStatus === 'error') {
    /** @type {[typeof AuthLayout, typeof AuthLayout, ]} */ ;
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent(AuthLayout, new AuthLayout({
        title: (__VLS_ctx.t('auth.verifyEmail.title')),
        subtitle: (__VLS_ctx.t('auth.verifyEmail.subtitle')),
    }));
    const __VLS_19 = __VLS_18({
        title: (__VLS_ctx.t('auth.verifyEmail.title')),
        subtitle: (__VLS_ctx.t('auth.verifyEmail.subtitle')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_18));
    __VLS_20.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "py-8 text-center" },
    });
    const __VLS_21 = {}.XCircle;
    /** @type {[typeof __VLS_components.XCircle, ]} */ ;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
        ...{ class: "mx-auto mb-4 h-12 w-12 text-red-500" },
    }));
    const __VLS_23 = __VLS_22({
        ...{ class: "mx-auto mb-4 h-12 w-12 text-red-500" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_22));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "mb-2 text-lg font-semibold" },
    });
    (__VLS_ctx.t('auth.verifyEmail.errorTitle'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "mb-6 text-sm text-gray-500" },
    });
    (__VLS_ctx.getVerifyErrorMessage());
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mt-6 border-t pt-6" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({
        ...{ class: "mb-4 text-sm font-medium" },
    });
    (__VLS_ctx.t('auth.verifyEmail.resendTitle'));
    if (__VLS_ctx.resendSuccess) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "flex flex-col items-center" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-100" },
        });
        const __VLS_25 = {}.Mail;
        /** @type {[typeof __VLS_components.Mail, ]} */ ;
        // @ts-ignore
        const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
            ...{ class: "h-5 w-5 text-green-600" },
        }));
        const __VLS_27 = __VLS_26({
            ...{ class: "h-5 w-5 text-green-600" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_26));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "text-sm text-green-600" },
        });
        (__VLS_ctx.t('auth.verifyEmail.resendSuccess'));
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
            ...{ onSubmit: (__VLS_ctx.handleResend) },
            ...{ class: "space-y-3" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            type: "email",
            placeholder: (__VLS_ctx.t('auth.form.emailPlaceholder')),
            required: true,
            disabled: (__VLS_ctx.resendVerificationMutation.isPending.value),
            ...{ class: "h-11 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50" },
        });
        (__VLS_ctx.resendEmail);
        if (__VLS_ctx.resendVerificationMutation.isError.value) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
                ...{ class: "text-sm text-red-600" },
            });
            (__VLS_ctx.getResendErrorMessage());
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            type: "submit",
            ...{ class: "flex w-full items-center justify-center rounded-md border border-gray-300 px-4 py-2.5 text-sm font-medium hover:bg-gray-50 disabled:opacity-50" },
            disabled: (__VLS_ctx.resendVerificationMutation.isPending.value),
        });
        if (__VLS_ctx.resendVerificationMutation.isPending.value) {
            const __VLS_29 = {}.Loader2;
            /** @type {[typeof __VLS_components.Loader2, ]} */ ;
            // @ts-ignore
            const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
                ...{ class: "mr-2 h-4 w-4 animate-spin" },
            }));
            const __VLS_31 = __VLS_30({
                ...{ class: "mr-2 h-4 w-4 animate-spin" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_30));
            (__VLS_ctx.t('auth.common.sending'));
        }
        else {
            (__VLS_ctx.t('auth.verifyEmail.resendButton'));
        }
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mt-6" },
    });
    const __VLS_33 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
        to: (`/${__VLS_ctx.lang}/sign-in`),
        ...{ class: "text-sm text-primary hover:underline" },
    }));
    const __VLS_35 = __VLS_34({
        to: (`/${__VLS_ctx.lang}/sign-in`),
        ...{ class: "text-sm text-primary hover:underline" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_34));
    __VLS_36.slots.default;
    (__VLS_ctx.t('auth.verifyEmail.backToLogin'));
    var __VLS_36;
    var __VLS_20;
}
else {
    /** @type {[typeof AuthLayout, typeof AuthLayout, ]} */ ;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(AuthLayout, new AuthLayout({
        title: (__VLS_ctx.t('auth.verifyEmail.title')),
        subtitle: (__VLS_ctx.t('auth.verifyEmail.subtitle')),
    }));
    const __VLS_38 = __VLS_37({
        title: (__VLS_ctx.t('auth.verifyEmail.title')),
        subtitle: (__VLS_ctx.t('auth.verifyEmail.subtitle')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    __VLS_39.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "py-6" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mb-6 text-center" },
    });
    const __VLS_40 = {}.Mail;
    /** @type {[typeof __VLS_components.Mail, ]} */ ;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
        ...{ class: "mx-auto mb-4 h-12 w-12 text-gray-400" },
    }));
    const __VLS_42 = __VLS_41({
        ...{ class: "mx-auto mb-4 h-12 w-12 text-gray-400" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_41));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "mb-2 text-lg font-semibold" },
    });
    (__VLS_ctx.t('auth.verifyEmail.checkInbox'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "text-sm text-gray-500" },
    });
    (__VLS_ctx.t('auth.verifyEmail.checkInboxDescription'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "border-t pt-6" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({
        ...{ class: "mb-4 text-center text-sm font-medium" },
    });
    (__VLS_ctx.t('auth.verifyEmail.didntReceive'));
    if (__VLS_ctx.resendSuccess) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "text-center" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-100" },
        });
        const __VLS_44 = {}.Mail;
        /** @type {[typeof __VLS_components.Mail, ]} */ ;
        // @ts-ignore
        const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
            ...{ class: "h-5 w-5 text-green-600" },
        }));
        const __VLS_46 = __VLS_45({
            ...{ class: "h-5 w-5 text-green-600" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_45));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "text-sm text-green-600" },
        });
        (__VLS_ctx.t('auth.verifyEmail.resendSuccess'));
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
            ...{ onSubmit: (__VLS_ctx.handleResend) },
            ...{ class: "space-y-3" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "space-y-2" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
            for: "resend-email",
            ...{ class: "text-sm font-medium" },
        });
        (__VLS_ctx.t('auth.form.email'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            id: "resend-email",
            type: "email",
            placeholder: (__VLS_ctx.t('auth.form.emailPlaceholder')),
            required: true,
            disabled: (__VLS_ctx.resendVerificationMutation.isPending.value),
            ...{ class: "h-11 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50" },
        });
        (__VLS_ctx.resendEmail);
        if (__VLS_ctx.resendVerificationMutation.isError.value) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
                ...{ class: "text-sm text-red-600" },
            });
            (__VLS_ctx.getResendErrorMessage());
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            type: "submit",
            ...{ class: "flex w-full items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50" },
            disabled: (__VLS_ctx.resendVerificationMutation.isPending.value || !__VLS_ctx.resendEmail.trim()),
        });
        if (__VLS_ctx.resendVerificationMutation.isPending.value) {
            const __VLS_48 = {}.Loader2;
            /** @type {[typeof __VLS_components.Loader2, ]} */ ;
            // @ts-ignore
            const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
                ...{ class: "mr-2 h-4 w-4 animate-spin" },
            }));
            const __VLS_50 = __VLS_49({
                ...{ class: "mr-2 h-4 w-4 animate-spin" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_49));
            (__VLS_ctx.t('auth.common.sending'));
        }
        else {
            (__VLS_ctx.t('auth.verifyEmail.resendButton'));
        }
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mt-6 text-center" },
    });
    const __VLS_52 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
        to: (`/${__VLS_ctx.lang}/sign-in`),
        ...{ class: "text-sm text-primary hover:underline" },
    }));
    const __VLS_54 = __VLS_53({
        to: (`/${__VLS_ctx.lang}/sign-in`),
        ...{ class: "text-sm text-primary hover:underline" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_53));
    __VLS_55.slots.default;
    (__VLS_ctx.t('auth.verifyEmail.backToLogin'));
    var __VLS_55;
    var __VLS_39;
}
/** @type {__VLS_StyleScopedClasses['py-12']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-12']} */ ;
/** @type {__VLS_StyleScopedClasses['w-12']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-spin']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
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
/** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-6']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-10']} */ ;
/** @type {__VLS_StyleScopedClasses['w-10']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-green-100']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-600']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
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
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-600']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:opacity-50']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-spin']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:underline']} */ ;
/** @type {__VLS_StyleScopedClasses['py-6']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-12']} */ ;
/** @type {__VLS_StyleScopedClasses['w-12']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-6']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-10']} */ ;
/** @type {__VLS_StyleScopedClasses['w-10']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-green-100']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-600']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
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
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-600']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
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
/** @type {__VLS_StyleScopedClasses['disabled:opacity-50']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-spin']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:underline']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            CheckCircle: CheckCircle,
            XCircle: XCircle,
            Loader2: Loader2,
            Mail: Mail,
            AuthLayout: AuthLayout,
            t: t,
            resendVerificationMutation: resendVerificationMutation,
            lang: lang,
            verifyStatus: verifyStatus,
            resendEmail: resendEmail,
            resendSuccess: resendSuccess,
            handleResend: handleResend,
            getVerifyErrorMessage: getVerifyErrorMessage,
            getResendErrorMessage: getResendErrorMessage,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */

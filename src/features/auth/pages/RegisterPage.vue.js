import { ref, reactive, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { Eye, EyeOff, Loader2, Building2, User, Info } from 'lucide-vue-next';
import AuthLayout from '../components/AuthLayout.vue';
import { useAuth } from '../composables/useAuth';
const route = useRoute();
const router = useRouter();
const { t, locale } = useI18n();
const { registerMutation } = useAuth();
const lang = computed(() => locale.value);
const accountType = ref(route.query.tab === 'professional' ? 'professional' : 'individual');
const form = reactive({
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    // Professional fields
    agencyName: '',
    agencyPhone: '',
    agencyEmail: '',
    agencyAddress: '',
    professionalType: 'agent',
});
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const acceptTerms = ref(false);
const newsletter = ref(true);
const validationErrors = ref({});
function clearError(field) {
    if (validationErrors.value[field]) {
        const next = { ...validationErrors.value };
        delete next[field];
        validationErrors.value = next;
    }
}
function validateForm() {
    const errors = {};
    if (!form.firstName.trim())
        errors.firstName = t('auth.validation.firstNameRequired');
    if (!form.lastName.trim())
        errors.lastName = t('auth.validation.lastNameRequired');
    if (!form.email.trim()) {
        errors.email = t('auth.validation.emailRequired');
    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errors.email = t('auth.validation.emailInvalid');
    }
    if (form.email !== form.confirmEmail) {
        errors.confirmEmail = t('auth.validation.emailMismatch');
    }
    if (!form.password) {
        errors.password = t('auth.validation.passwordRequired');
    }
    else if (form.password.length < 8) {
        errors.password = t('auth.validation.passwordLength');
    }
    if (form.password !== form.confirmPassword) {
        errors.confirmPassword = t('auth.validation.passwordMismatch');
    }
    if (!acceptTerms.value) {
        errors.terms = t('auth.validation.termsRequired');
    }
    if (accountType.value === 'professional') {
        if (!form.agencyName.trim())
            errors.agencyName = t('auth.validation.agencyNameRequired');
        if (form.agencyEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.agencyEmail)) {
            errors.agencyEmail = t('auth.validation.emailInvalid');
        }
    }
    validationErrors.value = errors;
    return Object.keys(errors).length === 0;
}
async function handleSubmit() {
    if (!validateForm())
        return;
    const userType = accountType.value === 'individual' ? 'end_user' : form.professionalType;
    try {
        await registerMutation.mutateAsync({
            email: form.email,
            password: form.password,
            first_name: form.firstName,
            last_name: form.lastName,
            user_type: userType,
            preferred_language: lang.value,
            ...(accountType.value === 'professional' && {
                agency_name: form.agencyName,
                agency_phone: form.agencyPhone,
                agency_email: form.agencyEmail,
                agency_address: form.agencyAddress,
            }),
        });
        if (accountType.value === 'professional') {
            router.push(`/${lang.value}/registration-pending`);
        }
        else {
            router.push(`/${lang.value}`);
        }
    }
    catch {
        // error available via registerMutation.error
    }
}
function getErrorMessage() {
    const error = registerMutation.error.value;
    if (!error)
        return null;
    if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error;
        return axiosError.response?.data?.message || t('auth.errors.register');
    }
    return t('auth.errors.network');
}
function inputClass(field) {
    const base = 'h-11 w-full rounded-md border px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50';
    return validationErrors.value[field] ? `${base} border-red-500` : `${base} border-gray-300`;
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {[typeof AuthLayout, typeof AuthLayout, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(AuthLayout, new AuthLayout({
    title: (__VLS_ctx.t('auth.register.title')),
    subtitle: (__VLS_ctx.t('auth.register.subtitle')),
}));
const __VLS_1 = __VLS_0({
    title: (__VLS_ctx.t('auth.register.title')),
    subtitle: (__VLS_ctx.t('auth.register.subtitle')),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
var __VLS_3 = {};
__VLS_2.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    'data-testid': "register-page",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mb-6 grid grid-cols-2 gap-1 rounded-lg bg-gray-100 p-1" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.accountType = 'individual';
        } },
    type: "button",
    ...{ class: "flex items-center justify-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-colors" },
    ...{ class: (__VLS_ctx.accountType === 'individual'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900') },
});
const __VLS_4 = {}.User;
/** @type {[typeof __VLS_components.User, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    ...{ class: "h-4 w-4" },
}));
const __VLS_6 = __VLS_5({
    ...{ class: "h-4 w-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
(__VLS_ctx.t('auth.register.individual'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.accountType = 'professional';
        } },
    type: "button",
    ...{ class: "flex items-center justify-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-colors" },
    ...{ class: (__VLS_ctx.accountType === 'professional'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900') },
});
const __VLS_8 = {}.Building2;
/** @type {[typeof __VLS_components.Building2, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    ...{ class: "h-4 w-4" },
}));
const __VLS_10 = __VLS_9({
    ...{ class: "h-4 w-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
(__VLS_ctx.t('auth.register.professional'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.form, __VLS_intrinsicElements.form)({
    ...{ onSubmit: (__VLS_ctx.handleSubmit) },
    ...{ class: "space-y-5" },
});
if (__VLS_ctx.accountType === 'individual') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "grid grid-cols-2 gap-4" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "space-y-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "firstName",
        ...{ class: "text-sm font-medium" },
    });
    (__VLS_ctx.t('auth.form.firstName'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        ...{ onInput: (...[$event]) => {
                if (!(__VLS_ctx.accountType === 'individual'))
                    return;
                __VLS_ctx.clearError('firstName');
            } },
        id: "firstName",
        value: (__VLS_ctx.form.firstName),
        type: "text",
        placeholder: (__VLS_ctx.t('auth.form.firstNamePlaceholder')),
        required: true,
        disabled: (__VLS_ctx.registerMutation.isPending.value),
        ...{ class: (__VLS_ctx.inputClass('firstName')) },
    });
    if (__VLS_ctx.validationErrors.firstName) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "text-xs text-red-600" },
        });
        (__VLS_ctx.validationErrors.firstName);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "space-y-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "lastName",
        ...{ class: "text-sm font-medium" },
    });
    (__VLS_ctx.t('auth.form.lastName'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        ...{ onInput: (...[$event]) => {
                if (!(__VLS_ctx.accountType === 'individual'))
                    return;
                __VLS_ctx.clearError('lastName');
            } },
        id: "lastName",
        value: (__VLS_ctx.form.lastName),
        type: "text",
        placeholder: (__VLS_ctx.t('auth.form.lastNamePlaceholder')),
        required: true,
        disabled: (__VLS_ctx.registerMutation.isPending.value),
        ...{ class: (__VLS_ctx.inputClass('lastName')) },
    });
    if (__VLS_ctx.validationErrors.lastName) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "text-xs text-red-600" },
        });
        (__VLS_ctx.validationErrors.lastName);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "space-y-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "email-individual",
        ...{ class: "text-sm font-medium" },
    });
    (__VLS_ctx.t('auth.form.email'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        ...{ onInput: (...[$event]) => {
                if (!(__VLS_ctx.accountType === 'individual'))
                    return;
                __VLS_ctx.clearError('email');
            } },
        id: "email-individual",
        type: "email",
        placeholder: (__VLS_ctx.t('auth.form.emailPlaceholder')),
        required: true,
        autocomplete: "email",
        disabled: (__VLS_ctx.registerMutation.isPending.value),
        ...{ class: (__VLS_ctx.inputClass('email')) },
    });
    (__VLS_ctx.form.email);
    if (__VLS_ctx.validationErrors.email) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "text-xs text-red-600" },
        });
        (__VLS_ctx.validationErrors.email);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "space-y-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "confirmEmail-individual",
        ...{ class: "text-sm font-medium" },
    });
    (__VLS_ctx.t('auth.form.confirmEmail'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        ...{ onInput: (...[$event]) => {
                if (!(__VLS_ctx.accountType === 'individual'))
                    return;
                __VLS_ctx.clearError('confirmEmail');
            } },
        id: "confirmEmail-individual",
        type: "email",
        placeholder: (__VLS_ctx.t('auth.form.confirmEmailPlaceholder')),
        required: true,
        autocomplete: "email",
        disabled: (__VLS_ctx.registerMutation.isPending.value),
        ...{ class: (__VLS_ctx.inputClass('confirmEmail')) },
    });
    (__VLS_ctx.form.confirmEmail);
    if (__VLS_ctx.validationErrors.confirmEmail) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "text-xs text-red-600" },
        });
        (__VLS_ctx.validationErrors.confirmEmail);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "space-y-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "password-individual",
        ...{ class: "text-sm font-medium" },
    });
    (__VLS_ctx.t('auth.form.password'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "relative" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        ...{ onInput: (...[$event]) => {
                if (!(__VLS_ctx.accountType === 'individual'))
                    return;
                __VLS_ctx.clearError('password');
            } },
        id: "password-individual",
        type: (__VLS_ctx.showPassword ? 'text' : 'password'),
        placeholder: (__VLS_ctx.t('auth.form.passwordPlaceholder')),
        required: true,
        autocomplete: "new-password",
        disabled: (__VLS_ctx.registerMutation.isPending.value),
        ...{ class: (__VLS_ctx.inputClass('password') + ' pr-10') },
    });
    (__VLS_ctx.form.password);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.accountType === 'individual'))
                    return;
                __VLS_ctx.showPassword = !__VLS_ctx.showPassword;
            } },
        type: "button",
        ...{ class: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700" },
        tabindex: "-1",
    });
    if (__VLS_ctx.showPassword) {
        const __VLS_12 = {}.EyeOff;
        /** @type {[typeof __VLS_components.EyeOff, ]} */ ;
        // @ts-ignore
        const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
            ...{ class: "h-5 w-5" },
        }));
        const __VLS_14 = __VLS_13({
            ...{ class: "h-5 w-5" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    }
    else {
        const __VLS_16 = {}.Eye;
        /** @type {[typeof __VLS_components.Eye, ]} */ ;
        // @ts-ignore
        const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
            ...{ class: "h-5 w-5" },
        }));
        const __VLS_18 = __VLS_17({
            ...{ class: "h-5 w-5" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_17));
    }
    if (__VLS_ctx.validationErrors.password) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "text-xs text-red-600" },
        });
        (__VLS_ctx.validationErrors.password);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "space-y-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "confirmPassword-individual",
        ...{ class: "text-sm font-medium" },
    });
    (__VLS_ctx.t('auth.form.confirmPassword'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "relative" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        ...{ onInput: (...[$event]) => {
                if (!(__VLS_ctx.accountType === 'individual'))
                    return;
                __VLS_ctx.clearError('confirmPassword');
            } },
        id: "confirmPassword-individual",
        type: (__VLS_ctx.showConfirmPassword ? 'text' : 'password'),
        placeholder: (__VLS_ctx.t('auth.form.confirmPasswordPlaceholder')),
        required: true,
        autocomplete: "new-password",
        disabled: (__VLS_ctx.registerMutation.isPending.value),
        ...{ class: (__VLS_ctx.inputClass('confirmPassword') + ' pr-10') },
    });
    (__VLS_ctx.form.confirmPassword);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.accountType === 'individual'))
                    return;
                __VLS_ctx.showConfirmPassword = !__VLS_ctx.showConfirmPassword;
            } },
        type: "button",
        ...{ class: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700" },
        tabindex: "-1",
    });
    if (__VLS_ctx.showConfirmPassword) {
        const __VLS_20 = {}.EyeOff;
        /** @type {[typeof __VLS_components.EyeOff, ]} */ ;
        // @ts-ignore
        const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
            ...{ class: "h-5 w-5" },
        }));
        const __VLS_22 = __VLS_21({
            ...{ class: "h-5 w-5" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    }
    else {
        const __VLS_24 = {}.Eye;
        /** @type {[typeof __VLS_components.Eye, ]} */ ;
        // @ts-ignore
        const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
            ...{ class: "h-5 w-5" },
        }));
        const __VLS_26 = __VLS_25({
            ...{ class: "h-5 w-5" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    }
    if (__VLS_ctx.validationErrors.confirmPassword) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "text-xs text-red-600" },
        });
        (__VLS_ctx.validationErrors.confirmPassword);
    }
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "space-y-3" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: "text-sm font-medium" },
    });
    (__VLS_ctx.t('auth.form.professionalType'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "grid grid-cols-3 gap-3" },
    });
    for (const [type] of __VLS_getVForSourceType(['owner', 'agent', 'agency_admin'])) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.accountType === 'individual'))
                        return;
                    __VLS_ctx.form.professionalType = type;
                } },
            key: (type),
            type: "button",
            ...{ class: "flex h-auto flex-col items-center gap-1 rounded-md border px-3 py-3 text-xs font-medium transition-colors" },
            ...{ class: (__VLS_ctx.form.professionalType === type
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-300 hover:border-gray-400') },
        });
        if (type === 'owner') {
            const __VLS_28 = {}.User;
            /** @type {[typeof __VLS_components.User, ]} */ ;
            // @ts-ignore
            const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
                ...{ class: "h-5 w-5" },
            }));
            const __VLS_30 = __VLS_29({
                ...{ class: "h-5 w-5" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_29));
        }
        else {
            const __VLS_32 = {}.Building2;
            /** @type {[typeof __VLS_components.Building2, ]} */ ;
            // @ts-ignore
            const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
                ...{ class: "h-5 w-5" },
            }));
            const __VLS_34 = __VLS_33({
                ...{ class: "h-5 w-5" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_33));
        }
        (__VLS_ctx.t(`auth.form.${type === 'agency_admin' ? 'agencyAdmin' : type}`));
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "space-y-4 rounded-lg bg-gray-50 p-4" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "flex items-center gap-2 text-sm font-medium" },
    });
    const __VLS_36 = {}.Building2;
    /** @type {[typeof __VLS_components.Building2, ]} */ ;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
        ...{ class: "h-4 w-4" },
    }));
    const __VLS_38 = __VLS_37({
        ...{ class: "h-4 w-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    (__VLS_ctx.t('auth.form.companyInfo'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "space-y-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "agencyName",
        ...{ class: "text-sm font-medium" },
    });
    (__VLS_ctx.t('auth.form.agencyName'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        ...{ onInput: (...[$event]) => {
                if (!!(__VLS_ctx.accountType === 'individual'))
                    return;
                __VLS_ctx.clearError('agencyName');
            } },
        id: "agencyName",
        value: (__VLS_ctx.form.agencyName),
        type: "text",
        placeholder: (__VLS_ctx.t('auth.form.agencyNamePlaceholder')),
        required: true,
        disabled: (__VLS_ctx.registerMutation.isPending.value),
        ...{ class: (__VLS_ctx.inputClass('agencyName')) },
    });
    if (__VLS_ctx.validationErrors.agencyName) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "text-xs text-red-600" },
        });
        (__VLS_ctx.validationErrors.agencyName);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "grid grid-cols-2 gap-4" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "space-y-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "agencyPhone",
        ...{ class: "text-sm font-medium" },
    });
    (__VLS_ctx.t('auth.form.agencyPhone'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        id: "agencyPhone",
        type: "tel",
        placeholder: (__VLS_ctx.t('auth.form.agencyPhonePlaceholder')),
        disabled: (__VLS_ctx.registerMutation.isPending.value),
        ...{ class: "h-11 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50" },
    });
    (__VLS_ctx.form.agencyPhone);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "space-y-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "agencyEmail",
        ...{ class: "text-sm font-medium" },
    });
    (__VLS_ctx.t('auth.form.agencyEmail'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        ...{ onInput: (...[$event]) => {
                if (!!(__VLS_ctx.accountType === 'individual'))
                    return;
                __VLS_ctx.clearError('agencyEmail');
            } },
        id: "agencyEmail",
        type: "email",
        placeholder: (__VLS_ctx.t('auth.form.agencyEmailPlaceholder')),
        disabled: (__VLS_ctx.registerMutation.isPending.value),
        ...{ class: (__VLS_ctx.inputClass('agencyEmail')) },
    });
    (__VLS_ctx.form.agencyEmail);
    if (__VLS_ctx.validationErrors.agencyEmail) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "text-xs text-red-600" },
        });
        (__VLS_ctx.validationErrors.agencyEmail);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "space-y-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "agencyAddress",
        ...{ class: "text-sm font-medium" },
    });
    (__VLS_ctx.t('auth.form.agencyAddress'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        id: "agencyAddress",
        value: (__VLS_ctx.form.agencyAddress),
        type: "text",
        placeholder: (__VLS_ctx.t('auth.form.agencyAddressPlaceholder')),
        disabled: (__VLS_ctx.registerMutation.isPending.value),
        ...{ class: "h-11 w-full rounded-md border border-gray-300 px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "space-y-4" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "flex items-center gap-2 text-sm font-medium" },
    });
    const __VLS_40 = {}.User;
    /** @type {[typeof __VLS_components.User, ]} */ ;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
        ...{ class: "h-4 w-4" },
    }));
    const __VLS_42 = __VLS_41({
        ...{ class: "h-4 w-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_41));
    (__VLS_ctx.t('auth.form.personalInfo'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "grid grid-cols-2 gap-4" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "space-y-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "firstName-pro",
        ...{ class: "text-sm font-medium" },
    });
    (__VLS_ctx.t('auth.form.firstName'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        ...{ onInput: (...[$event]) => {
                if (!!(__VLS_ctx.accountType === 'individual'))
                    return;
                __VLS_ctx.clearError('firstName');
            } },
        id: "firstName-pro",
        value: (__VLS_ctx.form.firstName),
        type: "text",
        placeholder: (__VLS_ctx.t('auth.form.firstNamePlaceholder')),
        required: true,
        disabled: (__VLS_ctx.registerMutation.isPending.value),
        ...{ class: (__VLS_ctx.inputClass('firstName')) },
    });
    if (__VLS_ctx.validationErrors.firstName) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "text-xs text-red-600" },
        });
        (__VLS_ctx.validationErrors.firstName);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "space-y-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "lastName-pro",
        ...{ class: "text-sm font-medium" },
    });
    (__VLS_ctx.t('auth.form.lastName'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        ...{ onInput: (...[$event]) => {
                if (!!(__VLS_ctx.accountType === 'individual'))
                    return;
                __VLS_ctx.clearError('lastName');
            } },
        id: "lastName-pro",
        value: (__VLS_ctx.form.lastName),
        type: "text",
        placeholder: (__VLS_ctx.t('auth.form.lastNamePlaceholder')),
        required: true,
        disabled: (__VLS_ctx.registerMutation.isPending.value),
        ...{ class: (__VLS_ctx.inputClass('lastName')) },
    });
    if (__VLS_ctx.validationErrors.lastName) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "text-xs text-red-600" },
        });
        (__VLS_ctx.validationErrors.lastName);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "space-y-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "email-pro",
        ...{ class: "text-sm font-medium" },
    });
    (__VLS_ctx.t('auth.form.email'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        ...{ onInput: (...[$event]) => {
                if (!!(__VLS_ctx.accountType === 'individual'))
                    return;
                __VLS_ctx.clearError('email');
            } },
        id: "email-pro",
        type: "email",
        placeholder: (__VLS_ctx.t('auth.form.emailPlaceholder')),
        required: true,
        autocomplete: "email",
        disabled: (__VLS_ctx.registerMutation.isPending.value),
        ...{ class: (__VLS_ctx.inputClass('email')) },
    });
    (__VLS_ctx.form.email);
    if (__VLS_ctx.validationErrors.email) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "text-xs text-red-600" },
        });
        (__VLS_ctx.validationErrors.email);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "space-y-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "confirmEmail-pro",
        ...{ class: "text-sm font-medium" },
    });
    (__VLS_ctx.t('auth.form.confirmEmail'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        ...{ onInput: (...[$event]) => {
                if (!!(__VLS_ctx.accountType === 'individual'))
                    return;
                __VLS_ctx.clearError('confirmEmail');
            } },
        id: "confirmEmail-pro",
        type: "email",
        placeholder: (__VLS_ctx.t('auth.form.confirmEmailPlaceholder')),
        required: true,
        autocomplete: "email",
        disabled: (__VLS_ctx.registerMutation.isPending.value),
        ...{ class: (__VLS_ctx.inputClass('confirmEmail')) },
    });
    (__VLS_ctx.form.confirmEmail);
    if (__VLS_ctx.validationErrors.confirmEmail) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "text-xs text-red-600" },
        });
        (__VLS_ctx.validationErrors.confirmEmail);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "space-y-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "password-pro",
        ...{ class: "text-sm font-medium" },
    });
    (__VLS_ctx.t('auth.form.password'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "relative" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        ...{ onInput: (...[$event]) => {
                if (!!(__VLS_ctx.accountType === 'individual'))
                    return;
                __VLS_ctx.clearError('password');
            } },
        id: "password-pro",
        type: (__VLS_ctx.showPassword ? 'text' : 'password'),
        placeholder: (__VLS_ctx.t('auth.form.passwordPlaceholder')),
        required: true,
        autocomplete: "new-password",
        disabled: (__VLS_ctx.registerMutation.isPending.value),
        ...{ class: (__VLS_ctx.inputClass('password') + ' pr-10') },
    });
    (__VLS_ctx.form.password);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!!(__VLS_ctx.accountType === 'individual'))
                    return;
                __VLS_ctx.showPassword = !__VLS_ctx.showPassword;
            } },
        type: "button",
        ...{ class: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700" },
        tabindex: "-1",
    });
    if (__VLS_ctx.showPassword) {
        const __VLS_44 = {}.EyeOff;
        /** @type {[typeof __VLS_components.EyeOff, ]} */ ;
        // @ts-ignore
        const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
            ...{ class: "h-5 w-5" },
        }));
        const __VLS_46 = __VLS_45({
            ...{ class: "h-5 w-5" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_45));
    }
    else {
        const __VLS_48 = {}.Eye;
        /** @type {[typeof __VLS_components.Eye, ]} */ ;
        // @ts-ignore
        const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
            ...{ class: "h-5 w-5" },
        }));
        const __VLS_50 = __VLS_49({
            ...{ class: "h-5 w-5" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_49));
    }
    if (__VLS_ctx.validationErrors.password) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "text-xs text-red-600" },
        });
        (__VLS_ctx.validationErrors.password);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "space-y-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        for: "confirmPassword-pro",
        ...{ class: "text-sm font-medium" },
    });
    (__VLS_ctx.t('auth.form.confirmPassword'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "relative" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        ...{ onInput: (...[$event]) => {
                if (!!(__VLS_ctx.accountType === 'individual'))
                    return;
                __VLS_ctx.clearError('confirmPassword');
            } },
        id: "confirmPassword-pro",
        type: (__VLS_ctx.showConfirmPassword ? 'text' : 'password'),
        placeholder: (__VLS_ctx.t('auth.form.confirmPasswordPlaceholder')),
        required: true,
        autocomplete: "new-password",
        disabled: (__VLS_ctx.registerMutation.isPending.value),
        ...{ class: (__VLS_ctx.inputClass('confirmPassword') + ' pr-10') },
    });
    (__VLS_ctx.form.confirmPassword);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!!(__VLS_ctx.accountType === 'individual'))
                    return;
                __VLS_ctx.showConfirmPassword = !__VLS_ctx.showConfirmPassword;
            } },
        type: "button",
        ...{ class: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700" },
        tabindex: "-1",
    });
    if (__VLS_ctx.showConfirmPassword) {
        const __VLS_52 = {}.EyeOff;
        /** @type {[typeof __VLS_components.EyeOff, ]} */ ;
        // @ts-ignore
        const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
            ...{ class: "h-5 w-5" },
        }));
        const __VLS_54 = __VLS_53({
            ...{ class: "h-5 w-5" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_53));
    }
    else {
        const __VLS_56 = {}.Eye;
        /** @type {[typeof __VLS_components.Eye, ]} */ ;
        // @ts-ignore
        const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
            ...{ class: "h-5 w-5" },
        }));
        const __VLS_58 = __VLS_57({
            ...{ class: "h-5 w-5" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_57));
    }
    if (__VLS_ctx.validationErrors.confirmPassword) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "text-xs text-red-600" },
        });
        (__VLS_ctx.validationErrors.confirmPassword);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "flex items-start gap-3 rounded-lg border border-blue-100 bg-blue-50 p-4" },
    });
    const __VLS_60 = {}.Info;
    /** @type {[typeof __VLS_components.Info, ]} */ ;
    // @ts-ignore
    const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
        ...{ class: "mt-0.5 h-5 w-5 shrink-0 text-blue-600" },
    }));
    const __VLS_62 = __VLS_61({
        ...{ class: "mt-0.5 h-5 w-5 shrink-0 text-blue-600" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_61));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "text-sm text-blue-800" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "mb-1 font-medium" },
    });
    (__VLS_ctx.t('auth.register.professionalNotice'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "text-blue-700" },
    });
    (__VLS_ctx.t('auth.register.professionalNoticeText'));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "space-y-4 pt-2" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex items-start space-x-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    id: "newsletter",
    type: "checkbox",
    disabled: (__VLS_ctx.registerMutation.isPending.value),
    ...{ class: "mt-0.5 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" },
});
(__VLS_ctx.newsletter);
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    for: "newsletter",
    ...{ class: "cursor-pointer text-sm leading-5 text-gray-700" },
});
(__VLS_ctx.t('auth.register.newsletter'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex items-start space-x-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    ...{ onChange: (...[$event]) => {
            __VLS_ctx.clearError('terms');
        } },
    id: "terms",
    type: "checkbox",
    disabled: (__VLS_ctx.registerMutation.isPending.value),
    ...{ class: "mt-0.5 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" },
    ...{ class: (__VLS_ctx.validationErrors.terms ? 'border-red-500' : '') },
});
(__VLS_ctx.acceptTerms);
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    for: "terms",
    ...{ class: "cursor-pointer text-sm leading-5 text-gray-700" },
});
(__VLS_ctx.t('auth.register.terms'));
const __VLS_64 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
// @ts-ignore
const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({
    to: (`/${__VLS_ctx.lang}/terms`),
    ...{ class: "text-primary hover:underline" },
    target: "_blank",
}));
const __VLS_66 = __VLS_65({
    to: (`/${__VLS_ctx.lang}/terms`),
    ...{ class: "text-primary hover:underline" },
    target: "_blank",
}, ...__VLS_functionalComponentArgsRest(__VLS_65));
__VLS_67.slots.default;
(__VLS_ctx.t('auth.register.termsLink'));
var __VLS_67;
(__VLS_ctx.t('auth.register.termsAnd'));
const __VLS_68 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
// @ts-ignore
const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({
    to: (`/${__VLS_ctx.lang}/privacy`),
    ...{ class: "text-primary hover:underline" },
    target: "_blank",
}));
const __VLS_70 = __VLS_69({
    to: (`/${__VLS_ctx.lang}/privacy`),
    ...{ class: "text-primary hover:underline" },
    target: "_blank",
}, ...__VLS_functionalComponentArgsRest(__VLS_69));
__VLS_71.slots.default;
(__VLS_ctx.t('auth.register.privacyLink'));
var __VLS_71;
if (__VLS_ctx.validationErrors.terms) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "ml-7 text-xs text-red-600" },
    });
    (__VLS_ctx.validationErrors.terms);
}
if (__VLS_ctx.registerMutation.isError.value) {
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
    disabled: (__VLS_ctx.registerMutation.isPending.value),
    'data-testid': "register-button",
});
if (__VLS_ctx.registerMutation.isPending.value) {
    const __VLS_72 = {}.Loader2;
    /** @type {[typeof __VLS_components.Loader2, ]} */ ;
    // @ts-ignore
    const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({
        ...{ class: "mr-2 h-4 w-4 animate-spin" },
    }));
    const __VLS_74 = __VLS_73({
        ...{ class: "mr-2 h-4 w-4 animate-spin" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_73));
    (__VLS_ctx.t('auth.register.creating'));
}
else {
    (__VLS_ctx.accountType === 'individual' ? __VLS_ctx.t('auth.register.submit') : __VLS_ctx.t('auth.register.submitProfessional'));
}
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
(__VLS_ctx.t('auth.register.or'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "text-center" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "mb-2 text-sm text-gray-600" },
});
(__VLS_ctx.t('auth.register.hasAccount'));
const __VLS_76 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
// @ts-ignore
const __VLS_77 = __VLS_asFunctionalComponent(__VLS_76, new __VLS_76({
    to: (`/${__VLS_ctx.lang}/sign-in`),
    ...{ class: "text-sm font-semibold text-primary hover:underline" },
}));
const __VLS_78 = __VLS_77({
    to: (`/${__VLS_ctx.lang}/sign-in`),
    ...{ class: "text-sm font-semibold text-primary hover:underline" },
}, ...__VLS_functionalComponentArgsRest(__VLS_77));
__VLS_79.slots.default;
(__VLS_ctx.t('auth.register.login'));
var __VLS_79;
var __VLS_2;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['p-1']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-5']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-600']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-600']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-600']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-600']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
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
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-600']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
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
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-600']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-3']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-600']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
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
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-600']} */ ;
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
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-600']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-600']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-600']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-600']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
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
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-600']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
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
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-600']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-start']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-blue-100']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-blue-50']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-0.5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['text-blue-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-blue-800']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-blue-700']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-start']} */ ;
/** @type {__VLS_StyleScopedClasses['space-x-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-0.5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-start']} */ ;
/** @type {__VLS_StyleScopedClasses['space-x-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-0.5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:underline']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:underline']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-7']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-600']} */ ;
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
            Building2: Building2,
            User: User,
            Info: Info,
            AuthLayout: AuthLayout,
            t: t,
            registerMutation: registerMutation,
            lang: lang,
            accountType: accountType,
            form: form,
            showPassword: showPassword,
            showConfirmPassword: showConfirmPassword,
            acceptTerms: acceptTerms,
            newsletter: newsletter,
            validationErrors: validationErrors,
            clearError: clearError,
            handleSubmit: handleSubmit,
            getErrorMessage: getErrorMessage,
            inputClass: inputClass,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */

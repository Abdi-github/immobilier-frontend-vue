import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { ArrowLeft, ArrowRight, Save, Send, Loader2, X } from 'lucide-vue-next';
import { useToast } from 'primevue/usetoast';
import SEO from '@/shared/components/SEO.vue';
import PropertyForm from '../components/PropertyForm.vue';
import PropertyFormSteps from '../components/PropertyFormSteps.vue';
import { usePropertyForm } from '../composables/usePropertyForm';
import { useCreateProperty } from '../composables/useMyProperties';
import { useUploadMultipleImages } from '../composables/usePropertyImages';
import { propertyManagementApi } from '../api/property-management.api';
import { computed } from 'vue';
debugger; /* PartiallyEnd: #3632/both.vue */
export default await (async () => {
    const { t, locale } = useI18n();
    const router = useRouter();
    const toast = useToast();
    const form = usePropertyForm();
    const { state, validateStep, nextStep, prevStep, goToStep, isFirstStep, isLastStep } = form;
    const createMutation = useCreateProperty();
    const uploadMutation = useUploadMultipleImages();
    const isLoading = computed(() => createMutation.isPending.value || uploadMutation.isPending.value || state.isSubmitting);
    function handleNext() {
        if (validateStep(state.currentStep)) {
            nextStep();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
    function handlePrev() {
        prevStep();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    async function handleSubmit() {
        if (!validateStep(state.currentStep))
            return;
        state.isSubmitting = true;
        try {
            // 1. Create property
            const property = await createMutation.mutateAsync({
                source_language: state.source_language,
                category_id: state.category_id,
                transaction_type: state.transaction_type,
                price: Number(state.price),
                additional_costs: state.additional_costs ? Number(state.additional_costs) : undefined,
                canton_id: state.canton_id,
                city_id: state.city_id,
                address: state.address,
                postal_code: state.postal_code || undefined,
                rooms: state.rooms ? Number(state.rooms) : undefined,
                surface: state.surface ? Number(state.surface) : undefined,
                amenities: state.amenities.length > 0 ? state.amenities : undefined,
                title: state.title,
                description: state.description,
            });
            toast.add({ severity: 'success', summary: t('form.success.created'), life: 5000 });
            // 2. Create translation
            try {
                await propertyManagementApi.createTranslation({
                    property_id: property.id,
                    language: state.source_language,
                    title: state.title,
                    description: state.description,
                    source: 'original',
                });
            }
            catch {
                // Translation failed, but property was created — non-blocking
            }
            // 3. Upload images
            if (state.imageFiles.length > 0) {
                const formData = new FormData();
                state.imageFiles.forEach((file) => formData.append('images', file));
                await uploadMutation.mutateAsync({ propertyId: property.id, formData });
            }
            router.push({ name: 'my-properties', params: { lang: locale.value } });
        }
        catch (error) {
            const message = error.response?.data?.message;
            toast.add({ severity: 'error', summary: message || t('form.error.createFailed'), life: 5000 });
        }
        finally {
            state.isSubmitting = false;
        }
    }
    async function handleSaveDraft() {
        if (!state.category_id || !state.price) {
            toast.add({ severity: 'error', summary: 'Please fill in at least the category and price.', life: 5000 });
            return;
        }
        state.isSubmitting = true;
        try {
            await createMutation.mutateAsync({
                source_language: state.source_language,
                category_id: state.category_id,
                transaction_type: state.transaction_type,
                price: Number(state.price),
                additional_costs: state.additional_costs ? Number(state.additional_costs) : undefined,
                canton_id: state.canton_id || undefined,
                city_id: state.city_id || undefined,
                address: state.address || 'Draft - Address pending',
                postal_code: state.postal_code || undefined,
                rooms: state.rooms ? Number(state.rooms) : undefined,
                surface: state.surface ? Number(state.surface) : undefined,
                amenities: state.amenities.length > 0 ? state.amenities : undefined,
                title: state.title || 'Draft Property',
                description: state.description || 'Description pending...',
            });
            toast.add({ severity: 'success', summary: t('form.success.draftSaved'), life: 5000 });
            router.push({ name: 'my-properties', params: { lang: locale.value } });
        }
        catch (error) {
            const message = error.response?.data?.message;
            toast.add({ severity: 'error', summary: message || t('form.error.createFailed'), life: 5000 });
        }
        finally {
            state.isSubmitting = false;
        }
    }
    debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        'data-testid': "create-property-page",
        ...{ class: "min-h-screen bg-gray-50" },
    });
    /** @type {[typeof SEO, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(SEO, new SEO({
        title: (__VLS_ctx.t('form.createTitle')),
    }));
    const __VLS_1 = __VLS_0({
        title: (__VLS_ctx.t('form.createTitle')),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({
        ...{ class: "bg-white border-b sticky top-0 z-10" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "flex items-center justify-between h-16" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "flex items-center gap-4" },
    });
    const __VLS_3 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_4 = __VLS_asFunctionalComponent(__VLS_3, new __VLS_3({
        to: ({ name: 'my-properties', params: { lang: __VLS_ctx.locale } }),
        ...{ class: "flex items-center gap-2 text-gray-600 hover:text-gray-900" },
    }));
    const __VLS_5 = __VLS_4({
        to: ({ name: 'my-properties', params: { lang: __VLS_ctx.locale } }),
        ...{ class: "flex items-center gap-2 text-gray-600 hover:text-gray-900" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_4));
    __VLS_6.slots.default;
    const __VLS_7 = {}.ArrowLeft;
    /** @type {[typeof __VLS_components.ArrowLeft, ]} */ ;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({
        ...{ class: "h-5 w-5" },
    }));
    const __VLS_9 = __VLS_8({
        ...{ class: "h-5 w-5" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "hidden sm:inline" },
    });
    (__VLS_ctx.t('form.actions.cancel'));
    var __VLS_6;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div)({
        ...{ class: "h-6 w-px bg-gray-200" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
        ...{ class: "text-lg font-semibold text-gray-900" },
    });
    (__VLS_ctx.t('form.createTitle'));
    const __VLS_11 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({
        to: ({ name: 'my-properties', params: { lang: __VLS_ctx.locale } }),
        ...{ class: "rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600" },
    }));
    const __VLS_13 = __VLS_12({
        to: ({ name: 'my-properties', params: { lang: __VLS_ctx.locale } }),
        ...{ class: "rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_12));
    __VLS_14.slots.default;
    const __VLS_15 = {}.X;
    /** @type {[typeof __VLS_components.X, ]} */ ;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
        ...{ class: "h-5 w-5" },
    }));
    const __VLS_17 = __VLS_16({
        ...{ class: "h-5 w-5" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_16));
    var __VLS_14;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({
        ...{ class: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "grid grid-cols-1 lg:grid-cols-4 gap-8" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.aside, __VLS_intrinsicElements.aside)({
        ...{ class: "lg:col-span-1" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "lg:sticky lg:top-24" },
    });
    /** @type {[typeof PropertyFormSteps, ]} */ ;
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent(PropertyFormSteps, new PropertyFormSteps({
        currentStep: (__VLS_ctx.state.currentStep),
        onGoToStep: (__VLS_ctx.goToStep),
    }));
    const __VLS_20 = __VLS_19({
        currentStep: (__VLS_ctx.state.currentStep),
        onGoToStep: (__VLS_ctx.goToStep),
    }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "lg:col-span-3" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "bg-white rounded-xl shadow-sm border p-6 sm:p-8" },
    });
    /** @type {[typeof PropertyForm, ]} */ ;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent(PropertyForm, new PropertyForm({
        form: (__VLS_ctx.form),
    }));
    const __VLS_23 = __VLS_22({
        form: (__VLS_ctx.form),
    }, ...__VLS_functionalComponentArgsRest(__VLS_22));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 mt-6 border-t" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    if (!__VLS_ctx.isFirstStep) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.handlePrev) },
            type: "button",
            disabled: (__VLS_ctx.isLoading),
            ...{ class: "flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 disabled:opacity-50" },
        });
        const __VLS_25 = {}.ArrowLeft;
        /** @type {[typeof __VLS_components.ArrowLeft, ]} */ ;
        // @ts-ignore
        const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
            ...{ class: "h-4 w-4" },
        }));
        const __VLS_27 = __VLS_26({
            ...{ class: "h-4 w-4" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_26));
        (__VLS_ctx.t('form.actions.previous'));
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "flex items-center gap-2" },
    });
    if (!__VLS_ctx.isLastStep) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.handleSaveDraft) },
            type: "button",
            disabled: (__VLS_ctx.isLoading),
            ...{ class: "flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 disabled:opacity-50" },
        });
        if (__VLS_ctx.isLoading) {
            const __VLS_29 = {}.Loader2;
            /** @type {[typeof __VLS_components.Loader2, ]} */ ;
            // @ts-ignore
            const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
                ...{ class: "h-4 w-4 animate-spin" },
            }));
            const __VLS_31 = __VLS_30({
                ...{ class: "h-4 w-4 animate-spin" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_30));
        }
        else {
            const __VLS_33 = {}.Save;
            /** @type {[typeof __VLS_components.Save, ]} */ ;
            // @ts-ignore
            const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
                ...{ class: "h-4 w-4" },
            }));
            const __VLS_35 = __VLS_34({
                ...{ class: "h-4 w-4" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_34));
        }
        (__VLS_ctx.t('form.actions.saveDraft'));
    }
    if (__VLS_ctx.isLastStep) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.handleSubmit) },
            type: "button",
            disabled: (__VLS_ctx.isLoading),
            ...{ class: "flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50 min-w-[150px] justify-center" },
        });
        if (__VLS_ctx.isLoading) {
            const __VLS_37 = {}.Loader2;
            /** @type {[typeof __VLS_components.Loader2, ]} */ ;
            // @ts-ignore
            const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
                ...{ class: "h-4 w-4 animate-spin" },
            }));
            const __VLS_39 = __VLS_38({
                ...{ class: "h-4 w-4 animate-spin" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_38));
        }
        else {
            const __VLS_41 = {}.Send;
            /** @type {[typeof __VLS_components.Send, ]} */ ;
            // @ts-ignore
            const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({
                ...{ class: "h-4 w-4" },
            }));
            const __VLS_43 = __VLS_42({
                ...{ class: "h-4 w-4" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_42));
        }
        (__VLS_ctx.isLoading ? __VLS_ctx.t('form.actions.submitting') : __VLS_ctx.t('form.actions.submit'));
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.handleNext) },
            type: "button",
            disabled: (__VLS_ctx.isLoading),
            ...{ class: "flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50" },
        });
        (__VLS_ctx.t('form.actions.next'));
        const __VLS_45 = {}.ArrowRight;
        /** @type {[typeof __VLS_components.ArrowRight, ]} */ ;
        // @ts-ignore
        const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
            ...{ class: "h-4 w-4" },
        }));
        const __VLS_47 = __VLS_46({
            ...{ class: "h-4 w-4" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_46));
    }
    /** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-gray-50']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-b']} */ ;
    /** @type {__VLS_StyleScopedClasses['sticky']} */ ;
    /** @type {__VLS_StyleScopedClasses['top-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['z-10']} */ ;
    /** @type {__VLS_StyleScopedClasses['max-w-5xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:px-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['lg:px-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-16']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:text-gray-900']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['hidden']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:inline']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-px']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-gray-200']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-gray-900']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-gray-400']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:bg-gray-100']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:text-gray-600']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['max-w-5xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:px-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['lg:px-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid']} */ ;
    /** @type {__VLS_StyleScopedClasses['grid-cols-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['lg:grid-cols-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['lg:col-span-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['lg:sticky']} */ ;
    /** @type {__VLS_StyleScopedClasses['lg:top-24']} */ ;
    /** @type {__VLS_StyleScopedClasses['lg:col-span-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:p-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:flex-row']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['pt-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-t']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:bg-gray-50']} */ ;
    /** @type {__VLS_StyleScopedClasses['disabled:opacity-50']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:bg-gray-50']} */ ;
    /** @type {__VLS_StyleScopedClasses['disabled:opacity-50']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['animate-spin']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-white']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:bg-primary/90']} */ ;
    /** @type {__VLS_StyleScopedClasses['disabled:opacity-50']} */ ;
    /** @type {__VLS_StyleScopedClasses['min-w-[150px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['animate-spin']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-white']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:bg-primary/90']} */ ;
    /** @type {__VLS_StyleScopedClasses['disabled:opacity-50']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
    var __VLS_dollars;
    const __VLS_self = (await import('vue')).defineComponent({
        setup() {
            return {
                ArrowLeft: ArrowLeft,
                ArrowRight: ArrowRight,
                Save: Save,
                Send: Send,
                Loader2: Loader2,
                X: X,
                SEO: SEO,
                PropertyForm: PropertyForm,
                PropertyFormSteps: PropertyFormSteps,
                t: t,
                locale: locale,
                form: form,
                state: state,
                goToStep: goToStep,
                isFirstStep: isFirstStep,
                isLastStep: isLastStep,
                isLoading: isLoading,
                handleNext: handleNext,
                handlePrev: handlePrev,
                handleSubmit: handleSubmit,
                handleSaveDraft: handleSaveDraft,
            };
        },
    });
    return (await import('vue')).defineComponent({
        setup() {
            return {};
        },
    });
})(); /* PartiallyEnd: #4569/main.vue */

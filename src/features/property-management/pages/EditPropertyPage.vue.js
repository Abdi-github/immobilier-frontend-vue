import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeft, ArrowRight, Save, Loader2, X } from 'lucide-vue-next';
import { useToast } from 'primevue/usetoast';
import Skeleton from 'primevue/skeleton';
import SEO from '@/shared/components/SEO.vue';
import PropertyForm from '../components/PropertyForm.vue';
import PropertyFormSteps from '../components/PropertyFormSteps.vue';
import { usePropertyForm } from '../composables/usePropertyForm';
import { useMyProperty, useUpdateProperty } from '../composables/useMyProperties';
import { useUploadMultipleImages } from '../composables/usePropertyImages';
import { ref } from 'vue';
debugger; /* PartiallyEnd: #3632/both.vue */
export default await (async () => {
    const { t, locale } = useI18n();
    const route = useRoute();
    const router = useRouter();
    const toast = useToast();
    const propertyId = computed(() => route.params.id);
    const { data: property, isLoading: isFetching, isError } = useMyProperty(propertyId);
    const form = usePropertyForm();
    const { state, validateStep, nextStep, prevStep, goToStep, isFirstStep, isLastStep } = form;
    const updateMutation = useUpdateProperty();
    const uploadMutation = useUploadMultipleImages();
    const isLoading = computed(() => updateMutation.isPending.value || uploadMutation.isPending.value || state.isSubmitting);
    // Populate form when property data loads
    const populated = ref(false);
    watch(property, (p) => {
        if (p && !populated.value) {
            populated.value = true;
            mapPropertyToForm(p);
        }
    });
    function mapPropertyToForm(p) {
        state.source_language = p.source_language || 'en';
        state.category_id = p.category_id || '';
        state.transaction_type = p.transaction_type || 'rent';
        state.price = p.price ? String(p.price) : '';
        state.additional_costs = p.additional_costs ? String(p.additional_costs) : '';
        state.canton_id = p.canton_id || '';
        state.city_id = p.city_id || '';
        state.address = p.address || '';
        state.postal_code = p.postal_code || '';
        state.rooms = p.rooms ? String(p.rooms) : '';
        state.surface = p.surface ? String(p.surface) : '';
        state.title = p.title || p.translation?.title || '';
        state.description = p.description || p.translation?.description || '';
        state.amenities = p.amenities || [];
    }
    const existingImages = computed(() => property.value?.images?.map((img) => ({
        id: img.id,
        url: img.thumbnail_url || img.url,
        is_primary: img.is_primary,
    })) ?? []);
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
    async function handleSave() {
        state.isSubmitting = true;
        try {
            await updateMutation.mutateAsync({
                id: propertyId.value,
                data: {
                    source_language: state.source_language,
                    category_id: state.category_id,
                    transaction_type: state.transaction_type,
                    price: Number(state.price),
                    additional_costs: state.additional_costs ? Number(state.additional_costs) : undefined,
                    canton_id: state.canton_id || undefined,
                    city_id: state.city_id || undefined,
                    address: state.address,
                    postal_code: state.postal_code || undefined,
                    rooms: state.rooms ? Number(state.rooms) : undefined,
                    surface: state.surface ? Number(state.surface) : undefined,
                    amenities: state.amenities.length > 0 ? state.amenities : undefined,
                },
            });
            // Upload new images
            if (state.imageFiles.length > 0) {
                const formData = new FormData();
                state.imageFiles.forEach((file) => formData.append('images', file));
                await uploadMutation.mutateAsync({ propertyId: propertyId.value, formData });
                state.imageFiles = [];
                state.imagePreviews = [];
            }
            toast.add({ severity: 'success', summary: t('form.success.updated'), life: 5000 });
            router.push({ name: 'my-properties', params: { lang: locale.value } });
        }
        catch (error) {
            const message = error.response?.data?.message;
            toast.add({ severity: 'error', summary: message || t('form.error.updateFailed'), life: 5000 });
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
        'data-testid': "edit-property-page",
        ...{ class: "min-h-screen bg-gray-50" },
    });
    /** @type {[typeof SEO, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(SEO, new SEO({
        title: (__VLS_ctx.t('form.editTitle')),
    }));
    const __VLS_1 = __VLS_0({
        title: (__VLS_ctx.t('form.editTitle')),
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
    (__VLS_ctx.t('form.editTitle'));
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
    if (__VLS_ctx.isFetching) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({
            ...{ class: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "grid grid-cols-1 lg:grid-cols-4 gap-8" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "lg:col-span-1" },
        });
        const __VLS_19 = {}.Skeleton;
        /** @type {[typeof __VLS_components.Skeleton, ]} */ ;
        // @ts-ignore
        const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({
            height: "300px",
            ...{ class: "rounded-xl" },
        }));
        const __VLS_21 = __VLS_20({
            height: "300px",
            ...{ class: "rounded-xl" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_20));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "lg:col-span-3" },
        });
        const __VLS_23 = {}.Skeleton;
        /** @type {[typeof __VLS_components.Skeleton, ]} */ ;
        // @ts-ignore
        const __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({
            height: "500px",
            ...{ class: "rounded-xl" },
        }));
        const __VLS_25 = __VLS_24({
            height: "500px",
            ...{ class: "rounded-xl" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_24));
    }
    else if (__VLS_ctx.isError || !__VLS_ctx.property) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({
            ...{ class: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "bg-white rounded-xl shadow-sm border p-8 text-center" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "text-gray-500 mb-4" },
        });
        (__VLS_ctx.t('form.error.notFound'));
        const __VLS_27 = {}.RouterLink;
        /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
        // @ts-ignore
        const __VLS_28 = __VLS_asFunctionalComponent(__VLS_27, new __VLS_27({
            to: ({ name: 'my-properties', params: { lang: __VLS_ctx.locale } }),
            ...{ class: "text-primary hover:underline" },
        }));
        const __VLS_29 = __VLS_28({
            to: ({ name: 'my-properties', params: { lang: __VLS_ctx.locale } }),
            ...{ class: "text-primary hover:underline" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_28));
        __VLS_30.slots.default;
        (__VLS_ctx.t('form.actions.backToProperties'));
        var __VLS_30;
    }
    else {
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
        const __VLS_31 = __VLS_asFunctionalComponent(PropertyFormSteps, new PropertyFormSteps({
            currentStep: (__VLS_ctx.state.currentStep),
            onGoToStep: (__VLS_ctx.goToStep),
        }));
        const __VLS_32 = __VLS_31({
            currentStep: (__VLS_ctx.state.currentStep),
            onGoToStep: (__VLS_ctx.goToStep),
        }, ...__VLS_functionalComponentArgsRest(__VLS_31));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "lg:col-span-3" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "bg-white rounded-xl shadow-sm border p-6 sm:p-8" },
        });
        /** @type {[typeof PropertyForm, ]} */ ;
        // @ts-ignore
        const __VLS_34 = __VLS_asFunctionalComponent(PropertyForm, new PropertyForm({
            form: (__VLS_ctx.form),
            existingImages: (__VLS_ctx.existingImages),
        }));
        const __VLS_35 = __VLS_34({
            form: (__VLS_ctx.form),
            existingImages: (__VLS_ctx.existingImages),
        }, ...__VLS_functionalComponentArgsRest(__VLS_34));
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
            const __VLS_37 = {}.ArrowLeft;
            /** @type {[typeof __VLS_components.ArrowLeft, ]} */ ;
            // @ts-ignore
            const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
                ...{ class: "h-4 w-4" },
            }));
            const __VLS_39 = __VLS_38({
                ...{ class: "h-4 w-4" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_38));
            (__VLS_ctx.t('form.actions.previous'));
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "flex items-center gap-2" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.handleSave) },
            type: "button",
            disabled: (__VLS_ctx.isLoading),
            ...{ class: "flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50 min-w-[150px] justify-center" },
        });
        if (__VLS_ctx.isLoading) {
            const __VLS_41 = {}.Loader2;
            /** @type {[typeof __VLS_components.Loader2, ]} */ ;
            // @ts-ignore
            const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({
                ...{ class: "h-4 w-4 animate-spin" },
            }));
            const __VLS_43 = __VLS_42({
                ...{ class: "h-4 w-4 animate-spin" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_42));
        }
        else {
            const __VLS_45 = {}.Save;
            /** @type {[typeof __VLS_components.Save, ]} */ ;
            // @ts-ignore
            const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
                ...{ class: "h-4 w-4" },
            }));
            const __VLS_47 = __VLS_46({
                ...{ class: "h-4 w-4" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_46));
        }
        (__VLS_ctx.isLoading ? __VLS_ctx.t('form.actions.saving') : __VLS_ctx.t('form.actions.saveChanges'));
        if (!__VLS_ctx.isLastStep) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (__VLS_ctx.handleNext) },
                type: "button",
                disabled: (__VLS_ctx.isLoading),
                ...{ class: "flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 disabled:opacity-50" },
            });
            (__VLS_ctx.t('form.actions.next'));
            const __VLS_49 = {}.ArrowRight;
            /** @type {[typeof __VLS_components.ArrowRight, ]} */ ;
            // @ts-ignore
            const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({
                ...{ class: "h-4 w-4" },
            }));
            const __VLS_51 = __VLS_50({
                ...{ class: "h-4 w-4" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_50));
        }
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
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['lg:col-span-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['max-w-5xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['sm:px-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['lg:px-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
    /** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:underline']} */ ;
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
    var __VLS_dollars;
    const __VLS_self = (await import('vue')).defineComponent({
        setup() {
            return {
                ArrowLeft: ArrowLeft,
                ArrowRight: ArrowRight,
                Save: Save,
                Loader2: Loader2,
                X: X,
                Skeleton: Skeleton,
                SEO: SEO,
                PropertyForm: PropertyForm,
                PropertyFormSteps: PropertyFormSteps,
                t: t,
                locale: locale,
                property: property,
                isFetching: isFetching,
                isError: isError,
                form: form,
                state: state,
                goToStep: goToStep,
                isFirstStep: isFirstStep,
                isLastStep: isLastStep,
                isLoading: isLoading,
                existingImages: existingImages,
                handleNext: handleNext,
                handlePrev: handlePrev,
                handleSave: handleSave,
            };
        },
    });
    return (await import('vue')).defineComponent({
        setup() {
            return {};
        },
    });
})(); /* PartiallyEnd: #4569/main.vue */

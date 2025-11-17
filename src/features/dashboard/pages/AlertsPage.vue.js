import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { Bell, Plus, Trash2, Edit2, Loader2, MapPin, Home, DollarSign, BedDouble, Maximize, } from 'lucide-vue-next';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import Dialog from 'primevue/dialog';
import ToggleSwitch from 'primevue/toggleswitch';
import Skeleton from 'primevue/skeleton';
import ConfirmDialog from 'primevue/confirmdialog';
import { useAlerts, useDeleteAlert, useToggleAlert } from '../composables/useAlerts';
import { formatPrice } from '@/shared/utils/formatters';
import CreateAlertForm from '../components/CreateAlertForm.vue';
import SEO from '@/shared/components/SEO.vue';
const { t } = useI18n();
const toast = useToast();
const confirm = useConfirm();
const createDialogOpen = ref(false);
const editingAlert = ref(null);
const { data: alerts, isLoading } = useAlerts();
const deleteAlertMutation = useDeleteAlert();
const toggleAlertMutation = useToggleAlert();
function confirmDelete(id) {
    confirm.require({
        header: t('alerts.deleteConfirmTitle'),
        message: t('alerts.deleteConfirmDescription'),
        acceptClass: '!bg-red-600 !border-red-600',
        acceptLabel: t('common.delete'),
        rejectLabel: t('common.cancel'),
        accept: () => handleDelete(id),
    });
}
async function handleDelete(id) {
    try {
        await deleteAlertMutation.mutateAsync(id);
        toast.add({ severity: 'success', summary: t('alerts.deleteSuccess'), life: 5000 });
    }
    catch {
        toast.add({ severity: 'error', summary: t('alerts.deleteError'), life: 5000 });
    }
}
async function handleToggle(id, is_active) {
    try {
        await toggleAlertMutation.mutateAsync({ id, is_active });
        toast.add({
            severity: 'success',
            summary: is_active ? t('alerts.activateSuccess') : t('alerts.pauseSuccess'),
            life: 5000,
        });
    }
    catch {
        toast.add({ severity: 'error', summary: t('alerts.toggleError'), life: 5000 });
    }
}
function handleCreateSuccess() {
    createDialogOpen.value = false;
    toast.add({ severity: 'success', summary: t('alerts.createSuccess'), life: 5000 });
}
function handleEditSuccess() {
    editingAlert.value = null;
    toast.add({ severity: 'success', summary: t('alerts.updateSuccess'), life: 5000 });
}
function getFrequencyLabel(freq) {
    const labels = {
        instant: t('alerts.frequency.instant'),
        daily: t('alerts.frequency.daily'),
        weekly: t('alerts.frequency.weekly'),
    };
    return labels[freq] || freq;
}
function getFilterBadges(alert) {
    const badges = [];
    const filters = alert.criteria;
    if (filters.transaction_type) {
        badges.push({ icon: Home, label: t(`common.transaction.${filters.transaction_type}`) });
    }
    if (filters.canton_id || filters.city_id) {
        badges.push({
            icon: MapPin,
            label: filters.city_id
                ? t('alerts.filters.citySet', 'City selected')
                : t('alerts.filters.cantonSet', 'Canton selected'),
        });
    }
    if (filters.price_min || filters.price_max) {
        const label = filters.price_min && filters.price_max
            ? `${formatPrice(filters.price_min)} - ${formatPrice(filters.price_max)}`
            : filters.price_min
                ? `${t('alerts.filters.from', 'From')} ${formatPrice(filters.price_min)}`
                : `${t('alerts.filters.to', 'To')} ${formatPrice(filters.price_max)}`;
        badges.push({ icon: DollarSign, label });
    }
    if (filters.rooms_min || filters.rooms_max) {
        const label = filters.rooms_min && filters.rooms_max
            ? `${filters.rooms_min}-${filters.rooms_max} ${t('alerts.filters.rooms', 'rooms')}`
            : filters.rooms_min
                ? `${filters.rooms_min}+ ${t('alerts.filters.rooms', 'rooms')}`
                : `${t('alerts.filters.to', 'To')} ${filters.rooms_max} ${t('alerts.filters.rooms', 'rooms')}`;
        badges.push({ icon: BedDouble, label });
    }
    if (filters.surface_min || filters.surface_max) {
        const label = filters.surface_min && filters.surface_max
            ? `${filters.surface_min}-${filters.surface_max} m²`
            : filters.surface_min
                ? `${filters.surface_min}+ m²`
                : `${t('alerts.filters.to', 'To')} ${filters.surface_max} m²`;
        badges.push({ icon: Maximize, label });
    }
    return badges;
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    'data-testid': "alerts-page",
    ...{ class: "space-y-6" },
});
/** @type {[typeof SEO, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(SEO, new SEO({
    title: (__VLS_ctx.t('alerts.title')),
}));
const __VLS_1 = __VLS_0({
    title: (__VLS_ctx.t('alerts.title')),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
const __VLS_3 = {}.ConfirmDialog;
/** @type {[typeof __VLS_components.ConfirmDialog, ]} */ ;
// @ts-ignore
const __VLS_4 = __VLS_asFunctionalComponent(__VLS_3, new __VLS_3({}));
const __VLS_5 = __VLS_4({}, ...__VLS_functionalComponentArgsRest(__VLS_4));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "text-2xl font-bold tracking-tight" },
});
(__VLS_ctx.t('alerts.title'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "text-gray-500" },
});
(__VLS_ctx.t('alerts.description'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.createDialogOpen = true;
        } },
    ...{ class: "flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90" },
});
const __VLS_7 = {}.Plus;
/** @type {[typeof __VLS_components.Plus, ]} */ ;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({
    ...{ class: "h-4 w-4" },
}));
const __VLS_9 = __VLS_8({
    ...{ class: "h-4 w-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
(__VLS_ctx.t('alerts.createNew'));
if (__VLS_ctx.isLoading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "space-y-4" },
    });
    for (const [i] of __VLS_getVForSourceType((3))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            key: (i),
            ...{ class: "rounded-xl border bg-white p-6" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "flex items-start gap-4" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "flex-1 space-y-3" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "flex items-center gap-2" },
        });
        const __VLS_11 = {}.Skeleton;
        /** @type {[typeof __VLS_components.Skeleton, ]} */ ;
        // @ts-ignore
        const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({
            width: "10rem",
            height: "1.25rem",
        }));
        const __VLS_13 = __VLS_12({
            width: "10rem",
            height: "1.25rem",
        }, ...__VLS_functionalComponentArgsRest(__VLS_12));
        const __VLS_15 = {}.Skeleton;
        /** @type {[typeof __VLS_components.Skeleton, ]} */ ;
        // @ts-ignore
        const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
            width: "4rem",
            height: "1.25rem",
        }));
        const __VLS_17 = __VLS_16({
            width: "4rem",
            height: "1.25rem",
        }, ...__VLS_functionalComponentArgsRest(__VLS_16));
        const __VLS_19 = {}.Skeleton;
        /** @type {[typeof __VLS_components.Skeleton, ]} */ ;
        // @ts-ignore
        const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({
            width: "8rem",
            height: "1rem",
        }));
        const __VLS_21 = __VLS_20({
            width: "8rem",
            height: "1rem",
        }, ...__VLS_functionalComponentArgsRest(__VLS_20));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "flex gap-2" },
        });
        const __VLS_23 = {}.Skeleton;
        /** @type {[typeof __VLS_components.Skeleton, ]} */ ;
        // @ts-ignore
        const __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({
            width: "5rem",
            height: "1.5rem",
        }));
        const __VLS_25 = __VLS_24({
            width: "5rem",
            height: "1.5rem",
        }, ...__VLS_functionalComponentArgsRest(__VLS_24));
        const __VLS_27 = {}.Skeleton;
        /** @type {[typeof __VLS_components.Skeleton, ]} */ ;
        // @ts-ignore
        const __VLS_28 = __VLS_asFunctionalComponent(__VLS_27, new __VLS_27({
            width: "6rem",
            height: "1.5rem",
        }));
        const __VLS_29 = __VLS_28({
            width: "6rem",
            height: "1.5rem",
        }, ...__VLS_functionalComponentArgsRest(__VLS_28));
        const __VLS_31 = {}.Skeleton;
        /** @type {[typeof __VLS_components.Skeleton, ]} */ ;
        // @ts-ignore
        const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({
            width: "7rem",
            height: "1.5rem",
        }));
        const __VLS_33 = __VLS_32({
            width: "7rem",
            height: "1.5rem",
        }, ...__VLS_functionalComponentArgsRest(__VLS_32));
        const __VLS_35 = {}.Skeleton;
        /** @type {[typeof __VLS_components.Skeleton, ]} */ ;
        // @ts-ignore
        const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({
            width: "12rem",
            height: "0.75rem",
        }));
        const __VLS_37 = __VLS_36({
            width: "12rem",
            height: "0.75rem",
        }, ...__VLS_functionalComponentArgsRest(__VLS_36));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "flex gap-2" },
        });
        const __VLS_39 = {}.Skeleton;
        /** @type {[typeof __VLS_components.Skeleton, ]} */ ;
        // @ts-ignore
        const __VLS_40 = __VLS_asFunctionalComponent(__VLS_39, new __VLS_39({
            width: "2rem",
            height: "2rem",
        }));
        const __VLS_41 = __VLS_40({
            width: "2rem",
            height: "2rem",
        }, ...__VLS_functionalComponentArgsRest(__VLS_40));
        const __VLS_43 = {}.Skeleton;
        /** @type {[typeof __VLS_components.Skeleton, ]} */ ;
        // @ts-ignore
        const __VLS_44 = __VLS_asFunctionalComponent(__VLS_43, new __VLS_43({
            width: "2rem",
            height: "2rem",
        }));
        const __VLS_45 = __VLS_44({
            width: "2rem",
            height: "2rem",
        }, ...__VLS_functionalComponentArgsRest(__VLS_44));
    }
}
else if (!__VLS_ctx.alerts || __VLS_ctx.alerts.length === 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "rounded-xl border bg-white py-16 text-center" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100" },
    });
    const __VLS_47 = {}.Bell;
    /** @type {[typeof __VLS_components.Bell, ]} */ ;
    // @ts-ignore
    const __VLS_48 = __VLS_asFunctionalComponent(__VLS_47, new __VLS_47({
        ...{ class: "h-8 w-8 text-gray-400" },
    }));
    const __VLS_49 = __VLS_48({
        ...{ class: "h-8 w-8 text-gray-400" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_48));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "text-xl font-semibold" },
    });
    (__VLS_ctx.t('alerts.empty.title'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "mx-auto mt-2 max-w-sm text-sm text-gray-500" },
    });
    (__VLS_ctx.t('alerts.empty.description'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!!(__VLS_ctx.isLoading))
                    return;
                if (!(!__VLS_ctx.alerts || __VLS_ctx.alerts.length === 0))
                    return;
                __VLS_ctx.createDialogOpen = true;
            } },
        ...{ class: "mt-6 flex items-center gap-2 mx-auto rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90" },
    });
    const __VLS_51 = {}.Plus;
    /** @type {[typeof __VLS_components.Plus, ]} */ ;
    // @ts-ignore
    const __VLS_52 = __VLS_asFunctionalComponent(__VLS_51, new __VLS_51({
        ...{ class: "h-4 w-4" },
    }));
    const __VLS_53 = __VLS_52({
        ...{ class: "h-4 w-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_52));
    (__VLS_ctx.t('alerts.empty.createFirst'));
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "space-y-4" },
    });
    for (const [alert] of __VLS_getVForSourceType((__VLS_ctx.alerts))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            key: (alert.id),
            ...{ class: "rounded-xl border bg-white p-4 sm:p-6" },
            ...{ class: (!alert.is_active ? 'opacity-60' : '') },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "flex flex-col gap-4 sm:flex-row sm:items-start" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "flex-1 space-y-3" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "flex items-start justify-between gap-4" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "flex items-center gap-2" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
            ...{ class: "font-semibold" },
        });
        (alert.name);
        if (!alert.is_active) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600" },
            });
            (__VLS_ctx.t('alerts.paused'));
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "text-sm text-gray-500" },
        });
        (__VLS_ctx.getFrequencyLabel(alert.frequency));
        if (alert.match_count !== undefined) {
            (__VLS_ctx.t('alerts.matchCount', { count: alert.match_count }));
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "flex items-center gap-2" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "text-sm text-gray-500" },
        });
        (alert.is_active ? __VLS_ctx.t('alerts.active') : __VLS_ctx.t('alerts.paused'));
        const __VLS_55 = {}.ToggleSwitch;
        /** @type {[typeof __VLS_components.ToggleSwitch, ]} */ ;
        // @ts-ignore
        const __VLS_56 = __VLS_asFunctionalComponent(__VLS_55, new __VLS_55({
            ...{ 'onUpdate:modelValue': {} },
            modelValue: (alert.is_active),
            disabled: (__VLS_ctx.toggleAlertMutation.isPending.value),
        }));
        const __VLS_57 = __VLS_56({
            ...{ 'onUpdate:modelValue': {} },
            modelValue: (alert.is_active),
            disabled: (__VLS_ctx.toggleAlertMutation.isPending.value),
        }, ...__VLS_functionalComponentArgsRest(__VLS_56));
        let __VLS_59;
        let __VLS_60;
        let __VLS_61;
        const __VLS_62 = {
            'onUpdate:modelValue': ((val) => __VLS_ctx.handleToggle(alert.id, val))
        };
        var __VLS_58;
        if (__VLS_ctx.getFilterBadges(alert).length > 0) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "flex flex-wrap gap-2" },
            });
            for (const [badge, index] of __VLS_getVForSourceType((__VLS_ctx.getFilterBadges(alert)))) {
                __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                    key: (index),
                    ...{ class: "flex items-center gap-1 rounded-full border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-600" },
                });
                const __VLS_63 = ((badge.icon));
                // @ts-ignore
                const __VLS_64 = __VLS_asFunctionalComponent(__VLS_63, new __VLS_63({
                    ...{ class: "h-3 w-3" },
                }));
                const __VLS_65 = __VLS_64({
                    ...{ class: "h-3 w-3" },
                }, ...__VLS_functionalComponentArgsRest(__VLS_64));
                (badge.label);
            }
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "flex flex-wrap gap-4 text-xs text-gray-400" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_ctx.t('alerts.createdAt', { date: new Date(alert.created_at).toLocaleDateString() }));
        if (alert.last_sent_at) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
            (__VLS_ctx.t('alerts.lastSent', { date: new Date(alert.last_sent_at).toLocaleDateString() }));
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "flex items-center gap-2 sm:flex-col" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.isLoading))
                        return;
                    if (!!(!__VLS_ctx.alerts || __VLS_ctx.alerts.length === 0))
                        return;
                    __VLS_ctx.editingAlert = alert;
                } },
            ...{ class: "flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50" },
        });
        const __VLS_67 = {}.Edit2;
        /** @type {[typeof __VLS_components.Edit2, ]} */ ;
        // @ts-ignore
        const __VLS_68 = __VLS_asFunctionalComponent(__VLS_67, new __VLS_67({
            ...{ class: "h-4 w-4" },
        }));
        const __VLS_69 = __VLS_68({
            ...{ class: "h-4 w-4" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_68));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "sm:hidden" },
        });
        (__VLS_ctx.t('common.edit'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.isLoading))
                        return;
                    if (!!(!__VLS_ctx.alerts || __VLS_ctx.alerts.length === 0))
                        return;
                    __VLS_ctx.confirmDelete(alert.id);
                } },
            ...{ class: "flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50" },
            disabled: (__VLS_ctx.deleteAlertMutation.isPending.value),
        });
        if (__VLS_ctx.deleteAlertMutation.isPending.value) {
            const __VLS_71 = {}.Loader2;
            /** @type {[typeof __VLS_components.Loader2, ]} */ ;
            // @ts-ignore
            const __VLS_72 = __VLS_asFunctionalComponent(__VLS_71, new __VLS_71({
                ...{ class: "h-4 w-4 animate-spin" },
            }));
            const __VLS_73 = __VLS_72({
                ...{ class: "h-4 w-4 animate-spin" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_72));
        }
        else {
            const __VLS_75 = {}.Trash2;
            /** @type {[typeof __VLS_components.Trash2, ]} */ ;
            // @ts-ignore
            const __VLS_76 = __VLS_asFunctionalComponent(__VLS_75, new __VLS_75({
                ...{ class: "h-4 w-4" },
            }));
            const __VLS_77 = __VLS_76({
                ...{ class: "h-4 w-4" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_76));
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "sm:hidden" },
        });
        (__VLS_ctx.t('common.delete'));
    }
}
const __VLS_79 = {}.Dialog;
/** @type {[typeof __VLS_components.Dialog, typeof __VLS_components.Dialog, ]} */ ;
// @ts-ignore
const __VLS_80 = __VLS_asFunctionalComponent(__VLS_79, new __VLS_79({
    visible: (__VLS_ctx.createDialogOpen),
    header: (__VLS_ctx.t('alerts.createTitle')),
    modal: true,
    ...{ class: "w-full max-w-lg" },
}));
const __VLS_81 = __VLS_80({
    visible: (__VLS_ctx.createDialogOpen),
    header: (__VLS_ctx.t('alerts.createTitle')),
    modal: true,
    ...{ class: "w-full max-w-lg" },
}, ...__VLS_functionalComponentArgsRest(__VLS_80));
__VLS_82.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "mb-4 text-sm text-gray-500" },
});
(__VLS_ctx.t('alerts.createDescription'));
/** @type {[typeof CreateAlertForm, ]} */ ;
// @ts-ignore
const __VLS_83 = __VLS_asFunctionalComponent(CreateAlertForm, new CreateAlertForm({
    ...{ 'onSuccess': {} },
    ...{ 'onCancel': {} },
}));
const __VLS_84 = __VLS_83({
    ...{ 'onSuccess': {} },
    ...{ 'onCancel': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_83));
let __VLS_86;
let __VLS_87;
let __VLS_88;
const __VLS_89 = {
    onSuccess: (__VLS_ctx.handleCreateSuccess)
};
const __VLS_90 = {
    onCancel: (...[$event]) => {
        __VLS_ctx.createDialogOpen = false;
    }
};
var __VLS_85;
var __VLS_82;
const __VLS_91 = {}.Dialog;
/** @type {[typeof __VLS_components.Dialog, typeof __VLS_components.Dialog, ]} */ ;
// @ts-ignore
const __VLS_92 = __VLS_asFunctionalComponent(__VLS_91, new __VLS_91({
    ...{ 'onUpdate:visible': {} },
    visible: (!!__VLS_ctx.editingAlert),
    header: (__VLS_ctx.t('alerts.editTitle')),
    modal: true,
    ...{ class: "w-full max-w-lg" },
}));
const __VLS_93 = __VLS_92({
    ...{ 'onUpdate:visible': {} },
    visible: (!!__VLS_ctx.editingAlert),
    header: (__VLS_ctx.t('alerts.editTitle')),
    modal: true,
    ...{ class: "w-full max-w-lg" },
}, ...__VLS_functionalComponentArgsRest(__VLS_92));
let __VLS_95;
let __VLS_96;
let __VLS_97;
const __VLS_98 = {
    'onUpdate:visible': ((val) => { if (!val)
        __VLS_ctx.editingAlert = null; })
};
__VLS_94.slots.default;
if (__VLS_ctx.editingAlert) {
    /** @type {[typeof CreateAlertForm, ]} */ ;
    // @ts-ignore
    const __VLS_99 = __VLS_asFunctionalComponent(CreateAlertForm, new CreateAlertForm({
        ...{ 'onSuccess': {} },
        ...{ 'onCancel': {} },
        alert: (__VLS_ctx.editingAlert),
    }));
    const __VLS_100 = __VLS_99({
        ...{ 'onSuccess': {} },
        ...{ 'onCancel': {} },
        alert: (__VLS_ctx.editingAlert),
    }, ...__VLS_functionalComponentArgsRest(__VLS_99));
    let __VLS_102;
    let __VLS_103;
    let __VLS_104;
    const __VLS_105 = {
        onSuccess: (__VLS_ctx.handleEditSuccess)
    };
    const __VLS_106 = {
        onCancel: (...[$event]) => {
            if (!(__VLS_ctx.editingAlert))
                return;
            __VLS_ctx.editingAlert = null;
        }
    };
    var __VLS_101;
}
var __VLS_94;
/** @type {__VLS_StyleScopedClasses['space-y-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:flex-row']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-tight']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
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
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-start']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['py-16']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-16']} */ ;
/** @type {__VLS_StyleScopedClasses['w-16']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
/** @type {__VLS_StyleScopedClasses['w-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-primary/90']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:flex-row']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:items-start']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-start']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-0.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-200']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['h-3']} */ ;
/** @type {__VLS_StyleScopedClasses['w-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-600']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-red-50']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-spin']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-lg']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Bell: Bell,
            Plus: Plus,
            Trash2: Trash2,
            Edit2: Edit2,
            Loader2: Loader2,
            Dialog: Dialog,
            ToggleSwitch: ToggleSwitch,
            Skeleton: Skeleton,
            ConfirmDialog: ConfirmDialog,
            CreateAlertForm: CreateAlertForm,
            SEO: SEO,
            t: t,
            createDialogOpen: createDialogOpen,
            editingAlert: editingAlert,
            alerts: alerts,
            isLoading: isLoading,
            deleteAlertMutation: deleteAlertMutation,
            toggleAlertMutation: toggleAlertMutation,
            confirmDelete: confirmDelete,
            handleToggle: handleToggle,
            handleCreateSuccess: handleCreateSuccess,
            handleEditSuccess: handleEditSuccess,
            getFrequencyLabel: getFrequencyLabel,
            getFilterBadges: getFilterBadges,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */

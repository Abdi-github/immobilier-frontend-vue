import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { Plus, Search, FileText, Clock, CheckCircle, Globe, XCircle, Archive, MoreVertical, Image as ImageIcon, MapPin, BedDouble, Maximize2, } from 'lucide-vue-next';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import Paginator from 'primevue/paginator';
import ConfirmDialog from 'primevue/confirmdialog';
import Menu from 'primevue/menu';
import Skeleton from 'primevue/skeleton';
import SEO from '@/shared/components/SEO.vue';
import { useLocalizedName } from '@/shared/composables/useLocalizedName';
import { formatPrice } from '@/shared/utils/formatters';
import { useMyProperties, usePropertyStats, useDeleteProperty, useSubmitForApproval, useArchiveProperty, } from '../composables/useMyProperties';
const { t, locale } = useI18n();
const router = useRouter();
const toast = useToast();
const confirm = useConfirm();
const getLocalizedName = useLocalizedName();
// Filters and pagination
const statusFilter = ref('');
const searchQuery = ref('');
const sortBy = ref('created_at');
const sortOrder = ref('desc');
const page = ref(1);
const limit = ref(10);
const params = computed(() => ({
    page: page.value,
    limit: limit.value,
    status: statusFilter.value || undefined,
    sort: sortBy.value,
    order: sortOrder.value,
    search: searchQuery.value || undefined,
}));
const { data: propertiesData, isLoading, isError } = useMyProperties(params);
const { data: stats } = usePropertyStats();
const deleteMutation = useDeleteProperty();
const submitMutation = useSubmitForApproval();
const archiveMutation = useArchiveProperty();
const properties = computed(() => propertiesData.value?.data ?? []);
const pagination = computed(() => propertiesData.value?.pagination ?? propertiesData.value?.meta);
watch(statusFilter, () => { page.value = 1; });
watch(searchQuery, () => { page.value = 1; });
// Stats cards config
const statCards = computed(() => [
    { key: '', label: t('myProperties.stats.total'), count: stats.value?.total ?? 0, icon: FileText, color: 'text-gray-600 bg-gray-100' },
    { key: 'DRAFT', label: t('myProperties.stats.draft'), count: stats.value?.draft ?? 0, icon: FileText, color: 'text-gray-500 bg-gray-50' },
    { key: 'PENDING_APPROVAL', label: t('myProperties.stats.pending'), count: stats.value?.pending ?? 0, icon: Clock, color: 'text-amber-600 bg-amber-50' },
    { key: 'APPROVED', label: t('myProperties.stats.approved'), count: stats.value?.approved ?? 0, icon: CheckCircle, color: 'text-blue-600 bg-blue-50' },
    { key: 'PUBLISHED', label: t('myProperties.stats.published'), count: stats.value?.published ?? 0, icon: Globe, color: 'text-green-600 bg-green-50' },
    { key: 'REJECTED', label: t('myProperties.stats.rejected'), count: stats.value?.rejected ?? 0, icon: XCircle, color: 'text-red-600 bg-red-50' },
    { key: 'ARCHIVED', label: t('myProperties.stats.archived'), count: stats.value?.archived ?? 0, icon: Archive, color: 'text-gray-400 bg-gray-50' },
]);
function getStatusBadge(status) {
    const map = {
        DRAFT: { class: 'bg-gray-100 text-gray-700', label: t('myProperties.status.draft') },
        PENDING_APPROVAL: { class: 'bg-amber-100 text-amber-700', label: t('myProperties.status.pending') },
        APPROVED: { class: 'bg-blue-100 text-blue-700', label: t('myProperties.status.approved') },
        PUBLISHED: { class: 'bg-green-100 text-green-700', label: t('myProperties.status.published') },
        REJECTED: { class: 'bg-red-100 text-red-700', label: t('myProperties.status.rejected') },
        ARCHIVED: { class: 'bg-gray-100 text-gray-500', label: t('myProperties.status.archived') },
    };
    return map[status] || map.DRAFT;
}
function getPropertyTitle(p) {
    return p.title || t('myProperties.untitled');
}
function getPropertyImage(p) {
    const primary = p.images?.find((img) => img.is_primary);
    return primary?.thumbnail_url || primary?.url || p.images?.[0]?.thumbnail_url || p.images?.[0]?.url || '';
}
// Action menu
const menuRef = ref();
const activeProperty = ref(null);
function getMenuItems(p) {
    const items = [];
    if (['PUBLISHED', 'APPROVED'].includes(p.status)) {
        items.push({
            label: t('myProperties.actions.view'),
            icon: 'pi pi-eye',
            command: () => router.push({ name: 'property-detail', params: { lang: locale.value, id: p.id } }),
        });
    }
    if (p.status !== 'ARCHIVED') {
        items.push({
            label: t('myProperties.actions.edit'),
            icon: 'pi pi-pencil',
            command: () => router.push({ name: 'edit-property', params: { lang: locale.value, id: p.id } }),
        });
    }
    if (['DRAFT', 'REJECTED'].includes(p.status)) {
        items.push({
            label: t('myProperties.actions.submit'),
            icon: 'pi pi-send',
            command: () => handleSubmit(p),
        });
    }
    if (!['ARCHIVED', 'DRAFT'].includes(p.status)) {
        items.push({
            label: t('myProperties.actions.archive'),
            icon: 'pi pi-inbox',
            command: () => handleArchive(p),
        });
    }
    if (['DRAFT', 'REJECTED', 'ARCHIVED'].includes(p.status)) {
        items.push({
            label: t('myProperties.actions.delete'),
            icon: 'pi pi-trash',
            command: () => handleDelete(p),
            class: 'text-red-600',
        });
    }
    return items;
}
function toggleMenu(event, property) {
    activeProperty.value = property;
    menuRef.value?.toggle(event);
}
async function handleSubmit(p) {
    try {
        await submitMutation.mutateAsync(p.id);
        toast.add({ severity: 'success', summary: t('myProperties.submitSuccess'), life: 5000 });
    }
    catch {
        toast.add({ severity: 'error', summary: t('myProperties.submitError'), life: 5000 });
    }
}
function handleArchive(p) {
    confirm.require({
        header: t('myProperties.actions.archive'),
        message: t('myProperties.archiveConfirm', 'Are you sure you want to archive this property?'),
        acceptClass: '!bg-amber-600 !border-amber-600',
        accept: async () => {
            try {
                await archiveMutation.mutateAsync(p.id);
                toast.add({ severity: 'success', summary: t('myProperties.archiveSuccess'), life: 5000 });
            }
            catch {
                toast.add({ severity: 'error', summary: t('myProperties.archiveError'), life: 5000 });
            }
        },
    });
}
function handleDelete(p) {
    confirm.require({
        header: t('common.delete'),
        message: t('myProperties.deleteConfirm', 'Are you sure you want to delete this property? This action cannot be undone.'),
        acceptClass: '!bg-red-600 !border-red-600',
        accept: async () => {
            try {
                await deleteMutation.mutateAsync(p.id);
                toast.add({ severity: 'success', summary: t('myProperties.deleteSuccess'), life: 5000 });
            }
            catch {
                toast.add({ severity: 'error', summary: t('myProperties.deleteError'), life: 5000 });
            }
        },
    });
}
function onPageChange(event) {
    page.value = event.page + 1;
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    'data-testid': "my-properties-page",
    ...{ class: "space-y-6" },
});
/** @type {[typeof SEO, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(SEO, new SEO({
    title: (__VLS_ctx.t('myProperties.title')),
}));
const __VLS_1 = __VLS_0({
    title: (__VLS_ctx.t('myProperties.title')),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
const __VLS_3 = {}.ConfirmDialog;
/** @type {[typeof __VLS_components.ConfirmDialog, ]} */ ;
// @ts-ignore
const __VLS_4 = __VLS_asFunctionalComponent(__VLS_3, new __VLS_3({}));
const __VLS_5 = __VLS_4({}, ...__VLS_functionalComponentArgsRest(__VLS_4));
const __VLS_7 = {}.Menu;
/** @type {[typeof __VLS_components.Menu, ]} */ ;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({
    ref: "menuRef",
    model: (__VLS_ctx.activeProperty ? __VLS_ctx.getMenuItems(__VLS_ctx.activeProperty) : []),
    popup: (true),
}));
const __VLS_9 = __VLS_8({
    ref: "menuRef",
    model: (__VLS_ctx.activeProperty ? __VLS_ctx.getMenuItems(__VLS_ctx.activeProperty) : []),
    popup: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
/** @type {typeof __VLS_ctx.menuRef} */ ;
var __VLS_11 = {};
var __VLS_10;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "text-2xl font-bold tracking-tight" },
});
(__VLS_ctx.t('myProperties.title'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "text-sm text-gray-500" },
});
(__VLS_ctx.t('myProperties.subtitle'));
const __VLS_13 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
    to: ({ name: 'create-property', params: { lang: __VLS_ctx.locale } }),
    ...{ class: "inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90" },
}));
const __VLS_15 = __VLS_14({
    to: ({ name: 'create-property', params: { lang: __VLS_ctx.locale } }),
    ...{ class: "inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90" },
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
__VLS_16.slots.default;
const __VLS_17 = {}.Plus;
/** @type {[typeof __VLS_components.Plus, ]} */ ;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
    ...{ class: "h-4 w-4" },
}));
const __VLS_19 = __VLS_18({
    ...{ class: "h-4 w-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
(__VLS_ctx.t('myProperties.createNew'));
var __VLS_16;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3" },
});
for (const [stat] of __VLS_getVForSourceType((__VLS_ctx.statCards))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.statusFilter = stat.key;
            } },
        key: (stat.key),
        ...{ class: "rounded-lg border p-3 text-left transition-colors hover:border-primary/50" },
        ...{ class: (__VLS_ctx.statusFilter === stat.key ? 'border-primary bg-primary/5' : 'border-gray-200 bg-white') },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "flex items-center gap-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "rounded-md p-1" },
        ...{ class: (stat.color) },
    });
    const __VLS_21 = ((stat.icon));
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
        ...{ class: "h-4 w-4" },
    }));
    const __VLS_23 = __VLS_22({
        ...{ class: "h-4 w-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_22));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "text-xl font-bold" },
    });
    (stat.count);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "mt-1 text-xs text-gray-500 truncate" },
    });
    (stat.label);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex flex-col sm:flex-row items-start sm:items-center gap-3" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "relative flex-1 w-full" },
});
const __VLS_25 = {}.Search;
/** @type {[typeof __VLS_components.Search, ]} */ ;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
    ...{ class: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" },
}));
const __VLS_27 = __VLS_26({
    ...{ class: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" },
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    value: (__VLS_ctx.searchQuery),
    type: "text",
    placeholder: (__VLS_ctx.t('myProperties.searchPlaceholder')),
    ...{ class: "w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-primary focus:ring-primary focus:outline-none" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    value: (__VLS_ctx.sortBy),
    ...{ class: "rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "created_at",
});
(__VLS_ctx.t('myProperties.sortBy'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "price",
});
(__VLS_ctx.t('myProperties.sortBy'));
__VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
    value: "updated_at",
});
(__VLS_ctx.t('myProperties.sortBy'));
if (__VLS_ctx.isLoading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "space-y-4" },
    });
    for (const [i] of __VLS_getVForSourceType((3))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            key: (i),
            ...{ class: "rounded-xl border bg-white p-4" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "flex gap-4" },
        });
        const __VLS_29 = {}.Skeleton;
        /** @type {[typeof __VLS_components.Skeleton, ]} */ ;
        // @ts-ignore
        const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
            width: "8rem",
            height: "6rem",
            borderRadius: "0.5rem",
            ...{ class: "shrink-0" },
        }));
        const __VLS_31 = __VLS_30({
            width: "8rem",
            height: "6rem",
            borderRadius: "0.5rem",
            ...{ class: "shrink-0" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_30));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "flex-1 space-y-3" },
        });
        const __VLS_33 = {}.Skeleton;
        /** @type {[typeof __VLS_components.Skeleton, ]} */ ;
        // @ts-ignore
        const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
            width: "66%",
            height: "1.25rem",
        }));
        const __VLS_35 = __VLS_34({
            width: "66%",
            height: "1.25rem",
        }, ...__VLS_functionalComponentArgsRest(__VLS_34));
        const __VLS_37 = {}.Skeleton;
        /** @type {[typeof __VLS_components.Skeleton, ]} */ ;
        // @ts-ignore
        const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
            width: "33%",
            height: "1rem",
        }));
        const __VLS_39 = __VLS_38({
            width: "33%",
            height: "1rem",
        }, ...__VLS_functionalComponentArgsRest(__VLS_38));
        const __VLS_41 = {}.Skeleton;
        /** @type {[typeof __VLS_components.Skeleton, ]} */ ;
        // @ts-ignore
        const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({
            width: "50%",
            height: "1rem",
        }));
        const __VLS_43 = __VLS_42({
            width: "50%",
            height: "1rem",
        }, ...__VLS_functionalComponentArgsRest(__VLS_42));
    }
}
else if (__VLS_ctx.isError) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "rounded-xl border bg-white p-8 text-center" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "text-lg font-semibold" },
    });
    (__VLS_ctx.t('myProperties.errorTitle'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "mt-1 text-sm text-gray-500" },
    });
    (__VLS_ctx.t('myProperties.errorDescription'));
}
else if (__VLS_ctx.properties.length === 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "rounded-xl border bg-white p-12 text-center" },
    });
    const __VLS_45 = {}.FileText;
    /** @type {[typeof __VLS_components.FileText, ]} */ ;
    // @ts-ignore
    const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
        ...{ class: "mx-auto h-12 w-12 text-gray-300" },
    }));
    const __VLS_47 = __VLS_46({
        ...{ class: "mx-auto h-12 w-12 text-gray-300" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_46));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: "mt-4 text-lg font-semibold" },
    });
    (__VLS_ctx.t('myProperties.emptyTitle'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "mt-1 text-sm text-gray-500" },
    });
    (__VLS_ctx.t('myProperties.emptyDescription'));
    const __VLS_49 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({
        to: ({ name: 'create-property', params: { lang: __VLS_ctx.locale } }),
        ...{ class: "mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90" },
    }));
    const __VLS_51 = __VLS_50({
        to: ({ name: 'create-property', params: { lang: __VLS_ctx.locale } }),
        ...{ class: "mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_50));
    __VLS_52.slots.default;
    const __VLS_53 = {}.Plus;
    /** @type {[typeof __VLS_components.Plus, ]} */ ;
    // @ts-ignore
    const __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53({
        ...{ class: "h-4 w-4" },
    }));
    const __VLS_55 = __VLS_54({
        ...{ class: "h-4 w-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_54));
    (__VLS_ctx.t('myProperties.createFirst'));
    var __VLS_52;
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "space-y-3" },
    });
    for (const [property] of __VLS_getVForSourceType((__VLS_ctx.properties))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            key: (property.id),
            ...{ class: "rounded-xl border bg-white p-4 transition-shadow hover:shadow-md" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "flex flex-col sm:flex-row gap-4" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "relative h-32 w-full sm:w-44 shrink-0 overflow-hidden rounded-lg bg-gray-100" },
        });
        if (__VLS_ctx.getPropertyImage(property)) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
                src: (__VLS_ctx.getPropertyImage(property)),
                alt: (__VLS_ctx.getPropertyTitle(property)),
                ...{ class: "h-full w-full object-cover" },
            });
        }
        else {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "flex h-full items-center justify-center" },
            });
            const __VLS_57 = {}.ImageIcon;
            /** @type {[typeof __VLS_components.ImageIcon, ]} */ ;
            // @ts-ignore
            const __VLS_58 = __VLS_asFunctionalComponent(__VLS_57, new __VLS_57({
                ...{ class: "h-8 w-8 text-gray-300" },
            }));
            const __VLS_59 = __VLS_58({
                ...{ class: "h-8 w-8 text-gray-300" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_58));
        }
        if (property.images?.length) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "absolute bottom-2 left-2 rounded bg-black/60 px-2 py-0.5 text-xs text-white" },
            });
            const __VLS_61 = {}.ImageIcon;
            /** @type {[typeof __VLS_components.ImageIcon, ]} */ ;
            // @ts-ignore
            const __VLS_62 = __VLS_asFunctionalComponent(__VLS_61, new __VLS_61({
                ...{ class: "inline h-3 w-3 mr-1" },
            }));
            const __VLS_63 = __VLS_62({
                ...{ class: "inline h-3 w-3 mr-1" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_62));
            (property.images.length);
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "absolute top-2 left-2 rounded px-2 py-0.5 text-xs font-medium text-white" },
            ...{ class: (property.transaction_type === 'rent' ? 'bg-blue-600' : 'bg-green-600') },
        });
        (property.transaction_type === 'rent' ? __VLS_ctx.t('myProperties.rent') : __VLS_ctx.t('myProperties.sale'));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "flex flex-1 flex-col justify-between" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "flex items-start justify-between gap-2" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
            ...{ class: "font-semibold text-gray-900 line-clamp-1" },
        });
        (__VLS_ctx.getPropertyTitle(property));
        if (property.category) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "mt-0.5" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "text-xs text-gray-500 bg-gray-100 rounded px-2 py-0.5" },
            });
            (__VLS_ctx.getLocalizedName(property.category.name));
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium" },
            ...{ class: (__VLS_ctx.getStatusBadge(property.status).class) },
        });
        (__VLS_ctx.getStatusBadge(property.status).label);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500" },
        });
        if (property.canton || property.city) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "flex items-center gap-1" },
            });
            const __VLS_65 = {}.MapPin;
            /** @type {[typeof __VLS_components.MapPin, ]} */ ;
            // @ts-ignore
            const __VLS_66 = __VLS_asFunctionalComponent(__VLS_65, new __VLS_65({
                ...{ class: "h-3.5 w-3.5" },
            }));
            const __VLS_67 = __VLS_66({
                ...{ class: "h-3.5 w-3.5" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_66));
            if (property.city) {
                (__VLS_ctx.getLocalizedName(property.city.name));
            }
            if (property.canton) {
                (property.canton.code);
            }
        }
        if (property.rooms) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "flex items-center gap-1" },
            });
            const __VLS_69 = {}.BedDouble;
            /** @type {[typeof __VLS_components.BedDouble, ]} */ ;
            // @ts-ignore
            const __VLS_70 = __VLS_asFunctionalComponent(__VLS_69, new __VLS_69({
                ...{ class: "h-3.5 w-3.5" },
            }));
            const __VLS_71 = __VLS_70({
                ...{ class: "h-3.5 w-3.5" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_70));
            (property.rooms);
            (property.rooms === 1 ? 'room' : 'rooms');
        }
        if (property.surface) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "flex items-center gap-1" },
            });
            const __VLS_73 = {}.Maximize2;
            /** @type {[typeof __VLS_components.Maximize2, ]} */ ;
            // @ts-ignore
            const __VLS_74 = __VLS_asFunctionalComponent(__VLS_73, new __VLS_73({
                ...{ class: "h-3.5 w-3.5" },
            }));
            const __VLS_75 = __VLS_74({
                ...{ class: "h-3.5 w-3.5" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_74));
            (property.surface);
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "mt-3 flex items-center justify-between" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: "text-lg font-bold text-primary" },
        });
        (__VLS_ctx.formatPrice(property.price));
        if (property.transaction_type === 'rent') {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: "text-sm font-normal text-gray-500" },
            });
            (__VLS_ctx.t('common.month'));
        }
        __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.isLoading))
                        return;
                    if (!!(__VLS_ctx.isError))
                        return;
                    if (!!(__VLS_ctx.properties.length === 0))
                        return;
                    __VLS_ctx.toggleMenu($event, property);
                } },
            ...{ class: "rounded-lg border border-gray-200 p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700" },
        });
        const __VLS_77 = {}.MoreVertical;
        /** @type {[typeof __VLS_components.MoreVertical, ]} */ ;
        // @ts-ignore
        const __VLS_78 = __VLS_asFunctionalComponent(__VLS_77, new __VLS_77({
            ...{ class: "h-4 w-4" },
        }));
        const __VLS_79 = __VLS_78({
            ...{ class: "h-4 w-4" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_78));
    }
    if (__VLS_ctx.pagination && __VLS_ctx.pagination.total_pages > 1) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "flex justify-center pt-4" },
        });
        const __VLS_81 = {}.Paginator;
        /** @type {[typeof __VLS_components.Paginator, ]} */ ;
        // @ts-ignore
        const __VLS_82 = __VLS_asFunctionalComponent(__VLS_81, new __VLS_81({
            ...{ 'onPage': {} },
            rows: (__VLS_ctx.limit),
            totalRecords: (__VLS_ctx.pagination.total),
            first: ((__VLS_ctx.page - 1) * __VLS_ctx.limit),
        }));
        const __VLS_83 = __VLS_82({
            ...{ 'onPage': {} },
            rows: (__VLS_ctx.limit),
            totalRecords: (__VLS_ctx.pagination.total),
            first: ((__VLS_ctx.page - 1) * __VLS_ctx.limit),
        }, ...__VLS_functionalComponentArgsRest(__VLS_82));
        let __VLS_85;
        let __VLS_86;
        let __VLS_87;
        const __VLS_88 = {
            onPage: (__VLS_ctx.onPageChange)
        };
        var __VLS_84;
    }
    if (__VLS_ctx.pagination) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "text-center text-sm text-gray-500" },
        });
        (__VLS_ctx.t('myProperties.showing', {
            from: ((__VLS_ctx.page - 1) * __VLS_ctx.limit) + 1,
            to: Math.min(__VLS_ctx.page * __VLS_ctx.limit, __VLS_ctx.pagination.total),
            total: __VLS_ctx.pagination.total,
        }));
    }
}
/** @type {__VLS_StyleScopedClasses['space-y-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:flex-row']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-tight']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
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
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:grid-cols-4']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-7']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-left']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:border-primary/50']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-md']} */ ;
/** @type {__VLS_StyleScopedClasses['p-1']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['truncate']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:flex-row']} */ ;
/** @type {__VLS_StyleScopedClasses['items-start']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['left-3']} */ ;
/** @type {__VLS_StyleScopedClasses['top-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-y-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-400']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['pl-10']} */ ;
/** @type {__VLS_StyleScopedClasses['pr-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-12']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['h-12']} */ ;
/** @type {__VLS_StyleScopedClasses['w-12']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
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
/** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:shadow-md']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:flex-row']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['h-32']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:w-44']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
/** @type {__VLS_StyleScopedClasses['w-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-300']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['bottom-2']} */ ;
/** @type {__VLS_StyleScopedClasses['left-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-black/60']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-0.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['inline']} */ ;
/** @type {__VLS_StyleScopedClasses['h-3']} */ ;
/** @type {__VLS_StyleScopedClasses['w-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-1']} */ ;
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['top-2']} */ ;
/** @type {__VLS_StyleScopedClasses['left-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-0.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-start']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['line-clamp-1']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-0.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-0.5']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['px-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['py-0.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-x-4']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-y-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['h-3.5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-3.5']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-normal']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-200']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
// @ts-ignore
var __VLS_12 = __VLS_11;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Plus: Plus,
            Search: Search,
            FileText: FileText,
            MoreVertical: MoreVertical,
            ImageIcon: ImageIcon,
            MapPin: MapPin,
            BedDouble: BedDouble,
            Maximize2: Maximize2,
            Paginator: Paginator,
            ConfirmDialog: ConfirmDialog,
            Menu: Menu,
            Skeleton: Skeleton,
            SEO: SEO,
            formatPrice: formatPrice,
            t: t,
            locale: locale,
            getLocalizedName: getLocalizedName,
            statusFilter: statusFilter,
            searchQuery: searchQuery,
            sortBy: sortBy,
            page: page,
            limit: limit,
            isLoading: isLoading,
            isError: isError,
            properties: properties,
            pagination: pagination,
            statCards: statCards,
            getStatusBadge: getStatusBadge,
            getPropertyTitle: getPropertyTitle,
            getPropertyImage: getPropertyImage,
            menuRef: menuRef,
            activeProperty: activeProperty,
            getMenuItems: getMenuItems,
            toggleMenu: toggleMenu,
            onPageChange: onPageChange,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */

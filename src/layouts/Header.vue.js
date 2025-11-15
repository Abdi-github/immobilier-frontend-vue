import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import { Search, Heart, Bell, User, LogOut, Settings, LayoutDashboard, Menu, X } from 'lucide-vue-next';
import Popover from 'primevue/popover';
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import { useUiStore } from '@/stores/ui.store';
import LanguageSwitcher from '@/shared/components/ui/LanguageSwitcher.vue';
const { t, locale } = useI18n();
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const uiStore = useUiStore();
const userMenuRef = ref();
const lang = computed(() => locale.value);
const navItems = computed(() => [
    {
        key: 'residential',
        label: t('common.nav.residential'),
        to: { name: 'properties', params: { lang: lang.value }, query: { section: 'residential' } },
    },
    {
        key: 'commercial',
        label: t('common.nav.commercial'),
        to: { name: 'properties', params: { lang: lang.value }, query: { section: 'commercial' } },
    },
    {
        key: 'agencies',
        label: t('common.nav.agencies'),
        to: { name: 'agencies', params: { lang: lang.value } },
    },
]);
function isNavActive(key) {
    const path = route.path;
    const query = route.query;
    if (key === 'residential')
        return path.includes('properties') && query.section === 'residential';
    if (key === 'commercial')
        return path.includes('properties') && query.section === 'commercial';
    if (key === 'agencies')
        return path.includes('agencies');
    return false;
}
function toggleUserMenu(event) {
    userMenuRef.value?.toggle(event);
}
async function handleLogout() {
    authStore.logout();
    userMenuRef.value?.hide();
    router.push({ name: 'home', params: { lang: lang.value } });
}
function navigateAndClose(routeName) {
    userMenuRef.value?.hide();
    uiStore.mobileMenuOpen = false;
    router.push({ name: routeName, params: { lang: lang.value } });
}
const userInitials = computed(() => {
    if (!authStore.currentUser)
        return '';
    return (authStore.currentUser.first_name?.[0] || '') + (authStore.currentUser.last_name?.[0] || '');
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({
    'data-testid': "header",
    ...{ class: "sticky top-0 z-50 w-full bg-white shadow-sm" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "mx-auto flex h-14 max-w-7xl items-center justify-between px-4" },
});
const __VLS_0 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    to: ({ name: 'home', params: { lang: __VLS_ctx.lang } }),
    ...{ class: "flex shrink-0 items-center" },
}));
const __VLS_2 = __VLS_1({
    to: ({ name: 'home', params: { lang: __VLS_ctx.lang } }),
    ...{ class: "flex shrink-0 items-center" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
    width: "160",
    height: "32",
    viewBox: "0 0 160 32",
    ...{ class: "h-8" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.text, __VLS_intrinsicElements.text)({
    x: "0",
    y: "24",
    ...{ class: "fill-[#1a1a2e] text-xl font-bold" },
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.text, __VLS_intrinsicElements.text)({
    x: "95",
    y: "24",
    ...{ class: "fill-primary text-xl font-bold" },
    ...{ style: {} },
});
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({
    ...{ class: "hidden items-center gap-1 lg:flex" },
});
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.navItems))) {
    const __VLS_4 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
        key: (item.key),
        to: (item.to),
        ...{ class: "px-4 py-2 text-sm font-medium transition-colors hover:text-primary" },
        ...{ class: (__VLS_ctx.isNavActive(item.key) ? 'text-primary' : 'text-gray-700') },
    }));
    const __VLS_6 = __VLS_5({
        key: (item.key),
        to: (item.to),
        ...{ class: "px-4 py-2 text-sm font-medium transition-colors hover:text-primary" },
        ...{ class: (__VLS_ctx.isNavActive(item.key) ? 'text-primary' : 'text-gray-700') },
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    __VLS_7.slots.default;
    (item.label);
    var __VLS_7;
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "flex items-center gap-2" },
});
/** @type {[typeof LanguageSwitcher, ]} */ ;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent(LanguageSwitcher, new LanguageSwitcher({}));
const __VLS_9 = __VLS_8({}, ...__VLS_functionalComponentArgsRest(__VLS_8));
const __VLS_11 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({
    to: ({ name: 'properties', params: { lang: __VLS_ctx.lang } }),
    ...{ class: "hidden rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 md:flex" },
    'aria-label': (__VLS_ctx.t('common.nav.properties')),
}));
const __VLS_13 = __VLS_12({
    to: ({ name: 'properties', params: { lang: __VLS_ctx.lang } }),
    ...{ class: "hidden rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 md:flex" },
    'aria-label': (__VLS_ctx.t('common.nav.properties')),
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
__VLS_14.slots.default;
const __VLS_15 = {}.Search;
/** @type {[typeof __VLS_components.Search, ]} */ ;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
    ...{ class: "h-5 w-5" },
}));
const __VLS_17 = __VLS_16({
    ...{ class: "h-5 w-5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
var __VLS_14;
const __VLS_19 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({
    to: (__VLS_ctx.authStore.isAuthenticated
        ? { name: 'dashboard-favorites', params: { lang: __VLS_ctx.lang } }
        : { name: 'sign-in', params: { lang: __VLS_ctx.lang } }),
    ...{ class: "hidden rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 md:flex" },
    'aria-label': (__VLS_ctx.t('common.nav.favorites')),
}));
const __VLS_21 = __VLS_20({
    to: (__VLS_ctx.authStore.isAuthenticated
        ? { name: 'dashboard-favorites', params: { lang: __VLS_ctx.lang } }
        : { name: 'sign-in', params: { lang: __VLS_ctx.lang } }),
    ...{ class: "hidden rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 md:flex" },
    'aria-label': (__VLS_ctx.t('common.nav.favorites')),
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
__VLS_22.slots.default;
const __VLS_23 = {}.Heart;
/** @type {[typeof __VLS_components.Heart, ]} */ ;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({
    ...{ class: "h-5 w-5" },
}));
const __VLS_25 = __VLS_24({
    ...{ class: "h-5 w-5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_24));
var __VLS_22;
const __VLS_27 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
// @ts-ignore
const __VLS_28 = __VLS_asFunctionalComponent(__VLS_27, new __VLS_27({
    to: (__VLS_ctx.authStore.isAuthenticated
        ? { name: 'dashboard-alerts', params: { lang: __VLS_ctx.lang } }
        : { name: 'sign-in', params: { lang: __VLS_ctx.lang } }),
    ...{ class: "hidden rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 md:flex" },
    'aria-label': (__VLS_ctx.t('common.nav.alerts')),
}));
const __VLS_29 = __VLS_28({
    to: (__VLS_ctx.authStore.isAuthenticated
        ? { name: 'dashboard-alerts', params: { lang: __VLS_ctx.lang } }
        : { name: 'sign-in', params: { lang: __VLS_ctx.lang } }),
    ...{ class: "hidden rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 md:flex" },
    'aria-label': (__VLS_ctx.t('common.nav.alerts')),
}, ...__VLS_functionalComponentArgsRest(__VLS_28));
__VLS_30.slots.default;
const __VLS_31 = {}.Bell;
/** @type {[typeof __VLS_components.Bell, ]} */ ;
// @ts-ignore
const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({
    ...{ class: "h-5 w-5" },
}));
const __VLS_33 = __VLS_32({
    ...{ class: "h-5 w-5" },
}, ...__VLS_functionalComponentArgsRest(__VLS_32));
var __VLS_30;
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.toggleUserMenu) },
    ...{ class: "rounded-full p-1 transition-colors hover:bg-gray-100" },
    'aria-haspopup': "true",
    'aria-label': (__VLS_ctx.t('common.nav.profile')),
});
if (__VLS_ctx.authStore.isAuthenticated && __VLS_ctx.authStore.currentUser) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-white" },
    });
    if (__VLS_ctx.authStore.currentUser.avatar_url) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
            src: (__VLS_ctx.authStore.currentUser.avatar_url),
            alt: (__VLS_ctx.authStore.currentUser.first_name),
            ...{ class: "h-8 w-8 rounded-full object-cover" },
        });
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (__VLS_ctx.userInitials);
    }
}
else {
    const __VLS_35 = {}.User;
    /** @type {[typeof __VLS_components.User, ]} */ ;
    // @ts-ignore
    const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({
        ...{ class: "h-5 w-5 text-gray-600" },
    }));
    const __VLS_37 = __VLS_36({
        ...{ class: "h-5 w-5 text-gray-600" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_36));
}
const __VLS_39 = {}.Popover;
/** @type {[typeof __VLS_components.Popover, typeof __VLS_components.Popover, ]} */ ;
// @ts-ignore
const __VLS_40 = __VLS_asFunctionalComponent(__VLS_39, new __VLS_39({
    ref: "userMenuRef",
    ...{ class: "w-56" },
}));
const __VLS_41 = __VLS_40({
    ref: "userMenuRef",
    ...{ class: "w-56" },
}, ...__VLS_functionalComponentArgsRest(__VLS_40));
/** @type {typeof __VLS_ctx.userMenuRef} */ ;
var __VLS_43 = {};
__VLS_42.slots.default;
if (__VLS_ctx.authStore.isAuthenticated && __VLS_ctx.authStore.currentUser) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "border-b px-3 py-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "text-sm font-medium text-gray-900" },
    });
    (__VLS_ctx.authStore.currentUser.first_name);
    (__VLS_ctx.authStore.currentUser.last_name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "text-xs text-gray-500" },
    });
    (__VLS_ctx.authStore.currentUser.email);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "py-1" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.authStore.isAuthenticated && __VLS_ctx.authStore.currentUser))
                    return;
                __VLS_ctx.navigateAndClose('dashboard-profile');
            } },
        ...{ class: "flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100" },
    });
    const __VLS_45 = {}.LayoutDashboard;
    /** @type {[typeof __VLS_components.LayoutDashboard, ]} */ ;
    // @ts-ignore
    const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
        ...{ class: "h-4 w-4" },
    }));
    const __VLS_47 = __VLS_46({
        ...{ class: "h-4 w-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_46));
    (__VLS_ctx.t('common.nav.dashboard'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.authStore.isAuthenticated && __VLS_ctx.authStore.currentUser))
                    return;
                __VLS_ctx.navigateAndClose('dashboard-profile');
            } },
        ...{ class: "flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100" },
    });
    const __VLS_49 = {}.User;
    /** @type {[typeof __VLS_components.User, ]} */ ;
    // @ts-ignore
    const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({
        ...{ class: "h-4 w-4" },
    }));
    const __VLS_51 = __VLS_50({
        ...{ class: "h-4 w-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_50));
    (__VLS_ctx.t('common.nav.profile'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.authStore.isAuthenticated && __VLS_ctx.authStore.currentUser))
                    return;
                __VLS_ctx.navigateAndClose('dashboard-favorites');
            } },
        ...{ class: "flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100" },
    });
    const __VLS_53 = {}.Heart;
    /** @type {[typeof __VLS_components.Heart, ]} */ ;
    // @ts-ignore
    const __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53({
        ...{ class: "h-4 w-4" },
    }));
    const __VLS_55 = __VLS_54({
        ...{ class: "h-4 w-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_54));
    (__VLS_ctx.t('common.nav.favorites'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.authStore.isAuthenticated && __VLS_ctx.authStore.currentUser))
                    return;
                __VLS_ctx.navigateAndClose('dashboard-alerts');
            } },
        ...{ class: "flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100" },
    });
    const __VLS_57 = {}.Bell;
    /** @type {[typeof __VLS_components.Bell, ]} */ ;
    // @ts-ignore
    const __VLS_58 = __VLS_asFunctionalComponent(__VLS_57, new __VLS_57({
        ...{ class: "h-4 w-4" },
    }));
    const __VLS_59 = __VLS_58({
        ...{ class: "h-4 w-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_58));
    (__VLS_ctx.t('common.nav.alerts'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.authStore.isAuthenticated && __VLS_ctx.authStore.currentUser))
                    return;
                __VLS_ctx.navigateAndClose('dashboard-settings');
            } },
        ...{ class: "flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100" },
    });
    const __VLS_61 = {}.Settings;
    /** @type {[typeof __VLS_components.Settings, ]} */ ;
    // @ts-ignore
    const __VLS_62 = __VLS_asFunctionalComponent(__VLS_61, new __VLS_61({
        ...{ class: "h-4 w-4" },
    }));
    const __VLS_63 = __VLS_62({
        ...{ class: "h-4 w-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_62));
    (__VLS_ctx.t('common.nav.settings'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "border-t py-1" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.handleLogout) },
        ...{ class: "flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-gray-100" },
    });
    const __VLS_65 = {}.LogOut;
    /** @type {[typeof __VLS_components.LogOut, ]} */ ;
    // @ts-ignore
    const __VLS_66 = __VLS_asFunctionalComponent(__VLS_65, new __VLS_65({
        ...{ class: "h-4 w-4" },
    }));
    const __VLS_67 = __VLS_66({
        ...{ class: "h-4 w-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_66));
    (__VLS_ctx.t('common.nav.logout'));
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "py-1" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!!(__VLS_ctx.authStore.isAuthenticated && __VLS_ctx.authStore.currentUser))
                    return;
                __VLS_ctx.navigateAndClose('sign-in');
            } },
        ...{ class: "flex w-full items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100" },
    });
    (__VLS_ctx.t('common.nav.login'));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                if (!!(__VLS_ctx.authStore.isAuthenticated && __VLS_ctx.authStore.currentUser))
                    return;
                __VLS_ctx.navigateAndClose('register');
            } },
        ...{ class: "flex w-full items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100" },
    });
    (__VLS_ctx.t('common.nav.register'));
}
var __VLS_42;
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.uiStore.toggleMobileMenu();
        } },
    ...{ class: "rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 md:hidden" },
    'aria-label': (__VLS_ctx.uiStore.mobileMenuOpen ? __VLS_ctx.t('common.actions.close') : __VLS_ctx.t('common.actions.openMenu')),
    'aria-controls': "mobile-menu",
    'aria-expanded': (__VLS_ctx.uiStore.mobileMenuOpen),
});
if (__VLS_ctx.uiStore.mobileMenuOpen) {
    const __VLS_69 = {}.X;
    /** @type {[typeof __VLS_components.X, ]} */ ;
    // @ts-ignore
    const __VLS_70 = __VLS_asFunctionalComponent(__VLS_69, new __VLS_69({
        ...{ class: "h-6 w-6" },
    }));
    const __VLS_71 = __VLS_70({
        ...{ class: "h-6 w-6" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_70));
}
else {
    const __VLS_73 = {}.Menu;
    /** @type {[typeof __VLS_components.Menu, ]} */ ;
    // @ts-ignore
    const __VLS_74 = __VLS_asFunctionalComponent(__VLS_73, new __VLS_73({
        ...{ class: "h-6 w-6" },
    }));
    const __VLS_75 = __VLS_74({
        ...{ class: "h-6 w-6" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_74));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "overflow-hidden border-t bg-white transition-all duration-200 md:hidden" },
    ...{ class: (__VLS_ctx.uiStore.mobileMenuOpen ? 'max-h-[400px]' : 'max-h-0') },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.nav, __VLS_intrinsicElements.nav)({
    ...{ class: "container mx-auto flex flex-col px-4 py-4" },
});
const __VLS_77 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
// @ts-ignore
const __VLS_78 = __VLS_asFunctionalComponent(__VLS_77, new __VLS_77({
    ...{ 'onClick': {} },
    to: ({ name: 'properties', params: { lang: __VLS_ctx.lang }, query: { section: 'residential' } }),
    ...{ class: "border-b border-gray-100 py-3 text-sm font-medium" },
}));
const __VLS_79 = __VLS_78({
    ...{ 'onClick': {} },
    to: ({ name: 'properties', params: { lang: __VLS_ctx.lang }, query: { section: 'residential' } }),
    ...{ class: "border-b border-gray-100 py-3 text-sm font-medium" },
}, ...__VLS_functionalComponentArgsRest(__VLS_78));
let __VLS_81;
let __VLS_82;
let __VLS_83;
const __VLS_84 = {
    onClick: (...[$event]) => {
        __VLS_ctx.uiStore.mobileMenuOpen = false;
    }
};
__VLS_80.slots.default;
(__VLS_ctx.t('common.nav.residential'));
var __VLS_80;
const __VLS_85 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
// @ts-ignore
const __VLS_86 = __VLS_asFunctionalComponent(__VLS_85, new __VLS_85({
    ...{ 'onClick': {} },
    to: ({ name: 'properties', params: { lang: __VLS_ctx.lang }, query: { section: 'commercial' } }),
    ...{ class: "border-b border-gray-100 py-3 text-sm font-medium" },
}));
const __VLS_87 = __VLS_86({
    ...{ 'onClick': {} },
    to: ({ name: 'properties', params: { lang: __VLS_ctx.lang }, query: { section: 'commercial' } }),
    ...{ class: "border-b border-gray-100 py-3 text-sm font-medium" },
}, ...__VLS_functionalComponentArgsRest(__VLS_86));
let __VLS_89;
let __VLS_90;
let __VLS_91;
const __VLS_92 = {
    onClick: (...[$event]) => {
        __VLS_ctx.uiStore.mobileMenuOpen = false;
    }
};
__VLS_88.slots.default;
(__VLS_ctx.t('common.nav.commercial'));
var __VLS_88;
const __VLS_93 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
// @ts-ignore
const __VLS_94 = __VLS_asFunctionalComponent(__VLS_93, new __VLS_93({
    ...{ 'onClick': {} },
    to: ({ name: 'agencies', params: { lang: __VLS_ctx.lang } }),
    ...{ class: "border-b border-gray-100 py-3 text-sm font-medium" },
}));
const __VLS_95 = __VLS_94({
    ...{ 'onClick': {} },
    to: ({ name: 'agencies', params: { lang: __VLS_ctx.lang } }),
    ...{ class: "border-b border-gray-100 py-3 text-sm font-medium" },
}, ...__VLS_functionalComponentArgsRest(__VLS_94));
let __VLS_97;
let __VLS_98;
let __VLS_99;
const __VLS_100 = {
    onClick: (...[$event]) => {
        __VLS_ctx.uiStore.mobileMenuOpen = false;
    }
};
__VLS_96.slots.default;
(__VLS_ctx.t('common.nav.agencies'));
var __VLS_96;
if (__VLS_ctx.authStore.isAuthenticated) {
    const __VLS_101 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_102 = __VLS_asFunctionalComponent(__VLS_101, new __VLS_101({
        ...{ 'onClick': {} },
        to: ({ name: 'dashboard-profile', params: { lang: __VLS_ctx.lang } }),
        ...{ class: "flex items-center gap-2 border-b border-gray-100 py-3 text-sm font-medium" },
    }));
    const __VLS_103 = __VLS_102({
        ...{ 'onClick': {} },
        to: ({ name: 'dashboard-profile', params: { lang: __VLS_ctx.lang } }),
        ...{ class: "flex items-center gap-2 border-b border-gray-100 py-3 text-sm font-medium" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_102));
    let __VLS_105;
    let __VLS_106;
    let __VLS_107;
    const __VLS_108 = {
        onClick: (...[$event]) => {
            if (!(__VLS_ctx.authStore.isAuthenticated))
                return;
            __VLS_ctx.uiStore.mobileMenuOpen = false;
        }
    };
    __VLS_104.slots.default;
    const __VLS_109 = {}.LayoutDashboard;
    /** @type {[typeof __VLS_components.LayoutDashboard, ]} */ ;
    // @ts-ignore
    const __VLS_110 = __VLS_asFunctionalComponent(__VLS_109, new __VLS_109({
        ...{ class: "h-4 w-4" },
    }));
    const __VLS_111 = __VLS_110({
        ...{ class: "h-4 w-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_110));
    (__VLS_ctx.t('common.nav.dashboard'));
    var __VLS_104;
    const __VLS_113 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_114 = __VLS_asFunctionalComponent(__VLS_113, new __VLS_113({
        ...{ 'onClick': {} },
        to: ({ name: 'dashboard-favorites', params: { lang: __VLS_ctx.lang } }),
        ...{ class: "flex items-center gap-2 border-b border-gray-100 py-3 text-sm font-medium" },
    }));
    const __VLS_115 = __VLS_114({
        ...{ 'onClick': {} },
        to: ({ name: 'dashboard-favorites', params: { lang: __VLS_ctx.lang } }),
        ...{ class: "flex items-center gap-2 border-b border-gray-100 py-3 text-sm font-medium" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_114));
    let __VLS_117;
    let __VLS_118;
    let __VLS_119;
    const __VLS_120 = {
        onClick: (...[$event]) => {
            if (!(__VLS_ctx.authStore.isAuthenticated))
                return;
            __VLS_ctx.uiStore.mobileMenuOpen = false;
        }
    };
    __VLS_116.slots.default;
    const __VLS_121 = {}.Heart;
    /** @type {[typeof __VLS_components.Heart, ]} */ ;
    // @ts-ignore
    const __VLS_122 = __VLS_asFunctionalComponent(__VLS_121, new __VLS_121({
        ...{ class: "h-4 w-4" },
    }));
    const __VLS_123 = __VLS_122({
        ...{ class: "h-4 w-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_122));
    (__VLS_ctx.t('common.nav.favorites'));
    var __VLS_116;
    const __VLS_125 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_126 = __VLS_asFunctionalComponent(__VLS_125, new __VLS_125({
        ...{ 'onClick': {} },
        to: ({ name: 'dashboard-alerts', params: { lang: __VLS_ctx.lang } }),
        ...{ class: "flex items-center gap-2 py-3 text-sm font-medium" },
    }));
    const __VLS_127 = __VLS_126({
        ...{ 'onClick': {} },
        to: ({ name: 'dashboard-alerts', params: { lang: __VLS_ctx.lang } }),
        ...{ class: "flex items-center gap-2 py-3 text-sm font-medium" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_126));
    let __VLS_129;
    let __VLS_130;
    let __VLS_131;
    const __VLS_132 = {
        onClick: (...[$event]) => {
            if (!(__VLS_ctx.authStore.isAuthenticated))
                return;
            __VLS_ctx.uiStore.mobileMenuOpen = false;
        }
    };
    __VLS_128.slots.default;
    const __VLS_133 = {}.Bell;
    /** @type {[typeof __VLS_components.Bell, ]} */ ;
    // @ts-ignore
    const __VLS_134 = __VLS_asFunctionalComponent(__VLS_133, new __VLS_133({
        ...{ class: "h-4 w-4" },
    }));
    const __VLS_135 = __VLS_134({
        ...{ class: "h-4 w-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_134));
    (__VLS_ctx.t('common.nav.alerts'));
    var __VLS_128;
}
else {
    const __VLS_137 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_138 = __VLS_asFunctionalComponent(__VLS_137, new __VLS_137({
        ...{ 'onClick': {} },
        to: ({ name: 'sign-in', params: { lang: __VLS_ctx.lang } }),
        ...{ class: "flex items-center gap-2 py-3 text-sm font-medium" },
    }));
    const __VLS_139 = __VLS_138({
        ...{ 'onClick': {} },
        to: ({ name: 'sign-in', params: { lang: __VLS_ctx.lang } }),
        ...{ class: "flex items-center gap-2 py-3 text-sm font-medium" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_138));
    let __VLS_141;
    let __VLS_142;
    let __VLS_143;
    const __VLS_144 = {
        onClick: (...[$event]) => {
            if (!!(__VLS_ctx.authStore.isAuthenticated))
                return;
            __VLS_ctx.uiStore.mobileMenuOpen = false;
        }
    };
    __VLS_140.slots.default;
    const __VLS_145 = {}.User;
    /** @type {[typeof __VLS_components.User, ]} */ ;
    // @ts-ignore
    const __VLS_146 = __VLS_asFunctionalComponent(__VLS_145, new __VLS_145({
        ...{ class: "h-4 w-4" },
    }));
    const __VLS_147 = __VLS_146({
        ...{ class: "h-4 w-4" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_146));
    (__VLS_ctx.t('common.nav.login'));
    var __VLS_140;
}
/** @type {__VLS_StyleScopedClasses['sticky']} */ ;
/** @type {__VLS_StyleScopedClasses['top-0']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-14']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-7xl']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
/** @type {__VLS_StyleScopedClasses['fill-[#1a1a2e]']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['fill-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-1']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:flex']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['md:flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['md:flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['md:flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['p-1']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
/** @type {__VLS_StyleScopedClasses['w-8']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['h-8']} */ ;
/** @type {__VLS_StyleScopedClasses['w-8']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['w-56']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-900']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-600']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-1']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-600']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['md:hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['h-6']} */ ;
/** @type {__VLS_StyleScopedClasses['w-6']} */ ;
/** @type {__VLS_StyleScopedClasses['h-6']} */ ;
/** @type {__VLS_StyleScopedClasses['w-6']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
/** @type {__VLS_StyleScopedClasses['md:hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-4']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-100']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
// @ts-ignore
var __VLS_44 = __VLS_43;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Search: Search,
            Heart: Heart,
            Bell: Bell,
            User: User,
            LogOut: LogOut,
            Settings: Settings,
            LayoutDashboard: LayoutDashboard,
            Menu: Menu,
            X: X,
            Popover: Popover,
            LanguageSwitcher: LanguageSwitcher,
            t: t,
            authStore: authStore,
            uiStore: uiStore,
            userMenuRef: userMenuRef,
            lang: lang,
            navItems: navItems,
            isNavActive: isNavActive,
            toggleUserMenu: toggleUserMenu,
            handleLogout: handleLogout,
            navigateAndClose: navigateAndClose,
            userInitials: userInitials,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */

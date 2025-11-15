import { createRouter, createWebHistory } from 'vue-router';
import { validateLanguage, requireAuth, requireRole, requireGuest } from './guards';
import { useLanguageStore, SUPPORTED_LANGUAGES } from '@/stores/language.store';
import i18n from '@/i18n';
const MainLayout = () => import('@/layouts/MainLayout.vue');
const routes = [
    {
        path: '/',
        redirect: () => {
            const savedLang = localStorage.getItem('i18nextLng') || 'en';
            return `/${savedLang}`;
        },
    },
    {
        path: '/:lang',
        component: MainLayout,
        beforeEnter: validateLanguage,
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('@/features/home/pages/HomePage.vue'),
            },
            {
                path: 'properties',
                name: 'properties',
                component: () => import('@/features/properties/pages/PropertiesPage.vue'),
            },
            {
                path: 'properties/:id',
                name: 'property-detail',
                component: () => import('@/features/properties/pages/PropertyDetailPage.vue'),
            },
            {
                path: 'agencies',
                name: 'agencies',
                component: () => import('@/features/agencies/pages/AgenciesPage.vue'),
            },
            {
                path: 'agencies/:id',
                name: 'agency-detail',
                component: () => import('@/features/agencies/pages/AgencyDetailPage.vue'),
            },
            {
                path: 'sign-in',
                name: 'sign-in',
                component: () => import('@/features/auth/pages/SignInPage.vue'),
                beforeEnter: requireGuest,
            },
            {
                path: 'register',
                name: 'register',
                component: () => import('@/features/auth/pages/RegisterPage.vue'),
                beforeEnter: requireGuest,
            },
            {
                path: 'registration-pending',
                name: 'registration-pending',
                component: () => import('@/features/auth/pages/RegistrationPendingPage.vue'),
            },
            {
                path: 'verify-email',
                name: 'verify-email',
                component: () => import('@/features/auth/pages/VerifyEmailPage.vue'),
            },
            {
                path: 'reset-password',
                name: 'reset-password',
                component: () => import('@/features/auth/pages/ResetPasswordPage.vue'),
            },
            {
                path: 'about',
                name: 'about',
                component: () => import('@/features/static/pages/AboutPage.vue'),
            },
            {
                path: 'contact',
                name: 'contact',
                component: () => import('@/features/static/pages/ContactPage.vue'),
            },
            {
                path: 'terms',
                name: 'terms',
                component: () => import('@/features/static/pages/TermsPage.vue'),
            },
            {
                path: 'privacy',
                name: 'privacy',
                component: () => import('@/features/static/pages/PrivacyPage.vue'),
            },
            {
                path: 'newsletter',
                name: 'newsletter',
                component: () => import('@/features/static/pages/NewsletterPage.vue'),
            },
            {
                path: 'dashboard',
                beforeEnter: requireAuth,
                component: () => import('@/features/dashboard/components/DashboardLayout.vue'),
                children: [
                    {
                        path: 'profile',
                        name: 'dashboard-profile',
                        component: () => import('@/features/dashboard/pages/ProfilePage.vue'),
                    },
                    {
                        path: 'favorites',
                        name: 'dashboard-favorites',
                        component: () => import('@/features/dashboard/pages/FavoritesPage.vue'),
                    },
                    {
                        path: 'alerts',
                        name: 'dashboard-alerts',
                        component: () => import('@/features/dashboard/pages/AlertsPage.vue'),
                    },
                    {
                        path: 'inquiries',
                        name: 'dashboard-inquiries',
                        component: () => import('@/features/dashboard/pages/InquiriesPage.vue'),
                    },
                    {
                        path: 'settings',
                        name: 'dashboard-settings',
                        component: () => import('@/features/dashboard/pages/AccountSettingsPage.vue'),
                    },
                    {
                        path: 'properties',
                        beforeEnter: requireRole([
                            'owner',
                            'agent',
                            'agency_admin',
                            'platform_admin',
                            'super_admin',
                        ]),
                        children: [
                            {
                                path: '',
                                name: 'my-properties',
                                component: () => import('@/features/property-management/pages/MyPropertiesPage.vue'),
                            },
                            {
                                path: 'new',
                                name: 'create-property',
                                component: () => import('@/features/property-management/pages/CreatePropertyPage.vue'),
                            },
                            {
                                path: ':id/edit',
                                name: 'edit-property',
                                component: () => import('@/features/property-management/pages/EditPropertyPage.vue'),
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/features/shared/pages/NotFoundPage.vue'),
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(_to, _from, savedPosition) {
        return savedPosition || { top: 0 };
    },
});
router.beforeEach((to, _from, next) => {
    const lang = to.params.lang;
    if (lang && SUPPORTED_LANGUAGES.includes(lang)) {
        const languageStore = useLanguageStore();
        languageStore.setLocale(lang);
        i18n.global.locale.value = lang;
    }
    next();
});
export default router;

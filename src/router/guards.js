import { useAuthStore } from '@/stores/auth.store';
import { SUPPORTED_LANGUAGES } from '@/stores/language.store';
export const requireAuth = (to, _from, next) => {
    const authStore = useAuthStore();
    if (!authStore.isAuthenticated) {
        next({ path: `/${to.params.lang || 'en'}/sign-in`, query: { redirect: to.fullPath } });
    }
    else {
        next();
    }
};
export function requireRole(allowedRoles) {
    return (to, _from, next) => {
        const authStore = useAuthStore();
        if (!authStore.isAuthenticated) {
            next({ path: `/${to.params.lang || 'en'}/sign-in` });
        }
        else if (!authStore.currentUser || !allowedRoles.includes(authStore.currentUser.user_type)) {
            next({ path: `/${to.params.lang || 'en'}/dashboard/profile` });
        }
        else {
            next();
        }
    };
}
export const requireGuest = (to, _from, next) => {
    const authStore = useAuthStore();
    if (authStore.isAuthenticated) {
        next({ path: `/${to.params.lang || 'en'}/dashboard/profile` });
    }
    else {
        next();
    }
};
export function validateLanguage(to, _from, next) {
    const lang = to.params.lang;
    if (!SUPPORTED_LANGUAGES.includes(lang)) {
        next({ path: `/en${to.path.replace(/^\/[^/]+/, '')}`, replace: true });
    }
    else {
        next();
    }
}

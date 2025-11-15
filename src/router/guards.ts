import type { NavigationGuardWithThis } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import { SUPPORTED_LANGUAGES } from '@/stores/language.store';

export const requireAuth: NavigationGuardWithThis<undefined> = (to, _from, next) => {
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated) {
    next({ path: `/${to.params.lang || 'en'}/sign-in`, query: { redirect: to.fullPath } });
  } else {
    next();
  }
};

export function requireRole(allowedRoles: string[]): NavigationGuardWithThis<undefined> {
  return (to, _from, next) => {
    const authStore = useAuthStore();
    if (!authStore.isAuthenticated) {
      next({ path: `/${to.params.lang || 'en'}/sign-in` });
    } else if (!authStore.currentUser || !allowedRoles.includes(authStore.currentUser.user_type)) {
      next({ path: `/${to.params.lang || 'en'}/dashboard/profile` });
    } else {
      next();
    }
  };
}

export const requireGuest: NavigationGuardWithThis<undefined> = (to, _from, next) => {
  const authStore = useAuthStore();
  if (authStore.isAuthenticated) {
    next({ path: `/${to.params.lang || 'en'}/dashboard/profile` });
  } else {
    next();
  }
};

export function validateLanguage(
  to: Parameters<NavigationGuardWithThis<undefined>>[0],
  _from: Parameters<NavigationGuardWithThis<undefined>>[1],
  next: Parameters<NavigationGuardWithThis<undefined>>[2],
) {
  const lang = to.params.lang as string;
  if (!SUPPORTED_LANGUAGES.includes(lang as (typeof SUPPORTED_LANGUAGES)[number])) {
    next({ path: `/en${to.path.replace(/^\/[^/]+/, '')}`, replace: true });
  } else {
    next();
  }
}

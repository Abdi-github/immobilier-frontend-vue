import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export type UserType =
  | 'end_user'
  | 'owner'
  | 'agent'
  | 'agency_admin'
  | 'platform_admin'
  | 'super_admin';

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  avatar_url?: string;
  user_type: UserType;
  agency_id?: string;
  agency?: {
    id: string;
    name: string;
    slug: string;
  };
  preferred_language: string;
  status: string;
  email_verified: boolean;
  created_at: string;
  roles: string[];
  permissions: string[];
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);
  const refreshToken = ref<string | null>(null);
  const isLoading = ref(false);

  const isAuthenticated = computed(() => !!token.value && !!user.value);
  const currentUser = computed(() => user.value);

  function setCredentials(data: { user: User; access_token: string; refresh_token: string }) {
    user.value = data.user;
    token.value = data.access_token;
    refreshToken.value = data.refresh_token;
    localStorage.setItem('immobilier_token', data.access_token);
    localStorage.setItem('immobilier_refresh_token', data.refresh_token);
    localStorage.setItem('immobilier_user', JSON.stringify(data.user));
  }

  function updateUser(updatedUser: Partial<User> | User) {
    if (user.value) {
      user.value = { ...user.value, ...updatedUser };
    } else {
      user.value = updatedUser as User;
    }
    localStorage.setItem('immobilier_user', JSON.stringify(user.value));
  }

  function updateTokens(tokens: { access_token: string; refresh_token: string }) {
    token.value = tokens.access_token;
    refreshToken.value = tokens.refresh_token;
    localStorage.setItem('immobilier_token', tokens.access_token);
    localStorage.setItem('immobilier_refresh_token', tokens.refresh_token);
  }

  function logout() {
    user.value = null;
    token.value = null;
    refreshToken.value = null;
    localStorage.removeItem('immobilier_token');
    localStorage.removeItem('immobilier_refresh_token');
    localStorage.removeItem('immobilier_user');
  }

  function setLoading(loading: boolean) {
    isLoading.value = loading;
  }

  function hydrate() {
    const savedToken = localStorage.getItem('immobilier_token');
    const savedRefreshToken = localStorage.getItem('immobilier_refresh_token');
    const savedUser = localStorage.getItem('immobilier_user');
    if (savedToken && savedUser) {
      try {
        token.value = savedToken;
        refreshToken.value = savedRefreshToken;
        user.value = JSON.parse(savedUser);
      } catch {
        logout();
      }
    }
  }

  return {
    user,
    token,
    refreshToken,
    isLoading,
    isAuthenticated,
    currentUser,
    setCredentials,
    updateUser,
    updateTokens,
    logout,
    setLoading,
    hydrate,
  };
});

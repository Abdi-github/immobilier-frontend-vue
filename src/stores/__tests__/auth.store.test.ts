import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAuthStore } from '../auth.store';
import type { User } from '../auth.store';

const mockUser: User = {
  id: '1',
  email: 'test@example.com',
  first_name: 'John',
  last_name: 'Doe',
  user_type: 'end_user',
  preferred_language: 'en',
  status: 'active',
  email_verified: true,
  created_at: '2025-01-01',
  roles: ['user'],
  permissions: [],
};

describe('useAuthStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  it('starts unauthenticated', () => {
    const store = useAuthStore();
    expect(store.isAuthenticated).toBe(false);
    expect(store.currentUser).toBeNull();
    expect(store.token).toBeNull();
  });

  it('sets credentials and becomes authenticated', () => {
    const store = useAuthStore();
    store.setCredentials({
      user: mockUser,
      access_token: 'test-token',
      refresh_token: 'test-refresh',
    });

    expect(store.isAuthenticated).toBe(true);
    expect(store.currentUser?.email).toBe('test@example.com');
    expect(store.token).toBe('test-token');
    expect(localStorage.getItem('immobilier_token')).toBe('test-token');
    expect(localStorage.getItem('immobilier_refresh_token')).toBe('test-refresh');
  });

  it('updates user data and persists to localStorage', () => {
    const store = useAuthStore();
    store.setCredentials({
      user: { ...mockUser },
      access_token: 'token',
      refresh_token: 'refresh',
    });

    store.updateUser({ first_name: 'Jane' });

    // Verify update was persisted to localStorage with merged data
    const saved = JSON.parse(localStorage.getItem('immobilier_user')!);
    expect(saved.first_name).toBe('Jane');
    expect(saved.last_name).toBe('Doe');
    expect(saved.email).toBe('test@example.com');
  });

  it('updates tokens', () => {
    const store = useAuthStore();
    store.setCredentials({
      user: mockUser,
      access_token: 'old-token',
      refresh_token: 'old-refresh',
    });

    store.updateTokens({
      access_token: 'new-token',
      refresh_token: 'new-refresh',
    });

    expect(store.token).toBe('new-token');
    expect(localStorage.getItem('immobilier_token')).toBe('new-token');
  });

  it('clears everything on logout', () => {
    const store = useAuthStore();
    store.setCredentials({
      user: mockUser,
      access_token: 'token',
      refresh_token: 'refresh',
    });

    store.logout();

    expect(store.isAuthenticated).toBe(false);
    expect(store.currentUser).toBeNull();
    expect(store.token).toBeNull();
    expect(localStorage.getItem('immobilier_token')).toBeNull();
  });

  it('hydrates from localStorage', () => {
    localStorage.setItem('immobilier_token', 'saved-token');
    localStorage.setItem('immobilier_refresh_token', 'saved-refresh');
    localStorage.setItem('immobilier_user', JSON.stringify(mockUser));

    const store = useAuthStore();
    store.hydrate();

    expect(store.isAuthenticated).toBe(true);
    expect(store.currentUser?.email).toBe('test@example.com');
    expect(store.token).toBe('saved-token');
  });

  it('handles invalid JSON during hydration', () => {
    localStorage.setItem('immobilier_token', 'token');
    localStorage.setItem('immobilier_user', 'invalid-json');

    const store = useAuthStore();
    store.hydrate();

    expect(store.isAuthenticated).toBe(false);
    expect(store.currentUser).toBeNull();
  });

  it('sets loading state', () => {
    const store = useAuthStore();
    expect(store.isLoading).toBe(false);
    store.setLoading(true);
    expect(store.isLoading).toBe(true);
  });
});

import apiClient from '@/app/axios';
import type {
  UpdateProfileRequest,
  ChangePasswordRequest,
  UserSettings,
  Favorite,
  PropertyAlert,
  CreateAlertRequest,
  UpdateAlertRequest,
  DashboardStats,
  Inquiry,
} from '../types';
import type { User } from '@/features/auth/types';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

function transformPaginated<T>(raw: PaginatedResponse<T>): PaginatedResult<T> {
  return {
    data: raw.data,
    pagination: {
      page: raw.meta.page,
      limit: raw.meta.limit,
      total: raw.meta.total,
      totalPages: raw.meta.total_pages,
    },
  };
}

export const dashboardApi = {
  // ==================== Profile ====================

  getProfile() {
    return apiClient.get<ApiResponse<User>>('/public/auth/me');
  },

  updateProfile(data: UpdateProfileRequest) {
    return apiClient.patch<ApiResponse<User>>('/public/auth/me', data);
  },

  changePassword(data: ChangePasswordRequest) {
    return apiClient.post<ApiResponse<{ message: string }>>('/public/auth/change-password', data);
  },

  uploadAvatar(formData: FormData) {
    return apiClient.post<ApiResponse<{ avatar_url: string }>>('/public/users/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  deleteAvatar() {
    return apiClient.delete<ApiResponse<null>>('/public/users/avatar');
  },

  // ==================== Settings ====================

  getSettings() {
    return apiClient.get<ApiResponse<UserSettings>>('/public/users/settings');
  },

  updateSettings(data: Partial<UserSettings>) {
    return apiClient.patch<ApiResponse<UserSettings>>('/public/users/settings', data);
  },

  // ==================== Favorites ====================

  getFavorites(params: { page?: number; limit?: number } = {}) {
    return apiClient
      .get<PaginatedResponse<Favorite>>('/public/users/favorites', {
        params: { page: params.page ?? 1, limit: params.limit ?? 12 },
      })
      .then((res) => ({ ...res, data: transformPaginated(res.data) }));
  },

  addFavorite(propertyId: string) {
    return apiClient.post<ApiResponse<Favorite>>('/public/users/favorites', {
      property_id: propertyId,
    });
  },

  removeFavorite(propertyId: string) {
    return apiClient.delete<ApiResponse<null>>(`/public/users/favorites/${propertyId}`);
  },

  getFavoriteIds() {
    return apiClient.get<ApiResponse<{ property_ids: string[] }>>('/public/users/favorites/ids');
  },

  // ==================== Alerts ====================

  getAlerts() {
    return apiClient.get<ApiResponse<PropertyAlert[]>>('/public/users/alerts');
  },

  createAlert(data: CreateAlertRequest) {
    return apiClient.post<ApiResponse<PropertyAlert>>('/public/users/alerts', data);
  },

  updateAlert(id: string, data: UpdateAlertRequest) {
    return apiClient.put<ApiResponse<PropertyAlert>>(`/public/users/alerts/${id}`, data);
  },

  deleteAlert(id: string) {
    return apiClient.delete<ApiResponse<null>>(`/public/users/alerts/${id}`);
  },

  toggleAlert(id: string, is_active: boolean) {
    return apiClient.patch<ApiResponse<PropertyAlert>>(`/public/users/alerts/${id}/toggle`, {
      is_active,
    });
  },

  // ==================== Stats ====================

  getDashboardStats() {
    return apiClient.get<ApiResponse<DashboardStats>>('/public/users/dashboard/stats');
  },

  // ==================== Inquiries ====================

  getMyInquiries(params: { page?: number; limit?: number } = {}) {
    return apiClient
      .get<PaginatedResponse<Inquiry>>('/public/leads/my-inquiries', {
        params: { page: params.page ?? 1, limit: params.limit ?? 10 },
      })
      .then((res) => ({ ...res, data: transformPaginated(res.data) }));
  },

  // ==================== Account ====================

  deactivateAccount() {
    return apiClient.delete<ApiResponse<null>>('/public/users/account');
  },
};

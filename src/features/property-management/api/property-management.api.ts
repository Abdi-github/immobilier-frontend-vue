import apiClient from '@/app/axios';
import type {
  CreatePropertyRequest,
  UpdatePropertyRequest,
  ManagedProperty,
  PropertyImage,
  UploadImageResponse,
  CreateTranslationRequest,
  PropertyTranslation,
} from '../types';

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

interface MyPropertiesParams {
  page?: number;
  limit?: number;
  status?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
}

export const propertyManagementApi = {
  // ==================== My Properties ====================

  getMyProperties(params?: MyPropertiesParams) {
    return apiClient.get<ApiResponse<ManagedProperty[]>>('/agent/properties', { params });
  },

  getMyProperty(id: string) {
    return apiClient.get<ApiResponse<ManagedProperty>>(`/agent/properties/${id}`);
  },

  getPropertyStats() {
    return apiClient.get<ApiResponse<Record<string, unknown>>>('/agent/properties/statistics');
  },

  // ==================== Property CRUD ====================

  createProperty(data: CreatePropertyRequest) {
    return apiClient.post<ApiResponse<ManagedProperty>>('/agent/properties', data);
  },

  updateProperty(id: string, data: UpdatePropertyRequest) {
    return apiClient.put<ApiResponse<ManagedProperty>>(`/agent/properties/${id}`, data);
  },

  deleteProperty(id: string) {
    return apiClient.delete(`/agent/properties/${id}`);
  },

  submitForApproval(id: string) {
    return apiClient.post<ApiResponse<ManagedProperty>>(`/agent/properties/${id}/submit`);
  },

  archiveProperty(id: string) {
    return apiClient.post<ApiResponse<ManagedProperty>>(`/agent/properties/${id}/archive`);
  },

  // ==================== Property Images ====================

  getPropertyImages(propertyId: string) {
    return apiClient.get<ApiResponse<PropertyImage[]>>(`/agent/properties/${propertyId}/images`);
  },

  uploadImage(propertyId: string, formData: FormData) {
    return apiClient.post<ApiResponse<UploadImageResponse>>(
      `/agent/properties/${propertyId}/images/upload`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } },
    );
  },

  uploadMultipleImages(propertyId: string, formData: FormData) {
    return apiClient.post<ApiResponse<UploadImageResponse[]>>(
      `/agent/properties/${propertyId}/images/upload-multiple`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } },
    );
  },

  deleteImage(propertyId: string, imageId: string) {
    return apiClient.delete(`/agent/properties/${propertyId}/images/${imageId}`);
  },

  setPrimaryImage(propertyId: string, imageId: string) {
    return apiClient.put(`/agent/properties/${propertyId}/images/${imageId}`, {
      is_primary: true,
    });
  },

  reorderImages(propertyId: string, imageIds: string[]) {
    return apiClient.post(`/agent/properties/${propertyId}/images/reorder`, {
      image_ids: imageIds,
    });
  },

  // ==================== Translations ====================

  createTranslation(data: CreateTranslationRequest) {
    return apiClient.post<ApiResponse<PropertyTranslation>>('/admin/translations', data);
  },

  requestAutoTranslation(propertyId: string, targetLanguages?: string[]) {
    return apiClient.post(`/agent/properties/${propertyId}/translations/request`, {
      target_languages: targetLanguages,
    });
  },
};

import apiClient from '@/app/axios';
import type { ApiResponse, PaginatedApiResponse } from '@/types/api';
import type { Property, PropertyQueryParams } from '../types';

function cleanParams(params: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== null && value !== undefined && value !== '',
    ),
  );
}

export const propertiesApi = {
  getProperties(params?: PropertyQueryParams) {
    return apiClient.get<PaginatedApiResponse<Property>>('/public/properties', {
      params: params ? cleanParams(params as Record<string, unknown>) : undefined,
    });
  },

  getProperty(id: string) {
    return apiClient.get<ApiResponse<Property>>(`/public/properties/${id}`);
  },

  getPropertyImages(id: string) {
    return apiClient.get<ApiResponse<Property['images']>>(`/public/properties/${id}/images`);
  },

  getPropertiesByCanton(cantonId: string, params?: PropertyQueryParams) {
    return apiClient.get<PaginatedApiResponse<Property>>(
      `/public/properties/canton/${cantonId}`,
      { params: params ? cleanParams(params as Record<string, unknown>) : undefined },
    );
  },

  getPropertiesByCity(cityId: string, params?: PropertyQueryParams) {
    return apiClient.get<PaginatedApiResponse<Property>>(
      `/public/properties/city/${cityId}`,
      { params: params ? cleanParams(params as Record<string, unknown>) : undefined },
    );
  },

  getPropertiesByAgency(agencyId: string, params?: PropertyQueryParams) {
    return apiClient.get<PaginatedApiResponse<Property>>(
      `/public/properties/agency/${agencyId}`,
      { params: params ? cleanParams(params as Record<string, unknown>) : undefined },
    );
  },

  getPropertiesByCategory(categoryId: string, params?: PropertyQueryParams) {
    return apiClient.get<PaginatedApiResponse<Property>>(
      `/public/properties/category/${categoryId}`,
      { params: params ? cleanParams(params as Record<string, unknown>) : undefined },
    );
  },

  searchProperties(params: PropertyQueryParams) {
    return apiClient.get<PaginatedApiResponse<Property>>('/public/search', {
      params: cleanParams(params as Record<string, unknown>),
    });
  },
};

import apiClient from '@/app/axios';
import type { ApiResponse, PaginatedApiResponse } from '@/types/api';
import type { Canton, City, PopularCity, Category, Amenity } from '../types';

export const locationsApi = {
  // Cantons
  getCantons() {
    return apiClient.get<PaginatedApiResponse<Canton>>('/public/locations/cantons');
  },

  getCanton(id: string) {
    return apiClient.get<ApiResponse<Canton>>(`/public/locations/cantons/${id}`);
  },

  getCantonByCode(code: string) {
    return apiClient.get<ApiResponse<Canton>>(`/public/locations/cantons/code/${code}`);
  },

  // Cities
  getCities(params?: { canton_id?: string }) {
    return apiClient.get<PaginatedApiResponse<City>>('/public/locations/cities', { params });
  },

  getCitiesByCanton(cantonId: string) {
    return apiClient.get<PaginatedApiResponse<City>>(
      `/public/locations/cantons/${cantonId}/cities`,
    );
  },

  getPopularCities(params?: { min_properties?: number; limit?: number }) {
    return apiClient.get<ApiResponse<PopularCity[]>>('/public/locations/cities/popular', {
      params,
    });
  },

  searchCities(query: string) {
    return apiClient.get<ApiResponse<City[]>>('/public/locations/cities/search', {
      params: { q: query },
    });
  },

  // Categories
  getCategories() {
    return apiClient.get<PaginatedApiResponse<Category>>('/public/categories');
  },

  getCategory(id: string) {
    return apiClient.get<ApiResponse<Category>>(`/public/categories/${id}`);
  },

  getCategoriesBySection(section: string) {
    return apiClient.get<PaginatedApiResponse<Category>>(
      `/public/categories/section/${section}`,
    );
  },

  // Amenities
  getAmenities() {
    return apiClient.get<PaginatedApiResponse<Amenity>>('/public/amenities');
  },

  getAmenitiesByGroup(group: string) {
    return apiClient.get<PaginatedApiResponse<Amenity>>(`/public/amenities/group/${group}`);
  },
};

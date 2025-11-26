import apiClient from '@/app/axios';
import type { AgencyListResponse, AgencyQueryParams, Agency } from '../types';
import type { ApiResponse } from '@/types/api';

function cleanParams(params: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== null && value !== undefined && value !== '',
    ),
  );
}

export const agenciesApi = {
  getAgencies(params?: AgencyQueryParams) {
    return apiClient.get<AgencyListResponse>('/public/agencies', {
      params: params ? cleanParams(params as Record<string, unknown>) : undefined,
    });
  },

  getAgency(id: string) {
    return apiClient.get<ApiResponse<Agency>>(`/public/agencies/${id}`);
  },

  getAgenciesByCanton(cantonId: string, params?: { page?: number; limit?: number }) {
    return apiClient.get<AgencyListResponse>(`/public/agencies/canton/${cantonId}`, {
      params: params ? cleanParams(params as Record<string, unknown>) : undefined,
    });
  },

  getAgenciesByCity(cityId: string, params?: { page?: number; limit?: number }) {
    return apiClient.get<AgencyListResponse>(`/public/agencies/city/${cityId}`, {
      params: params ? cleanParams(params as Record<string, unknown>) : undefined,
    });
  },
};

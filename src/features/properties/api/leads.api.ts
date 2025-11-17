import apiClient from '@/app/axios';
import type {
  CreatePublicLeadRequest,
  CreateAuthenticatedLeadRequest,
  LeadResponse,
} from '../types';

export const leadsApi = {
  createPublicLead(data: CreatePublicLeadRequest) {
    return apiClient.post<LeadResponse>('/public/leads', data);
  },

  createAuthenticatedLead(data: CreateAuthenticatedLeadRequest) {
    return apiClient.post<LeadResponse>('/public/leads/authenticated', data);
  },
};

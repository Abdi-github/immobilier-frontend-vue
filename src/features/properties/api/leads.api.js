import apiClient from '@/app/axios';
export const leadsApi = {
    createPublicLead(data) {
        return apiClient.post('/public/leads', data);
    },
    createAuthenticatedLead(data) {
        return apiClient.post('/public/leads/authenticated', data);
    },
};

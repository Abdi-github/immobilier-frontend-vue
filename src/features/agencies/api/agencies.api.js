import apiClient from '@/app/axios';
function cleanParams(params) {
    return Object.fromEntries(Object.entries(params).filter(([, value]) => value !== null && value !== undefined && value !== ''));
}
export const agenciesApi = {
    getAgencies(params) {
        return apiClient.get('/public/agencies', {
            params: params ? cleanParams(params) : undefined,
        });
    },
    getAgency(id) {
        return apiClient.get(`/public/agencies/${id}`);
    },
    getAgenciesByCanton(cantonId, params) {
        return apiClient.get(`/public/agencies/canton/${cantonId}`, {
            params: params ? cleanParams(params) : undefined,
        });
    },
    getAgenciesByCity(cityId, params) {
        return apiClient.get(`/public/agencies/city/${cityId}`, {
            params: params ? cleanParams(params) : undefined,
        });
    },
};

import apiClient from '@/app/axios';
function cleanParams(params) {
    return Object.fromEntries(Object.entries(params).filter(([, value]) => value !== null && value !== undefined && value !== ''));
}
export const propertiesApi = {
    getProperties(params) {
        return apiClient.get('/public/properties', {
            params: params ? cleanParams(params) : undefined,
        });
    },
    getProperty(id) {
        return apiClient.get(`/public/properties/${id}`);
    },
    getPropertyImages(id) {
        return apiClient.get(`/public/properties/${id}/images`);
    },
    getPropertiesByCanton(cantonId, params) {
        return apiClient.get(`/public/properties/canton/${cantonId}`, { params: params ? cleanParams(params) : undefined });
    },
    getPropertiesByCity(cityId, params) {
        return apiClient.get(`/public/properties/city/${cityId}`, { params: params ? cleanParams(params) : undefined });
    },
    getPropertiesByAgency(agencyId, params) {
        return apiClient.get(`/public/properties/agency/${agencyId}`, { params: params ? cleanParams(params) : undefined });
    },
    getPropertiesByCategory(categoryId, params) {
        return apiClient.get(`/public/properties/category/${categoryId}`, { params: params ? cleanParams(params) : undefined });
    },
    searchProperties(params) {
        return apiClient.get('/public/search', {
            params: cleanParams(params),
        });
    },
};

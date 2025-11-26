import apiClient from '@/app/axios';
export const locationsApi = {
    // Cantons
    getCantons() {
        return apiClient.get('/public/locations/cantons');
    },
    getCanton(id) {
        return apiClient.get(`/public/locations/cantons/${id}`);
    },
    getCantonByCode(code) {
        return apiClient.get(`/public/locations/cantons/code/${code}`);
    },
    // Cities
    getCities(params) {
        return apiClient.get('/public/locations/cities', { params });
    },
    getCitiesByCanton(cantonId) {
        return apiClient.get(`/public/locations/cantons/${cantonId}/cities`);
    },
    getPopularCities(params) {
        return apiClient.get('/public/locations/cities/popular', {
            params,
        });
    },
    searchCities(query) {
        return apiClient.get('/public/locations/cities/search', {
            params: { q: query },
        });
    },
    // Categories
    getCategories() {
        return apiClient.get('/public/categories');
    },
    getCategory(id) {
        return apiClient.get(`/public/categories/${id}`);
    },
    getCategoriesBySection(section) {
        return apiClient.get(`/public/categories/section/${section}`);
    },
    // Amenities
    getAmenities() {
        return apiClient.get('/public/amenities');
    },
    getAmenitiesByGroup(group) {
        return apiClient.get(`/public/amenities/group/${group}`);
    },
};

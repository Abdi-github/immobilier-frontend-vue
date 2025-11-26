import apiClient from '@/app/axios';
export const propertyManagementApi = {
    // ==================== My Properties ====================
    getMyProperties(params) {
        return apiClient.get('/agent/properties', { params });
    },
    getMyProperty(id) {
        return apiClient.get(`/agent/properties/${id}`);
    },
    getPropertyStats() {
        return apiClient.get('/agent/properties/statistics');
    },
    // ==================== Property CRUD ====================
    createProperty(data) {
        return apiClient.post('/agent/properties', data);
    },
    updateProperty(id, data) {
        return apiClient.put(`/agent/properties/${id}`, data);
    },
    deleteProperty(id) {
        return apiClient.delete(`/agent/properties/${id}`);
    },
    submitForApproval(id) {
        return apiClient.post(`/agent/properties/${id}/submit`);
    },
    archiveProperty(id) {
        return apiClient.post(`/agent/properties/${id}/archive`);
    },
    // ==================== Property Images ====================
    getPropertyImages(propertyId) {
        return apiClient.get(`/agent/properties/${propertyId}/images`);
    },
    uploadImage(propertyId, formData) {
        return apiClient.post(`/agent/properties/${propertyId}/images/upload`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    },
    uploadMultipleImages(propertyId, formData) {
        return apiClient.post(`/agent/properties/${propertyId}/images/upload-multiple`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    },
    deleteImage(propertyId, imageId) {
        return apiClient.delete(`/agent/properties/${propertyId}/images/${imageId}`);
    },
    setPrimaryImage(propertyId, imageId) {
        return apiClient.put(`/agent/properties/${propertyId}/images/${imageId}`, {
            is_primary: true,
        });
    },
    reorderImages(propertyId, imageIds) {
        return apiClient.post(`/agent/properties/${propertyId}/images/reorder`, {
            image_ids: imageIds,
        });
    },
    // ==================== Translations ====================
    createTranslation(data) {
        return apiClient.post('/admin/translations', data);
    },
    requestAutoTranslation(propertyId, targetLanguages) {
        return apiClient.post(`/agent/properties/${propertyId}/translations/request`, {
            target_languages: targetLanguages,
        });
    },
};

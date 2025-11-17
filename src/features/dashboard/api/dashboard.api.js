import apiClient from '@/app/axios';
function transformPaginated(raw) {
    return {
        data: raw.data,
        pagination: {
            page: raw.meta.page,
            limit: raw.meta.limit,
            total: raw.meta.total,
            totalPages: raw.meta.total_pages,
        },
    };
}
export const dashboardApi = {
    // ==================== Profile ====================
    getProfile() {
        return apiClient.get('/public/auth/me');
    },
    updateProfile(data) {
        return apiClient.patch('/public/auth/me', data);
    },
    changePassword(data) {
        return apiClient.post('/public/auth/change-password', data);
    },
    uploadAvatar(formData) {
        return apiClient.post('/public/users/avatar', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    deleteAvatar() {
        return apiClient.delete('/public/users/avatar');
    },
    // ==================== Settings ====================
    getSettings() {
        return apiClient.get('/public/users/settings');
    },
    updateSettings(data) {
        return apiClient.patch('/public/users/settings', data);
    },
    // ==================== Favorites ====================
    getFavorites(params = {}) {
        return apiClient
            .get('/public/users/favorites', {
            params: { page: params.page ?? 1, limit: params.limit ?? 12 },
        })
            .then((res) => ({ ...res, data: transformPaginated(res.data) }));
    },
    addFavorite(propertyId) {
        return apiClient.post('/public/users/favorites', {
            property_id: propertyId,
        });
    },
    removeFavorite(propertyId) {
        return apiClient.delete(`/public/users/favorites/${propertyId}`);
    },
    getFavoriteIds() {
        return apiClient.get('/public/users/favorites/ids');
    },
    // ==================== Alerts ====================
    getAlerts() {
        return apiClient.get('/public/users/alerts');
    },
    createAlert(data) {
        return apiClient.post('/public/users/alerts', data);
    },
    updateAlert(id, data) {
        return apiClient.put(`/public/users/alerts/${id}`, data);
    },
    deleteAlert(id) {
        return apiClient.delete(`/public/users/alerts/${id}`);
    },
    toggleAlert(id, is_active) {
        return apiClient.patch(`/public/users/alerts/${id}/toggle`, {
            is_active,
        });
    },
    // ==================== Stats ====================
    getDashboardStats() {
        return apiClient.get('/public/users/dashboard/stats');
    },
    // ==================== Inquiries ====================
    getMyInquiries(params = {}) {
        return apiClient
            .get('/public/leads/my-inquiries', {
            params: { page: params.page ?? 1, limit: params.limit ?? 10 },
        })
            .then((res) => ({ ...res, data: transformPaginated(res.data) }));
    },
    // ==================== Account ====================
    deactivateAccount() {
        return apiClient.delete('/public/users/account');
    },
};

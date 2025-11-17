import apiClient from '@/app/axios';
export const authApi = {
    login(data) {
        return apiClient.post('/public/auth/login', data);
    },
    register(data) {
        return apiClient.post('/public/auth/register', data);
    },
    logout() {
        return apiClient.post('/public/auth/logout');
    },
    refreshToken(data) {
        return apiClient.post('/public/auth/refresh', data);
    },
    getMe() {
        return apiClient.get('/public/auth/me');
    },
    updateProfile(data) {
        return apiClient.patch('/public/auth/me', data);
    },
    changePassword(data) {
        return apiClient.post('/public/auth/change-password', data);
    },
    forgotPassword(data) {
        return apiClient.post('/public/auth/forgot-password', data);
    },
    resetPassword(data) {
        return apiClient.post('/public/auth/reset-password', data);
    },
    verifyEmail(data) {
        return apiClient.post('/public/auth/verify-email', data);
    },
    resendVerification(data) {
        return apiClient.post('/public/auth/resend-verification', data);
    },
};

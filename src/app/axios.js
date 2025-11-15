import axios from 'axios';
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4003/api/v1',
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('immobilier_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    const lang = localStorage.getItem('i18nextLng') || 'en';
    config.headers['Accept-Language'] = lang;
    return config;
});
apiClient.interceptors.response.use((response) => response, async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
        error.config._retry = true;
        const refreshToken = localStorage.getItem('immobilier_refresh_token');
        if (refreshToken) {
            try {
                const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:4003/api/v1'}/public/auth/refresh`, { refresh_token: refreshToken });
                const { access_token, refresh_token } = response.data.data.tokens;
                localStorage.setItem('immobilier_token', access_token);
                localStorage.setItem('immobilier_refresh_token', refresh_token);
                error.config.headers.Authorization = `Bearer ${access_token}`;
                return apiClient(error.config);
            }
            catch {
                localStorage.removeItem('immobilier_token');
                localStorage.removeItem('immobilier_refresh_token');
                localStorage.removeItem('immobilier_user');
                window.location.href = `/${localStorage.getItem('i18nextLng') || 'en'}/sign-in`;
            }
        }
    }
    return Promise.reject(error);
});
export default apiClient;

import apiClient from '@/app/axios';
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  RefreshTokenRequest,
  TokensResponse,
  User,
} from '../types';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const authApi = {
  login(data: LoginRequest) {
    return apiClient.post<ApiResponse<AuthResponse>>('/public/auth/login', data);
  },

  register(data: RegisterRequest) {
    return apiClient.post<ApiResponse<AuthResponse>>('/public/auth/register', data);
  },

  logout() {
    return apiClient.post<ApiResponse<null>>('/public/auth/logout');
  },

  refreshToken(data: RefreshTokenRequest) {
    return apiClient.post<ApiResponse<{ tokens: TokensResponse }>>('/public/auth/refresh', data);
  },

  getMe() {
    return apiClient.get<ApiResponse<User>>('/public/auth/me');
  },

  updateProfile(data: Partial<User>) {
    return apiClient.patch<ApiResponse<User>>('/public/auth/me', data);
  },

  changePassword(data: { current_password: string; password: string; password_confirmation: string }) {
    return apiClient.post<ApiResponse<{ message: string }>>('/public/auth/change-password', data);
  },

  forgotPassword(data: ForgotPasswordRequest) {
    return apiClient.post<ApiResponse<{ message: string }>>('/public/auth/forgot-password', data);
  },

  resetPassword(data: ResetPasswordRequest) {
    return apiClient.post<ApiResponse<{ message: string }>>('/public/auth/reset-password', data);
  },

  verifyEmail(data: { token: string }) {
    return apiClient.post<ApiResponse<{ message: string }>>('/public/auth/verify-email', data);
  },

  resendVerification(data: { email: string }) {
    return apiClient.post<ApiResponse<{ message: string }>>('/public/auth/resend-verification', data);
  },
};
